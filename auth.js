// api/_auth.js — shared helper (the leading underscore tells Vercel this is
// NOT a public endpoint). Checks the caller's Supabase login token so only
// signed-in Amigo users can use the AI / notification endpoints.
async function getUser(req) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    const r = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: key, Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return null;
    const user = await r.json();
    return user && user.id ? user : null;
  } catch (e) {
    return null;
  }
}
module.exports = { getUser };