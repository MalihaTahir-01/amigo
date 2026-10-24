// POST /api/notify-task — sends an immediate push to the signed-in user's own
// devices (used to confirm "Task added" the moment a task is saved).
const webpush = require('web-push');
const { getUser } = require('./_auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'VAPID_PUBLIC_KEY', 'VAPID_PRIVATE_KEY']
    .filter(k => !process.env[k]);
  if (missing.length) { res.status(500).json({ error: 'Missing Vercel environment variables: ' + missing.join(', ') }); return; }

  const user = await getUser(req);
  if (!user) { res.status(401).json({ error: 'Not signed in' }); return; }

  const { title, body, tag } = req.body || {};
  const payload = JSON.stringify({
    title: String(title || 'Amigo').slice(0, 80),
    body: String(body || '').slice(0, 160),
    tag: String(tag || 'amigo-task').slice(0, 80),
  });

  try {
    const sRes = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/push_subscriptions?select=*&user_id=eq.${user.id}`,
      { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } }
    );
    if (!sRes.ok) { res.status(500).json({ error: 'Could not read push_subscriptions' }); return; }
    const subs = await sRes.json();
    if (!subs.length) { res.status(200).json({ ok: false, devices: 0 }); return; }

    webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:support@example.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    let sent = 0;
    for (const sub of subs) {
      try {
        await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } }, payload);
        sent++;
      } catch (err) { /* dead device — the reminder job cleans these up */ }
    }
    res.status(200).json({ ok: sent > 0, devices: subs.length, sent });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};