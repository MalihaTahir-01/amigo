const CACHE = 'amigo-v13';
const ASSETS = ['/', '/index.html', '/app.js', '/auth.js', '/style.css', '/manifest.json', '/icon-192.png', '/icon-512.png'];
// Libraries loaded from a CDN. The app can't start without the Supabase one
// (auth.js uses it immediately), so they are saved at install time, not just
// "whenever they happen to be fetched". Best-effort: one failing never blocks install.
const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css',
];

// fetch() that gives up after `ms` — on a Wi-Fi with no real internet a request
// can hang for a very long time instead of failing, which froze the whole app.
function fetchWithTimeout(req, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    fetch(req).then(
      res => { clearTimeout(timer); resolve(res); },
      err => { clearTimeout(timer); reject(err); }
    );
  });
}
// Opaque responses (plain <script src> from a CDN) have ok === false and
// status 0, so the old "res.ok && res.status === 200" check never cached them.
function isCacheable(res) {
  return res && ((res.ok && res.status === 200) || res.type === 'opaque');
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS).then(() =>
        Promise.all(CDN_ASSETS.map(u => c.add(new Request(u, { mode: 'cors' })).catch(() => {})))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) { data = { title: 'Amigo', body: e.data ? e.data.text() : '' }; }
  const title = data.title || 'Amigo';
  const options = {
    body: data.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.tag || 'amigo-reminder',
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      for (const c of clients) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Skip non-GET requests completely
  if (e.request.method !== 'GET') return;

  // Skip Supabase — must go directly to network, no caching ever
  if (url.hostname.includes('supabase.co')) return;

  // Skip EmailJS
  if (url.hostname.includes('emailjs.com')) return;

  // Skip Google APIs
  if (url.hostname.includes('googleapis.com')) return;
  if (url.hostname.includes('google.com')) return;

  // Everything else (the app's own files AND the CDN libraries):
  // STALE-WHILE-REVALIDATE. The saved copy is shown instantly — no waiting on
  // the network, which is what made the app take 2-4 seconds to open on slow
  // Wi-Fi — and a fresh copy is downloaded quietly in the background for the
  // next launch. The very first visit (nothing saved yet) still uses the network.
  // To push an update to phones faster, bump CACHE at the top of this file.
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetchWithTimeout(e.request, 8000)
        .then(res => {
          if (isCacheable(res)) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => null);
      if (cached) {
        e.waitUntil(network); // keep refreshing in the background
        return cached;
      }
      return network.then(res => res || caches.match('/index.html') || Response.error());
    })
  );
});