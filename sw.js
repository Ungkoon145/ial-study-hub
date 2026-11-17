/* Offline support: keeps the app's own files on the device. Papers and notes (PDFs on other sites) still need internet. */
const CACHE = 'ial-study-hub-20261117215322';
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './papers.js', './topicqs.js', './notes.js', './decks.js', './boundaries.js', './reports.js', './timetable.js', './tips.js', './practicals.js', './keyphrases.js', './oldspec.js', './solutions.js', './deckquiz.js', './schools.js', './i18n.js', './fonts/sarabun-thai-400-normal.woff2', './fonts/sarabun-thai-600-normal.woff2', './fonts/sarabun-thai-700-normal.woff2', './fonts/sarabun-thai-800-normal.woff2'];
const NCACHE = 'ial-notif';   // upcoming reminders, written by the page
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== NCACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // PDFs and other sites go straight to the network
  // Network first (so updates arrive), falling back to the saved copy when offline.
  e.respondWith(fetch(e.request).then(r => { if (r && r.ok){ const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || caches.match('./index.html'))));
});

/* Reminders: show the ones that are due. The list is written by the page; nothing is fetched from a server. */
async function notifDue(){
  const c = await caches.open(NCACHE), get = async k => { const r = await c.match('./__notif/' + k); return r ? r.json() : null; };
  const plan = (await get('plan')) || [], sent = (await get('sent')) || {}, now = Date.now(); let changed = false;
  for (const x of plan){
    if (x.at > now || now - x.at > 12 * 3600e3 || sent[x.id]) continue;
    sent[x.id] = now; changed = true;
    await self.registration.showNotification(x.title, { body: x.body, tag: x.id, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: x.url } });
  }
  if (changed) await c.put('./__notif/sent', new Response(JSON.stringify(sent), { headers: { 'Content-Type': 'application/json' } }));
}
self.addEventListener('periodicsync', e => { if (e.tag === 'ial-remind') e.waitUntil(notifDue()); });
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = self.registration.scope + ((e.notification.data && e.notification.data.url) || '');
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    const c = cs.find(x => 'focus' in x);
    if (c){ if (c.navigate) c.navigate(url).catch(() => {}); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
