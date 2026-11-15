/* Offline support: keeps the app's own files on the device. Papers and notes (PDFs on other sites) still need internet. */
const CACHE = 'ial-study-hub-20261115214250';
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './papers.js', './topicqs.js', './notes.js', './decks.js', './boundaries.js', './reports.js', './timetable.js', './tips.js', './practicals.js', './keyphrases.js', './oldspec.js', './solutions.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // PDFs and other sites go straight to the network
  // Network first (so updates arrive), falling back to the saved copy when offline.
  e.respondWith(fetch(e.request).then(r => { if (r && r.ok){ const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || caches.match('./index.html'))));
});
