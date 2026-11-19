/* ============================================================
   Study rooms (main site only: needs sign-in).
   Public rooms: anyone signed in can join; they share names, focus timers and subjects. No video.
   Camera rooms: joined only with the room's code, by link or by a friend's invitation. Up to 6 people,
   camera off until you turn it on, no microphone, no chat. Video goes directly between browsers
   (WebRTC); the database only passes the connection set-up between the people in the room.
   Data: rooms/{id} = { name, kind: 'public' | 'cam', owner, at, ban: [uid], m: { uid: member } }
         rooms/{id}/sig/{from_to} = { from, to, type, sdp, sess, at }   (camera rooms only)
   Each person may change only their own entry in m; the room's owner may remove people.
   ============================================================ */
const RM_ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const RM_CAM_MAX = 6, RM_PUB_MAX = 30, RM_STALE = 150000, RM_BEAT = 60000;
const RM_REACT = ['👍', '🔥', '☕', '📚', '👋'];
const RM_PUB_NAMES = ['Quiet library', 'Exam season focus', 'Past paper practice', 'Morning focus', 'Night owls', 'Weekend revision', 'Maths', 'Further Maths', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Psychology', 'Computer Science', 'Geography', 'History', 'English'];
const RM_ICE = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }];
const RM = { db: null, room: null, rid: null, unsub: null, sigUnsub: null, list: [], listUnsub: null, listStatus: 'idle', err: '', beat: null, cam: null, camErr: '', pcs: {}, vids: {}, hidden: {}, hello: {}, react: null, busy: false, joinErr: '', create: null, sched: null, noRules: false, leaving: false };

function rmAvailable(){ return typeof ACCT !== 'undefined' && ACCT && FB.user && FB.F; }
function rmUid(){ return FB.user ? FB.user.uid : null; }
function rmCode(n){ let s = ''; crypto.getRandomValues(new Uint8Array(n)).forEach(x => s += RM_ALPHA[x % RM_ALPHA.length]); return s; }
function rmCleanCode(s){ return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/[IOL01]/g, ''); }
function rmPubName(){ const w = String(prof().name || '').trim().split(/\s+/).filter(Boolean); return w.length ? (w[0].slice(0, 16) + (w.length > 1 ? ' ' + w[w.length - 1][0].toUpperCase() + '.' : '')) : 'A student'; }
function rmTodayMin(){ const t = todayStr(); return state.sessions.filter(s => s.d === t).reduce((a, s) => a + s.m, 0); }
function rmFresh(m){ return m && typeof m.at === 'number' && Date.now() - m.at < RM_STALE; }
function rmMembers(room){ const m = (room && room.m) || {}; return Object.keys(m).filter(k => rmFresh(m[k])).map(k => Object.assign({ id: k }, m[k])); }
function rmErrMsg(e){
  const c = String(e && (e.code || e.message) || '');
  if (/permission/.test(c)) { RM.noRules = true; return 'Study rooms aren’t switched on for this site yet.'; }
  if (/unavailable|network|offline/.test(c)) return 'No internet connection. Try again when you’re online.';
  return 'Something went wrong. Please try again.';
}

/* ---------- database adapter (Firestore; a test double can replace it) ---------- */
function rmDb(){
  if (RM.db) return RM.db;
  if (window.__RM_DB__) return RM.db = window.__RM_DB__;
  const F = FB.F, fs = FB.fs, ref = id => F.doc(fs, 'rooms', id);
  RM.db = {
    get: async id => { const s = await F.getDoc(ref(id)); return s.exists() ? s.data() : null; },
    create: (id, d) => F.setDoc(ref(id), d),
    watch: (id, cb, err) => F.onSnapshot(ref(id), s => cb(s.exists() ? s.data() : null), err),
    listPublic: (cb, err) => F.onSnapshot(F.query(F.collection(fs, 'rooms'), F.where('kind', '==', 'public'), F.limit(60)), s => cb(s.docs.map(d => Object.assign({ id: d.id }, d.data()))), err),
    setMe: (id, uid, m) => F.updateDoc(ref(id), new F.FieldPath('m', uid), m),
    dropMember: (id, uid) => F.updateDoc(ref(id), new F.FieldPath('m', uid), F.deleteField()),
    ban: (id, uid) => F.updateDoc(ref(id), new F.FieldPath('m', uid), F.deleteField(), 'ban', F.arrayUnion(uid)),
    remove: id => F.deleteDoc(ref(id)),
    sigSend: (id, d) => F.setDoc(F.doc(fs, 'rooms', id, 'sig', d.from + '_' + d.to), d),
    sigWatch: (id, uid, cb, err) => F.onSnapshot(F.query(F.collection(fs, 'rooms', id, 'sig'), F.where('to', '==', uid)), s => cb(s.docs.map(d => d.data())), err)
  };
  return RM.db;
}

/* ---------- my entry ---------- */
function rmMine(){
  const pub = RM.room && RM.room.kind === 'public', ms = remainMs();
  const st = T.running ? T.phase : (T.remain !== null && T.remain < phaseLen() ? 'paused' : 'idle');
  const sj = SUBJ[state.timerPrefs.subject];
  return { n: pub ? rmPubName() : String(prof().name || 'A student').slice(0, 40), c: avatarColor(), st, end: T.running ? T.endsAt : 0, left: T.running ? 0 : Math.round(ms), ph: T.phase,
    sub: sj ? sj.short : '', min: rmTodayMin(), cam: !pub && !!RM.cam, r: RM.react ? RM.react.e : '', ra: RM.react ? RM.react.at : 0, at: Date.now() };
}
async function rmBeat(){
  if (!RM.rid || !rmUid()) return;
  try { await rmDb().setMe(RM.rid, rmUid(), rmMine()); }
  catch(e){ if (/permission/.test(String(e && (e.code || e.message)))) rmKicked(); }
}
function rmSchedule(){ if (!RM.rid) return; clearTimeout(RM.sched); RM.sched = setTimeout(rmBeat, 400); }

/* ---------- lobby ---------- */
function rmListStart(){
  if (RM.listUnsub || !rmAvailable()) return;
  RM.listStatus = 'loading';
  try {
    RM.listUnsub = rmDb().listPublic(list => { RM.list = list; RM.listStatus = 'live'; rmRefresh(); }, e => { RM.listStatus = 'error'; RM.err = rmErrMsg(e); RM.listUnsub = null; rmRefresh(); });
  } catch(e){ RM.listStatus = 'error'; RM.err = rmErrMsg(e); }
}
function rmListStop(){ if (RM.listUnsub){ try { RM.listUnsub(); } catch(e){} RM.listUnsub = null; } }
async function rmCreate(kind, name){
  if (!rmAvailable() || RM.busy) return;
  RM.busy = true; RM.joinErr = ''; render();
  const id = rmCode(kind === 'cam' ? 8 : 10);
  const room = { name: String(name || '').trim().slice(0, 40) || (kind === 'cam' ? 'Study room' : 'Quiet library'), kind, owner: rmUid(), at: Date.now(), ban: [], m: {} };
  try { await rmDb().create(id, room); RM.busy = false; RM.create = null; await rmJoin(id); }
  catch(e){ RM.busy = false; RM.joinErr = rmErrMsg(e); render(); }
}
async function rmJoin(id, stay){
  id = rmCleanCode(id);
  if (!rmAvailable()) return;
  if (!id){ RM.joinErr = 'Enter the room code.'; render(); return; }
  if (RM.rid === id){ if (!stay) go('rooms'); return; }
  if (RM.rid) await rmLeave(true);
  RM.busy = true; RM.joinErr = ''; render();
  try {
    const room = await rmDb().get(id);
    if (!room){ RM.busy = false; RM.joinErr = 'No room has that code. Check it and try again.'; render(); return; }
    if ((room.ban || []).includes(rmUid())){ RM.busy = false; RM.joinErr = 'You can’t join this room.'; render(); return; }
    const n = rmMembers(room).filter(m => m.id !== rmUid()).length;
    if (n >= (room.kind === 'cam' ? RM_CAM_MAX : RM_PUB_MAX)){ RM.busy = false; RM.joinErr = 'This room is full.'; render(); return; }
    RM.rid = id; RM.room = Object.assign({ id }, room); RM.hidden = {}; RM.hello = {};
    await rmDb().setMe(id, rmUid(), rmMine());
    RM.unsub = rmDb().watch(id, d => rmOnRoom(d), e => { RM.err = rmErrMsg(e); rmRefresh(); });
    if (room.kind === 'cam') RM.sigUnsub = rmDb().sigWatch(id, rmUid(), rmOnSig, () => {});
    clearInterval(RM.beat); RM.beat = setInterval(rmBeat, RM_BEAT); RM.joinedAt = Date.now();
    if (room.kind === 'cam') setTimeout(() => { if (RM.rid === id && RM.room) rmSyncPeers(); }, 6500);
    RM.busy = false; try { localStorage.setItem('ial-room', id); } catch(e){}
    if (room.kind === 'cam') frSchedule();
    if (stay) render(); else go('rooms');
  } catch(e){ RM.busy = false; RM.rid = null; RM.room = null; RM.joinErr = rmErrMsg(e); render(); }
}
async function rmLeave(quiet){
  const id = RM.rid, uid = rmUid(); if (!id) return;
  RM.leaving = true;
  try { rmxStopAll(); } catch(e){} RM.panel = null;
  if (RM.full){ RM.full = false; try { if (document.fullscreenElement) document.exitFullscreen(); } catch(e){} const fe = document.getElementById('rmfull'); if (fe) fe.remove(); document.body.classList.remove('rmfulling'); }
  rmCamOff(true); Object.keys(RM.pcs).forEach(rmClosePc);
  if (RM.unsub){ try { RM.unsub(); } catch(e){} } if (RM.sigUnsub){ try { RM.sigUnsub(); } catch(e){} }
  clearInterval(RM.beat); clearTimeout(RM.sched);
  const wasCam = RM.room && RM.room.kind === 'cam';
  RM.unsub = RM.sigUnsub = null; RM.rid = null; RM.room = null; RM.react = null; RM.vids = {};
  try { localStorage.removeItem('ial-room'); } catch(e){}
  try { await rmDb().dropMember(id, uid); } catch(e){}
  RM.leaving = false;
  if (wasCam) frSchedule();
  if (!quiet) render();
}
function rmKicked(){ const name = RM.room ? RM.room.name : ''; rmLeave(true).then(() => { toast('You’re no longer in ' + (name || 'the room') + '.'); render(); }); }
function rmOnRoom(d){
  if (!RM.rid) return;
  if (!d){ toast('This room was closed.'); rmLeave(); return; }
  if ((d.ban || []).includes(rmUid())){ rmKicked(); return; }
  RM.room = Object.assign({ id: RM.rid }, d);
  if (!d.m || !d.m[rmUid()]) rmBeat();
  if (RM.room.kind === 'cam') rmSyncPeers();
  if (RM.room.owner === rmUid()) rmTidy();
  rmRefresh();
}
function rmTidy(){
  // the owner clears out people who closed the page without leaving (no heartbeat for 10 minutes)
  const m = RM.room.m || {}; Object.keys(m).forEach(k => { if (k !== rmUid() && m[k] && Date.now() - (m[k].at || 0) > 600000) rmDb().dropMember(RM.rid, k).catch(() => {}); });
}
async function rmRemove(uid){
  if (!RM.room || RM.room.owner !== rmUid() || uid === rmUid()) return;
  const n = (RM.room.m[uid] || {}).n || 'this person';
  if (!confirm('Remove ' + n + ' from this room? They won’t be able to join it again.')) return;
  try { await rmDb().ban(RM.rid, uid); rmClosePc(uid); } catch(e){ toast(rmErrMsg(e)); }
}
async function rmDelete(){
  if (!RM.room || RM.room.owner !== rmUid()) return;
  if (!confirm('Close this room for everyone?')) return;
  const id = RM.rid; await rmLeave(true);
  try { await rmDb().remove(id); } catch(e){}
  render();
}
function rmReact(e){ if (!RM_REACT.includes(e)) return; RM.react = { e, at: Date.now() }; rmBeat(); render(); setTimeout(() => { if (RM.react && Date.now() - RM.react.at >= 8000){ RM.react = null; rmBeat(); } }, 8200); }

/* ---------- camera ---------- */
async function rmCamOn(){
  if (!RM.room || RM.room.kind !== 'cam' || RM.cam) return;
  RM.camErr = '';
  try {
    RM.cam = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 480 }, height: { ideal: 360 }, frameRate: { ideal: 15, max: 20 }, facingMode: 'user' }, audio: false });
  } catch(e){
    RM.camErr = /NotAllowed|Permission/.test(String(e && e.name)) ? 'Camera permission was blocked. Allow the camera for this site in your browser settings, then try again.' : 'No camera found, or another app is using it.';
    render(); return;
  }
  const tr = RM.cam.getVideoTracks()[0];
  Object.values(RM.pcs).forEach(p => { if (p.tx) p.tx.sender.replaceTrack(tr).catch(() => {}); });
  rmBeat(); render();
}
function rmCamOff(quiet){
  if (!RM.cam) return;
  RM.cam.getTracks().forEach(t => t.stop()); RM.cam = null;
  Object.values(RM.pcs).forEach(p => { if (p.tx) p.tx.sender.replaceTrack(null).catch(() => {}); });
  if (!quiet){ rmBeat(); render(); }
}

/* ---------- WebRTC: one connection per pair; the lower uid makes the offer ---------- */
function rmClosePc(uid){ const p = RM.pcs[uid]; if (!p) return; try { p.pc.close(); } catch(e){} delete RM.pcs[uid]; delete RM.vids[uid]; }
function rmNewPc(uid, sess){
  rmClosePc(uid);
  const pc = new RTCPeerConnection({ iceServers: RM_ICE });
  const p = RM.pcs[uid] = { pc, sess, tx: null, state: 'connecting', made: Date.now(), tries: (RM.pcs[uid] && RM.pcs[uid].tries) || 0 };
  pc.ontrack = ev => { const v = rmVideo(uid); v.srcObject = ev.streams[0] || new MediaStream([ev.track]); v.play().catch(() => {}); rmPlace(); };
  pc.onconnectionstatechange = () => {
    p.state = pc.connectionState;
    if (pc.connectionState === 'failed' && rmUid() < uid && p.tries < 3 && RM.pcs[uid] === p){ p.tries++; setTimeout(() => { if (RM.pcs[uid] === p) rmOffer(uid, p.tries); }, 3000); }
    rmRefresh();
  };
  return p;
}
function rmGather(pc){
  return new Promise(res => {
    if (pc.iceGatheringState === 'complete') return res();
    const t = setTimeout(res, 3000);
    pc.addEventListener('icegatheringstatechange', () => { if (pc.iceGatheringState === 'complete'){ clearTimeout(t); res(); } });
  });
}
async function rmOffer(uid, tries){
  const sess = rmCode(6), p = rmNewPc(uid, sess); p.tries = tries || 0;
  p.tx = p.pc.addTransceiver('video', { direction: 'sendrecv' });
  if (RM.cam) await p.tx.sender.replaceTrack(RM.cam.getVideoTracks()[0]);
  await p.pc.setLocalDescription(await p.pc.createOffer());
  await rmGather(p.pc);
  if (RM.pcs[uid] !== p || !RM.rid) return;
  try { await rmDb().sigSend(RM.rid, { from: rmUid(), to: uid, type: 'offer', sdp: p.pc.localDescription.sdp, sess, at: Date.now() }); } catch(e){ p.state = 'failed'; }
}
async function rmOnSig(list){
  if (!RM.room || RM.room.kind !== 'cam') return;
  const live = new Set(rmMembers(RM.room).map(m => m.id));
  for (const s of list){
    if (!s || s.to !== rmUid() || !live.has(s.from) || Date.now() - (s.at || 0) > 120000) continue;
    const p = RM.pcs[s.from];
    if (s.type === 'hello' && rmUid() < s.from){ if (!p || (s.at || 0) > p.made) rmOffer(s.from); continue; }
    if (s.type === 'offer' && rmUid() > s.from){
      if (p && p.sess === s.sess) continue;
      const q = rmNewPc(s.from, s.sess);
      try {
        await q.pc.setRemoteDescription({ type: 'offer', sdp: s.sdp });
        q.tx = q.pc.getTransceivers()[0]; if (q.tx){ q.tx.direction = 'sendrecv'; if (RM.cam) await q.tx.sender.replaceTrack(RM.cam.getVideoTracks()[0]); }
        await q.pc.setLocalDescription(await q.pc.createAnswer());
        await rmGather(q.pc);
        if (RM.pcs[s.from] !== q || !RM.rid) continue;
        await rmDb().sigSend(RM.rid, { from: rmUid(), to: s.from, type: 'answer', sdp: q.pc.localDescription.sdp, sess: s.sess, at: Date.now() });
      } catch(e){ q.state = 'failed'; }
    } else if (s.type === 'answer' && p && p.sess === s.sess && p.pc.signalingState === 'have-local-offer'){
      try { await p.pc.setRemoteDescription({ type: 'answer', sdp: s.sdp }); } catch(e){ p.state = 'failed'; }
    }
  }
}
function rmSyncPeers(){
  const me = rmUid(), live = rmMembers(RM.room).filter(m => m.id !== me);
  const ids = new Set(live.map(m => m.id));
  Object.keys(RM.pcs).forEach(k => { if (!ids.has(k)) rmClosePc(k); });
  live.forEach(m => {
    if (RM.pcs[m.id]) return;
    if (me < m.id) rmOffer(m.id);
    else if (Date.now() - RM.joinedAt > 6000 && (!RM.hello[m.id] || Date.now() - RM.hello[m.id] > 20000)){ RM.hello[m.id] = Date.now(); rmDb().sigSend(RM.rid, { from: me, to: m.id, type: 'hello', sess: '', sdp: '', at: Date.now() }).catch(() => {}); }
  });
}
function rmVideo(uid){
  let v = RM.vids[uid];
  if (!v){ v = RM.vids[uid] = document.createElement('video'); v.autoplay = true; v.playsInline = true; v.muted = true; v.setAttribute('playsinline', ''); v.className = 'rmv'; }
  return v;
}
function rmPlace(){
  (document.getElementById('rmfull') || document).querySelectorAll('[data-rmvid]').forEach(slot => {
    const uid = slot.dataset.rmvid;
    let v = null;
    if (uid === 'me'){ if (RM.cam){ v = rmVideo('me'); if (v.srcObject !== RM.cam) v.srcObject = RM.cam; v.classList.add('mirror'); } }
    else if (RM.vids[uid] && RM.room && (RM.room.m[uid] || {}).cam && !RM.hidden[uid]) v = RM.vids[uid];
    if (v){ if (v.parentNode !== slot){ slot.textContent = ''; slot.appendChild(v); } v.play().catch(() => {}); slot.classList.add('on'); }
    else slot.classList.remove('on');
  });
}

/* ---------- views ---------- */
function rmRefresh(){ const a = document.activeElement; if (route() === 'rooms' && !(a && /INPUT|TEXTAREA|SELECT/.test(a.tagName))) render(); else rmBar(); }
function rmClock(m){
  if (m.st === 'focus' || m.st === 'break') return '<span class="rmclk" data-end="' + (+m.end || 0) + '">' + fmtClock(Math.max(0, (+m.end || 0) - Date.now())) + '</span>';
  if (m.st === 'paused') return '<span class="rmclk">' + fmtClock(+m.left || 0) + '</span>';
  return '';
}
function rmStatus(m){ return m.st === 'focus' ? 'Focusing' : m.st === 'break' ? 'On a break' : m.st === 'paused' ? 'Paused' : 'Here'; }
function rmTile(m, me){
  const cam = RM.room.kind === 'cam', owner = RM.room.owner === rmUid(), react = m.r && Date.now() - (m.ra || 0) < 8000 ? m.r : '';
  const av = '<span class="avatar" aria-hidden="true" style="width:56px;height:56px;background:' + esc(/^#[0-9a-fA-F]{6}$/.test(m.c) ? m.c : '#4b5a70') + ';font-size:22px">' + esc(initials(m.n) || '?') + '</span>';
  return '<div class="rmtile st-' + esc(m.st || 'idle') + (me ? ' me' : '') + '">' +
    (cam ? '<div class="rmcam" data-rmvid="' + (me ? 'me' : esc(m.id)) + '">' + av + '</div>' : '<div class="rmcam nocam">' + av + '</div>') +
    (react ? '<span class="rmreact" aria-label="Reaction">' + esc(react) + '</span>' : '') +
    '<div class="rmmeta"><div class="t"><b>' + esc(m.n || 'A student') + '</b>' + (me ? ' <span class="small muted">(you)</span>' : '') + '</div>' +
      '<div class="small rmst"><span>' + rmStatus(m) + '</span> ' + rmClock(m) + '</div>' +
      '<div class="small muted">' + (m.sub ? esc(m.sub) + ' · ' : '') + '<span>' + fmtMin(+m.min || 0) + ' today</span></div>' +
      (!me && cam && m.cam && RM.pcs[m.id] && RM.pcs[m.id].state === 'failed' ? '<div class="small muted">Video couldn’t connect on this network.</div>' : '') +
      (!me && (cam || owner) ? '<div class="row rmown">' + (cam && m.cam ? '<button class="linkbtn small" data-act="rm-hide" data-id="' + esc(m.id) + '">' + (RM.hidden[m.id] ? 'Show video' : 'Hide video') + '</button>' : '') + (owner ? '<button class="linkbtn small" data-act="rm-kick" data-id="' + esc(m.id) + '">Remove</button>' : '') + '</div>' : '') +
    '</div></div>';
}
function viewRooms(){
  if (!(typeof ACCT !== 'undefined' && ACCT)){
    return '<div class="stack">' + '<div><h1>Study rooms</h1></div><div class="card stack"><p>Study rooms work on the main IAL Revise site, where you sign in.</p><div class="row"><a class="btn primary" href="https://ungkoon145.github.io/ial-study-hub/#rooms" target="_blank" rel="noopener">Open the main site ↗</a></div></div></div>';
  }
  if (!FB.user) return '<div class="stack">' + '<div><h1>Study rooms</h1></div><div class="card"><p>Sign in to join study rooms.</p></div></div>';
  return RM.rid && RM.room ? viewRoom() : viewLobby();
}
function rmTools(){
  const snd = rmxAny();
  return '<div class="row rmtools">' +
    '<button class="rmglass rmtool" data-act="rm-panel" data-v="view" aria-pressed="' + (RM.panel === 'view') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/></svg><span>View</span></button>' +
    '<button class="rmglass rmtool' + (snd ? ' live' : '') + '" data-act="rm-panel" data-v="sound" aria-pressed="' + (RM.panel === 'sound') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg><span>Sounds</span></button>';
}
function rmLobbyStage(){
  const P = rmvPrefs(), sc = RMV_SCENES.some(x => x[0] === P.scene) ? P.scene : 'library', lay = P.layout === 'grid' ? 'grid' : 'focus';
  return '<section class="rmstage lay-lobby" aria-label="Study rooms"><div class="rmscene-slot" data-rmscene="' + sc + '"></div><div class="rmshade"></div><div class="rmstage-in">' +
    '<div><h1 class="rmname">Study rooms</h1><p class="rmsub"><span>Study alongside other students with a shared focus timer.</span> <span>Public rooms show names and timers only. Camera rooms are for people you invite.</span></p></div>' +
    '<div class="rmbottom"><div class="row rmlobbyctl"><button class="btn primary" data-act="rm-new" data-v="public">New public room</button><button class="btn rmglass" data-act="rm-new" data-v="cam">New camera room</button></div>' + rmTools() + '</div></div>' +
  '</section>' + rmPanel(sc, lay);
}
function viewLobby(){
  rmListStart();
  const live = RM.list.map(r => Object.assign({}, r, { n: rmMembers(r).length })).filter(r => r.n > 0 || r.owner === rmUid()).sort((a, b) => b.n - a.n || (b.at || 0) - (a.at || 0)).slice(0, 30);
  const inv = rmInvites();
  const c = RM.create;
  const createCard = !c ? '<div class="row"><button class="btn primary" data-act="rm-new" data-v="public">New public room</button><button class="btn" data-act="rm-new" data-v="cam">New camera room</button></div>' :
    '<form class="card stack rmform" data-form="rm-create"><input type="hidden" name="kind" value="' + c.kind + '"><h2>' + (c.kind === 'cam' ? 'New camera room' : 'New public room') + '</h2>' +
      (c.kind === 'cam'
        ? '<label class="f">Room name<input name="name" maxlength="30" autocomplete="off" placeholder="e.g. Koon’s maths room"></label><p class="small muted">Only people you give the code to, or friends you invite, can join. Up to 6 people. Cameras start off, and there’s no microphone or chat.</p>'
        : '<label class="f">Room name<select name="name">' + RM_PUB_NAMES.map(n => '<option>' + esc(n) + '</option>').join('') + '</select></label><p class="small muted">Anyone signed in can join. People see your first name, your focus timer and subject. No video, no chat.</p>') +
      '<div class="row"><button class="btn primary" type="submit"' + (RM.busy ? ' disabled' : '') + '>Create and join</button><button class="btn ghost" type="button" data-act="rm-new" data-v="">Cancel</button></div></form>';
  return '<div class="stack">' +
    rmLobbyStage() +
    (RM.noRules ? '<div class="card warnline" role="alert"><p>Study rooms aren’t switched on for this site yet.</p></div>' : '') +
    (inv.length ? '<div class="card stack"><h2>Invitations from friends</h2>' + inv.map(x => '<div class="li"><div class="grow"><div class="t"><b>' + esc(x.from) + '</b></div><div class="small muted">' + esc(x.name) + ' · <span>camera room</span></div></div><button class="btn sm primary" data-act="rm-join" data-v="' + esc(x.id) + '">Join</button></div>').join('') + '</div>' : '') +
    '<div class="card stack"><h2>Join with a code</h2><form class="row" data-form="rm-join" style="align-items:flex-end"><label class="f" style="flex:1;min-width:160px">Room code<input name="code" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="e.g. K7QM 2XPA"></label><button class="btn primary" type="submit"' + (RM.busy ? ' disabled' : '') + '>Join</button></form>' +
      (RM.joinErr ? '<p class="small warnline" role="alert">' + esc(RM.joinErr) + '</p>' : '') + '</div>' +
    (c ? createCard : '') +
    '<div class="card stack"><div class="card-h"><h2>Public rooms</h2><span class="small muted">' + live.reduce((a, r) => a + r.n, 0) + ' studying</span></div>' +
      (RM.listStatus === 'loading' ? '<p class="muted">Loading rooms…</p>' : RM.listStatus === 'error' ? '<p class="muted">' + esc(RM.err || 'Couldn’t load rooms.') + '</p>' :
        live.length ? '<div class="list">' + live.map(r => '<div class="li"><div class="grow"><div class="t"><b>' + esc(r.name) + '</b></div><div class="small muted">' + r.n + ' <span>' + (r.n === 1 ? 'person' : 'people') + '</span>' + (r.owner === rmUid() ? ' · <span>your room</span>' : '') + '</div></div><button class="btn sm' + (r.n ? ' primary' : '') + '" data-act="rm-join" data-v="' + esc(r.id) + '"' + (r.n >= RM_PUB_MAX ? ' disabled' : '') + '>' + (r.n >= RM_PUB_MAX ? 'Full' : 'Join') + '</button></div>').join('') + '</div>'
        : '<div class="empty">No one is in a public room right now. Start one and others can join you.</div>') + '</div>' +
    '<details class="howto"><summary>Safety in study rooms</summary><ul class="small">' +
      '<li>Public rooms never show video. Other students there see your first name and last initial, your timer, your subject and your minutes today.</li>' +
      '<li>Cameras only work in camera rooms, which can only be joined with the room’s code. Share the code only with people you know.</li>' +
      '<li>Your camera is off until you turn it on, and it turns off when you leave the room page. Pointing it at your desk works just as well.</li>' +
      '<li>There’s no microphone and no chat. Anyone can still take a screenshot, so don’t show anything you wouldn’t want shared.</li>' +
      '<li>The person who made a room can remove anyone from it. You can hide anyone’s video on your screen.</li></ul></details>' +
  '</div>';
}
function rmPanel(sc, lay){
  const P = rmvPrefs(), snd = rmxAny();
  return RM.panel === 'view' ? '<div class="card stack rmpanel"><div class="card-h"><h2>Your view</h2><span class="small muted">Only you see it</span></div><div class="rmswatches" role="group" aria-label="Your view">' +
      RMV_SCENES.map(([id, n]) => '<button class="rmswatch" data-act="rm-scene" data-v="' + id + '" aria-pressed="' + (id === sc) + '">' + rmvSwatch(id) + '<span>' + n + '</span></button>').join('') + '</div>' +
      '<div class="row" style="align-items:center;gap:10px"><span class="small muted">Layout</span><div class="chips" role="group" aria-label="Layout"><button class="chip" data-act="rm-layout" data-v="focus" aria-pressed="' + (lay === 'focus') + '">Focus</button><button class="chip" data-act="rm-layout" data-v="grid" aria-pressed="' + (lay === 'grid') + '">Grid</button></div></div></div>'
    : RM.panel === 'sound' ? '<div class="card stack rmpanel"><div class="card-h"><h2>Sounds</h2><span class="small muted">Only you hear them</span></div><div class="rmsounds">' +
      RMX_SOUNDS.map(([id, ic, n]) => { const on = rmxOn(id), v = Math.round((P.mix[id] == null ? .7 : P.mix[id]) * 100); return '<div class="rmsnd' + (on ? ' on' : '') + '"><button class="rmsndbtn" data-act="rm-snd" data-v="' + id + '" aria-pressed="' + on + '"><span class="ic" aria-hidden="true">' + ic + '</span><span>' + n + '</span></button>' + (on ? '<input type="range" min="0" max="100" value="' + v + '" data-rmvol="' + id + '" aria-label="' + n + ' volume">' : '') + '</div>'; }).join('') + '</div>' +
      '<label class="row rmmaster"><span class="small muted">Volume</span><input type="range" min="0" max="100" value="' + Math.round(P.vol * 100) + '" data-rmvol="master" aria-label="Volume"></label>' +
      (snd ? '<div class="row"><button class="btn sm ghost" data-act="rm-snd-off">Stop all sounds</button></div>' : '') +
      '<p class="small muted" style="margin:0">Made by your device as you listen, so they work offline. They keep playing if you switch tabs, until you stop them or leave a room.</p></div>' : '';
}
function viewRoom(){
  const r = RM.room, cam = r.kind === 'cam', me = rmUid(), mem = rmMembers(r), P = rmvPrefs();
  if (!mem.find(m => m.id === me)) mem.unshift(Object.assign({ id: me }, rmMine()));
  mem.sort((a, b) => (a.id === me ? -1 : b.id === me ? 1 : (a.n || '').localeCompare(b.n || '')));
  const ms = remainMs(), link = location.origin + location.pathname + '#join-' + r.id;
  const frOk = cam && typeof frOn === 'function' && frOn() && frLists().friends.length;
  const sc = RMV_SCENES.some(x => x[0] === P.scene) ? P.scene : 'library', lay = P.layout === 'grid' ? 'grid' : 'focus';
  const focusing = mem.filter(m => m.st === 'focus').length, snd = rmxAny();
  const panel = rmPanel(sc, lay);
  return '<div class="stack rmroom">' +
    '<section class="rmstage lay-' + lay + (cam ? ' cam' : '') + '" aria-label="' + esc(r.name) + '"><div class="rmscene-slot" data-rmscene="' + sc + '"></div><div class="rmshade"></div>' +
      '<div class="rmstage-in">' +
        '<div class="rmtop"><div style="min-width:0"><h1 class="rmname">' + esc(r.name) + '</h1><div class="rmsub"><span>' + (cam ? 'Camera room · invite only' : 'Public room · no video') + '</span> · ' + mem.length + '/' + (cam ? RM_CAM_MAX : RM_PUB_MAX) + '</div></div>' +
          '<button class="btn rmglass" data-act="rm-leave">Leave</button></div>' +
        '<div class="rmcenter"><div class="rmphase' + (T.phase === 'break' ? ' brk' : '') + '">' + (T.phase === 'focus' ? 'Focus' : 'Break') + '</div>' +
          '<div class="rmbig" id="rmclock">' + fmtClock(ms) + '</div>' +
          '<div class="rmnow">' + (focusing ? '<span>' + focusing + ' focusing now</span>' : '<span>Start the timer to focus together</span>') + '</div>' +
          '<div class="row rmctl">' + (T.running ? '<button class="btn primary big" data-act="t-pause">Pause</button>' : '<button class="btn primary big" data-act="t-start">' + (ms < phaseLen() ? 'Resume' : 'Start focus') + '</button>') +
            (T.phase === 'focus' ? '<button class="btn big rmglass" data-act="t-stoplog"' + (ms < phaseLen() ? '' : ' disabled') + '>Stop &amp; log</button>' : '<button class="btn big rmglass" data-act="t-skip">Skip break</button>') + '</div></div>' +
        '<div class="rmbottom"><div class="row rmreacts" role="group" aria-label="Reactions">' + RM_REACT.map(e => '<button class="rmglass rmre" data-act="rm-react" data-v="' + e + '" aria-label="React ' + e + '">' + e + '</button>').join('') + '</div>' +
          rmTools() + '<button class="rmglass rmtool" data-act="rm-full" aria-label="Full screen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6"/></svg><span>Full screen</span></button>' +
            (cam ? '<button class="rmglass rmtool' + (RM.cam ? ' live' : '') + '" data-act="' + (RM.cam ? 'rm-cam-off' : 'rm-cam-on') + '" aria-pressed="' + !!RM.cam + '" aria-label="' + (RM.cam ? 'Turn camera off' : 'Turn camera on') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>' + (RM.cam ? '' : '<path d="M3 3l18 18"/>') + '</svg><span>Camera</span></button>' : '') +
          '</div></div>' +
      '</div></section>' +
    (RM.camErr ? '<p class="small warnline" role="alert">' + esc(RM.camErr) + '</p>' : '') +
    panel +
    (cam ? '<div class="card stack rminvite"><div class="row" style="justify-content:space-between;align-items:center"><div><div class="small muted">Room code</div><div class="rmcode notr">' + esc(r.id.slice(0, 4) + ' ' + r.id.slice(4)) + '</div></div>' +
      '<div class="row"><button class="btn sm" data-act="rm-copy" data-v="' + esc(link) + '">Copy invite link</button></div></div>' +
      (frOk ? '<label class="row small" style="gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-act="rm-frinv"' + (state.rmInvite ? ' checked' : '') + '> <span>Invite my friends to this room</span></label>' : '') +
      '<p class="small muted">Share the code only with people you know.</p></div>' : '') +
    '<div class="card-h rmpeopleh"><h2>In this room</h2><span class="small muted">' + mem.length + '</span></div>' +
    '<div class="rmgrid lay-' + lay + (cam ? ' cam' : '') + '">' + mem.map(m => rmTile(m, m.id === me)).join('') + '</div>' +
    (r.owner === me ? '<div class="row"><button class="btn ghost sm" data-act="rm-close">Close this room for everyone</button></div>' : '') +
    '<p class="small muted">' + (cam ? 'No microphone and no chat. Your camera turns off when you leave this page.' : 'Others see your first name and last initial, your timer, your subject and your minutes today.') + '</p>' +
  '</div>';
}
function rmInvites(){
  if (typeof FR === 'undefined' || !FR.peers) return [];
  const f = frState(), out = [];
  Object.keys(FR.peers).forEach(id => { const p = FR.peers[id]; if (f.friends[id] && p.rm && p.rm.id && p.rm.id !== RM.rid) out.push({ from: p.n || 'A friend', id: p.rm.id, name: p.rm.n || 'Study room' }); });
  return out;
}
function rmForFriends(){ return RM.rid && RM.room && RM.room.kind === 'cam' && state.rmInvite ? { id: RM.rid, n: String(RM.room.name || '').slice(0, 40) } : null; }
function rmTick(){
  document.querySelectorAll('.rmclk[data-end]').forEach(el => { const e = +el.dataset.end; if (e) el.textContent = fmtClock(Math.max(0, e - Date.now())); });
  const c = document.getElementById('rmclock'); if (c) c.textContent = fmtClock(remainMs());
  rmFullTick();
}
function rmBar(){
  let b = document.getElementById('rmbar');
  const show = RM.rid && RM.room && route() !== 'rooms';
  if (!show){ if (b) b.remove(); return; }
  if (!b){ b = document.createElement('div'); b.id = 'rmbar'; b.className = 'rmbar'; document.body.appendChild(b); }
  const n = rmMembers(RM.room).length;
  const html = '<a href="#rooms" data-act="rm-back"><b>' + esc(RM.room.name) + '</b> <span>· ' + n + ' studying</span></a><button class="linkbtn" data-act="rm-leave">Leave</button>';
  if (b.dataset.h !== html){ b.dataset.h = html; b.innerHTML = html; if (typeof isTH === 'function' && isTH()) try { thApply(b); } catch(e){} }
}
const RMV_NODE = {};
const RMV_EPOCH = performance.now();
function rmvMount(){
  const slot = document.querySelector('#rmfull [data-rmscene]') || document.querySelector('[data-rmscene]'); if (!slot) return;
  const id = slot.dataset.rmscene, reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let el = RMV_NODE[id];
  if (!el){
    el = RMV_NODE[id] = document.createElement('div'); el.className = 'rmscene sc-' + id + ' fresh'; el.innerHTML = rmvScene(id);
    setTimeout(() => el.classList.remove('fresh'), 2600);   // the one-shot "arrive" beat plays once per scene
  }
  // One clock for every loop: re-attaching a scene after a redraw carries on where it was, instead of restarting.
  el.style.setProperty('--rmt', -Math.round(performance.now() - RMV_EPOCH) + 'ms');
  if (el.parentNode !== slot){
    const prev = RMV_NODE.last && RMV_NODE.last !== el ? RMV_NODE.last : null;
    slot.textContent = '';
    if (prev && !reduce && prev.dataset.shown){   // a new view crossfades over the old one, never through an empty frame
      prev.classList.remove('rmin'); slot.appendChild(prev); el.classList.add('rmin'); slot.appendChild(el);
      setTimeout(() => { if (prev.parentNode === slot) prev.remove(); el.classList.remove('rmin'); }, 520);
    } else slot.appendChild(el);
  }
  el.dataset.shown = '1'; RMV_NODE.last = el;
  if (typeof rmvWatch === 'function') rmvWatch(el);
}
function rmAfterRender(){
  try { if (RM.full) rmFullRender(); else rmvMount(); } catch(e){}
  if (route() !== 'rooms'){ if (RM.cam){ rmCamOff(true); rmBeat(); } rmListStop(); }
  rmPlace(); rmBar();
}
function rmAct(el){
  const a = el.dataset.act, v = el.dataset.v, id = el.dataset.id;
  switch (a){
    case 'rm-new': RM.create = v ? { kind: v } : null; RM.joinErr = ''; render(); break;
    case 'rm-join': rmJoin(v); break;
    case 'rm-leave': rmLeave(); break;
    case 'rm-back': go('rooms'); break;
    case 'rm-cam-on': rmCamOn(); break;
    case 'rm-cam-off': rmCamOff(); break;
    case 'rm-react': rmReact(v); break;
    case 'rm-hide': RM.hidden[id] = !RM.hidden[id]; render(); break;
    case 'rm-kick': rmRemove(id); break;
    case 'rm-close': rmDelete(); break;
    case 'rm-full': rmFullOpen(); break;
    case 'rm-fexit': rmFullClose(); break;
    case 'rm-freset': rmFullReset(); break;
    case 'rm-fhint': rmvPrefs().fullHint = 1; try { saveLocal(); } catch(e){} rmFullRender(); break;
    case 'rm-fview': { const i = RMV_SCENES.findIndex(x => x[0] === rmvPrefs().scene); rmvPrefs().scene = RMV_SCENES[(i + 1) % RMV_SCENES.length][0]; try { saveLocal(); } catch(e){} rmFullRender(); break; }
    case 'rm-panel': RM.panel = RM.panel === v ? null : v; render(); break;
    case 'rm-scene': rmvPrefs().scene = v; commit(); break;
    case 'rm-layout': rmvPrefs().layout = v; commit(); break;
    case 'rm-snd': if (rmxOn(v)) rmxStop(v); else rmxStart(v); render(); break;
    case 'rm-snd-off': rmxStopAll(); render(); break;
    case 'rm-copy': try { navigator.clipboard.writeText(v).then(() => toast('Invite link copied'), () => prompt('Copy this link', v)); } catch(e){ prompt('Copy this link', v); } break;
    default: return false;
  }
  return true;
}
function rmResume(){
  // after a reload, rejoin the room you were in
  let id = ''; try { id = localStorage.getItem('ial-room') || ''; } catch(e){}
  if (id && !RM.rid && rmAvailable()) rmJoin(id, true);
}
window.addEventListener('pagehide', () => { if (RM.rid && rmUid()) try { rmDb().dropMember(RM.rid, rmUid()); } catch(e){} });

/* ============================================================
   Full screen room: the view fills the screen; the timer and every person's tile (camera or name card)
   float on top and can be dragged anywhere and resized from the corner. Positions are saved per device,
   as percentages of the screen, so they survive rotation and different window sizes.
   ============================================================ */
function rmFullPos(){ const P = rmvPrefs(); P.pos = P.pos || {}; return P.pos; }
function rmFullDefault(key, i){
  const port = innerWidth < innerHeight, ar = innerWidth / innerHeight;
  const hPct = w => w * .75 * ar;                       // a 4:3 tile's height, as % of the screen height
  if (key === 'timer') return port ? { x: 10, y: 7, w: 80 } : { x: 34, y: 6, w: 32 };
  if (key === 'me') { const w = port ? 44 : 22; return { x: 100 - w - 3, y: Math.max(8, 100 - hPct(w) - (port ? 22 : 17)), w }; }
  const w = port ? 44 : 18, col = port ? i % 2 : i % 2, row = Math.floor(i / 2);
  return port ? { x: 4 + col * 48, y: 34 + row * (hPct(w) + 2), w } : { x: 2 + col * (w + 1.5), y: 30 + row * (hPct(w) + 2.5), w };
}
function rmFullGet(key, i){ const p = rmFullPos()[key]; return p && typeof p.x === 'number' ? p : rmFullDefault(key, i); }
function rmFullOpen(){
  if (!RM.room) return;
  RM.full = true; RM.panel = null; rmFullRender();
  const el = document.getElementById('rmfull');
  const req = el && (el.requestFullscreen || el.webkitRequestFullscreen);
  if (req){ try { const r = req.call(el, { navigationUI: 'hide' }); if (r && r.then) r.then(() => { RM.fsReq = true; }, () => {}); else RM.fsReq = true; } catch(e){} }
  rmFullIdle();
}
function rmFullClose(){
  RM.full = false; RM.fsReq = false; RM.drag = null;
  try { if (document.fullscreenElement) document.exitFullscreen(); else if (document.webkitFullscreenElement) document.webkitExitFullscreen(); } catch(e){}
  const el = document.getElementById('rmfull'); if (el) el.remove();
  document.body.classList.remove('rmfulling');
  render();
}
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && RM.full && RM.fsReq) rmFullClose(); });
document.addEventListener('webkitfullscreenchange', () => { if (!document.webkitFullscreenElement && RM.full && RM.fsReq) rmFullClose(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && RM.full && !RM.fsReq) rmFullClose(); });
function rmFullTile(key, i, inner, cls){
  const p = rmFullGet(key, i);
  return '<div class="rmfloat ' + (cls || '') + '" data-fk="' + esc(key) + '" style="left:' + p.x + '%;top:' + p.y + '%;width:' + p.w + '%;--fw:' + p.w + '">' + inner +
    '<span class="rmfres" data-res aria-hidden="true"></span></div>';
}
function rmFullRender(){
  let el = document.getElementById('rmfull');
  if (!RM.full || !RM.rid || !RM.room){ if (el){ el.remove(); document.body.classList.remove('rmfulling'); } return; }
  if (RM.drag) { RM.fullDirty = true; return; }
  const r = RM.room, cam = r.kind === 'cam', me = rmUid(), P = rmvPrefs(), ms = remainMs();
  const sc = RMV_SCENES.some(x => x[0] === P.scene) ? P.scene : 'library';
  const mem = rmMembers(r); if (!mem.find(m => m.id === me)) mem.unshift(Object.assign({ id: me }, rmMine()));
  const others = mem.filter(m => m.id !== me).sort((a, b) => (a.n || '').localeCompare(b.n || '')), mine = mem.find(m => m.id === me);
  const focusing = mem.filter(m => m.st === 'focus').length;
  const card = (m, isMe) => {
    const av = '<span class="avatar" aria-hidden="true" style="background:' + esc(/^#[0-9a-fA-F]{6}$/.test(m.c) ? m.c : '#4b5a70') + '">' + esc(initials(m.n) || '?') + '</span>';
    const react = m.r && Date.now() - (m.ra || 0) < 8000 ? '<span class="rmreact">' + esc(m.r) + '</span>' : '';
    return (cam ? '<div class="rmcam" data-rmvid="' + (isMe ? 'me' : esc(m.id)) + '">' + av + '</div>' : '<div class="rmcam nocam">' + av + '</div>') + react +
      '<div class="rmfname"><b>' + esc(m.n || 'A student') + '</b>' + (isMe ? ' <span>(you)</span>' : '') + ' <span class="rmfst">' + rmStatus(m) + ' ' + rmClock(m) + '</span></div>';
  };
  const html = '<div class="rmscene-slot" data-rmscene="' + sc + '"></div><div class="rmshade"></div>' +
    rmFullTile('timer', 0, '<div class="rmphase' + (T.phase === 'break' ? ' brk' : '') + '">' + (T.phase === 'focus' ? 'Focus' : 'Break') + '</div><div class="rmfclock" id="rmfclock">' + fmtClock(ms) + '</div><div class="rmnow">' + (focusing ? '<span>' + focusing + ' focusing now</span>' : '<span>Start the timer to focus together</span>') + '</div>', 'rmftimer') +
    others.map((m, i) => rmFullTile(m.id, i, card(m, false), 'rmftile' + (cam ? ' cam' : ''))).join('') +
    rmFullTile('me', 0, card(mine, true), 'rmftile me' + (cam ? ' cam' : '')) +
    '<div class="rmfbar" role="toolbar" aria-label="Room controls">' +
      (T.running ? '<button class="rmglass rmtool" data-act="t-pause">Pause</button>' : '<button class="rmglass rmtool rmfgo" data-act="t-start">' + (ms < phaseLen() ? 'Resume' : 'Start focus') + '</button>') +
      (cam ? '<button class="rmglass rmtool' + (RM.cam ? ' live' : '') + '" data-act="' + (RM.cam ? 'rm-cam-off' : 'rm-cam-on') + '" aria-pressed="' + !!RM.cam + '" aria-label="' + (RM.cam ? 'Turn camera off' : 'Turn camera on') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>' + (RM.cam ? '' : '<path d="M3 3l18 18"/>') + '</svg><span>Camera</span></button>' : '') +
      '<button class="rmglass rmtool" data-act="rm-fview" aria-label="Next view"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/></svg><span>' + esc((RMV_SCENES.find(x => x[0] === sc) || ['', 'View'])[1]) + '</span></button>' +
      '<button class="rmglass rmtool" data-act="rm-freset" aria-label="Reset layout"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg><span>Reset layout</span></button>' +
      '<button class="rmglass rmtool" data-act="rm-fexit" aria-label="Exit full screen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6"/></svg><span>Exit</span></button>' +
    '</div>' +
    (P.fullHint ? '' : '<div class="rmfhint" role="status"><span>Drag anything to move it. Drag a corner to resize it.</span> <button class="linkbtn" data-act="rm-fhint">OK</button></div>');
  if (!el){
    el = document.createElement('div'); el.id = 'rmfull'; el.className = 'rmfull'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', r.name);
    document.body.appendChild(el); document.body.classList.add('rmfulling');
    el.addEventListener('pointerdown', rmFullDown); el.addEventListener('pointermove', rmFullIdle); el.addEventListener('click', rmFullIdle);
  }
  el.innerHTML = html;
  if (typeof isTH === 'function' && isTH()) try { thApply(el); } catch(e){}
  try { rmvMount(); } catch(e){}
  rmPlace();
}
function rmFullIdle(){
  const el = document.getElementById('rmfull'); if (!el) return;
  el.classList.remove('idle'); clearTimeout(RM.idleT);
  RM.idleT = setTimeout(() => { const x = document.getElementById('rmfull'); if (x && !RM.drag) x.classList.add('idle'); }, 3500);
}
function rmFullDown(e){
  const t = e.target.closest('.rmfloat'); if (!t || e.target.closest('button, a, input')) return;
  const box = t.getBoundingClientRect(), size = !!e.target.closest('[data-res]');
  RM.drag = { el: t, key: t.dataset.fk, size, sx: e.clientX, sy: e.clientY, x: box.left, y: box.top, w: box.width, id: e.pointerId };
  t.classList.add('dragging'); try { t.setPointerCapture(e.pointerId); } catch(err){}
  t.addEventListener('pointermove', rmFullMove); t.addEventListener('pointerup', rmFullUp); t.addEventListener('pointercancel', rmFullUp);
  e.preventDefault();
}
function rmFullMove(e){
  const d = RM.drag; if (!d || e.pointerId !== d.id) return;
  const W = innerWidth, H = innerHeight, dx = e.clientX - d.sx, dy = e.clientY - d.sy;
  if (d.size){
    const w = Math.max(W * .12, Math.min(W * .95, d.w + dx));
    d.el.style.width = (w / W * 100) + '%'; d.el.style.setProperty('--fw', w / W * 100);
  } else {
    const r = d.el.getBoundingClientRect();
    const x = Math.max(0, Math.min(W - r.width, d.x + dx)), y = Math.max(0, Math.min(H - r.height, d.y + dy));
    d.el.style.left = (x / W * 100) + '%'; d.el.style.top = (y / H * 100) + '%';
  }
}
function rmFullUp(e){
  const d = RM.drag; if (!d) return;
  const t = d.el; t.classList.remove('dragging');
  t.removeEventListener('pointermove', rmFullMove); t.removeEventListener('pointerup', rmFullUp); t.removeEventListener('pointercancel', rmFullUp);
  const pos = rmFullPos(), round = v => Math.round(parseFloat(v) * 10) / 10;
  pos[d.key] = { x: round(t.style.left), y: round(t.style.top), w: round(t.style.width) };
  RM.drag = null; try { saveLocal(); } catch(err){}
  if (RM.fullDirty){ RM.fullDirty = false; rmFullRender(); }
}
function rmFullReset(){
  const el = document.getElementById('rmfull'); rmvPrefs().pos = {}; try { saveLocal(); } catch(e){}
  if (el){ el.classList.add('rmtravel'); setTimeout(() => el.classList.remove('rmtravel'), 420); }
  rmFullRender();
}
function rmFullTick(){ const c = document.getElementById('rmfclock'); if (c) c.textContent = fmtClock(remainMs()); }
