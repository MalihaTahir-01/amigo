const SUPABASE_URL = 'https://jqjjizvrhvwxhjxlmkmc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxamppenZyaHZ3eGhqeGxta21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MTgyNzgsImV4cCI6MjA5NTA5NDI3OH0.ymOwOAxofSIozZr9MGH2SfIoGx2vRIw-hftrGQlNPGc';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Dynamic redirect — works on localhost AND production ──
function getRedirectURL() {
  return window.location.origin;
}

// Where supabase-js keeps the login on this device (sb-<project>-auth-token).
const SB_STORAGE_KEY = 'sb-' + new URL(SUPABASE_URL).hostname.split('.')[0] + '-auth-token';

// Reads the saved login straight from the device — no network involved.
function getStoredSession() {
  try {
    const raw = localStorage.getItem(SB_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const s = (parsed && parsed.currentSession) || parsed;
    return (s && s.user && s.refresh_token) ? s : null;
  } catch (e) { return null; }
}

// supabase-js refreshes an expired login over the network, and with no (or
// useless) internet it keeps retrying for ~30 seconds before giving up and
// returning "no session" — which is what threw you back to the login page.
// Fix: wait at most 3 seconds; if it can't confirm online, trust the login
// already saved on this device. You only really get logged out by signing out
// (or if the server explicitly rejects the login while online).
let _offlineUntil = 0; // after one timeout, skip the 3s wait for a minute
async function getSession() {
  const stored = getStoredSession();
  if (stored && Date.now() < _offlineUntil) return stored;
  try {
    const result = await Promise.race([
      _supabase.auth.getSession(),
      new Promise(resolve => setTimeout(() => resolve({ timedOut: true }), 3000)),
    ]);
    if (result && result.data && result.data.session) return result.data.session;
    const networkTrouble = result.timedOut || !navigator.onLine ||
      (result.error && (result.error.name === 'AuthRetryableFetchError' || result.error.status === 0));
    if (networkTrouble && stored) { _offlineUntil = Date.now() + 60000; return stored; }
    return null;
  } catch (e) {
    if (stored) _offlineUntil = Date.now() + 60000;
    return stored; // network blew up — fall back to the saved login
  }
}

// Gives up on a request that hangs (Wi-Fi connected but no real internet).
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

async function signInWithGoogle() {
  const { error } = await _supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: getRedirectURL() }
  });
  if (error) alert('Login failed: ' + error.message);
}

async function signInWithEmail(email, password) {
  const { error } = await _supabase.auth.signInWithPassword({ email, password });
  if (error) return error.message;
  return null;
}

async function signUpWithEmail(email, password, name) {
  const { data, error } = await _supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: getRedirectURL()
    }
  });

  if (error) {
    if (error.message.includes('already registered') || 
        error.message.includes('already exists') ||
        error.message.toLowerCase().includes('duplicate')) {
      return 'this email is already registered — try signing in instead 👋';
    }
    if (error.message.includes('invalid email')) {
      return 'that email doesn\'t look right 📧';
    }
    return error.message;
  }

  if (data.session) {
    await loadUserData();
    // Same fix as handleLogin() in app.js — reload so the whole startup
    // sequence re-runs with the session already active, instead of leaving
    // the already-loaded (empty) app.js state on screen.
    window.location.reload();
    return 'AUTO_LOGIN';
  }

  return null;
}
async function signOut() {
  await saveUserData();
  clearLocalData();
  await _supabase.auth.signOut();
  window.location.reload();
}

function applySessionToUI(session) {
  const name = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
  document.querySelector('.greeting h2').textContent    = `Hello, ${name} 👋`;
  document.querySelector('.profile-info p').textContent = name;
  document.querySelector('.avatar').textContent         = name.charAt(0).toUpperCase();
}

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
        <input id="newPassword" type="password" placeholder="new password (min 6 chars)"
          style="width:100%;padding:11px 14px 11px 38px;border:0.5px solid #b8c9e0;border-radius:10px;font-size:13px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;"
          onkeydown="if(event.key==='Enter') handlePasswordReset()" />
      </div>
      <div id="resetError" style="font-size:12px;color:#EF4444;display:none;padding:8px 12px;background:#FEE2E2;border-radius:8px;"></div>
      <button onclick="handlePasswordReset()"
        style="padding:12px;background:linear-gradient(135deg,#1a3a6b,#0f2240);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 4px 12px rgba(15,34,64,0.3);">
        update password →
      </button>
    </div>`;
}

async function handlePasswordReset() {
  const password = document.getElementById('newPassword').value.trim();
  const errEl    = document.getElementById('resetError');
  if (!password || password.length < 6) {
    errEl.textContent   = 'at least 6 characters please 🔐';
    errEl.style.display = 'block';
    return;
  }
  const { error } = await _supabase.auth.updateUser({ password });
  if (error) {
    errEl.textContent   = error.message;
    errEl.style.display = 'block';
    return;
  }
  await _supabase.auth.signOut();
  window.location.href = getRedirectURL();
}

async function initAuth() {
  const hash   = window.location.hash;
  const params = new URLSearchParams(window.location.search); // ← also check query params

  // ── Password recovery — hash OR query param ───────────
  if (hash.includes('type=recovery') || params.get('type') === 'recovery') {
    // Let Supabase JS process the token from the URL
    await new Promise(r => setTimeout(r, 600));
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display  = 'none';
    showPasswordResetForm();
    return;
  }

  // ── Email confirmation ─────────────────────────────────
  if (hash.includes('type=signup') || params.get('type') === 'signup') {
    await new Promise(r => setTimeout(r, 800)); // give Supabase JS time to exchange token
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
      window.history.replaceState(null, '', window.location.pathname);
      await loadUserData();
      document.getElementById('authScreen').style.display = 'none';
      document.getElementById('appScreen').style.display  = 'flex';
      applySessionToUI(session);
      return;
    }
    // Token exchange failed — show a friendly error
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display  = 'none';
    const errEl = document.getElementById('loginError');
    if (errEl) {
      errEl.textContent   = 'confirmation link expired — please sign in or request a new one';
      errEl.style.display = 'block';
    }
    return;
  }

  // ── Normal returning-user session check ────────────────
  const session = await getSession();
  if (session) {
    await loadUserData();
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').style.display  = 'flex';
    applySessionToUI(session);
  } else {
    clearLocalData();
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display  = 'none';
  }
}

async function loadUserData() {
  const session = await getSession();
  if (!session) return;
  const userId = session.user.id;

  // Changes made while offline are still waiting to be uploaded: send them
  // first, otherwise "always trust the cloud" below would wipe them out.
  if (localStorage.getItem('amigo_dirty') === '1') {
    await saveUserData();
    if (localStorage.getItem('amigo_dirty') === '1') return; // still offline — keep local data
  }

  let data, error;
  try {
    ({ data, error } = await withTimeout(
      _supabase.from('user_data').select('*').eq('user_id', userId).single(), 4000
    ));
  } catch (e) {
    return; // offline / hanging network — just use what's already on this device
  }

  if (error) {
    // PGRST116 = "no row yet" (brand-new account) → create it. Any OTHER
    // error (offline, server hiccup) must NOT overwrite the cloud copy.
    if (error.code === 'PGRST116') await saveUserData();
    return;
  }
  if (!data) return;

  // Always trust cloud data — overwrite local completely
  if (data.items)     localStorage.setItem('amigo_items',     JSON.stringify(data.items));
  if (data.todos)     localStorage.setItem('amigo_todos',     JSON.stringify(data.todos));
  if (data.reminders) localStorage.setItem('amigo_reminders', JSON.stringify(data.reminders));
  if (data.folders)   localStorage.setItem('amigo_folders',   JSON.stringify(data.folders));
  if (data.schedule_folders) localStorage.setItem('amigo_schedule_folders', JSON.stringify(data.schedule_folders));

  if (data.settings) {
    const s = data.settings;
    if (s.name)    localStorage.setItem('amigo_name',    s.name);
    if (s.uni)     localStorage.setItem('amigo_uni',     s.uni);
    if (s.program) localStorage.setItem('amigo_program', s.program);
    if (s.lang)    localStorage.setItem('amigo_lang',    s.lang);
    // Notes and the new toggles live inside settings (no DB schema change needed).
    localStorage.setItem('amigo_notes', JSON.stringify(s.notes || []));
    localStorage.setItem('amigo_darkmode', s.darkMode ? '1' : '0');
    localStorage.setItem('amigo_notifpref', s.notifPref === false ? '0' : '1');
  }
}

async function saveUserData() {
  const session = await getSession();
  if (!session) return;
  const userId  = session.user.id;
  const payload = {
    user_id:   userId,
    items:     JSON.parse(localStorage.getItem('amigo_items')     || '[]'),
    todos:     JSON.parse(localStorage.getItem('amigo_todos')     || '[]'),
    reminders: JSON.parse(localStorage.getItem('amigo_reminders') || '[]'),
    folders:   JSON.parse(localStorage.getItem('amigo_folders')   || '[]'),
    schedule_folders: JSON.parse(localStorage.getItem('amigo_schedule_folders') || '[]'),
    settings: {
      name:    localStorage.getItem('amigo_name')    || '',
      uni:     localStorage.getItem('amigo_uni')     || '',
      program: localStorage.getItem('amigo_program') || '',
      lang:    localStorage.getItem('amigo_lang')    || 'en',
      notes:      JSON.parse(localStorage.getItem('amigo_notes') || '[]'),
      darkMode:   localStorage.getItem('amigo_darkmode') === '1',
      notifPref:  localStorage.getItem('amigo_notifpref') !== '0',
    },
    updated_at: new Date().toISOString(),
  };
  try {
    const { error } = await withTimeout(
      _supabase.from('user_data').upsert(payload, { onConflict: 'user_id' }), 8000
    );
    if (error) throw error;
    localStorage.removeItem('amigo_dirty');
  } catch (err) {
    // Couldn't reach the server — remember there are unsent changes so they
    // get uploaded next time instead of being overwritten.
    localStorage.setItem('amigo_dirty', '1');
    console.error('Supabase save error:', err.message || err);
  }
}

// ============================================================
// FORGOT PASSWORD
// ============================================================
async function handleForgotPassword() {
  const email = document.getElementById('loginEmail').value.trim();
  const errEl = document.getElementById('loginError');
  if (!email) {
    errEl.textContent      = 'enter your email first 📧';
    errEl.style.color      = '#EF4444';
    errEl.style.background = '#FEE2E2';
    errEl.style.display    = 'block';
    return;
  }
  errEl.textContent      = 'sending reset link...';
  errEl.style.color      = '#1a3a6b';
  errEl.style.background = '#e8eef7';
  errEl.style.display    = 'block';

  const { error } = await _supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin
  });
  if (error) {
    errEl.textContent      = 'something went wrong 😬 ' + error.message;
    errEl.style.color      = '#EF4444';
    errEl.style.background = '#FEE2E2';
    errEl.style.display    = 'block';
    return;
  }
  errEl.textContent      = 'reset link sent! check your email 📩';
  errEl.style.color      = '#16A34A';
  errEl.style.background = '#DCFCE7';
  errEl.style.display    = 'block';
}

function clearLocalData() {
  const keys = ['amigo_items','amigo_todos','amigo_reminders','amigo_folders','amigo_schedule_folders',
                 'amigo_name','amigo_uni','amigo_program','amigo_lang','amigo_pic','amigo_dirty'];
  keys.forEach(k => localStorage.removeItem(k));
}