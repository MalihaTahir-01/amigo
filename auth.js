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
    options: { redirectTo: window.location.origin }
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
    options: {
      data: { full_name: name },
      emailRedirectTo: 'https://amigo-lilac.vercel.app'
    }
  });
  if (error) return error.message;
  return null;
}

// ── Sign out ──────────────────────────────────────────────
async function signOut() {
  await _supabase.auth.signOut();
  window.location.reload();
}

// ── Password reset form ───────────────────────────────────
function showPasswordResetForm() {
  const loginForm = document.getElementById('form-login');
  loginForm.innerHTML = `
    <div style="text-align:center;margin-bottom:16px;">
      <p style="font-size:14px;font-weight:500;color:#0F172A;">set new password 🔐</p>
      <p style="font-size:12px;color:#64748B;margin-top:4px;">almost there — pick something strong!</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div style="position:relative;">
        <i class="ti ti-lock" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#94A3B8;font-size:16px;"></i>
        <input id="newPassword" type="password" placeholder="new password (min 6 chars)" style="width:100%;padding:11px 14px 11px 38px;border:0.5px solid #b8c9e0;border-radius:10px;font-size:13px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;" onkeydown="if(event.key==='Enter') handlePasswordReset()" />
      </div>
      <div id="resetError" style="font-size:12px;color:#EF4444;display:none;padding:8px 12px;background:#FEE2E2;border-radius:8px;"></div>
      <button onclick="handlePasswordReset()" style="padding:12px;background:linear-gradient(135deg,#1a3a6b,#0f2240);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 4px 12px rgba(15,34,64,0.3);">update password →</button>
    </div>`;
}

async function handlePasswordReset() {
  const password = document.getElementById('newPassword').value.trim();
  const errEl = document.getElementById('resetError');
  if (!password || password.length < 6) {
    errEl.textContent = 'at least 6 characters please 🔐';
    errEl.style.display = 'block';
    return;
  }
  const { error } = await _supabase.auth.updateUser({ password });
  if (error) {
    errEl.textContent = error.message;
    errEl.style.display = 'block';
    return;
  }
  await _supabase.auth.signOut();
  window.location.href = 'https://amigo-lilac.vercel.app';
}

// ── Auth state listener ───────────────────────────────────
async function initAuth() {
  // Check if this is a password reset callback
  const hash = window.location.hash;
  if (hash && hash.includes('type=recovery')) {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display = 'none';
    showPasswordResetForm();
    return;
  }

  const session = await getSession();
  if (session) {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').style.display  = 'flex';
    const name = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
    document.querySelector('.greeting h2').textContent    = `Hello, ${name} 👋`;
    document.querySelector('.profile-info p').textContent = name;
    document.querySelector('.avatar').textContent         = name.charAt(0).toUpperCase();
  } else {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display  = 'none';
  }
}