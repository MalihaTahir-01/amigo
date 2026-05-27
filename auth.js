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
  await saveUserData();
  clearLocalData();
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
    // Load data from Supabase before showing the app
    await loadUserData();

    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').style.display  = 'flex';
    const name = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
    document.querySelector('.greeting h2').textContent    = `Hello, ${name} 👋`;
    document.querySelector('.profile-info p').textContent = name;
    document.querySelector('.avatar').textContent         = name.charAt(0).toUpperCase();
  } else {
    clearLocalData();
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display  = 'none';
  }
}
// ── Load user data from Supabase ──────────────────────────
async function loadUserData() {
  const session = await getSession();
  if (!session) return;
  const userId = session.user.id;

  const { data, error } = await _supabase
    .from('user_data')
    .select('*')
    .eq('user_id', userId)
    .single();

  // If no data in Supabase yet, upload whatever is in localStorage
  if (error || !data || !data.items) {
    await saveUserData();
    return;
  }

  // Supabase has data — merge with localStorage
  // Keep whichever has more items (in case user added stuff offline)
  const cloudItems    = data.items    || [];
  const cloudTodos    = data.todos    || [];
  const cloudRem      = data.reminders|| [];
  const cloudFolders  = data.folders  || [];

  const localItems    = JSON.parse(localStorage.getItem('amigo_items')     || '[]');
  const localTodos    = JSON.parse(localStorage.getItem('amigo_todos')     || '[]');
  const localRem      = JSON.parse(localStorage.getItem('amigo_reminders') || '[]');
  const localFolders  = JSON.parse(localStorage.getItem('amigo_folders')   || '[]');

  // Merge by id — avoid duplicates
  function mergeById(cloud, local) {
    const map = {};
    cloud.forEach(i => map[i.id] = i);
    local.forEach(i => map[i.id] = i);
    return Object.values(map);
  }

  const mergedItems   = mergeById(cloudItems, localItems);
  const mergedTodos   = mergeById(cloudTodos, localTodos);
  const mergedRem     = mergeById(cloudRem, localRem);
  const mergedFolders = mergeById(cloudFolders, localFolders);

  localStorage.setItem('amigo_items',     JSON.stringify(mergedItems));
  localStorage.setItem('amigo_todos',     JSON.stringify(mergedTodos));
  localStorage.setItem('amigo_reminders', JSON.stringify(mergedRem));
  localStorage.setItem('amigo_folders',   JSON.stringify(mergedFolders));

  // Settings — cloud takes priority if they exist
  if (data.settings) {
    const s = data.settings;
    if (s.name)    localStorage.setItem('amigo_name',    s.name);
    if (s.uni)     localStorage.setItem('amigo_uni',     s.uni);
    if (s.program) localStorage.setItem('amigo_program', s.program);
    if (s.lang)    localStorage.setItem('amigo_lang',    s.lang);
  }

  // Upload the merged result back to Supabase
  await saveUserData();
}

// ── Save user data to Supabase ────────────────────────────
async function saveUserData() {
  const session = await getSession();
  if (!session) return;
  const userId = session.user.id;
  const payload = {
    user_id:    userId,
    items:      JSON.parse(localStorage.getItem('amigo_items')     || '[]'),
    todos:      JSON.parse(localStorage.getItem('amigo_todos')     || '[]'),
    reminders:  JSON.parse(localStorage.getItem('amigo_reminders') || '[]'),
    folders:    JSON.parse(localStorage.getItem('amigo_folders')   || '[]'),
    settings: {
      name:    localStorage.getItem('amigo_name')    || '',
      uni:     localStorage.getItem('amigo_uni')     || '',
      program: localStorage.getItem('amigo_program') || '',
      lang:    localStorage.getItem('amigo_lang')    || 'en',
    },
    updated_at: new Date().toISOString(),
  };
  await _supabase.from('user_data').upsert(payload, { onConflict: 'user_id' });
}

// ── Clear local data on logout ────────────────────────────
function clearLocalData() {
  const keys = ['amigo_items','amigo_todos','amigo_reminders','amigo_folders',
                 'amigo_name','amigo_uni','amigo_program','amigo_lang','amigo_pic'];
  keys.forEach(k => localStorage.removeItem(k));
}