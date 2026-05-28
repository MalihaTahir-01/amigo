const SUPABASE_URL = 'https://jqjjizvrhvwxhjxlmkmc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxamppenZyaHZ3eGhqeGxta21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MTgyNzgsImV4cCI6MjA5NTA5NDI3OH0.ymOwOAxofSIozZr9MGH2SfIoGx2vRIw-hftrGQlNPGc';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Dynamic redirect — works on localhost AND production ──
function getRedirectURL() {
  return window.location.origin;
}

async function getSession() {
  const { data: { session } } = await _supabase.auth.getSession();
  return session;
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
    console.error('Supabase signUp error:', error);
    // User friendly error messages
    if (error.message.includes('already registered') || 
        error.message.includes('already exists') ||
        error.message.toLowerCase().includes('duplicate')) {
      return 'this email is already registered — try signing in instead 👋';
    }
    if (error.message.includes('invalid email')) {
      return 'that email doesn\'t look right 📧';
    }
    if (error.message.includes('weak password') || 
        error.message.includes('password')) {
      return 'password too weak — try something stronger 🔐';
    }
    return error.message;
  }

  // Supabase sometimes doesn't return error for existing unconfirmed emails
  // but returns a user with no session — catch that case
  if (data.user && !data.session && !data.user.confirmed_at) {
    // Check if user was created_at more than 1 minute ago = already existed
    const createdAt = new Date(data.user.created_at);
    const now = new Date();
    const diffSeconds = (now - createdAt) / 1000;
    if (diffSeconds > 60) {
      return 'this email is already registered — try signing in instead 👋';
    }
  }

  if (data.session) {
    await loadUserData();
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').style.display  = 'flex';
    applySessionToUI(data.session);
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

  const { data, error } = await _supabase
    .from('user_data')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data || !data.items) {
    await saveUserData();
    return;
  }

  const cloudItems   = data.items     || [];
  const cloudTodos   = data.todos     || [];
  const cloudRem     = data.reminders || [];
  const cloudFolders = data.folders   || [];

  const localItems   = JSON.parse(localStorage.getItem('amigo_items')     || '[]');
  const localTodos   = JSON.parse(localStorage.getItem('amigo_todos')     || '[]');
  const localRem     = JSON.parse(localStorage.getItem('amigo_reminders') || '[]');
  const localFolders = JSON.parse(localStorage.getItem('amigo_folders')   || '[]');

  function mergeById(cloud, local) {
    const map = {};
    cloud.forEach(i => map[i.id] = i);
    local.forEach(i => map[i.id] = i);
    return Object.values(map);
  }

  localStorage.setItem('amigo_items',     JSON.stringify(mergeById(cloudItems,   localItems)));
  localStorage.setItem('amigo_todos',     JSON.stringify(mergeById(cloudTodos,   localTodos)));
  localStorage.setItem('amigo_reminders', JSON.stringify(mergeById(cloudRem,     localRem)));
  localStorage.setItem('amigo_folders',   JSON.stringify(mergeById(cloudFolders, localFolders)));

  if (data.settings) {
    const s = data.settings;
    if (s.name)    localStorage.setItem('amigo_name',    s.name);
    if (s.uni)     localStorage.setItem('amigo_uni',     s.uni);
    if (s.program) localStorage.setItem('amigo_program', s.program);
    if (s.lang)    localStorage.setItem('amigo_lang',    s.lang);
  }

  await saveUserData();
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
    settings: {
      name:    localStorage.getItem('amigo_name')    || '',
      uni:     localStorage.getItem('amigo_uni')     || '',
      program: localStorage.getItem('amigo_program') || '',
      lang:    localStorage.getItem('amigo_lang')    || 'en',
    },
    updated_at: new Date().toISOString(),
  };
  const { error } = await _supabase
    .from('user_data')
    .upsert(payload, { onConflict: 'user_id' });
  if (error) console.error('Supabase save error:', error.message);
}

function clearLocalData() {
  const keys = ['amigo_items','amigo_todos','amigo_reminders','amigo_folders',
                 'amigo_name','amigo_uni','amigo_program','amigo_lang','amigo_pic'];
  keys.forEach(k => localStorage.removeItem(k));
}