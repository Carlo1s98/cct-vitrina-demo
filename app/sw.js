/* Service worker mínimo: deja la app usable sin conexión (demo) */
const C = 'vitrina-demo-v1';
const SHELL = ['./', './index.html', './editorial.html', './moderna.html', './qrcode.min.js', './prev_editorial.jpg', './prev_moderna.jpg', './icon-192.png', './img/CamaraComercioAraucania-01.png', './img/logo-camara-2025-blanco.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const cp = res.clone(); caches.open(C).then(c => c.put(e.request, cp)); return res; })));
});
