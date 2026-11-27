/* Offline support: keeps the app on the device so it opens and works with no internet.
   App files come from the saved copy first (fast on weak signal); a new version is saved whole when this file changes.
   Papers and notes are PDFs on Pearson's and PMT's own sites. Papers a student saves for offline use (PMT only) are kept in 'ial-pdf' and open through ./offline-pdf?u=<url>. */
const CACHE = 'ial-study-hub-20261127221916';
const IMG = 'ial-img-1';      // PMT picture flashcards, saved as they're viewed or from Settings
const LIB = 'ial-lib';        // sign-in and sync libraries (versioned URLs, so they never go stale)
const FILES = ['./', './index.html', './privacy.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './papers.js', './topicqs.js', './practiceqs.js', './examqs.js', './bee.js', './mathnotes.js', './notes.js', './decks.js', './boundaries.js', './reports.js', './timetable.js', './tips.js', './practicals.js', './keyphrases.js', './roomfx.js', './rooms.js', './weekplan.js', './weeklymail.js', './stretch.js', './comps.js', './oldspec.js', './solutions.js', './deckquiz.js', './schools.js', './i18n.js', './tex.js', './katex/katex.min.js', './katex/katex.min.css', './katex/contrib/mhchem.min.js', './katex/fonts/KaTeX_AMS-Regular.woff2', './katex/fonts/KaTeX_Caligraphic-Bold.woff2', './katex/fonts/KaTeX_Caligraphic-Regular.woff2', './katex/fonts/KaTeX_Fraktur-Bold.woff2', './katex/fonts/KaTeX_Fraktur-Regular.woff2', './katex/fonts/KaTeX_Main-Bold.woff2', './katex/fonts/KaTeX_Main-BoldItalic.woff2', './katex/fonts/KaTeX_Main-Italic.woff2', './katex/fonts/KaTeX_Main-Regular.woff2', './katex/fonts/KaTeX_Math-BoldItalic.woff2', './katex/fonts/KaTeX_Math-Italic.woff2', './katex/fonts/KaTeX_SansSerif-Bold.woff2', './katex/fonts/KaTeX_SansSerif-Italic.woff2', './katex/fonts/KaTeX_SansSerif-Regular.woff2', './katex/fonts/KaTeX_Script-Regular.woff2', './katex/fonts/KaTeX_Size1-Regular.woff2', './katex/fonts/KaTeX_Size2-Regular.woff2', './katex/fonts/KaTeX_Size3-Regular.woff2', './katex/fonts/KaTeX_Size4-Regular.woff2', './katex/fonts/KaTeX_Typewriter-Regular.woff2', './fonts/sarabun-thai-400-normal.woff2', './fonts/sarabun-thai-600-normal.woff2', './fonts/sarabun-thai-700-normal.woff2', './fonts/sarabun-thai-800-normal.woff2'];
const NCACHE = 'ial-notif';   // upcoming reminders, written by the page
const PDF = 'ial-pdf';        // past papers saved for offline use, written by the page
const KEEP = [CACHE, IMG, LIB, NCACHE, PDF];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => !KEEP.includes(k)).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
async function saved(name, req){
  const c = await caches.open(name), hit = await c.match(req, { ignoreSearch: true });
  if (hit) return hit;
  const r = await fetch(req);
  if (r && r.ok) c.put(req, r.clone()).catch(() => {});
  return r;
}
async function offPdf(src){
  const hit = await (await caches.open(PDF)).match(src);
  if (hit) return new Response(hit.body, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'inline' } });
  if (/^https:\/\/pmt\.physicsandmathstutor\.com\//.test(src)) return Response.redirect(src, 302);
  return new Response('<!doctype html><meta name="viewport" content="width=device-width"><p style="font:16px sans-serif;padding:20px">This paper isn’t saved on this device. Connect to the internet to open it.</p>', { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
async function app(req){
  const c = await caches.open(CACHE);
  const root = new URL(self.registration.scope).pathname, path = new URL(req.url).pathname, isApp = path === root || path === root + 'index.html';   // only the app itself falls back to the saved app
  const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' && isApp ? await c.match('./index.html') : null);
  if (hit) return hit;
  try { const r = await fetch(req); if (r && r.ok) c.put(req, r.clone()).catch(() => {}); return r; }
  catch(err){ const fb = req.mode === 'navigate' && isApp ? await c.match('./index.html') : null; if (fb) return fb; throw err; }
}
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin === 'https://www.gstatic.com' && u.pathname.startsWith('/firebasejs/')){ e.respondWith(saved(LIB, req)); return; }
  if (u.origin !== location.origin) return;   // PDFs, Firebase sync and other sites go straight to the network
  if (u.pathname.includes('/__notif/')) return;
  if (u.pathname.endsWith('/offline-pdf')){ e.respondWith(offPdf(u.searchParams.get('u') || '')); return; }
  if (u.pathname.includes('/music/')) return;   // study music streams from the network (range requests); never cached
  if (/\/(th\/)?past-papers\//.test(u.pathname) || /\/(sitemap\.xml|robots\.txt|404\.html)$/.test(u.pathname)) return;   // web pages for search engines: always fresh from the network
  if (u.pathname.includes('/deckimg/')){ e.respondWith(saved(IMG, req)); return; }
  e.respondWith(app(req));
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
