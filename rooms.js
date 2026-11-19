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
    setRoom: (id, patch) => { const o = {}; Object.keys(patch).forEach(k => o[k] = patch[k] === null ? F.deleteField() : patch[k]); return F.updateDoc(ref(id), o); },
    setTally: (id, uid, t) => F.updateDoc(ref(id), new F.FieldPath('tl', uid), t),
    dropTally: (id, uids) => { const args = []; uids.forEach(u => args.push(new F.FieldPath('tl', u), F.deleteField())); return args.length ? F.updateDoc(ref(id), ...args) : null; },
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
    sub: sj ? sj.short : '', min: rmTodayMin(), cam: !pub && !!RM.cam && !RM.camBlocked, r: RM.react ? RM.react.e : '', ra: RM.react ? RM.react.at : 0, at: Date.now() };
}
const _rmMine0 = rmMine;
rmMine = function(){ const m = _rmMine0(); if (RM.room && RM.room.kind === 'cam') m.nv = (RM.nv || []).slice(0, 12); if (RM.rid){ const G = rmGoal(); m.g = G.g || ''; m.gd = !!(G.g && G.gd); } return m; };
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
    if (room.lock && !(room.m || {})[rmUid()] && room.owner !== rmUid()){ RM.busy = false; RM.joinErr = 'This room is locked. Ask the person who made it to unlock it.'; render(); return; }
    const n = rmMembers(room).filter(m => m.id !== rmUid()).length;
    if (n >= (room.kind === 'cam' ? RM_CAM_MAX : RM_PUB_MAX)){ RM.busy = false; RM.joinErr = 'This room is full.'; render(); return; }
    RM.rid = id; RM.room = Object.assign({ id }, room); RM.hidden = {}; RM.hello = {}; RM.tmSeen = undefined; RM.camBlocked = (room.coff || []).includes(rmUid());
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
  RM.unsub = RM.sigUnsub = null; RM.rid = null; RM.room = null; RM.react = null; RM.vids = {}; RM.nv = []; RM.vis = {}; RM.lowIn = {}; RM.cpuQ = null;
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
  const prevM = RM.room && RM.room.id === RM.rid ? RM.room.m : null;
  RM.room = Object.assign({ id: RM.rid }, d);
  try { rmGoalWatch(prevM, d.m); } catch(e){}
  try { rmOwnerWatch(prevM, d); rmTallyTidy(); } catch(e){}
  if (!d.m || !d.m[rmUid()]) rmBeat();
  if (RM.room.kind === 'cam'){ rmSyncPeers(); rmTuneAll(); rmNvUpdate(); }
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
  if (RM.camBlocked){ toast('The room owner has turned your camera off for now.'); return; }
  RM.camErr = '';
  try {
    RM.cam = await navigator.mediaDevices.getUserMedia(rmCamOpts('user', false)); RM.facing = 'user';
  } catch(e){
    RM.camErr = /NotAllowed|Permission/.test(String(e && e.name)) ? 'Camera permission was blocked. Allow the camera for this site in your browser settings, then try again.' : 'No camera found, or another app is using it.';
    render(); return;
  }
  try { RM.cam.getVideoTracks()[0].contentHint = 'motion'; } catch(e){}
  rmCamDevices().then(() => { if (RM.multiCam) { if (RM.full) rmFullRender(); else render(); } });
  if (rmBlurOn()) rmBlurStart();
  if (rmAdjPiped()) await rmCamPipe();
  const tr = rmSendTrack();
  await Promise.all(Object.values(RM.pcs).map(p => p.tx ? p.tx.sender.replaceTrack(tr).catch(() => {}) : null));
  Object.values(RM.pcs).forEach(p => { p.encKey = ''; }); rmTuneAll();
  rmBeat(); render();
}
function rmCamOff(quiet){
  if (!RM.cam) return;
  if (RM.pipe){ RM.pipe.on = false; clearTimeout(RM.pipe.t); RM.pipe = null; }
  if (RM.blur && RM.blur.mode === 'native') RM.blur.mode = '';
  if (RM.camOut){ RM.camOut.getTracks().forEach(t => t.stop()); RM.camOut = null; }
  RM.cam.getTracks().forEach(t => t.stop()); RM.cam = null;
  Object.values(RM.pcs).forEach(p => { if (p.tx) p.tx.sender.replaceTrack(null).catch(() => {}); p.encKey = ''; });
  try { rmTuneAll(); } catch(e){}
  if (!quiet){ rmBeat(); render(); }
}

/* ---------- WebRTC: one connection per pair; the lower uid makes the offer ---------- */
function rmClosePc(uid){ const p = RM.pcs[uid]; if (!p) return; try { p.pc.close(); } catch(e){} delete RM.pcs[uid]; delete RM.vids[uid]; }
function rmNewPc(uid, sess){
  rmClosePc(uid);
  const pc = new RTCPeerConnection({ iceServers: RM_ICE });
  const p = RM.pcs[uid] = { pc, sess, tx: null, state: 'connecting', made: Date.now(), tries: (RM.pcs[uid] && RM.pcs[uid].tries) || 0 };
  pc.ontrack = ev => { const v = rmVideo(uid); v.srcObject = ev.streams[0] || new MediaStream([ev.track]); v.play().catch(() => {}); RM.lastFrame[uid] = performance.now(); rmFrameWatch(uid, v); rmPlace(); };
  pc.onconnectionstatechange = () => {
    p.state = pc.connectionState;
    if (pc.connectionState === 'connected'){ p.encKey = ''; rmTune(uid); }
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
  if (RM.cam) await p.tx.sender.replaceTrack(rmSendTrack());
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
        q.tx = q.pc.getTransceivers()[0]; if (q.tx){ q.tx.direction = 'sendrecv'; if (RM.cam) await q.tx.sender.replaceTrack(rmSendTrack()); }
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
  if (!v){ v = RM.vids[uid] = document.createElement('video'); v.autoplay = true; v.playsInline = true; v.muted = true; v.setAttribute('playsinline', ''); v.className = 'rmv'; v.addEventListener('loadeddata', () => rmPlace()); v.addEventListener('resize', () => rmPlace()); }
  return v;
}
function rmPlace(){
  (document.getElementById('rmfull') || document).querySelectorAll('[data-rmvid]').forEach(slot => {
    const uid = slot.dataset.rmvid;
    let v = null;
    if (uid === 'me'){ if (RM.cam){ v = rmVideo('me'); const st = rmBlurMP() && RM.camOut ? RM.camOut : RM.cam; if (v.srcObject !== st) v.srcObject = st; } }
    else if (RM.vids[uid] && RM.room && (RM.room.m[uid] || {}).cam && !RM.hidden[uid]) v = RM.vids[uid];
    if (v){
      if (v.parentNode !== slot){ const keep = slot.querySelector('.avatar'); slot.textContent = ''; if (keep) slot.appendChild(keep); slot.appendChild(v); }
      v.play().catch(() => {}); rmApplyView(v, uid, slot);
      slot.classList.toggle('on', uid === 'me' || v.videoWidth > 0);   // initials stay until the first frame arrives
    }
    else slot.classList.remove('on');
  });
  try { rmWatchSlots(); rmNvUpdate(); rmStaleApply(); } catch(e){}
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
    rmLowDot(m, me) +
    '<div class="rmmeta"><div class="t"><b>' + esc(m.n || 'A student') + '</b>' + (me ? ' <span class="small muted">(you)</span>' : '') + '</div>' +
      '<div class="small rmst"><span>' + rmStatus(m) + '</span> ' + rmClock(m) + '</div>' + rmGoalLine(m) +
      '<div class="small muted">' + (m.sub ? esc(m.sub) + ' · ' : '') + '<span>' + fmtMin(+m.min || 0) + ' today</span></div>' +
      (!me && cam && m.cam && RM.pcs[m.id] && RM.pcs[m.id].state === 'failed' ? '<div class="small muted">Video couldn’t connect on this network.</div>' : '') +
      (me && cam && RM.cam ? '<div class="row rmown"><button class="linkbtn small" data-act="rm-adjust" data-id="me">Adjust my camera</button></div>' : '') +
      (!me && (cam || owner) ? '<div class="row rmown">' + (cam && m.cam && !RM.hidden[m.id] ? '<button class="linkbtn small" data-act="rm-adjust" data-id="' + esc(m.id) + '">Adjust view</button>' : '') + (cam && m.cam ? '<button class="linkbtn small" data-act="rm-hide" data-id="' + esc(m.id) + '">' + (RM.hidden[m.id] ? 'Show video' : 'Hide video') + '</button>' : '') + (owner ? '<button class="linkbtn small" data-act="rm-kick" data-id="' + esc(m.id) + '">Remove</button>' : '') + '</div>' : '') +
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
    '<button class="rmglass rmtool' + (snd ? ' live' : '') + '" data-act="rm-panel" data-v="sound" aria-pressed="' + (RM.panel === 'sound') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg><span>Sounds</span></button>' +
    (RM.rid && RM.room && RM.room.kind === 'cam' ? '<button class="rmglass rmtool" data-act="rm-panel" data-v="cam" aria-pressed="' + (RM.panel === 'cam') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M5 5l2 2M17 17l2 2"/></svg><span>Cameras</span></button>' : '') +
    (RM.rid && rmIsOwner() ? '<button class="rmglass rmtool" data-act="rm-panel" data-v="owner" aria-pressed="' + (RM.panel === 'owner') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18l-2-10-5 4-2-6-2 6-5-4z"/></svg><span>Owner</span></button>' : '');
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
    (typeof meetRow === 'function' && rmAvailable() ? rmSessCard() : '') +
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
  if (RM.panel === 'cam') return rmAdjPanel();
  if (RM.panel === 'owner' && RM.rid && rmIsOwner()) return rmOwnerPanel();
  return RM.panel === 'view' ? '<div class="card stack rmpanel"><div class="card-h"><h2>Your view</h2><span class="small muted">Only you see it</span></div><div class="rmswatches" role="group" aria-label="Your view">' +
      RMV_SCENES.map(([id, n]) => '<button class="rmswatch" data-act="rm-scene" data-v="' + id + '" aria-pressed="' + (id === sc) + '">' + rmvSwatch(id) + '<span>' + n + '</span></button>').join('') + '</div>' +
      '<div class="row" style="align-items:center;gap:10px"><span class="small muted">Layout</span><div class="chips" role="group" aria-label="Layout"><button class="chip" data-act="rm-layout" data-v="focus" aria-pressed="' + (lay === 'focus') + '">Focus</button><button class="chip" data-act="rm-layout" data-v="grid" aria-pressed="' + (lay === 'grid') + '">Grid</button></div></div></div>'
    : RM.panel === 'sound' ? '<div class="card stack rmpanel"><div class="card-h"><h2>Sounds</h2><span class="small muted">Only you hear them</span></div><div class="rmsounds">' +
      RMX_SOUNDS.map(([id, ic, n]) => { const on = rmxOn(id), v = Math.round((P.mix[id] == null ? .7 : P.mix[id]) * 100); return '<div class="rmsnd' + (on ? ' on' : '') + '"><button class="rmsndbtn" data-act="rm-snd" data-v="' + id + '" aria-pressed="' + on + '"><span class="ic" aria-hidden="true">' + ic + '</span><span>' + n + '</span></button>' + (on ? '<input type="range" min="0" max="100" value="' + v + '" data-rmvol="' + id + '" aria-label="' + n + ' volume">' : '') + '</div>'; }).join('') + '</div>' +
      '<label class="row rmmaster"><span class="small muted">Volume</span><input type="range" min="0" max="100" value="' + Math.round(P.vol * 100) + '" data-rmvol="master" aria-label="Volume"></label>' +
      (snd ? '<div class="row"><button class="btn sm ghost" data-act="rm-snd-off">Stop all sounds</button></div>' : '') +
      '<label class="row small" style="gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-act="rm-gchime"' + (P.gchime ? ' checked' : '') + '> <span>Play a soft chime when someone in the room finishes their check-in</span></label>' +
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
        '<div class="rmtop"><div style="min-width:0"><h1 class="rmname">' + esc(r.name) + '</h1><div class="rmsub"><span>' + (cam ? 'Camera room · invite only' : 'Public room · no video') + '</span> · ' + mem.length + '/' + (cam ? RM_CAM_MAX : RM_PUB_MAX) + (r.lock ? ' · <span>🔒 Locked</span>' : '') + '</div></div>' +
          '<button class="btn rmglass" data-act="rm-leave">Leave</button></div>' +
        '<div class="rmcenter"><div class="rmphase' + (T.phase === 'break' ? ' brk' : '') + '">' + (T.phase === 'focus' ? 'Focus' : 'Break') + '</div>' +
          '<div class="rmbig" id="rmclock">' + fmtClock(ms) + '</div>' +
          '<div class="rmnow">' + (focusing ? '<span>' + focusing + ' focusing now</span>' : '<span>Start the timer to focus together</span>') + '</div>' +
          '<div class="row rmctl">' + (T.running ? '<button class="btn primary big" data-act="t-pause">Pause</button>' : '<button class="btn primary big" data-act="t-start">' + (ms < phaseLen() ? 'Resume' : 'Start focus') + '</button>') +
            (T.phase === 'focus' ? '<button class="btn big rmglass" data-act="t-stoplog"' + (ms < phaseLen() ? '' : ' disabled') + '>Stop &amp; log</button>' : '<button class="btn big rmglass" data-act="t-skip">Skip break</button>') + '</div></div>' +
        '<div class="rmbottom"><div class="row rmreacts" role="group" aria-label="Reactions">' + RM_REACT.map(e => '<button class="rmglass rmre" data-act="rm-react" data-v="' + e + '" aria-label="React ' + e + '">' + e + '</button>').join('') + '</div>' +
          rmTools() + rmFlipBtn() + '<button class="rmglass rmtool" data-act="rm-full" aria-label="Full screen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6"/></svg><span>Full screen</span></button>' +
            (cam ? '<button class="rmglass rmtool' + (RM.cam ? ' live' : '') + '" data-act="' + (RM.cam ? 'rm-cam-off' : 'rm-cam-on') + '" aria-pressed="' + !!RM.cam + '"' + (RM.camBlocked && !RM.cam ? ' disabled title="The room owner turned your camera off"' : '') + ' aria-label="' + (RM.cam ? 'Turn camera off' : 'Turn camera on') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>' + (RM.cam ? '' : '<path d="M3 3l18 18"/>') + '</svg><span>Camera</span></button>' : '') +
          '</div></div>' +
      '</div></section>' +
    (RM.camErr ? '<p class="small warnline" role="alert">' + esc(RM.camErr) + '</p>' : '') +
    (r.tm && r.owner !== me ? '<label class="row small rmfollow" style="gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-act="rm-follow"' + (rmFollowOn() ? ' checked' : '') + '> <span>Follow the room timer (the person who made this room can start and pause it for everyone)</span></label>' : '') +
    (RM.camBlocked ? '<p class="small muted" role="status">The person who made this room has turned your camera off for now.</p>' : '') +
    panel +
    (cam ? '<div class="card stack rminvite"><div class="row" style="justify-content:space-between;align-items:center"><div><div class="small muted">Room code</div><div class="rmcode notr">' + esc(r.id.slice(0, 4) + ' ' + r.id.slice(4)) + '</div></div>' +
      '<div class="row"><button class="btn sm" data-act="rm-copy" data-v="' + esc(link) + '">Copy invite link</button></div></div>' +
      (frOk ? '<label class="row small" style="gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-act="rm-frinv"' + (state.rmInvite ? ' checked' : '') + '> <span>Invite my friends to this room</span></label>' : '') +
      '<p class="small muted">Share the code only with people you know.</p></div>' : '') +
    '<div class="card-h rmpeopleh"><h2>In this room</h2><span class="small muted">' + mem.length + '</span></div>' +
    '<div class="rmgrid lay-' + lay + (cam ? ' cam' : '') + '">' + mem.map(m => rmTile(m, m.id === me)).join('') + '</div>' +
    rmGoalRoomCard() + rmGoalCard() + rmBoardCard() +
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
  if (/^rm-a(for|rot|flip|fit|mirror|reset|djust)$/.test(a)) return rmAdjAct(el);
  if (a === 'rm-flip'){ rmCamFlip(); return true; }
  if (a === 'rm-blur'){ rmvPrefs().blur = el.checked ? 1 : 0; try { saveLocal(); } catch(e){} if (el.checked) rmBlurStart().then(() => {}, () => {}); else rmBlurStop(); rmRefreshAdj(); return true; }
  if (a === 'rm-lock'){ rmOwnerSet({ lock: el.checked }); toast(el.checked ? 'Room locked. No one new can join.' : 'Room unlocked.'); return true; }
  if (a === 'rm-lead'){ rmLead(v); return true; }
  if (a === 'rm-coff'){ const cur = (RM.room.coff || []).filter(x => x !== id); if (v === '1') cur.push(id); rmOwnerSet({ coff: cur.slice(0, 12) }); return true; }
  if (a === 'rm-goalset'){ const n = +((document.getElementById('rm-goal-n') || {}).value || RM.goalN || 4); RM.goalN = 0; rmOwnerSet({ goal: { t: Math.max(1, Math.min(20, n)), at: Date.now() } }); toast('Room goal set: ' + n + ' focus sessions'); return true; }
  if (a === 'rm-goalclear'){ rmOwnerSet({ goal: null }); return true; }
  if (a === 'rm-lbshow'){ rmvPrefs().lbHide = el.checked ? 0 : 1; try { saveLocal(); } catch(e){} const t = rmTallyMine(); if (t) rmTallyWrite(Object.assign({}, t, { h: !el.checked })); render(); return true; }
  if (a === 'rm-follow'){ rmvPrefs().follow = el.checked ? 1 : 0; try { saveLocal(); } catch(e){} if (el.checked && RM.room && RM.room.tm) rmApplyTm(RM.room.tm, true); render(); return true; }
  if (a === 'rm-sessplan'){ ui.meetForm = { d: todayStr(), k: 'room' }; go('calendar'); setTimeout(() => { const f = document.getElementById('meetform'); if (f) f.scrollIntoView({ block: 'start' }); }, 120); return true; }
  if (a === 'rm-gchime'){ const on = el.checked; rmvPrefs().gchime = on ? 1 : 0; try { saveLocal(); } catch(e){} if (on) rmChime(); return true; }
  if (a === 'rm-gset'){ rmGoalSet(v, false); return true; }
  if (a === 'rm-gdone'){ const G = rmGoal(); rmGoalSet(G.g, !G.gd); if (G.gd) toast('Nice work. Ticked off.'); return true; }
  if (a === 'rm-gnew'){ rmGoalSet('', false); return true; }
  if (a === 'rm-gedit'){ rmGoal().edit = true; render(); return true; }
  if (a === 'rm-gcancel'){ rmGoal().edit = false; render(); return true; }
  switch (a){
    case 'rm-new': RM.create = v ? { kind: v } : null; RM.joinErr = ''; render(); break;
    case 'rm-join': rmJoin(v); break;
    case 'rm-leave': rmLeave(); break;
    case 'rm-back': go('rooms'); break;
    case 'rm-cam-on': rmCamOn(); break;
    case 'rm-cam-off': rmCamOff(); break;
    case 'rm-react': rmReact(v); break;
    case 'rm-hide': RM.hidden[id] = !RM.hidden[id]; render(); rmNvUpdate(); break;
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
    return (cam ? '<div class="rmcam" data-rmvid="' + (isMe ? 'me' : esc(m.id)) + '">' + av + '</div>' : '<div class="rmcam nocam">' + av + '</div>') + react + rmLowDot(m, isMe) +
      '<div class="rmfname"><b>' + esc(m.n || 'A student') + '</b>' + (isMe ? ' <span>(you)</span>' : '') + ' <span class="rmfst">' + rmStatus(m) + ' ' + rmClock(m) + '</span>' + rmGoalLine(m) + '</div>';
  };
  const html = '<div class="rmscene-slot" data-rmscene="' + sc + '"></div><div class="rmshade"></div>' +
    rmFullTile('timer', 0, '<div class="rmphase' + (T.phase === 'break' ? ' brk' : '') + '">' + (T.phase === 'focus' ? 'Focus' : 'Break') + '</div><div class="rmfclock" id="rmfclock">' + fmtClock(ms) + '</div><div class="rmnow">' + (focusing ? '<span>' + focusing + ' focusing now</span>' : '<span>Start the timer to focus together</span>') + '</div>', 'rmftimer') +
    others.map((m, i) => rmFullTile(m.id, i, card(m, false), 'rmftile' + (cam ? ' cam' : ''))).join('') +
    rmFullTile('me', 0, card(mine, true), 'rmftile me' + (cam ? ' cam' : '')) +
    '<div class="rmfbar" role="toolbar" aria-label="Room controls">' +
      (T.running ? '<button class="rmglass rmtool" data-act="t-pause">Pause</button>' : '<button class="rmglass rmtool rmfgo" data-act="t-start">' + (ms < phaseLen() ? 'Resume' : 'Start focus') + '</button>') +
      (cam ? '<button class="rmglass rmtool' + (RM.cam ? ' live' : '') + '" data-act="' + (RM.cam ? 'rm-cam-off' : 'rm-cam-on') + '" aria-pressed="' + !!RM.cam + '"' + (RM.camBlocked && !RM.cam ? ' disabled title="The room owner turned your camera off"' : '') + ' aria-label="' + (RM.cam ? 'Turn camera off' : 'Turn camera on') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>' + (RM.cam ? '' : '<path d="M3 3l18 18"/>') + '</svg><span>Camera</span></button>' : '') +
      rmFlipBtn() +
      '<button class="rmglass rmtool" data-act="rm-fview" aria-label="Next view"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/></svg><span>' + esc((RMV_SCENES.find(x => x[0] === sc) || ['', 'View'])[1]) + '</span></button>' +
      (cam ? '<button class="rmglass rmtool" data-act="rm-panel" data-v="cam" aria-pressed="' + (RM.panel === 'cam') + '" aria-label="Adjust cameras"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M5 5l2 2M17 17l2 2"/></svg><span>Cameras</span></button>' : '') +
      (rmIsOwner() ? '<button class="rmglass rmtool" data-act="rm-panel" data-v="owner" aria-pressed="' + (RM.panel === 'owner') + '" aria-label="Owner controls"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18l-2-10-5 4-2-6-2 6-5-4z"/></svg><span>Owner</span></button>' : '') +
      '<button class="rmglass rmtool" data-act="rm-freset" aria-label="Reset layout"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg><span>Reset layout</span></button>' +
      '<button class="rmglass rmtool" data-act="rm-fexit" aria-label="Exit full screen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6"/></svg><span>Exit</span></button>' +
    '</div>' +
    (cam && RM.panel === 'cam' ? '<div class="rmfadj">' + rmAdjPanel() + '</div>' : '') +
    (RM.panel === 'owner' && rmIsOwner() ? '<div class="rmfadj">' + rmOwnerPanel() + '</div>' : '') +
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

/* ============================================================
   Video quality. Study cameras barely move, so they run at a low frame rate with a data cap per
   person that shrinks as the room fills. Every few seconds each connection is checked (lost data,
   delay, and whether the phone's processor or the network is the limit); quality steps down when
   things get worse and back up once they have been good for a while. When quality must drop, the
   picture loses sharpness rather than freezing. Nobody is sent video they aren't watching: each
   person's entry lists whose video is hidden or off screen for them ("nv"), and senders pause
   those streams without reconnecting.
   ============================================================ */
const RMQ = {
  // per stream, by how many people are watching you: [max kbps, shrink factor, frames per second]
  base: n => n <= 1 ? [450, 1, 12] : n <= 3 ? [250, 1.25, 10] : [170, 1.5, 10],
  steps: [[1, 1, 0], [.6, 1.5, 8], [.35, 2, 6]],   // level 0, 1, 2: data ×, shrink ×, fps cap
  every: 4000, recover: 3,                          // check every 4 s; 3 good checks in a row to step back up
  bad: s => s.loss > .05 || s.rtt > .5 || s.limit === 'bandwidth',
  good: s => s.loss < .02 && s.rtt < .25 && s.limit === 'none'
};
// one step of the quality ladder (kept pure so it can be tested)
function rmQStep(q, s){
  q = { lvl: q.lvl || 0, ok: q.ok || 0 };
  if (RMQ.bad(s)) return { lvl: Math.min(2, q.lvl + 1), ok: 0 };
  if (RMQ.good(s)){ q.ok++; if (q.ok >= RMQ.recover && q.lvl > 0) return { lvl: q.lvl - 1, ok: 0 }; return q; }
  return { lvl: q.lvl, ok: 0 };
}
function rmEnc(watchers, lvl){
  const [kb, sc, fps] = RMQ.base(watchers), st = RMQ.steps[Math.max(0, Math.min(2, lvl))];
  return { maxBitrate: Math.round(kb * st[0]) * 1000, scaleResolutionDownBy: Math.min(3, +(sc * st[1]).toFixed(2)), maxFramerate: st[2] ? Math.min(fps, st[2]) : fps };
}
function rmWatchers(){
  const me = rmUid();
  return rmMembers(RM.room || {}).filter(m => m.id !== me && !((m.nv || []).includes(me))).length;
}
async function rmTune(uid){
  const p = RM.pcs[uid]; if (!p || !p.tx || !RM.room) return;
  const s = p.tx.sender, me = rmUid(), them = RM.room.m[uid] || {};
  const active = !!RM.cam && !((them.nv || []).includes(me));
  const lvl = Math.max(p.q ? p.q.lvl : 0, RM.cpuQ ? RM.cpuQ.lvl : 0);
  const e = rmEnc(Math.max(1, rmWatchers()), lvl);
  const key = active + '|' + e.maxBitrate + '|' + e.scaleResolutionDownBy + '|' + e.maxFramerate;
  if (p.encKey === key) return;
  try {
    const prm = s.getParameters();
    if (!prm.encodings || !prm.encodings.length) return;       // not negotiated yet; tried again once connected
    Object.assign(prm.encodings[0], e, { active });
    try { prm.degradationPreference = 'maintain-framerate'; } catch(err){}
    await s.setParameters(prm);
    p.encKey = key;
  } catch(err){}
}
function rmTuneAll(){ Object.keys(RM.pcs).forEach(rmTune); }

/* whose video am I actually watching? hidden, off screen, page in the background or on another tab = not watching */
RM.vis = {}; RM.nv = []; RM.lowIn = {};
const RMQ_IO = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
  es.forEach(e => { const id = e.target.dataset.rmvid; if (id && id !== 'me') RM.vis[id] = e.isIntersecting; });
  rmNvUpdate();
}, { threshold: .05 }) : null;
function rmWatchSlots(){
  if (!RMQ_IO) return;
  (document.getElementById('rmfull') || document).querySelectorAll('[data-rmvid]').forEach(el => { if (el.dataset.rmvid !== 'me' && !el.dataset.io){ el.dataset.io = '1'; RMQ_IO.observe(el); } });
}
function rmNvUpdate(){
  if (!RM.room || RM.room.kind !== 'cam') return;
  const me = rmUid(), away = document.hidden || route() !== 'rooms';
  const nv = rmMembers(RM.room).filter(m => m.id !== me && (away || RM.hidden[m.id] || RM.vis[m.id] === false)).map(m => m.id).sort().slice(0, 12);
  if (nv.join() === RM.nv.join()) return;
  RM.nv = nv; clearTimeout(RM.nvT); RM.nvT = setTimeout(rmBeat, 1200);
}
document.addEventListener('visibilitychange', () => { try { rmNvUpdate(); } catch(e){} });

/* the regular check */
async function rmQCheck(){
  if (!RM.room || RM.room.kind !== 'cam') return;
  let cpu = false, changedLow = false;
  for (const uid of Object.keys(RM.pcs)){
    const p = RM.pcs[uid]; if (!p || p.pc.connectionState !== 'connected') continue;
    let st; try { st = await p.pc.getStats(); } catch(e){ continue; }
    const s = { loss: 0, rtt: 0, limit: 'none' }; let inb = null, pair = null;
    st.forEach(r => {
      if (r.type === 'outbound-rtp' && r.kind === 'video'){ if (r.qualityLimitationReason) s.limit = r.qualityLimitationReason; }
      else if (r.type === 'remote-inbound-rtp' && r.kind === 'video'){ if (typeof r.fractionLost === 'number') s.loss = r.fractionLost; if (typeof r.roundTripTime === 'number') s.rtt = r.roundTripTime; }
      else if (r.type === 'inbound-rtp' && r.kind === 'video') inb = r;
      else if (r.type === 'candidate-pair' && r.nominated && r.state === 'succeeded') pair = r;
    });
    if (!s.rtt && pair && typeof pair.currentRoundTripTime === 'number') s.rtt = pair.currentRoundTripTime;
    if (s.limit === 'cpu'){ cpu = true; s.limit = 'none'; }
    const sending = RM.cam && p.encKey && p.encKey.indexOf('true') === 0;
    if (sending) p.q = rmQStep(p.q || {}, s);
    // what I receive from them: few frames or much lost data while I'm watching = weak connection
    let low = false;
    if (inb && (RM.room.m[uid] || {}).cam && !RM.nv.includes(uid)){
      const lost = inb.packetsLost || 0, got = inb.packetsReceived || 0, prev = p.inPrev || { lost, got };
      const dl = lost - prev.lost, dg = got - prev.got;
      p.inPrev = { lost, got };
      low = (typeof inb.framesPerSecond === 'number' && inb.framesPerSecond < 4) || (dl + dg > 20 && dl / (dl + dg) > .08);
    }
    if (!!RM.lowIn[uid] !== low){ RM.lowIn[uid] = low; changedLow = true; }
  }
  const before = rmQReduced();
  RM.cpuQ = rmQStep(RM.cpuQ || {}, { loss: 0, rtt: 0, limit: cpu ? 'bandwidth' : 'none' });
  rmTuneAll();
  if (changedLow || before !== rmQReduced()) rmRefresh();
}
function rmQReduced(){ return (RM.cpuQ && RM.cpuQ.lvl > 0) || Object.values(RM.pcs).some(p => p.q && p.q.lvl > 0 && p.encKey && p.encKey.indexOf('true') === 0); }
setInterval(() => { try { rmQCheck(); } catch(e){} }, RMQ.every);

function rmLowDot(m, me){
  if (!RM.room || RM.room.kind !== 'cam') return '';
  const t = me ? (RM.cam && rmQReduced() ? 'Video lowered to keep it smooth' : '') : (RM.lowIn[m.id] ? 'Weak connection' : '');
  return t ? '<span class="rmlow" role="status"><i aria-hidden="true"></i><span>' + t + '</span></span>' : '';
}

/* ============================================================
   Camera adjustments.
   Your camera: rotate, zoom and move the frame. When anything is changed, frames go through a canvas
   (about 12 a second) and that is what others receive; with no change the camera is sent untouched.
   Others' cameras: rotate, zoom, flip and fit/fill, applied on your screen only and saved per person.
   ============================================================ */
const RMA_DEF = { r: 0, z: 1, x: 0, y: 0, mi: 1 };
const RMV_DEF = { r: 0, z: 1, mi: 0, fit: 'cover' };
function rmAdjMe(){ const P = rmvPrefs(); if (!P.cam || typeof P.cam !== 'object') P.cam = Object.assign({}, RMA_DEF); for (const k in RMA_DEF) if (typeof P.cam[k] !== 'number') P.cam[k] = RMA_DEF[k]; return P.cam; }
function rmAdjOf(uid){ const P = rmvPrefs(); P.see = P.see || {}; return Object.assign({}, RMV_DEF, P.see[uid] || {}); }
function rmAdjSet(uid, k, v){ const P = rmvPrefs(); P.see = P.see || {}; P.see[uid] = Object.assign({}, RMV_DEF, P.see[uid] || {}, { [k]: v }); }
function rmAdjPiped(){ const a = rmAdjMe(); return a.r % 360 !== 0 || a.z > 1.001; }
function rmSendTrack(){ if (!RM.cam) return null; const s = RM.camOut || RM.cam; return s.getVideoTracks()[0] || null; }

/* start or stop the canvas pipeline to match the settings, then hand the right track to every connection */
async function rmCamPipe(){
  const want = !!RM.cam && (rmAdjPiped() || rmBlurMP());
  if (want && !RM.pipe){
    const src = document.createElement('video'); src.muted = true; src.playsInline = true; src.setAttribute('playsinline', ''); src.srcObject = RM.cam; src.play().catch(() => {});
    const cv = document.createElement('canvas'), ctx = cv.getContext('2d', { alpha: false });
    const pipe = RM.pipe = { src, cv, ctx, on: true };
    const draw = (now) => {
      if (!pipe.on) return;
      const w = src.videoWidth, h = src.videoHeight, t = performance.now();
      if (w && h && t - (pipe.last || 0) >= 80){ pipe.last = t;
        const a = rmAdjMe(), rot = ((a.r % 360) + 360) % 360, side = rot % 180 !== 0;
        const W = side ? h : w, H = side ? w : h;
        if (cv.width !== W || cv.height !== H){ cv.width = W; cv.height = H; }
        const z = Math.min(3, Math.max(1, +a.z || 1)), cw = w / z, ch = h / z;
        const sx = (w - cw) / 2 * (1 + Math.max(-1, Math.min(1, +a.x || 0))), sy = (h - ch) / 2 * (1 + Math.max(-1, Math.min(1, +a.y || 0)));
        let img = src;
        if (rmBlurMP()){
          if (pipe.bcReady && pipe.bc) img = pipe.bc;
          else { const t = rmBlurFallback(src, w, h); ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(rot * Math.PI / 180); ctx.imageSmoothingEnabled = true; ctx.drawImage(t, 0, 0, t.width, t.height, -w / 2, -h / 2, w, h); ctx.restore(); img = null; }
          if (RM.blur.ss && !pipe.busy){ pipe.busy = true; RM.blur.ss.send({ image: src }).catch(() => {}).then(() => { pipe.busy = false; }); }
        }
        if (img){ ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(rot * Math.PI / 180);
          ctx.drawImage(img, sx * (img.width / w), sy * (img.height / h), cw * (img.width / w), ch * (img.height / h), -w / 2, -h / 2, w, h); ctx.restore(); }
      }
      if (src.requestVideoFrameCallback && !document.hidden) src.requestVideoFrameCallback(draw); else pipe.t = setTimeout(draw, 83);
    };
    draw();
    RM.camOut = cv.captureStream(12);
    try { RM.camOut.getVideoTracks()[0].contentHint = 'motion'; } catch(e){}
  } else if (!want && RM.pipe){
    RM.pipe.on = false; clearTimeout(RM.pipe.t); try { RM.pipe.src.srcObject = null; } catch(e){}
    if (RM.camOut) RM.camOut.getTracks().forEach(t => t.stop());
    RM.pipe = null; RM.camOut = null;
  } else return;
  const tr = rmSendTrack();
  await Promise.all(Object.values(RM.pcs).map(p => p.tx ? p.tx.sender.replaceTrack(tr).catch(() => {}) : null));
  Object.values(RM.pcs).forEach(p => { p.encKey = ''; }); try { rmTuneAll(); } catch(e){}
  rmPlace();
}

/* what you see of someone's video: CSS only, nothing is sent */
function rmApplyView(v, uid, slot){
  if (!v) return;
  if (uid === 'me'){
    if (rmBlurMP() && RM.camOut && v.srcObject === RM.camOut){ const a0 = rmAdjMe(); v.style.objectFit = 'cover'; v.classList.remove('mirror'); v.style.transform = a0.mi && RM.facing !== 'environment' ? 'scaleX(-1)' : ''; return; }
    /* your own preview stays the live camera (full frame rate) and copies the canvas framing with CSS */
    const a = rmAdjMe(), rot = ((a.r % 360) + 360) % 360, z = Math.min(3, Math.max(1, +a.z || 1));
    let k = 1; if (rot % 180 && slot){ const q = (slot.clientWidth || 4) / (slot.clientHeight || 3); k = Math.max(q, 1 / q); }
    const tx = -(+a.x || 0) * (1 - 1 / z) / 2 * 100, ty = -(+a.y || 0) * (1 - 1 / z) / 2 * 100;
    v.style.objectFit = 'cover'; v.classList.remove('mirror');
    v.style.transform = (a.mi && RM.facing !== 'environment' ? 'scaleX(-1) ' : '') + (rot ? 'rotate(' + rot + 'deg) ' : '') + 'scale(' + (k * z).toFixed(3) + ')' + (tx || ty ? ' translate(' + tx.toFixed(2) + '%,' + ty.toFixed(2) + '%)' : '');
    return;
  }
  const a = rmAdjOf(uid), rot = ((a.r % 360) + 360) % 360, side = rot % 180 !== 0;
  let k = 1;
  if (side && slot){ const sw = slot.clientWidth || 4, sh = slot.clientHeight || 3, q = sw / sh; k = a.fit === 'contain' ? Math.min(q, 1 / q) : Math.max(q, 1 / q); }
  v.style.objectFit = a.fit === 'contain' ? 'contain' : 'cover';
  v.style.transform = (rot ? 'rotate(' + rot + 'deg) ' : '') + 'scale(' + (k * (+a.z || 1)).toFixed(3) + ')' + (a.mi ? ' scaleX(-1)' : '');
}

function rmAdjPanel(){
  const r = RM.room; if (!r || r.kind !== 'cam') return '';
  const me = rmUid(), a = rmAdjMe(), who = RM.adjFor || 'me';
  const others = rmMembers(r).filter(m => m.id !== me && m.cam);
  const rotBtns = id => '<button class="btn sm" data-act="rm-arot" data-id="' + id + '" data-v="-90" aria-label="Rotate left">⟲ Rotate left</button><button class="btn sm" data-act="rm-arot" data-id="' + id + '" data-v="90" aria-label="Rotate right">⟳ Rotate right</button>';
  const slider = (id, k, val, min, max, step, label) => '<label class="rmadjrow"><span class="small muted">' + label + '</span><input type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" data-rmadj="' + id + '" data-k="' + k + '" aria-label="' + label + '"></label>';
  let body;
  if (who === 'me'){
    body = (RM.cam ? '' : '<p class="small muted" style="margin:0">Turn your camera on to see these changes.</p>') +
      '<div class="row">' + rotBtns('me') + '</div>' +
      slider('me', 'z', a.z, 1, 3, 0.05, 'Zoom') +
      (a.z > 1.001 ? slider('me', 'x', a.x, -1, 1, 0.05, 'Left / right') + slider('me', 'y', a.y, -1, 1, 0.05, 'Up / down') : '') +
      '<label class="row small" style="gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-act="rm-amirror"' + (a.mi ? ' checked' : '') + '> <span>Mirror my preview (others always see you the right way round)</span></label>' +
      '<label class="row small" style="gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-act="rm-blur"' + (rmBlurOn() ? ' checked' : '') + '> <span><b>Blur my background</b>' +
        (rmBlurOn() ? ' <span class="muted">· ' + (RM.blur.state === 'loading' ? 'getting ready…' : RM.blur.state === 'error' ? 'couldn’t start on this device' : RM.blur.mode === 'native' ? 'on, using your device’s own blur' : RM.cam ? 'on' : 'starts when your camera is on') + '</span>' : '') + '</span></label>' +
      (rmBlurOn() && RM.blur.mode === 'mp' ? '<p class="small muted" style="margin:0">Blur is worked out on your device, so it uses more battery. If your video gets choppy, turn it off or point the camera at your desk.</p>' : '') +
      '<div class="row"><button class="btn sm ghost" data-act="rm-areset" data-id="me">Reset my camera</button></div>' +
      '<p class="small muted" style="margin:0">Others see your camera rotated, zoomed and framed the way you set it here.</p>';
  } else {
    const m = others.find(x => x.id === who), o = rmAdjOf(who);
    body = !m ? '<p class="small muted" style="margin:0">Their camera is off.</p>' :
      '<div class="row">' + rotBtns(esc(who)) + '<button class="btn sm" data-act="rm-aflip" data-id="' + esc(who) + '" aria-pressed="' + !!o.mi + '">⇋ Flip</button></div>' +
      slider(esc(who), 'z', o.z, 1, 3, 0.05, 'Zoom') +
      '<div class="row" style="align-items:center;gap:10px"><span class="small muted">Shape</span><div class="chips" role="group" aria-label="Shape"><button class="chip" data-act="rm-afit" data-id="' + esc(who) + '" data-v="cover" aria-pressed="' + (o.fit !== 'contain') + '">Fill the tile</button><button class="chip" data-act="rm-afit" data-id="' + esc(who) + '" data-v="contain" aria-pressed="' + (o.fit === 'contain') + '">Show all</button></div></div>' +
      '<div class="row"><button class="btn sm ghost" data-act="rm-areset" data-id="' + esc(who) + '">Reset</button></div>' +
      '<p class="small muted" style="margin:0">Only you see these changes. They’re saved for next time.</p>';
  }
  return '<div class="card stack rmpanel rmadj"><div class="card-h"><h2>Cameras</h2>' + (RM.full ? '<button class="linkbtn small" data-act="rm-panel" data-v="cam">Done</button>' : '') + '</div>' +
    '<div class="chips" role="group" aria-label="Whose camera"><button class="chip" data-act="rm-afor" data-id="me" aria-pressed="' + (who === 'me') + '">My camera</button>' +
      others.map(m => '<button class="chip" data-act="rm-afor" data-id="' + esc(m.id) + '" aria-pressed="' + (who === m.id) + '">' + esc(m.n || 'A student') + '</button>').join('') + '</div>' +
    body + '</div>';
}
function rmAdjAct(el){
  const a = el.dataset.act, id = el.dataset.id, v = el.dataset.v;
  const save = () => { try { saveLocal(); } catch(e){} };
  switch (a){
    case 'rm-afor': RM.adjFor = id; break;
    case 'rm-arot': if (id === 'me'){ const c = rmAdjMe(); c.r = (((c.r || 0) + +v) % 360 + 360) % 360; rmCamPipe(); } else rmAdjSet(id, 'r', (((rmAdjOf(id).r || 0) + +v) % 360 + 360) % 360); break;
    case 'rm-aflip': rmAdjSet(id, 'mi', rmAdjOf(id).mi ? 0 : 1); break;
    case 'rm-afit': rmAdjSet(id, 'fit', v); break;
    case 'rm-amirror': rmAdjMe().mi = el.checked ? 1 : 0; break;
    case 'rm-areset': if (id === 'me'){ const mi = rmAdjMe().mi; rmvPrefs().cam = Object.assign({}, RMA_DEF, { mi }); rmCamPipe(); } else { const P = rmvPrefs(); if (P.see) delete P.see[id]; } break;
    case 'rm-adjust': RM.panel = 'cam'; RM.adjFor = id || 'me'; break;
    default: return false;
  }
  save();
  if (RM.full) rmFullRender(); else render();
  return true;
}
/* sliders change things live without redrawing the page (a redraw would drop the slider mid-drag) */
document.addEventListener('input', e => {
  const el = e.target; if (!el || !el.dataset || !el.dataset.rmadj) return;
  const id = el.dataset.rmadj, k = el.dataset.k, val = +el.value;
  if (id === 'me'){ const c = rmAdjMe(), was = rmAdjPiped(); c[k] = val; if (was !== rmAdjPiped()) rmCamPipe(); else rmPlace(); }
  else { rmAdjSet(id, k, val); rmPlace(); }
});
document.addEventListener('change', e => {
  const el = e.target; if (el && el.id === 'rm-goal-n'){ RM.goalN = +el.value; return; }
  if (!el || !el.dataset || !el.dataset.rmadj) return;
  try { saveLocal(); } catch(e2){}
  if (el.dataset.rmadj === 'me' && el.dataset.k === 'z'){ if (RM.full) rmFullRender(); else render(); }   // show or hide the framing sliders
});

/* ============================================================
   Desk view: switch a phone or tablet to its back camera so others see your desk and notes, not your face.
   ============================================================ */
RM.facing = 'user';
async function rmCamDevices(){
  try { const d = await navigator.mediaDevices.enumerateDevices(); RM.multiCam = d.filter(x => x.kind === 'videoinput').length > 1; } catch(e){ RM.multiCam = false; }
}
function rmCamOpts(facing, exact){ return { video: { width: { ideal: 480 }, height: { ideal: 360 }, frameRate: { ideal: 24, max: 30 }, facingMode: exact ? { exact: facing } : facing }, audio: false }; }
async function rmCamFlip(){
  if (!RM.cam || RM.flipping) return;
  RM.flipping = true; render();
  const want = RM.facing === 'environment' ? 'user' : 'environment', old = RM.cam;
  old.getTracks().forEach(t => t.stop());            // many phones can't open two cameras at once
  let s = null;
  try { s = await navigator.mediaDevices.getUserMedia(rmCamOpts(want, true)); }
  catch(e){ try { s = await navigator.mediaDevices.getUserMedia(rmCamOpts(want, false)); } catch(e2){} }
  if (s && want === 'environment'){ const st = s.getVideoTracks()[0].getSettings(); if (st.facingMode && st.facingMode !== 'environment'){ s.getTracks().forEach(t => t.stop()); s = null; } }
  if (!s){
    toast(want === 'environment' ? 'This device has no back camera to switch to.' : 'Couldn’t switch back to the front camera.');
    try { s = await navigator.mediaDevices.getUserMedia(rmCamOpts(RM.facing, false)); } catch(e){ RM.cam = old; RM.flipping = false; rmCamOff(); return; }
  } else RM.facing = want;
  RM.cam = s; RM.flipping = false;
  try { s.getVideoTracks()[0].contentHint = 'motion'; } catch(e){}
  if (RM.pipe){ RM.pipe.src.srcObject = s; RM.pipe.src.play().catch(() => {}); }
  if (rmBlurOn() && RM.blur.mode === 'native'){ RM.blur.mode = ''; rmBlurStart(); }
  const tr = rmSendTrack();
  await Promise.all(Object.values(RM.pcs).map(p => p.tx ? p.tx.sender.replaceTrack(tr).catch(() => {}) : null));
  Object.values(RM.pcs).forEach(p => { p.encKey = ''; }); try { rmTuneAll(); } catch(e){}
  if (RM.full) rmFullRender(); else render();
}
function rmFlipBtn(){
  if (!RM.cam || !RM.multiCam) return '';
  const desk = RM.facing === 'environment';
  return '<button class="rmglass rmtool' + (desk ? ' live' : '') + '" data-act="rm-flip" aria-pressed="' + desk + '"' + (RM.flipping ? ' disabled' : '') + ' aria-label="' + (desk ? 'Switch to face view' : 'Switch to desk view') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 20l2-8h8l2 8M9 12V8h6v4"/></svg><span>' + (desk ? 'Face view' : 'Desk view') + '</span></button>';
}

/* ============================================================
   Quiet check-ins: say what this session is for, tick it when it's done; everyone in the room sees it.
   Public rooms use the preset goals only (no free text with strangers); camera rooms can type their own.
   ============================================================ */
const RM_GOALS = [['pp', 'A past paper'], ['qs', 'Practice questions'], ['fc', 'Flashcards'], ['notes', 'Notes for a topic'], ['mist', 'Going over my mistakes'], ['hw', 'Homework'], ['read', 'Reading'], ['plan', 'Planning my week']];
function rmGoalLabel(g, kind){ const p = RM_GOALS.find(x => x[0] === g); return p ? p[1] : (kind === 'cam' ? String(g || '').slice(0, 60) : ''); }
function rmGoalKey(){ return 'ial-room-goal-' + (RM.rid || ''); }
function rmGoal(){
  if (!RM.goal || RM.goal.rid !== RM.rid){ let g = null; try { g = JSON.parse(localStorage.getItem(rmGoalKey()) || 'null'); } catch(e){} RM.goal = Object.assign({ g: '', gd: false }, g || {}, { rid: RM.rid }); }
  return RM.goal;
}
function rmGoalSet(g, gd){
  const G = rmGoal(); G.g = String(g || '').replace(/\s+/g, ' ').trim().slice(0, 60); G.gd = !!gd; G.edit = false;
  if (RM.room && RM.room.kind !== 'cam' && !RM_GOALS.some(x => x[0] === G.g)) G.g = '';
  try { localStorage.setItem(rmGoalKey(), JSON.stringify({ g: G.g, gd: G.gd })); } catch(e){}
  rmBeat(); render();
}
function rmGoalCard(){
  const r = RM.room, G = rmGoal(), cam = r.kind === 'cam', lab = rmGoalLabel(G.g, r.kind);
  const mem = rmMembers(r).filter(m => m.g && rmGoalLabel(m.g, r.kind)), done = mem.filter(m => m.gd).length;
  if (lab && !G.edit){
    const brk = T.phase === 'break' && !G.gd;
    return '<div class="card stack rmgoal' + (G.gd ? ' done' : '') + '"><div class="card-h"><h2>Check-in</h2>' + (mem.length > 1 ? '<span class="small muted">' + done + ' of ' + mem.length + ' done</span>' : '') + '</div>' +
      '<div class="rmgoalnow"><span class="rmgtick" aria-hidden="true">' + (G.gd ? '✓' : '') + '</span><div><div class="small muted">' + (G.gd ? 'Done' : 'This session') + '</div><b>' + esc(lab) + '</b></div></div>' +
      (brk ? '<p class="small" style="margin:0">Break time. Did you finish it?</p>' : '') +
      '<div class="row">' + (G.gd ? '<button class="btn sm" data-act="rm-gnew">Set the next goal</button><button class="btn sm ghost" data-act="rm-gdone">Not done yet</button>' : '<button class="btn sm primary" data-act="rm-gdone">Mark as done</button><button class="btn sm ghost" data-act="rm-gedit">Change</button>') + '</div></div>';
  }
  return '<div class="card stack rmgoal"><div class="card-h"><h2>Check-in</h2><span class="small muted">Everyone in the room sees it</span></div>' +
    '<p class="small muted" style="margin:0">What will you work on this session?</p>' +
    '<div class="chips" role="group" aria-label="Goal">' + RM_GOALS.map(([k, n]) => '<button class="chip" data-act="rm-gset" data-v="' + k + '" aria-pressed="' + (G.g === k) + '">' + n + '</button>').join('') + '</div>' +
    (cam ? '<form class="row" data-form="rm-goal" style="align-items:flex-end"><label class="f" style="flex:1;min-width:180px">Or type your own<input name="g" maxlength="60" autocomplete="off" placeholder="e.g. P3 integration, exercise 5B" value="' + esc(RM_GOALS.some(x => x[0] === G.g) ? '' : G.g) + '"></label><button class="btn" type="submit">Set</button></form>' : '') +
    (lab ? '<div class="row"><button class="linkbtn small" data-act="rm-gcancel">Keep “' + esc(lab) + '”</button></div>' : '') + '</div>';
}
function rmGoalLine(m){
  const lab = m && m.g ? rmGoalLabel(m.g, RM.room ? RM.room.kind : 'public') : '';
  return lab ? '<div class="small rmgline' + (m.gd ? ' done' : '') + '"><span aria-hidden="true">' + (m.gd ? '✓' : '◎') + '</span> <span>' + esc(lab) + '</span>' + (m.gd ? ' <span class="sr-only">(done)</span>' : '') + '</div>' : '';
}

/* ============================================================
   Frozen video: if someone's camera is on and their tile is on your screen, but no new frame has arrived for
   3 seconds (or the connection dropped), their tile shows "Reconnecting…" instead of a frozen picture.
   ============================================================ */
RM.lastFrame = {}; RM.stale = {};
function rmFrameWatch(uid, v){
  if (v._rmWatch) return; v._rmWatch = true;
  const mark = () => { RM.lastFrame[uid] = performance.now(); };
  if (v.requestVideoFrameCallback){ const f = () => { mark(); v.requestVideoFrameCallback(f); }; v.requestVideoFrameCallback(f); }
  else { let t = -1; setInterval(() => { if (v.currentTime !== t){ t = v.currentTime; mark(); } }, 500); }
}
function rmStaleCheck(){
  if (!RM.room || RM.room.kind !== 'cam' || document.hidden) return;
  const now = performance.now(); let changed = false;
  for (const uid of Object.keys(RM.room.m || {})){
    if (uid === rmUid()) continue;
    const m = RM.room.m[uid], p = RM.pcs[uid], v = RM.vids[uid];
    const slot = document.querySelector('[data-rmvid="' + CSS.escape(uid) + '"]');
    const expect = rmFresh(m) && m.cam && !RM.hidden[uid] && !(RM.nv || []).includes(uid) && !!slot && !!p;
    let stale = false;
    if (expect){
      if (p.state === 'disconnected') stale = true;
      else if (p.state === 'connected' && v && RM.lastFrame[uid]) stale = now - RM.lastFrame[uid] > 3000;
    }
    if (!!RM.stale[uid] !== stale){ RM.stale[uid] = stale; changed = true; }
  }
  if (changed) rmStaleApply();
}
function rmStaleApply(){
  (document.getElementById('rmfull') || document).querySelectorAll('[data-rmvid]').forEach(slot => {
    const uid = slot.dataset.rmvid, on = uid !== 'me' && !!RM.stale[uid];
    slot.classList.toggle('stale', on);
    let lab = slot.querySelector('.rmrecon');
    if (on){
      if (!lab){ lab = document.createElement('span'); lab.className = 'rmrecon'; lab.setAttribute('role', 'status'); slot.appendChild(lab); }
      const first = !slot.classList.contains('on'), th = typeof isTH === 'function' && isTH();   // no picture yet = still connecting
      lab.textContent = first ? (th ? 'กำลังเชื่อมต่อ…' : 'Connecting…') : (th ? 'กำลังเชื่อมต่อใหม่…' : 'Reconnecting…');
    }
    else if (lab) lab.remove();
  });
}
setInterval(rmStaleCheck, 1000);

/* ============================================================
   Check-in chime: a soft two-note tone when someone else ticks their goal done. Off unless you turn it on.
   ============================================================ */
function rmChime(){
  const c = rmxCtx(); if (!c) return;
  const t = c.currentTime, vol = Math.max(.05, Math.min(1, rmvPrefs().vol || .6)) * .18;
  [[784, 0], [1047, .14]].forEach(([f, d]) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(0, t + d); g.gain.linearRampToValueAtTime(vol, t + d + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d + .9);
    o.connect(g); g.connect(c.destination); o.start(t + d); o.stop(t + d + 1);
  });
}
function rmGoalWatch(prev, next){
  if (!rmvPrefs().gchime || !prev || !next) return;
  const me = rmUid();
  const fin = Object.keys(next).some(uid => uid !== me && next[uid] && next[uid].gd && next[uid].g && prev[uid] && !prev[uid].gd);
  if (fin && Date.now() - (RM.chimeAt || 0) > 2000){ RM.chimeAt = Date.now(); rmChime(); }
}

/* ============================================================
   Owner controls: lock the room, run the timer for everyone, turn someone's camera off.
   Room fields (owner only): lock (bool), tm { ph, run, end, left, at }, coff [uids].
   ============================================================ */
function rmIsOwner(){ return !!(RM.room && RM.room.owner === rmUid()); }
function rmOwnerTm(){ return { ph: T.phase, run: !!T.running, end: T.running ? T.endsAt : 0, left: T.running ? 0 : Math.round(remainMs()), len: phaseLen(), at: Date.now() }; }
async function rmOwnerSet(patch){
  if (!rmIsOwner()) return;
  try { await rmDb().setRoom(RM.rid, patch); } catch(e){ toast('Couldn’t update the room. Check your connection.'); }
}
function rmLead(what){
  if (!rmIsOwner()) return;
  if (what === 'focus' || what === 'break'){ T.phase = what; T.running = false; T.remain = phaseLen(); timerStart(); }
  else if (what === 'pause'){ if (T.running) timerPause(); }
  else if (what === 'resume'){ if (!T.running) timerStart(); }
  rmOwnerSet({ tm: rmOwnerTm() });
  toast(what === 'pause' ? 'Paused for everyone' : what === 'resume' ? 'Resumed for everyone' : (what === 'focus' ? 'Focus' : 'Break') + ' started for everyone');
  render();
}
/* members: follow the owner's timer unless they've turned that off */
function rmFollowOn(){ return rmvPrefs().follow !== 0; }
function rmApplyTm(tm, quiet){
  if (!tm || rmIsOwner() || !rmFollowOn()) return;
  if (tm.run && tm.end <= Date.now()) return;
  T.phase = tm.ph === 'break' ? 'break' : 'focus';
  if (tm.run){ T.running = true; T.endsAt = tm.end; T.remain = Math.max(0, tm.end - Date.now()); }
  else { T.running = false; T.remain = Math.max(0, +tm.left || 0); }
  saveT(); try { tick(true); } catch(e){}
  if (!quiet) toast(tm.run ? (T.phase === 'focus' ? 'The room started focus together' : 'The room is on a break') : 'The room timer is paused');
}
function rmOwnerWatch(prev, d){
  const me = rmUid();
  // shared timer
  const tm = d.tm;
  if (tm && tm.at !== RM.tmSeen){ const first = RM.tmSeen === undefined; RM.tmSeen = tm.at; if (!first || (tm.run && tm.end > Date.now())) rmApplyTm(tm, first); }
  // camera turned off by the owner
  const off = (d.coff || []).includes(me);
  if (off && RM.cam){ rmCamOff(true); rmBeat(); toast('The room owner turned your camera off.'); }
  RM.camBlocked = off;
}
function rmOwnerPanel(){
  const r = RM.room, me = rmUid(), mem = rmMembers(r).filter(m => m.id !== me), cam = r.kind === 'cam', tm = r.tm, g = r.goal;
  const run = T.running;
  return '<div class="card stack rmpanel rmowner"><div class="card-h"><h2>Owner controls</h2>' + (RM.full ? '<button class="linkbtn small" data-act="rm-panel" data-v="owner">Done</button>' : '<span class="small muted">Only you see these</span>') + '</div>' +
    '<label class="row small" style="gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-act="rm-lock"' + (r.lock ? ' checked' : '') + '> <span><b>Lock the room.</b> People already in can stay and come back; no one new can join.</span></label>' +
    '<div><div class="small muted" style="margin-bottom:6px">Timer for everyone</div><div class="row">' +
      '<button class="btn sm primary" data-act="rm-lead" data-v="focus">Start focus for everyone</button>' +
      '<button class="btn sm" data-act="rm-lead" data-v="break">Start a break for everyone</button>' +
      (run ? '<button class="btn sm ghost" data-act="rm-lead" data-v="pause">Pause everyone</button>' : (T.remain !== null && T.remain < phaseLen() ? '<button class="btn sm ghost" data-act="rm-lead" data-v="resume">Resume everyone</button>' : '')) +
    '</div><p class="small muted" style="margin:6px 0 0">Uses your focus and break lengths. People can still run their own timer if they turn off “Follow the room timer”.</p></div>' +
    '<div><div class="small muted" style="margin-bottom:6px">Room goal</div><div class="row" style="align-items:flex-end"><label class="f" style="max-width:220px">Focus sessions together<select id="rm-goal-n">' + [2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map(n => '<option value="' + n + '"' + (n === (RM.goalN || (g ? g.t : 4)) ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label>' +
      '<button class="btn sm" data-act="rm-goalset">' + (g ? 'Start a new goal' : 'Set goal') + '</button>' + (g ? '<button class="btn sm ghost" data-act="rm-goalclear">Remove goal</button>' : '') + '</div></div>' +
    (cam ? '<div><div class="small muted" style="margin-bottom:6px">Cameras</div>' + (mem.length ? '<div class="list">' + mem.map(m => { const blocked = (r.coff || []).includes(m.id); return '<div class="li"><div class="grow">' + esc(m.n || 'A student') + '<div class="small muted">' + (blocked ? 'Camera turned off by you' : m.cam ? 'Camera on' : 'Camera off') + '</div></div>' + (blocked ? '<button class="btn sm" data-act="rm-coff" data-id="' + esc(m.id) + '" data-v="0">Allow camera</button>' : m.cam ? '<button class="btn sm ghost" data-act="rm-coff" data-id="' + esc(m.id) + '" data-v="1">Turn camera off</button>' : '') + '</div>'; }).join('') + '</div>' : '<p class="small muted" style="margin:0">No one else is here yet.</p>') + '</div>' : '') +
  '</div>';
}

/* ============================================================
   Room goal and weekly leaderboard. Each person keeps one small entry in tl:
   { n name, w week (Monday's date), min minutes this week in this room, ga goal it counts towards, gc sessions for it, h hidden from the leaderboard }
   ============================================================ */
function rmWeek(d){ const x = parseD(d || todayStr()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return ymd(x.getFullYear(), x.getMonth(), x.getDate()); }
function rmTallyMine(){ const r = RM.room; return r && r.tl ? r.tl[rmUid()] || null : null; }
function rmTallyWrite(t){ if (!RM.rid) return; RM.room.tl = Object.assign({}, RM.room.tl || {}, { [rmUid()]: t }); return rmDb().setTally(RM.rid, rmUid(), t).catch(() => {}); }
function rmTallyBase(){
  const r = RM.room, cur = rmTallyMine() || {}, wk = rmWeek(), g = r.goal;
  return { n: (r.kind === 'public' ? rmPubName() : String(prof().name || 'A student')).slice(0, 40), w: wk, min: cur.w === wk ? +cur.min || 0 : 0,
    ga: g ? g.at : 0, gc: g && cur.ga === g.at ? +cur.gc || 0 : 0, h: !!rmvPrefs().lbHide };
}
function rmTallyAdd(minutes){
  if (!RM.rid || !RM.room || minutes < 1) return;
  const t = rmTallyBase(); t.min = Math.min(10080, t.min + Math.round(minutes));
  if (RM.room.goal && minutes >= 10) t.gc = Math.min(100, t.gc + 1);
  rmTallyWrite(t); render();
}
/* the main script loads after this file, so wrap logFocus once everything has run */
window.addEventListener('DOMContentLoaded', () => { if (typeof logFocus === 'function' && !logFocus._rm){ const _logFocus0 = logFocus; logFocus = function(minutes){ _logFocus0(minutes); try { rmTallyAdd(minutes); } catch(e){} }; logFocus._rm = 1; } });
function rmGoalProgress(){
  const r = RM.room, g = r && r.goal; if (!g) return null;
  const tl = r.tl || {}; let done = 0, who = 0;
  Object.keys(tl).forEach(k => { const x = tl[k]; if (x && x.ga === g.at && x.gc > 0){ done += x.gc; who++; } });
  return { t: g.t, done, who, at: g.at };
}
function rmGoalRoomCard(){
  const P = rmGoalProgress(); if (!P) return '';
  const pct = Math.min(100, Math.round(P.done / P.t * 100)), hit = P.done >= P.t;
  return '<div class="card stack rmrgoal' + (hit ? ' hit' : '') + '"><div class="card-h"><h2>Room goal</h2><span class="small muted">Set ' + fmtTimeHM(P.at) + '</span></div>' +
    '<div class="rmgbar" role="progressbar" aria-valuemin="0" aria-valuemax="' + P.t + '" aria-valuenow="' + Math.min(P.done, P.t) + '" aria-label="Room goal"><i style="width:' + pct + '%"></i></div>' +
    '<p class="small" style="margin:0"><b>' + Math.min(P.done, P.t) + ' of ' + P.t + ' focus sessions</b>' + (P.who ? ' from ' + P.who + ' ' + (P.who === 1 ? 'person' : 'people') : '') + (hit ? '. Goal reached. Well done, everyone.' : '. Every focus block of 10 minutes or more that anyone here finishes counts.') + '</p></div>';
}
function fmtTimeHM(ms){ const d = new Date(ms); return pad(d.getHours()) + ':' + pad(d.getMinutes()); }
function rmBoardCard(){
  const r = RM.room, tl = r.tl || {}, wk = rmWeek(), me = rmUid();
  const rows = Object.keys(tl).map(k => Object.assign({ id: k }, tl[k])).filter(x => x.w === wk && x.min > 0 && !x.h).sort((a, b) => b.min - a.min).slice(0, 10);
  const mine = tl[me], hide = !!rmvPrefs().lbHide;
  return '<div class="card stack rmboard"><div class="card-h"><h2>This week in this room</h2><span class="small muted">Focus time from Monday</span></div>' +
    (rows.length ? '<ol class="rmrank">' + rows.map((x, i) => '<li class="' + (x.id === me ? 'me' : '') + '"><span class="rk">' + (i + 1) + '</span><span class="grow">' + esc(x.n || 'A student') + (x.id === me ? ' <span class="small muted">(you)</span>' : '') + '</span><b class="notr">' + fmtMin(x.min) + '</b></li>').join('') + '</ol>'
      : '<p class="small muted" style="margin:0">No focus time logged in this room this week yet. Finish a focus block here to get on the board.</p>') +
    (hide && mine && mine.w === wk && mine.min ? '<p class="small muted" style="margin:0">You’re hidden. Your time this week here: ' + fmtMin(mine.min) + '.</p>' : '') +
    '<label class="row small" style="gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-act="rm-lbshow"' + (hide ? '' : ' checked') + '> <span>Show me on this leaderboard</span></label></div>';
}
/* the owner keeps the list small: drop entries from earlier weeks once there are many */
function rmTallyTidy(){
  const r = RM.room; if (!rmIsOwner() || !r.tl) return;
  const keys = Object.keys(r.tl); if (keys.length < 40) return;
  const wk = rmWeek(), g = r.goal, old = keys.filter(k => r.tl[k].w !== wk && !(g && r.tl[k].ga === g.at));
  if (old.length) rmDb().dropTally(RM.rid, old.slice(0, 30)).catch(() => {});
}

/* ============================================================
   Scheduled study sessions (planned in the calendar, see meet k:'room'): a camera room made in advance.
   ============================================================ */
async function rmMakeRoom(name){
  if (!rmAvailable()) throw new Error('signin');
  const id = rmCode(8);
  await rmDb().create(id, { name: String(name || '').trim().slice(0, 40) || 'Study session', kind: 'cam', owner: rmUid(), at: Date.now(), ban: [], m: {} });
  return id;
}
function rmSessWhen(m){ const x = parseD(m.d), a = String(m.tm || '00:00').split(':'); x.setHours(+a[0], +a[1], 0, 0); return x.getTime(); }
function rmSessOpen(m){ const s = rmSessWhen(m), now = Date.now(); return now >= s - 15 * 60000 && now <= s + (+m.dur || 60) * 60000; }
function rmSessions(){ return (typeof allMeets === 'function' ? allMeets() : []).filter(m => m.k === 'room' && (m.host === 'me' || m.rsp === 'yes' || !m.rsp) && rmSessWhen(m) + (+m.dur || 60) * 60000 > Date.now()); }
function rmSessCard(){
  const list = rmSessions().slice(0, 4);
  return '<div class="card stack"><div class="card-h"><h2>Study sessions</h2><button class="btn sm" data-act="rm-sessplan">Plan a session</button></div>' +
    (list.length ? list.map(m => '<div><div class="small muted">' + fmtDate(m.d, {weekday:'short', day:'numeric', month:'short'}) + '</div>' + meetRow(m) + '</div>').join('')
      : '<p class="small muted" style="margin:0">Pick a time, invite friends, and a camera room is made for it. It goes into everyone’s calendar, and the room opens 15 minutes before.</p>') + '</div>';
}
/* a reminder on screen when a session you're in is about to start */
setInterval(() => {
  try {
    const now = Date.now(); RM.sessToast = RM.sessToast || {};
    rmSessions().forEach(m => { if (m.host !== 'me' && m.rsp !== 'yes') return; const s = rmSessWhen(m); if (now >= s - 5 * 60000 && now < s + 5 * 60000 && !RM.sessToast[m.id] && RM.rid !== m.rm){ RM.sessToast[m.id] = 1; toast('Study session “' + m.n + '” starts at ' + m.tm + '. Join it from Rooms or your calendar.'); } });
  } catch(e){}
}, 30000);

/* ============================================================
   Blur my background. Uses the device's own background blur when the browser offers it (no extra work);
   otherwise MediaPipe Selfie Segmentation (Apache-2.0, files in vendor/mediapipe, loaded only when turned on)
   finds the person in each frame on this device and the rest is blurred before it's sent. Off by default.
   ============================================================ */
RM.blur = { mode: '', state: '', ss: null };
function rmBlurOn(){ return !!rmvPrefs().blur; }
function rmBlurMP(){ return rmBlurOn() && RM.blur.mode === 'mp'; }
function rmLoadScript(src){ return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
async function rmBlurStart(){
  if (!RM.cam || !rmBlurOn()) return;
  const tr = RM.cam.getVideoTracks()[0];
  // 1. built-in blur (some Chrome and Edge set-ups)
  try {
    const caps = tr.getCapabilities ? tr.getCapabilities() : {};
    if (Array.isArray(caps.backgroundBlur) && caps.backgroundBlur.includes(true)){
      await tr.applyConstraints({ advanced: [{ backgroundBlur: true }] });
      if (tr.getSettings().backgroundBlur){ RM.blur.mode = 'native'; RM.blur.state = 'on'; rmRefreshAdj(); return; }
    }
  } catch(e){}
  // 2. MediaPipe on this device
  RM.blur.mode = 'mp'; RM.blur.state = 'loading'; rmRefreshAdj();
  try {
    if (!RM.blur.ss){
      if (!window.SelfieSegmentation) await rmLoadScript('vendor/mediapipe/selfie_segmentation.js');
      const ss = new window.SelfieSegmentation({ locateFile: f => 'vendor/mediapipe/' + f });
      ss.setOptions({ modelSelection: 1, selfieMode: false });
      ss.onResults(rmBlurResults);
      await ss.initialize();
      RM.blur.ss = ss;
    }
    RM.blur.state = 'on';
  } catch(e){ RM.blur.state = 'error'; }
  await rmCamPipe(); rmRefreshAdj();
}
async function rmBlurStop(){
  const tr = RM.cam && RM.cam.getVideoTracks()[0];
  if (RM.blur.mode === 'native' && tr){ try { await tr.applyConstraints({ advanced: [{ backgroundBlur: false }] }); } catch(e){} }
  RM.blur.mode = ''; RM.blur.state = '';
  if (RM.pipe) RM.pipe.bcReady = false;
  await rmCamPipe(); rmRefreshAdj();
}
function rmRefreshAdj(){ if (RM.panel === 'cam'){ if (RM.full) rmFullRender(); else render(); } else rmPlace(); }
/* MediaPipe result: person sharp, everything else from a tiny copy scaled back up (a strong, cheap blur) */
function rmBlurResults(res){
  const p = RM.pipe; if (!p || !p.on) return;
  const w = res.image.width, h = res.image.height; if (!w || !h) return;
  if (!p.bc){ p.bc = document.createElement('canvas'); p.bx = p.bc.getContext('2d'); p.tc = document.createElement('canvas'); p.tx = p.tc.getContext('2d'); }
  if (p.bc.width !== w || p.bc.height !== h){ p.bc.width = w; p.bc.height = h; p.tc.width = Math.max(8, Math.round(w / 14)); p.tc.height = Math.max(6, Math.round(h / 14)); }
  p.tx.drawImage(res.image, 0, 0, p.tc.width, p.tc.height);
  const x = p.bx; x.save(); x.clearRect(0, 0, w, h);
  x.drawImage(res.segmentationMask, 0, 0, w, h);
  x.globalCompositeOperation = 'source-in'; x.drawImage(res.image, 0, 0, w, h);
  x.globalCompositeOperation = 'destination-over'; x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; x.drawImage(p.tc, 0, 0, w, h);
  x.restore(); p.bcReady = true;
}
/* until the first result is in, send a fully blurred frame so the room is never shown by accident */
function rmBlurFallback(src, w, h){
  const p = RM.pipe; if (!p.tc){ p.tc = document.createElement('canvas'); p.tx = p.tc.getContext('2d'); }
  p.tc.width = Math.max(8, Math.round(w / 14)); p.tc.height = Math.max(6, Math.round(h / 14));
  p.tx.drawImage(src, 0, 0, p.tc.width, p.tc.height); return p.tc;
}
