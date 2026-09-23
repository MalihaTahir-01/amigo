const webpush = require('web-push');

// Fixed Asia/Karachi offset (Pakistan doesn't observe DST), matching the
// UTC+5 handling already used elsewhere in this app.
const TZ_OFFSET_MIN = 5 * 60;
const WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function nowInKarachi() {
  const utcNow = new Date();
  return new Date(utcNow.getTime() + TZ_OFFSET_MIN * 60 * 1000);
}
function localDateStr(d) {
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
}
function timeToMinutes(t) {
  if (!t) return null;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
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
  const todayWeekday = WEEKDAYS[now.getUTCDay()];

  let users, subsByUser;
  try {
    const [userRows, subRows] = await Promise.all([
      supabaseRest('user_data?select=user_id,reminders,schedule_folders'),
      supabaseRest('push_subscriptions?select=*'),
    ]);
    users = userRows || [];
    subsByUser = {};
    (subRows || []).forEach(s => {
      (subsByUser[s.user_id] ||= []).push(s);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }

  const due = []; // { user_id, ref_key, title, body }

  users.forEach(u => {
    const subs = subsByUser[u.user_id];
    if (!subs || subs.length === 0) return; // nobody to notify

    // Classes: fire 25–30 minutes before start (a 5-min window matching the
    // cron cadence), so each class gets exactly one notification per day.
    (u.schedule_folders || []).forEach(folder => {
      (folder.classes || []).forEach(c => {
        if (!c.startTime) return;
        const matchesToday = c.date ? (c.date === todayStr) : (c.day === todayWeekday);
        if (!matchesToday) return;
        const startMin = timeToMinutes(c.startTime);
        if (startMin == null) return;
        const diff = startMin - nowMin;
        if (diff > 25 && diff <= 30) {
          due.push({
            user_id: u.user_id,
            ref_key: `class:${folder.id}:${c.subject}:${c.startTime}:${todayStr}`,
            title: `${c.subject} starts soon`,
            body: `${c.startTime}${c.room ? ' · ' + c.room : ''} — starting in about 30 minutes`,
          });
        }
      });
    });

    // Reminders (tasks/quizzes/etc.): fire at their own set date+time, in a
    // 0–5 minute window after the moment they're due.
    (u.reminders || []).forEach(r => {
      if (!r.date || !r.time) return;
      if (r.date !== todayStr) return;
      const dueMin = timeToMinutes(r.time);
      if (dueMin == null) return;
      const diff = nowMin - dueMin;
      if (diff >= 0 && diff < 5) {
        due.push({
          user_id: u.user_id,
          ref_key: `reminder:${r.id}`,
          title: r.title,
          body: `${r.type || 'Reminder'} — due now`,
        });
      }
    });
  });

  if (due.length === 0) {
    res.status(200).json({ checked: users.length, sent: 0 });
    return;
  }

  // Dedup: only keep items not already logged as sent.
  let alreadySent = new Set();
  try {
    const keys = due.map(d => d.ref_key);
    const orFilter = keys.map(k => `ref_key.eq.${encodeURIComponent(k)}`).join(',');
    const logRows = await supabaseRest(`notification_log?select=user_id,ref_key&or=(${orFilter})`);
    (logRows || []).forEach(r => alreadySent.add(r.user_id + '|' + r.ref_key));
  } catch (err) {
    // If the dedup check itself fails, better to skip this run than risk
    // spamming — the next cron tick will retry.
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
          JSON.stringify({ title: item.title, body: item.body })
        );
        sentForThisItem = true;
      } catch (err) {
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
      } catch (_) { /* best-effort log; a duplicate send next tick is not harmful */ }
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