// ============================================================
// AMIGO — auth.js
// ============================================================

const SUPABASE_URL = 'https://jqjjizvrhvwxhjxlmkmc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxamppenZyaHZ3eGhqeGxta21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MTgyNzgsImV4cCI6MjA5NTA5NDI3OH0.ymOwOAxofSIozZr9MGH2SfIoGx2vRIw-hftrGQlNPGc';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Check current session ─────────────────────────────────
async function getSession() {
  const { data: { session } } = await _supabase.auth.getSession();
  return session;
}

// ── Sign in with Google ───────────────────────────────────
async function signInWithGoogle() {
  const { error } = await _supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) alert('Login failed: ' + error.message);
}

// ── Sign in with Email ────────────────────────────────────
async function signInWithEmail(email, password) {
  const { error } = await _supabase.auth.signInWithPassword({ email, password });
  if (error) return error.message;
  return null;
}

// ── Sign up with Email ────────────────────────────────────
async function signUpWithEmail(email, password, name) {
  const { error } = await _supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });
  if (error) return error.message;
  return null;
}

// ── Sign out ──────────────────────────────────────────────
async function signOut() {
  await _supabase.auth.signOut();
  window.location.reload();
}

// ── Auth state listener ───────────────────────────────────
async function initAuth() {
  const session = await getSession();
  if (session) {
    // User is logged in — show app
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').style.display  = 'flex';
    const name = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
    document.querySelector('.greeting h2').textContent    = `Hello, ${name} 👋`;
    document.querySelector('.profile-info p').textContent = name;
    document.querySelector('.avatar').textContent         = name.charAt(0).toUpperCase();
  } else {
    // User is not logged in — show auth screen
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display  = 'none';
  }
}