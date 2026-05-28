const CACHE = 'amigo-v4';
const ASSETS = ['/', '/index.html', '/app.js', '/auth.js', '/style.css', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
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

  // External CDN (fonts, icons): network first, cache as fallback
  if (url.origin !== self.location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Local files: cache first, then network
  e.respondWith(
    caches.match(e.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res.ok && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
      .catch(() => caches.match('/index.html'))
  );
});