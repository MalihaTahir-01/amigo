// /api/send-reminders.js
// Called every 5 minutes by the Supabase cron job (see supabase-push-setup.sql).
// Sends REAL phone push notifications (they pop up like WhatsApp/Instagram,
// even when the app is closed) for:
//   1. Classes:      30 minutes before, and again 15 minutes before.
//   2. Assignments / quizzes / exams (tasks added in the app with a due date):
//                    the NIGHT BEFORE the due date (8 PM), plus a morning
//                    reminder on the due day (8 AM).
//   3. Calendar reminders: at the exact date + time you set.
// A notification_log table makes sure each one is only ever sent once.

const webpush = require('web-push');

// ── Settings you can tweak ───────────────────────────────────
const CLASS_NOTICE_MINUTES = [30, 15]; // how long before a class to notify
const NIGHT_BEFORE_HOUR = 20;          // 20 = 8 PM the day before a due date
const DUE_DAY_HOUR = 8;                // 8 = 8 AM on the due day (set to null to disable)
const WINDOW_MIN = 5;                  // matches the 5-minute cron; a missed tick is covered below
// ─────────────────────────────────────────────────────────────

// Pakistan is UTC+5 all year (no daylight saving).
const TZ_OFFSET_MIN = 5 * 60;
const WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function nowInKarachi() {
  return new Date(Date.now() + TZ_OFFSET_MIN * 60 * 1000);
}
function localDateStr(d) {
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
}
function timeToMinutes(t) {
  if (!t || typeof t !== 'string' || !t.includes(':')) return null;
  const [h, m] = t.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function fmt12(t) {
  const [h, m] = t.split(':').map(Number);
  return (h % 12 === 0 ? 12 : h % 12) + ':' + String(m).padStart(2, '0') + ' ' + (h >= 12 ? 'PM' : 'AM');
}

async function supabaseRest(path, opts = {}) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
    ...opts,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: opts.prefer || 'return=representation',
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase REST ${path} failed (${res.status}): ${text}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : null;
}

module.exports = async (req, res) => {
  if (req.headers['x-cron-secret'] !== process.env.CRON_SECRET) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:support@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  const now = nowInKarachi();
  const nowMin = now.getUTCHours() * 60 + now.getUTCMinutes();
  const todayStr = localDateStr(now);
  const tomorrowStr = localDateStr(new Date(now.getTime() + 24 * 60 * 60 * 1000));
  const todayWeekday = WEEKDAYS[now.getUTCDay()];

  let users, subsByUser;
  try {
    const [userRows, subRows] = await Promise.all([
      supabaseRest('user_data?select=user_id,reminders,schedule_folders,items'),
      supabaseRest('push_subscriptions?select=*'),
    ]);
    users = userRows || [];
    subsByUser = {};
    (subRows || []).forEach(s => { (subsByUser[s.user_id] ||= []).push(s); });
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }

  const due = []; // { user_id, ref_key, title, body }

  users.forEach(u => {
    const subs = subsByUser[u.user_id];
    if (!subs || subs.length === 0) return; // no device registered for this user

    // 1) CLASSES — one notification per notice time (e.g. 30 and 15 minutes).
    //    A notice fires on the first cron tick where the class is within
    //    (notice - WINDOW_MIN) .. notice minutes away. Dedup keeps it to one.
    (u.schedule_folders || []).forEach(folder => {
      (folder.classes || []).forEach(c => {
        if (!c.startTime) return;
        const matchesToday = c.date ? (c.date === todayStr) : (c.day === todayWeekday);
        if (!matchesToday) return;
        const startMin = timeToMinutes(c.startTime);
        if (startMin == null) return;
        const diff = startMin - nowMin; // minutes until the class starts
        CLASS_NOTICE_MINUTES.forEach(notice => {
          if (diff <= notice && diff > notice - WINDOW_MIN - 1 && diff > 0) {
            due.push({
              user_id: u.user_id,
              ref_key: `class${notice}:${folder.id}:${c.id || c.subject}:${c.startTime}:${todayStr}`,
              title: `${c.subject} in ${diff} min`,
              body: `${fmt12(c.startTime)}${c.room ? ' · ' + c.room : ''}${c.teacher ? ' · ' + c.teacher : ''}`,
            });
          }
        });
      });
    });

    // 2) ASSIGNMENTS / QUIZZES / EXAMS (tasks with a due date).
    (u.items || []).forEach(it => {
      if (!it || it.completed || !/^\d{4}-\d{2}-\d{2}$/.test(it.due || '')) return;
      const label = it.subject ? `${it.title} (${it.subject})` : it.title;
      const kind = it.type ? it.type.charAt(0).toUpperCase() + it.type.slice(1) : 'Task';
      const nightStart = NIGHT_BEFORE_HOUR * 60;
      if (it.due === tomorrowStr && nowMin >= nightStart && nowMin < nightStart + 180) {
        due.push({ user_id: u.user_id, ref_key: `item:${it.id}:eve`, title: `${kind} due tomorrow`, body: label });
      }
      if (DUE_DAY_HOUR != null) {
        const dayStart = DUE_DAY_HOUR * 60;
        if (it.due === todayStr && nowMin >= dayStart && nowMin < dayStart + 180) {
          due.push({ user_id: u.user_id, ref_key: `item:${it.id}:today`, title: `${kind} due today`, body: label });
        }
      }
    });

    // 3) CALENDAR REMINDERS — at their own date + time.
    (u.reminders || []).forEach(r => {
      if (!r.date || !r.time || r.date !== todayStr) return;
      const dueMin = timeToMinutes(r.time);
      if (dueMin == null) return;
      const diff = nowMin - dueMin;
      if (diff >= 0 && diff < 20) { // tolerate cron jitter; dedup prevents repeats
        due.push({
          user_id: u.user_id,
          ref_key: `reminder:${r.id}`,
          title: r.title,
          body: `${r.type || 'Reminder'} — now`,
        });
      }
    });
  });

  if (due.length === 0) {
    res.status(200).json({ checked: users.length, sent: 0 });
    return;
  }

  // Dedup: skip anything already logged as sent. Filtered in JS (not in the
  // URL) so subject names with commas/brackets can't break the query.
  let alreadySent = new Set();
  try {
    const since = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const logRows = await supabaseRest(`notification_log?select=user_id,ref_key&sent_at=gte.${encodeURIComponent(since)}&limit=10000`);
    (logRows || []).forEach(r => alreadySent.add(r.user_id + '|' + r.ref_key));
  } catch (err) {
    res.status(500).json({ error: 'dedup check failed: ' + err.message });
    return;
  }

  const toSend = due.filter(d => !alreadySent.has(d.user_id + '|' + d.ref_key));
  let sentCount = 0;
  const staleEndpoints = [];

  for (const item of toSend) {
    const subs = subsByUser[item.user_id] || [];
    let sentForThisItem = false;
    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
          JSON.stringify({ title: item.title, body: item.body, tag: item.ref_key })
        );
        sentForThisItem = true;
      } catch (err) {
        console.error('push failed', err.statusCode, err.body || err.message);
        if (err.statusCode === 404 || err.statusCode === 410) staleEndpoints.push(sub.endpoint);
      }
    }
    if (sentForThisItem) {
      sentCount++;
      try {
        await supabaseRest('notification_log', {
          method: 'POST',
          prefer: 'resolution=ignore-duplicates',
          body: JSON.stringify({ user_id: item.user_id, ref_key: item.ref_key }),
        });
      } catch (_) { /* best-effort; a duplicate next tick is harmless */ }
    }
  }

  if (staleEndpoints.length > 0) {
    try {
      const orFilter = staleEndpoints.map(e => `endpoint.eq.${encodeURIComponent(e)}`).join(',');
      await supabaseRest(`push_subscriptions?or=(${orFilter})`, { method: 'DELETE', prefer: 'return=minimal' });
    } catch (_) { /* not critical */ }
  }

  res.status(200).json({ checked: users.length, candidates: due.length, sent: sentCount });
};