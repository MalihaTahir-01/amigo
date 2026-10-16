// POST /api/test-push — sends an immediate test push to the signed-in user's
// registered devices, and reports exactly what happened (for debugging).
const webpush = require('web-push');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'VAPID_PUBLIC_KEY', 'VAPID_PRIVATE_KEY']
    .filter(k => !process.env[k]);
  if (missing.length) { res.status(500).json({ error: 'Missing Vercel environment variables: ' + missing.join(', ') }); return; }

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) { res.status(401).json({ error: 'Not signed in' }); return; }

  try {
    // Who is this?
    const uRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${token}` }
    });
    if (!uRes.ok) { res.status(401).json({ error: 'Session not valid — sign in again' }); return; }
    const user = await uRes.json();

    // Their saved devices
    const sRes = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/push_subscriptions?select=*&user_id=eq.${user.id}`,
      { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } }
    );
    if (!sRes.ok) { res.status(500).json({ error: 'Could not read push_subscriptions: ' + (await sRes.text()).slice(0, 200) }); return; }
    const subs = await sRes.json();
    if (!subs.length) {
      res.status(200).json({ ok: false, devices: 0, error: 'No device is registered for your account yet. Tap "Enable" and allow notifications first.' });
      return;
    }

    webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:support@example.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    let sent = 0; const errors = [];
    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
          JSON.stringify({ title: 'Amigo test 🔔', body: 'Push notifications are working!', tag: 'amigo-test' })
        );
        sent++;
      } catch (err) {
        errors.push(`${err.statusCode || ''} ${(err.body || err.message || '').toString().slice(0, 120)}`.trim());
      }
    }
    res.status(200).json({ ok: sent > 0, devices: subs.length, sent, errors });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};