/* ============================================================
   Study room views and sounds. Everything here is drawn and played by the browser itself:
   the scenes are SVG/CSS made for this site, and the sounds are generated live with the
   Web Audio API, so there are no outside files, links or licences, and it all works offline.
   Each person picks their own view and sounds; nobody else sees or hears them.
   ============================================================ */
const RMV_SCENES = [['plain', 'Midnight'], ['library', 'Library'], ['rain', 'Rainy window'], ['night', 'Night sky'], ['dawn', 'Sunrise'], ['cafe', 'Café']];
const RMX_SOUNDS = [['lofi', '🎵', 'Lo-fi beat'], ['rain', '🌧', 'Rain'], ['cafe', '☕', 'Café'], ['fire', '🔥', 'Fireplace'], ['waves', '🌊', 'Waves'], ['brown', '〰', 'Brown noise']];
function rmvPrefs(){ state.roomPrefs = Object.assign({ scene: 'library', layout: 'focus', vol: 0.6, mix: {} }, state.roomPrefs || {}); return state.roomPrefs; }

/* ---------- scenes ---------- */
function rmvRng(seed){ let s = seed % 2147483647 || 1; return () => (s = s * 16807 % 2147483647) / 2147483647; }
const RMV_CACHE = {};
function rmvScene(id){
  if (RMV_CACHE[id]) return RMV_CACHE[id];
  const R = rmvRng(id.length * 7919 + id.charCodeAt(0) * 31), f = n => Math.round(n * 10) / 10;
  const svg = (body, ar) => '<svg class="rmsvg" viewBox="0 0 400 240" preserveAspectRatio="' + (ar || 'xMidYMid slice') + '" aria-hidden="true">' + body + '</svg>';
  let h = '';
  if (id === 'library'){
    const pal = ['#7a2e2e', '#2f4f3e', '#3b4a6b', '#8a6a3a', '#5b3a52', '#b8955a', '#4a5a3a', '#6b3f2a', '#2e3f55'];
    let b = '';
    [52, 122, 192].forEach(y => {
      let x = 6;
      while (x < 394){ const w = 6 + Math.floor(R() * 9), ht = 34 + Math.floor(R() * 22), lean = R() < .06; b += '<rect x="' + x + '" y="' + (y - ht) + '" width="' + w + '" height="' + ht + '" rx="1" fill="' + pal[Math.floor(R() * pal.length)] + '"' + (lean ? ' transform="rotate(-8 ' + x + ' ' + y + ')"' : '') + ' opacity=".9"/>'; if (R() < .5) b += '<rect x="' + (x + 1) + '" y="' + (y - ht + 6) + '" width="' + (w - 2) + '" height="2" fill="#e8d3a8" opacity=".35"/>'; x += w + (R() < .08 ? 14 : 1); }
      b += '<rect x="0" y="' + y + '" width="400" height="7" fill="#3a2717"/><rect x="0" y="' + (y + 7) + '" width="400" height="3" fill="#1c130b" opacity=".7"/>';
    });
    h = svg(b) + '<div class="rmglow lamp"></div>';
  } else if (id === 'rain'){
    let lights = '', drops = '', beads = '';
    for (let i = 0; i < 26; i++) lights += '<circle cx="' + f(R() * 400) + '" cy="' + f(120 + R() * 110) + '" r="' + f(4 + R() * 12) + '" fill="' + ['#f3c26b', '#e98a5c', '#8fb7e8', '#f6e3a8'][Math.floor(R() * 4)] + '" opacity="' + f(.15 + R() * .35) + '"/>';
    for (let i = 0; i < 40; i++) beads += '<circle cx="' + f(R() * 400) + '" cy="' + f(R() * 240) + '" r="' + f(.8 + R() * 2.2) + '" fill="#dbe7f5" opacity="' + f(.15 + R() * .3) + '"/>';
    for (let i = 0; i < 46; i++) drops += '<i style="left:' + f(R() * 100) + '%;animation-duration:' + f(.55 + R() * .6) + 's;animation-delay:-' + f(R() * 2) + 's;opacity:' + f(.25 + R() * .45) + '"></i>';
    h = svg('<g filter="url(#rmblur)">' + lights + '</g><defs><filter id="rmblur"><feGaussianBlur stdDeviation="5"/></filter></defs>' + beads + '<path d="M200 0V240M0 120H400" stroke="#0f151f" stroke-width="7"/><rect x="0" y="0" width="400" height="240" fill="none" stroke="#0f151f" stroke-width="16"/>') + '<div class="rmdrops">' + drops + '</div>';
  } else if (id === 'night'){
    let st = '';
    for (let i = 0; i < 90; i++) st += '<circle class="' + (R() < .25 ? 'tw' : '') + '" style="animation-delay:-' + f(R() * 4) + 's" cx="' + f(R() * 400) + '" cy="' + f(R() * 170) + '" r="' + f(.3 + R() * 1.1) + '" fill="#fff" opacity="' + f(.4 + R() * .6) + '"/>';
    h = svg(st + '<circle cx="318" cy="56" r="20" fill="#f4ecd2"/><circle cx="310" cy="50" r="4" fill="#dcd2b4" opacity=".6"/><circle cx="325" cy="64" r="3" fill="#dcd2b4" opacity=".5"/>' +
      '<path d="M0 200 Q60 170 120 190 T250 180 T400 175 V240 H0Z" fill="#141b33"/><path d="M0 215 Q90 195 170 212 T330 205 T400 210 V240 H0Z" fill="#0b1022"/>');
  } else if (id === 'dawn'){
    h = svg('<circle cx="200" cy="168" r="46" fill="#ffe2a8" opacity=".55"/><circle cx="200" cy="168" r="26" fill="#fff3d6"/>' +
      '<g class="rmcloud"><ellipse cx="90" cy="60" rx="46" ry="9" fill="#fff" opacity=".45"/><ellipse cx="300" cy="44" rx="60" ry="8" fill="#fff" opacity=".35"/></g>' +
      '<path d="M0 175 L60 130 L110 160 L170 110 L230 165 L290 120 L350 150 L400 125 V240 H0Z" fill="#8f7aa3" opacity=".75"/>' +
      '<path d="M0 200 L70 165 L130 190 L200 150 L270 195 L330 170 L400 185 V240 H0Z" fill="#5f5482"/><path d="M0 225 Q120 200 230 222 T400 215 V240 H0Z" fill="#3d3660"/>');
  } else if (id === 'cafe'){
    let bk = '';
    for (let i = 0; i < 22; i++) bk += '<circle cx="' + f(30 + R() * 340) + '" cy="' + f(20 + R() * 110) + '" r="' + f(5 + R() * 13) + '" fill="' + ['#ffcf7a', '#ffb36b', '#ffe6a6'][Math.floor(R() * 3)] + '" opacity="' + f(.18 + R() * .35) + '"/>';
    h = svg('<rect x="24" y="12" width="352" height="132" rx="6" fill="#2a2433"/><g filter="url(#rmblur2)">' + bk + '</g><defs><filter id="rmblur2"><feGaussianBlur stdDeviation="4"/></filter></defs><path d="M200 12V144" stroke="#1d150f" stroke-width="5"/><rect x="24" y="12" width="352" height="132" rx="6" fill="none" stroke="#1d150f" stroke-width="8"/>' +
      '<rect x="0" y="182" width="400" height="58" fill="#4a3220"/><rect x="0" y="182" width="400" height="5" fill="#6b4a2f"/>' +
      '<g transform="translate(-70 0)"><path d="M300 158 h40 v18 a20 20 0 0 1 -40 0z" fill="#efe6d8"/><path d="M340 162 a8 8 0 0 1 0 14" stroke="#efe6d8" stroke-width="4" fill="none"/><ellipse cx="320" cy="190" rx="34" ry="5" fill="#d9cdbb"/>' +
      '<g class="rmsteam" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5"><path d="M312 150 q-6 -10 0 -20 t0 -20"/><path d="M326 150 q6 -10 0 -20 t0 -20"/></g></g>' +
      '<rect x="120" y="166" width="70" height="16" rx="2" fill="#2f4f3e"/><rect x="126" y="154" width="60" height="12" rx="2" fill="#7a2e2e"/>');
  }
  return RMV_CACHE[id] = h;
}
function rmvSwatch(id){ return '<span class="rmscene sc-' + id + ' rmswatch-sc" aria-hidden="true">' + rmvScene(id) + '</span>'; }

/* ---------- sounds (Web Audio) ---------- */
const RMX = { ctx: null, master: null, live: {}, noise: {} };
function rmxCtx(){
  if (!RMX.ctx){
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    RMX.ctx = new AC(); RMX.master = RMX.ctx.createGain(); RMX.master.gain.value = rmvPrefs().vol; RMX.master.connect(RMX.ctx.destination);
  }
  if (RMX.ctx.state === 'suspended') RMX.ctx.resume();
  return RMX.ctx;
}
function rmxNoise(kind){
  if (RMX.noise[kind]) return RMX.noise[kind];
  const c = RMX.ctx, n = c.sampleRate * 4, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
  let last = 0;
  for (let i = 0; i < n; i++){ const w = Math.random() * 2 - 1; if (kind === 'brown'){ last = (last + .02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w; }
  return RMX.noise[kind] = b;
}
function rmxSrc(kind){ const s = RMX.ctx.createBufferSource(); s.buffer = rmxNoise(kind); s.loop = true; s.loopStart = Math.random(); s.start(0, Math.random() * 3); return s; }
function rmxFilter(type, freq, q){ const f = RMX.ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; if (q) f.Q.value = q; return f; }
function rmxChain(nodes){ for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]); return nodes[nodes.length - 1]; }
function rmxLfo(target, rate, depth){ const o = RMX.ctx.createOscillator(), g = RMX.ctx.createGain(); o.frequency.value = rate; g.gain.value = depth; o.connect(g); g.connect(target); o.start(); return o; }
function rmxBurst(t, dur, freq, gain, type, out){
  const c = RMX.ctx, s = c.createBufferSource(), f = rmxFilter(type || 'highpass', freq), g = c.createGain();
  s.buffer = rmxNoise('white'); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random() * 3, dur + .05);
}
function rmxTone(t, freq, dur, gain, type, out, attack){
  const c = RMX.ctx, o = c.createOscillator(), g = c.createGain();
  o.type = type || 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(gain, t + (attack || .01)); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + .05);
}
const RMX_MAKE = {
  rain(out){
    const a = rmxSrc('white'), b = rmxSrc('white'), g1 = RMX.ctx.createGain(), g2 = RMX.ctx.createGain();
    g1.gain.value = .22; g2.gain.value = .12;
    rmxChain([a, rmxFilter('highpass', 600), rmxFilter('lowpass', 7000), g1, out]);
    rmxChain([b, rmxFilter('bandpass', 2600, .8), g2, out]);
    const l = rmxLfo(g2.gain, .23, .06);
    return () => { [a, b, l].forEach(x => { try { x.stop(); } catch(e){} }); };
  },
  brown(out){ const a = rmxSrc('brown'), g = RMX.ctx.createGain(); g.gain.value = .5; rmxChain([a, rmxFilter('lowpass', 1200), g, out]); return () => { try { a.stop(); } catch(e){} }; },
  waves(out){
    const a = rmxSrc('brown'), g = RMX.ctx.createGain(); g.gain.value = .35;
    rmxChain([a, rmxFilter('lowpass', 900), g, out]);
    const l = rmxLfo(g.gain, .09, .3);
    return () => { [a, l].forEach(x => { try { x.stop(); } catch(e){} }); };
  },
  fire(out){
    const a = rmxSrc('brown'), g = RMX.ctx.createGain(); g.gain.value = .45;
    rmxChain([a, rmxFilter('lowpass', 500), g, out]);
    let on = true;
    const pop = () => { if (!on) return; const t = RMX.ctx.currentTime + .02; rmxBurst(t, .02 + Math.random() * .05, 1500 + Math.random() * 2500, .15 + Math.random() * .45, 'highpass', out); setTimeout(pop, 60 + Math.random() * (Math.random() < .3 ? 900 : 260)); };
    pop();
    return () => { on = false; try { a.stop(); } catch(e){} };
  },
  cafe(out){
    const a = rmxSrc('brown'), b = rmxSrc('white'), g = RMX.ctx.createGain(), g2 = RMX.ctx.createGain();
    g.gain.value = .55; g2.gain.value = .03;
    rmxChain([a, rmxFilter('bandpass', 520, .6), g, out]);
    rmxChain([b, rmxFilter('bandpass', 1400, 1.2), g2, out]);
    const l = rmxLfo(g.gain, .31, .18);
    let on = true;
    const clink = () => { if (!on) return; const t = RMX.ctx.currentTime + .02, fq = 2200 + Math.random() * 1600; rmxTone(t, fq, .5, .05, 'sine', out); rmxTone(t, fq * 2.7, .25, .02, 'sine', out); setTimeout(clink, 2500 + Math.random() * 6000); };
    setTimeout(clink, 1500);
    return () => { on = false; [a, b, l].forEach(x => { try { x.stop(); } catch(e){} }); };
  },
  lofi(out){
    // a slow four-chord loop with a soft beat, a little melody and vinyl crackle, made live
    const c = RMX.ctx, bpm = 72, beat = 60 / bpm, lp = rmxFilter('lowpass', 1600), bus = c.createGain();
    bus.gain.value = .9; lp.connect(bus); bus.connect(out);
    const hz = m => 440 * Math.pow(2, (m - 69) / 12);
    const chords = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]];   // Fmaj7 Em7 Dm7 Cmaj7
    const scale = [72, 74, 76, 79, 81, 84];
    const vin = rmxSrc('white'), vg = c.createGain(); vg.gain.value = .006; rmxChain([vin, rmxFilter('bandpass', 3000, .5), vg, out]);
    let next = c.currentTime + .1, step = 0, on = true;
    const tick = () => {
      if (!on) return;
      while (next < c.currentTime + .4){
        const bar = Math.floor(step / 8), s8 = step % 8, ch = chords[bar % 4];
        if (s8 === 0) ch.forEach((m, i) => { rmxTone(next + i * .015, hz(m), beat * 4.2, .045, 'triangle', lp, .25); });
        if (s8 === 0 || s8 === 5) rmxTone(next, hz(ch[0] - 12), beat * 1.6, .12, 'sine', lp, .02);
        if (s8 === 0 || s8 === 3 || s8 === 4){ const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(110, next); o.frequency.exponentialRampToValueAtTime(42, next + .18); g.gain.setValueAtTime(.35, next); g.gain.exponentialRampToValueAtTime(.0001, next + .3); o.connect(g); g.connect(bus); o.start(next); o.stop(next + .35); }
        if (s8 === 2 || s8 === 6) rmxBurst(next, .14, 1800, .09, 'bandpass', bus);
        rmxBurst(next + (s8 % 2 ? .06 : 0), .035, 7000, s8 % 2 ? .02 : .035, 'highpass', bus);
        if (Math.random() < .28) rmxTone(next, hz(scale[Math.floor(Math.random() * scale.length)]), beat * 1.5, .03, 'sine', lp, .05);
        if (Math.random() < .08) rmxBurst(next + Math.random() * beat, .01, 2500, .05, 'highpass', out);
        next += beat / 2; step++;
      }
      setTimeout(tick, 120);
    };
    tick();
    return () => { on = false; try { vin.stop(); } catch(e){} setTimeout(() => { try { bus.disconnect(); } catch(e){} }, 1500); };
  }
};
function rmxOn(id){ return !!RMX.live[id]; }
function rmxStart(id){
  if (RMX.live[id] || !RMX_MAKE[id] || !rmxCtx()) return;
  const g = RMX.ctx.createGain(), v = rmvPrefs().mix[id] == null ? .7 : rmvPrefs().mix[id];
  g.gain.setValueAtTime(.0001, RMX.ctx.currentTime); g.gain.linearRampToValueAtTime(v, RMX.ctx.currentTime + 1.2); g.connect(RMX.master);
  RMX.live[id] = { g, stop: RMX_MAKE[id](g) };
}
function rmxStop(id){
  const x = RMX.live[id]; if (!x) return; delete RMX.live[id];
  const t = RMX.ctx.currentTime; x.g.gain.cancelScheduledValues(t); x.g.gain.setValueAtTime(x.g.gain.value, t); x.g.gain.linearRampToValueAtTime(.0001, t + .6);
  setTimeout(() => { try { x.stop(); } catch(e){} try { x.g.disconnect(); } catch(e){} }, 700);
}
function rmxStopAll(){ Object.keys(RMX.live).forEach(rmxStop); }
function rmxVol(id, v){
  v = Math.max(0, Math.min(1, +v)); const p = rmvPrefs();
  if (id === 'master'){ p.vol = v; if (RMX.master) RMX.master.gain.setTargetAtTime(v, RMX.ctx.currentTime, .05); }
  else { p.mix[id] = v; const x = RMX.live[id]; if (x) x.g.gain.setTargetAtTime(Math.max(.0001, v), RMX.ctx.currentTime, .05); }
  try { saveLocal(); } catch(e){}
}
function rmxAny(){ return Object.keys(RMX.live).length > 0; }
document.addEventListener('input', e => { const el = e.target; if (el && el.dataset && el.dataset.rmvol) rmxVol(el.dataset.rmvol, el.value / 100); });
