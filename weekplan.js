/* ============================================================
   IAL Revise: weekly timetable (Plan → Weekly timetable)
   1. Periods: how many study periods a week for each subject, with a suggested minimum worked out from
      exam dates and topics still to secure, plus period length and the times you're free.
   2. Choose: three ready-made weeks built from those numbers.
   3. Edit: paint periods onto the week with a subject brush.
   4. Look: a theme (background, decoration, colours), then save. Saved timetables can be edited,
      re-themed and printed later. Stored in state.wt (synced like the rest of the student's data).
   ============================================================ */
const WT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WT_DAYS_LONG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WT_DEF_AVAIL = () => ({ 0: [['17:00', '21:00']], 1: [['17:00', '21:00']], 2: [['17:00', '21:00']], 3: [['17:00', '21:00']], 4: [['17:00', '20:00']], 5: [['09:00', '12:00'], ['14:00', '18:00']], 6: [['10:00', '12:00']] });

/* Themes: the timetable itself always sits on solid cells, so the decoration never goes behind any text. */
const WT_THEMES = {
  brass:  { name: 'Midnight & brass', bg: '#101a2e', ink: '#ffffff', soft: '#b8c0d0', line: '#24304a', cell: '#16223a', deco: '#c9a96e',
            cols: ['#c9a96e', '#7fa8d9', '#9dc7a0', '#d99a8f', '#b7a3dc', '#e0c36a', '#8fc9c4', '#d4a5c4'], art: 'lamp' },
  paper:  { name: 'Paper & pencil', bg: '#fbfaf6', ink: '#1f2430', soft: '#5d6474', line: '#dcdde3', cell: '#ffffff', deco: '#3d63a8', rule: '#e4e9f2',
            cols: ['#3d63a8', '#c4553d', '#2f8a63', '#8a4fb0', '#b98a12', '#1f8a9a', '#b04f7a', '#5a6b2e'], art: 'pencil' },
  garden: { name: 'Garden', bg: '#eef5ec', ink: '#1d2e22', soft: '#4c6253', line: '#cfe0cf', cell: '#ffffff', deco: '#4f8a5b',
            cols: ['#3f8a55', '#c9773f', '#5577b0', '#b0567a', '#8a7a2a', '#2f8a86', '#8a5bb0', '#b04848'], art: 'leaves' },
  ocean:  { name: 'Ocean', bg: '#0f3445', ink: '#ffffff', soft: '#b5d3dd', line: '#1d4f63', cell: '#14405a', deco: '#7fd0d8',
            cols: ['#7fd0d8', '#f2b880', '#a8d58f', '#f0a0b0', '#c3b4f0', '#f3dd8a', '#9fc0f2', '#e8a37a'], art: 'waves' },
  sakura: { name: 'Sakura', bg: '#fbf0f3', ink: '#3a2430', soft: '#6e5463', line: '#efd5de', cell: '#ffffff', deco: '#d2738f',
            cols: ['#c2507a', '#4f7fb3', '#4b8f6b', '#b07a2a', '#7d5bb0', '#2f8a8a', '#b04848', '#6a7a2a'], art: 'blossom' },
  space:  { name: 'Night sky', bg: '#14112b', ink: '#ffffff', soft: '#c4bfe6', line: '#2c2752', cell: '#1d1940', deco: '#f2d27a',
            cols: ['#f2d27a', '#8fb8f2', '#b9e29a', '#f29fb5', '#c7a6f2', '#7fe0d0', '#f2b07a', '#a6c8e6'], art: 'planets' }
};
function wtArt(kind, c){
  const g = s => '<svg class="wtart" viewBox="0 0 220 110" aria-hidden="true" focusable="false"><g fill="none" stroke="' + c + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + s + '</g></svg>';
  switch (kind){
    case 'lamp': return g('<path d="M110 102h96"/><path d="M168 102v-7M152 95h32"/><path d="M168 95l-30-44 36-30"/><circle cx="138" cy="51" r="2.4"/><path d="M174 21l-24-15 31-9z"/><rect x="72" y="94" width="44" height="8" rx="1.5"/><rect x="77" y="86" width="36" height="8" rx="1.5"/><circle cx="30" cy="20" r="1.2" fill="' + c + '"/><circle cx="80" cy="34" r="1" fill="' + c + '"/><circle cx="206" cy="12" r="1.2" fill="' + c + '"/>');
    case 'pencil': return g('<path d="M60 92l110-60 12 14-110 60-18 4z"/><path d="M170 32l12 14M60 92l12 14"/><path d="M20 70c14-10 26 10 40 0s26 10 40 0" stroke-opacity=".6"/><path d="M150 96h50M160 104h40" stroke-opacity=".5"/>');
    case 'leaves': return g('<path d="M30 104c40-10 80-40 110-90"/><path d="M60 92c-14-6-20-18-18-30 12 2 22 14 18 30zM88 74c-4-14 0-28 12-34 4 12-2 26-12 34zM112 50c6-12 18-18 30-16-4 12-16 18-30 16zM96 84c14-2 26 6 30 18-14 2-26-6-30-18z"/><circle cx="182" cy="30" r="12" stroke-opacity=".7"/>');
    case 'waves': return g('<path d="M10 70c20-14 40 14 60 0s40 14 60 0 40 14 60 0"/><path d="M10 88c20-14 40 14 60 0s40 14 60 0 40 14 60 0" stroke-opacity=".6"/><path d="M150 40c8-16 28-16 36 0" stroke-opacity=".8"/><path d="M168 40v-22l12 8-12 6"/><circle cx="60" cy="30" r="10" stroke-opacity=".7"/>');
    case 'blossom': return g('<path d="M20 30c50 10 90 30 180 60"/><path d="M90 52c10-20 30-24 40-14"/>' + [[60, 36], [120, 58], [170, 76], [100, 30]].map(([x, y]) => '<g transform="translate(' + x + ' ' + y + ')"><circle r="3"/>' + [0, 72, 144, 216, 288].map(a => '<ellipse cx="0" cy="-7" rx="3.5" ry="5.5" transform="rotate(' + a + ')"/>').join('') + '</g>').join(''));
    case 'planets': return g('<circle cx="160" cy="50" r="22"/><ellipse cx="160" cy="50" rx="40" ry="9" transform="rotate(-18 160 50)"/><circle cx="60" cy="74" r="9"/><path d="M30 20l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/><path d="M100 24l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/><circle cx="206" cy="94" r="1.2" fill="' + c + '"/><circle cx="20" cy="96" r="1.2" fill="' + c + '"/>');
  }
  return '';
}

function wtTextOn(hex){ const n = parseInt(String(hex).slice(1), 16), f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
  const L = .2126 * f(n >> 16 & 255) + .7152 * f(n >> 8 & 255) + .0722 * f(n & 255); return (1.05 / (L + .05)) >= ((L + .05) / .05) ? '#ffffff' : '#111111'; }
const WT_ABBR = { math: 'Maths', fm: 'F.Maths', phys: 'Phys', chem: 'Chem', bio: 'Bio', econ: 'Econ', geog: 'Geog', psych: 'Psych', hist: 'Hist', cs: 'CS', acc: 'Acc', bus: 'Bus', enlang: 'EngLa', enlit: 'EngLi', it: 'IT', law: 'Law', fre: 'Fre', ger: 'Ger', spa: 'Spa', ara: 'Ara', gre: 'Gre' };
function wtAbbr(sid){ return WT_ABBR[sid] || String(SUBJ[sid].short).slice(0, 5); }
function wtMin(t){ const a = String(t).split(':'); return (+a[0]) * 60 + (+a[1] || 0); }
function wtHM(m){ m = ((m % 1440) + 1440) % 1440; return pad(Math.floor(m / 60)) + ':' + pad(m % 60); }
function wtSubjects(){ return mySubjects().filter(s => s.units.some(u => takes(u.c))); }
function wtSaved(){ return state.wt && state.wt.grid ? state.wt : null; }
function wtBlank(){
  const per = {}; wtSubjects().forEach(s => { per[s.id] = wtSuggest(s.id, 45).rec; });
  return { per, len: 45, gap: 10, avail: WT_DEF_AVAIL(), maxDay: 4, off: 6, grid: [], theme: 'brass', name: 'My study week' };
}
function wtDraft(){ if (!ui.wt) ui.wt = { step: 1, d: JSON.parse(JSON.stringify(wtSaved() || wtBlank())), brush: '', opts: null }; return ui.wt; }

/* Suggested minimum: topics not yet secure (each needs about two periods: learn + practise), plus past papers
   (three periods each, four per unit sitting soon), spread over the weeks left before that subject's next exam. */
function wtSuggest(sid, len){
  const s = SUBJ[sid], t = todayStr(), units = s.units.filter(u => takes(u.c));
  let left = 0, papers = 0, next = '';
  units.forEach(u => {
    const ex = (state.exams || []).filter(e => e.u === u.c && e.d >= t).map(e => e.d).sort()[0];
    if (ex && (!next || ex < next)) next = ex;
    if (ex || !(state.exams || []).length) left += u.t.reduce((a, _, i) => a + (3 - Math.min(3, state.topics[topicId(u.c, i)] || 0)) / 3, 0);
    if (ex && daysBetween(t, ex) <= 70) papers += 4;
  });
  const days = next ? Math.max(7, daysBetween(t, next) - 7) : 150, weeks = days / 7;
  const need45 = left * 2 + papers * 3;                 // in 45-minute periods
  const k = 45 / (len || 45);
  const min = Math.max(1, Math.min(14, Math.ceil(need45 * k / weeks)));
  const rec = Math.max(min, Math.min(16, Math.ceil(min * 1.25)));
  return { min, rec, next, weeks: Math.round(weeks), left: Math.round(left), papers };
}

/* every period you could study in, from your free times */
function wtSlots(d){
  const out = [];
  for (let day = 0; day < 7; day++){
    if (+d.off === day) continue;
    (d.avail[day] || []).forEach(([a, b]) => {
      let m = wtMin(a); const end = wtMin(b);
      while (m + d.len <= end){ out.push({ day, s: wtHM(m) }); m += d.len + d.gap; }
    });
  }
  return out;
}

/* three ready-made weeks */
function wtBuild(d, mode){
  const slots = wtSlots(d), want = [];
  Object.keys(d.per).forEach(sid => { for (let i = 0; i < (+d.per[sid] || 0); i++) want.push(sid); });
  const byDay = {}; slots.forEach(x => (byDay[x.day] = byDay[x.day] || []).push(x.s));
  const used = {}, grid = [], cnt = {}, subjDay = {};
  const dayLoad = day => grid.filter(g => g.day === day).length;
  const order = Object.keys(d.per).sort((a, b) => (+d.per[b] || 0) - (+d.per[a] || 0));
  // the order subjects are handed out: interleaved so the same subject doesn't fill a day
  const queue = []; let left = order.map(sid => +d.per[sid] || 0);
  while (left.some(n => n > 0)) order.forEach((sid, i) => { if (left[i] > 0){ queue.push(sid); left[i]--; } });
  const dayRank = day => {
    const wkend = day >= 5;
    if (mode === 'weekend') return wkend ? 0 : 1;
    if (mode === 'routine') return wkend ? 1 : 0;
    return 0;
  };
  for (const sid of queue){
    const days = Object.keys(byDay).map(Number).filter(day => dayLoad(day) < d.maxDay && byDay[day].some(s => !used[day + '|' + s]));
    if (!days.length) break;
    days.sort((a, b) => dayRank(a) - dayRank(b) || ((subjDay[sid + a] || 0) - (subjDay[sid + b] || 0)) || dayLoad(a) - dayLoad(b) || a - b);
    const day = days[0];
    const free = byDay[day].filter(s => !used[day + '|' + s]);
    // routine: always the earliest free period; otherwise avoid putting the same subject back to back
    let s = free[0];
    if (mode !== 'routine'){
      const prev = new Set(grid.filter(g => g.day === day && g.sid === sid).map(g => wtMin(g.s)));
      s = free.find(x => !prev.has(wtMin(x) - d.len - d.gap) && !prev.has(wtMin(x) + d.len + d.gap)) || free[0];
    }
    used[day + '|' + s] = 1; grid.push({ day, s, sid }); cnt[sid] = (cnt[sid] || 0) + 1; subjDay[sid + day] = (subjDay[sid + day] || 0) + 1;
  }
  return grid.sort((a, b) => a.day - b.day || wtMin(a.s) - wtMin(b.s));
}
const WT_MODES = [['spread', 'Spread out', 'Each subject on as many different days as possible.'], ['routine', 'Steady weekdays', 'Mostly weekday evenings at the same times, lighter weekends.'], ['weekend', 'Lighter weekdays', 'More on the weekend, so school nights stay short.']];

function wtTotals(d){ const t = {}; (d.grid || []).forEach(g => t[g.sid] = (t[g.sid] || 0) + 1); return t; }
function wtWarn(d){
  const slots = wtSlots(d).length, want = Object.values(d.per).reduce((a, b) => a + (+b || 0), 0), out = [];
  const byDay = {}; (d.grid || []).forEach(g => byDay[g.day] = (byDay[g.day] || 0) + 1);
  const heavy = Object.keys(byDay).filter(k => byDay[k] * d.len >= 240).map(k => WT_DAYS_LONG[k]);
  if (want > Math.min(slots, d.maxDay * (7 - (d.off >= 0 ? 1 : 0)))) out.push('You’ve asked for ' + want + ' periods but your free times fit ' + Math.min(slots, d.maxDay * (7 - (d.off >= 0 ? 1 : 0))) + '. Add more free time, allow more periods a day, or lower some subjects.');
  if (heavy.length) out.push(heavy.join(', ') + (heavy.length === 1 ? ' has' : ' have') + ' 4 hours or more of revision on top of school. A plan you can keep up for weeks does more than one that wears you out.');
  if (+d.off < 0) out.push('There’s no day off. One free day a week helps you keep going.');
  return out;
}

/* ---------- views ---------- */
function wtCard(){
  const w = wtSaved();
  if (!w) return '<div class="card stack"><div class="card-h"><h2>Weekly timetable</h2></div><p class="small muted" style="margin:0">Choose how many study periods you want for each subject, see the minimum you need before your exams, pick a ready-made week, adjust it, give it a theme, then save and print it.</p><div class="row"><a class="btn primary" href="#week" data-act="wt-new">Make my weekly timetable</a></div></div>';
  const tot = w.grid.length;
  return '<div class="card stack"><div class="card-h"><h2>Weekly timetable</h2><span class="small muted">' + tot + ' periods · ' + fmtMin(tot * w.len) + ' a week</span></div>' +
    wtTable(w, { mini: true }) +
    '<div class="row"><a class="btn" href="#week" data-act="wt-open">Open</a><a class="btn" href="#week" data-act="wt-edit">Edit</a><button class="btn ghost" data-act="wt-print">Print</button></div></div>';
}
function wtTable(d, o){
  o = o || {};
  const th = WT_THEMES[d.theme] || WT_THEMES.brass, subs = Object.keys(d.per).length ? Object.keys(d.per) : wtSubjects().map(s => s.id);
  const col = sid => th.cols[Math.max(0, subs.indexOf(sid)) % th.cols.length];
  const rows = [...new Set((o.edit ? wtSlots(d) : d.grid).map(x => x.s).concat(d.grid.map(x => x.s)))].sort((a, b) => wtMin(a) - wtMin(b));
  const at = {}; d.grid.forEach(g => at[g.day + '|' + g.s] = g.sid);
  const open = {}; if (o.edit) wtSlots(d).forEach(x => open[x.day + '|' + x.s] = 1);
  const style = '--wt-bg:' + th.bg + ';--wt-ink:' + th.ink + ';--wt-soft:' + th.soft + ';--wt-line:' + th.line + ';--wt-cell:' + th.cell + ';--wt-deco:' + th.deco + (th.rule ? ';--wt-rule:' + th.rule : '');
  const head = '<div class="wthead">' + (o.mini ? '' : '<div><div class="wtname">' + esc(d.name || 'My study week') + '</div><div class="wtsub">' + d.grid.length + ' periods of ' + d.len + ' minutes · ' + fmtMin(d.grid.length * d.len) + ' a week</div></div>') + (o.mini ? '' : wtArt(th.art, th.deco)) + '</div>';
  const grid = '<div class="wtgrid" role="table" aria-label="Weekly timetable" style="grid-template-columns:64px repeat(7,minmax(0,1fr))">' +
    '<div class="wtc wth" role="columnheader"></div>' + WT_DAYS.map((w, i) => '<div class="wtc wth' + (+d.off === i ? ' off' : '') + '" role="columnheader">' + w + '</div>').join('') +
    rows.map(s => '<div class="wtc wtt" role="rowheader">' + s + '</div>' + WT_DAYS.map((_, day) => {
      const sid = at[day + '|' + s], k = day + '|' + s;
      if (sid && SUBJ[sid]) return '<div class="wtc wtp" role="cell"' + (o.edit ? ' data-act="wt-cell" data-v="' + k + '" tabindex="0"' : '') + ' style="--c:' + col(sid) + ';color:' + wtTextOn(col(sid)) + '"><span class="wl">' + esc(SUBJ[sid].short) + '</span><span class="ws">' + esc(wtAbbr(sid)) + '</span></div>';
      if (o.edit && open[k]) return '<div class="wtc wte" role="cell" data-act="wt-cell" data-v="' + k + '" tabindex="0" aria-label="' + WT_DAYS_LONG[day] + ' ' + s + ', empty"><span aria-hidden="true">+</span></div>';
      return '<div class="wtc wtx" role="cell"></div>';
    }).join('')).join('') + '</div>';
  const key = o.mini ? '' : '<div class="wtkey">' + subs.filter(sid => SUBJ[sid]).map(sid => '<span><i style="background:' + col(sid) + '"></i>' + esc(SUBJ[sid].short) + ' · ' + (wtTotals(d)[sid] || 0) + '</span>').join('') + '</div>';
  return '<div class="wtsheet wt-' + d.theme + (o.mini ? ' wtmini' : '') + '" style="' + style + '" id="' + (o.id || '') + '">' + head + (rows.length ? grid : '<p class="wtsub" style="padding:16px">No periods yet.</p>') + key + '</div>';
}

function viewWeek(){
  const W = wtDraft(), d = W.d, subs = wtSubjects();
  Object.keys(d.per).forEach(k => { if (!SUBJ[k]) delete d.per[k]; });
  const steps = ['Periods', 'Choose', 'Edit', 'Look and save'];
  const bar = '<ol class="wtsteps">' + steps.map((n, i) => '<li class="' + (W.step === i + 1 ? 'on' : W.step > i + 1 ? 'done' : '') + '"><button data-act="wt-step" data-v="' + (i + 1) + '"' + (i + 1 > W.step && !(i === 2 && d.grid.length) && !(i === 3 && d.grid.length) ? ' disabled' : '') + '>' + (i + 1) + '. ' + n + '</button></li>').join('') + '</ol>';
  const warn = wtWarn(d).map(x => '<div class="loadwarn small" role="note">' + esc(x) + '</div>').join('');
  let body = '';
  if (W.step === 1){
    if (!subs.length) body = '<div class="card"><p class="muted" style="margin:0">Choose your subjects first in Settings, then come back here.</p></div>';
    else body = '<div class="card stack"><div class="card-h"><h2>Periods each week</h2><span class="small muted">' + d.len + '-minute periods</span></div>' +
      '<p class="small muted" style="margin:0">The minimum comes from your exam dates and how many topics you haven’t marked as confident yet, with past papers in the last ten weeks before an exam. It updates as you tick topics off.</p>' +
      '<div class="wtper">' + subs.map(s => { const g = wtSuggest(s.id, d.len), n = +d.per[s.id] || 0; return '<div class="wtperrow"><div class="grow"><b>' + esc(s.name) + '</b><div class="small muted">' +
        (g.next ? 'Exam ' + fmtDate(g.next, {day:'numeric', month:'short', year:'numeric'}) + ' · ' : 'No exam date set · ') + g.left + ' topic' + (g.left === 1 ? '' : 's') + ' to secure' + (g.papers ? ' · ' + g.papers + ' past papers' : '') + '</div>' +
        '<div class="small ' + (n < g.min ? 'warnline' : 'muted') + '">Minimum ' + g.min + ' a week · suggested ' + g.rec + (n < g.min ? '. You’re below the minimum.' : '') + '</div></div>' +
        '<div class="wtstep" role="group" aria-label="' + esc(s.name) + ' periods"><button class="btn sm" data-act="wt-per" data-id="' + s.id + '" data-v="-1" aria-label="Fewer">−</button><b aria-live="polite">' + n + '</b><button class="btn sm" data-act="wt-per" data-id="' + s.id + '" data-v="1" aria-label="More">+</button></div></div>'; }).join('') + '</div>' +
      '<div class="row"><button class="btn sm ghost" data-act="wt-fill" data-v="min">Use the minimums</button><button class="btn sm ghost" data-act="wt-fill" data-v="rec">Use the suggestions</button></div></div>' +
      '<div class="card stack"><div class="card-h"><h2>When you’re free</h2></div>' +
      '<div class="row"><label class="f">Period length<select id="wt-len">' + [30, 40, 45, 50, 60, 90].map(x => '<option value="' + x + '"' + (x === d.len ? ' selected' : '') + '>' + x + ' min</option>').join('') + '</select></label>' +
      '<label class="f">Break between<select id="wt-gap">' + [0, 5, 10, 15, 20].map(x => '<option value="' + x + '"' + (x === d.gap ? ' selected' : '') + '>' + x + ' min</option>').join('') + '</select></label>' +
      '<label class="f">Most periods a day<select id="wt-max">' + [1, 2, 3, 4, 5, 6, 8].map(x => '<option value="' + x + '"' + (x === d.maxDay ? ' selected' : '') + '>' + x + '</option>').join('') + '</select></label>' +
      '<label class="f">Day off<select id="wt-off"><option value="-1">None</option>' + WT_DAYS_LONG.map((n, i) => '<option value="' + i + '"' + (i === +d.off ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label></div>' +
      '<div class="wtavail">' + WT_DAYS_LONG.map((n, i) => '<div class="wtday' + (+d.off === i ? ' off' : '') + '"><b>' + n + '</b>' + (+d.off === i ? '<span class="small muted">Day off</span>' :
        (d.avail[i] || []).map(([a, b], j) => '<span class="wtwin"><input type="time" data-wtav="' + i + '|' + j + '|0" value="' + a + '" aria-label="' + n + ' from"> – <input type="time" data-wtav="' + i + '|' + j + '|1" value="' + b + '" aria-label="' + n + ' to"><button class="linkbtn small" data-act="wt-avdel" data-v="' + i + '|' + j + '" aria-label="Remove this time">Remove</button></span>').join('') +
        '<button class="linkbtn small" data-act="wt-avadd" data-v="' + i + '">Add a time</button>') + '</div>').join('') + '</div>' +
      '<p class="small muted" style="margin:0">That’s room for ' + wtSlots(d).length + ' periods a week (most ' + d.maxDay + ' a day). You’ve asked for ' + Object.values(d.per).reduce((a, b) => a + (+b || 0), 0) + '.</p></div>' +
      warn + '<div class="row"><button class="btn primary" data-act="wt-make">Show me timetables</button></div>';
  }
  if (W.step === 2){
    const opts = W.opts || (W.opts = WT_MODES.map(([m]) => wtBuild(d, m)));
    body = '<div class="card stack"><div class="card-h"><h2>Pick a starting week</h2></div><p class="small muted" style="margin:0">All three use your numbers and free times. You can change anything on the next step.</p></div>' +
      '<div class="wtopts">' + WT_MODES.map(([m, n, sub], i) => { const g = opts[i], per = {}; g.forEach(x => per[x.day] = (per[x.day] || 0) + 1); const busiest = Math.max(0, ...Object.values(per));
        return '<div class="card stack wtopt"><div class="card-h"><h2>' + n + '</h2></div><p class="small muted" style="margin:0">' + sub + '</p>' + wtTable(Object.assign({}, d, { grid: g }), { mini: true }) +
          '<p class="small" style="margin:0">' + g.length + ' periods · busiest day ' + busiest + ' · ' + (7 - Object.keys(per).length) + ' free day' + (7 - Object.keys(per).length === 1 ? '' : 's') + '</p><button class="btn primary" data-act="wt-pick" data-v="' + i + '">Use this one</button></div>'; }).join('') + '</div>' +
      '<div class="row"><button class="btn ghost" data-act="wt-step" data-v="1">Back</button></div>';
  }
  if (W.step === 3){
    const sub = Object.keys(d.per).filter(k => SUBJ[k]), th = WT_THEMES[d.theme] || WT_THEMES.brass, tot = wtTotals(d);
    body = '<div class="card stack"><div class="card-h"><h2>Edit your week</h2></div><p class="small muted" style="margin:0">Pick a subject below, then tap the periods to fill. Tap a period with the eraser to clear it. Numbers show placed / wanted.</p>' +
      '<div class="chips wtbrush" role="group" aria-label="Brush">' + sub.map((sid, i) => '<button class="chip" data-act="wt-brush" data-v="' + sid + '" aria-pressed="' + (W.brush === sid) + '"><i class="wtdot" style="background:' + th.cols[i % th.cols.length] + '"></i>' + esc(SUBJ[sid].short) + ' <span class="' + ((tot[sid] || 0) < (+d.per[sid] || 0) ? 'warnline' : 'muted') + '">' + (tot[sid] || 0) + '/' + (+d.per[sid] || 0) + '</span></button>').join('') +
      '<button class="chip" data-act="wt-brush" data-v="x" aria-pressed="' + (W.brush === 'x') + '">Eraser</button></div>' +
      wtTable(d, { edit: true }) +
      '<div class="row"><button class="btn ghost" data-act="wt-step" data-v="2">Back</button><button class="btn ghost" data-act="wt-clear">Clear all</button><button class="btn primary" data-act="wt-step" data-v="4">Next: look and save</button></div></div>' + warn;
  }
  if (W.step === 4){
    body = '<div class="card stack"><div class="card-h"><h2>Theme</h2></div><div class="wtthemes" role="group" aria-label="Theme">' + Object.keys(WT_THEMES).map(k => { const t = WT_THEMES[k];
        return '<button class="wtth" data-act="wt-theme" data-v="' + k + '" aria-pressed="' + (d.theme === k) + '" style="background:' + t.bg + ';color:' + t.ink + '"><span class="wtsw">' + t.cols.slice(0, 4).map(c => '<i style="background:' + c + '"></i>').join('') + '</span>' + t.name + '</button>'; }).join('') + '</div>' +
      '<label class="f" style="max-width:340px">Name<input id="wt-name" maxlength="40" value="' + esc(d.name || '') + '"></label></div>' +
      wtTable(d, { id: 'wtsheet' }) +
      '<div class="row"><button class="btn ghost" data-act="wt-step" data-v="3">Back to edit</button><button class="btn primary" data-act="wt-save">Save timetable</button>' + (wtSaved() ? '<button class="btn ghost" data-act="wt-print">Print</button>' : '') + '</div>';
  }
  return '<div class="stack"><div class="row" style="justify-content:space-between;align-items:center"><h1 style="margin:0">Weekly timetable</h1><a class="linkbtn small" href="#planner" data-act="wt-close">Back to Plan</a></div>' + bar + body + '</div>';
}

function wtAct(el){
  const a = el.dataset.act, v = el.dataset.v, id = el.dataset.id, W = wtDraft(), d = W.d;
  switch (a){
    case 'wt-new': ui.wt = null; ui.wt = { step: 1, d: wtBlank(), brush: '', opts: null }; break;
    case 'wt-open': ui.wt = { step: 4, d: JSON.parse(JSON.stringify(wtSaved())), brush: '', opts: null }; break;
    case 'wt-edit': ui.wt = { step: 3, d: JSON.parse(JSON.stringify(wtSaved())), brush: '', opts: null }; break;
    case 'wt-close': ui.wt = null; return true;
    case 'wt-step': W.step = +v; if (+v === 1) W.opts = null; break;
    case 'wt-per': d.per[id] = Math.max(0, Math.min(20, (+d.per[id] || 0) + (+v))); W.opts = null; break;
    case 'wt-fill': wtSubjects().forEach(s => { const g = wtSuggest(s.id, d.len); d.per[s.id] = v === 'min' ? g.min : g.rec; }); W.opts = null; break;
    case 'wt-avadd': { const i = +v; d.avail[i] = d.avail[i] || []; const last = d.avail[i][d.avail[i].length - 1]; const st = last ? wtMin(last[1]) + 60 : 17 * 60; d.avail[i].push([wtHM(Math.min(st, 22 * 60)), wtHM(Math.min(st + 120, 23 * 60))]); W.opts = null; break; }
    case 'wt-avdel': { const [i, j] = v.split('|').map(Number); (d.avail[i] || []).splice(j, 1); W.opts = null; break; }
    case 'wt-make': W.opts = null; W.step = 2; break;
    case 'wt-pick': d.grid = (W.opts || [])[+v] || []; W.step = 3; W.brush = Object.keys(d.per)[0] || ''; break;
    case 'wt-brush': W.brush = v; break;
    case 'wt-clear': if (!confirm('Clear every period from this week?')) return true; d.grid = []; break;
    case 'wt-cell': {
      const [day, s] = [+v.split('|')[0], v.split('|')[1]];
      const i = d.grid.findIndex(g => g.day === day && g.s === s);
      if (W.brush === 'x' || !W.brush){ if (i >= 0) d.grid.splice(i, 1); else if (!W.brush){ toast('Pick a subject first'); return true; } }
      else if (i >= 0) d.grid[i].sid = d.grid[i].sid === W.brush ? null : W.brush;
      else d.grid.push({ day, s, sid: W.brush });
      d.grid = d.grid.filter(g => g.sid).sort((a, b) => a.day - b.day || wtMin(a.s) - wtMin(b.s));
      break;
    }
    case 'wt-theme': d.theme = v; break;
    case 'wt-save': { const nm = document.getElementById('wt-name'); if (nm) d.name = nm.value.trim().slice(0, 40) || 'My study week';
      state.wt = Object.assign(JSON.parse(JSON.stringify(d)), { saved: Date.now() });
      // the daily plan follows the weekly timetable unless the student turned that off
      let n = 0; if (typeof rtUseWt === 'function' && rtUseWt() && rtExams().length){ const r = state.rt || {}; n = rtBuild(r.min || goalMin(), r.rest === undefined ? -1 : r.rest, true); }
      commit(); toast(n ? 'Timetable saved. Your daily plan now follows it: ' + n + ' sessions up to your exams.' : 'Timetable saved. You can edit, re-theme or print it from Plan any time.'); ui.wt = null; go('planner'); return true; }
    case 'wt-print': wtPrint(); return true;
    default: return false;
  }
  render(); return true;
}
/* print: just the timetable, landscape, with its theme colours */
function wtPrint(){
  const d = (ui.wt && ui.wt.d && route() === 'week') ? ui.wt.d : wtSaved(); if (!d) return;
  let box = document.getElementById('wtprint'); if (!box){ box = document.createElement('div'); box.id = 'wtprint'; document.body.appendChild(box); }
  box.innerHTML = wtTable(d, {});
  try { if (typeof isTH === 'function' && isTH()) thApply(box); } catch(e){}
  document.body.classList.add('wtprinting');
  const done = () => { document.body.classList.remove('wtprinting'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  setTimeout(() => { window.print(); setTimeout(done, 1500); }, 60);
}
document.addEventListener('change', e => {
  const el = e.target; if (!ui.wt || !el) return;
  const d = ui.wt.d;
  if (el.id === 'wt-len'){ d.len = +el.value; ui.wt.opts = null; render(); }
  else if (el.id === 'wt-gap'){ d.gap = +el.value; ui.wt.opts = null; render(); }
  else if (el.id === 'wt-max'){ d.maxDay = +el.value; ui.wt.opts = null; render(); }
  else if (el.id === 'wt-off'){ d.off = +el.value; ui.wt.opts = null; render(); }
  else if (el.id === 'wt-name'){ d.name = el.value.slice(0, 40); }
  else if (el.dataset && el.dataset.wtav){ const [i, j, k] = el.dataset.wtav.split('|').map(Number); if (d.avail[i] && d.avail[i][j] && el.value){ d.avail[i][j][k] = el.value; if (wtMin(d.avail[i][j][1]) <= wtMin(d.avail[i][j][0])) d.avail[i][j][1] = wtHM(wtMin(d.avail[i][j][0]) + 60); ui.wt.opts = null; render(); } }
});
document.addEventListener('keydown', e => { const el = e.target; if ((e.key === 'Enter' || e.key === ' ') && el && el.dataset && el.dataset.act === 'wt-cell'){ e.preventDefault(); wtAct(el); } });

/* ============================================================
   Week-by-week plan from the weekly timetable.
   The timetable gives the times. Each week every subject gets at least its minimum (wtSuggest), and the
   extra periods go to the weakest subjects right now: topics not yet confident, marks lost in the mistake
   log, and how far the latest past papers are below the target grade. A slot fixed "every week" keeps its
   subject; otherwise the timetable's own subject is kept where that subject still has periods left.
   ============================================================ */
const WK_GRADE_PCT = { 'A*': 90, A: 80, B: 70, C: 60, D: 50, E: 40 };
function wkActive(sid, d){
  const units = SUBJ[sid] ? SUBJ[sid].units.filter(u => takes(u.c)) : [];
  if (!units.length) return false;
  const ex = (state.exams || []).filter(e => units.some(u => u.c === e.u));
  return !ex.length || ex.some(e => e.d > d);
}
function wkWeakness(sid){
  const units = SUBJ[sid].units.filter(u => takes(u.c)), why = [], parts = [];
  let tot = 0, left = 0;
  units.forEach(u => u.t.forEach((_, i) => { tot++; left += (3 - Math.min(3, state.topics[topicId(u.c, i)] || 0)) / 3; }));
  if (tot){ parts.push(left / tot); if (left / tot >= 0.5) why.push(Math.round(left) + ' topics not confident'); }
  const lost = (state.mistakes || []).filter(m => !m.fixed && UNIT_SUBJ[m.u] === sid).reduce((a, m) => a + (+m.lost || 0), 0);
  parts.push(Math.min(1, lost / 30)); if (lost >= 10) why.push(lost + ' marks lost in mistakes');
  const tg = WK_GRADE_PCT[targetFor(sid)] || 80;
  const gaps = trendData(units).map(x => Math.max(0, tg - x.pts[x.pts.length - 1].v));
  if (gaps.length){ const g = gaps.reduce((a, b) => a + b, 0) / gaps.length; parts.push(Math.min(1, g / 30)); if (g >= 5) why.push('past papers ' + Math.round(g) + '% below target'); }
  return { w: Math.max(0.05, parts.reduce((a, b) => a + b, 0) / parts.length), why };
}
function wkMonday(d){ const x = parseD(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return ymd(x.getFullYear(), x.getMonth(), x.getDate()); }
/* Exam ramp: the closer a subject's next exam, the more of the week it gets.
   2 weeks or less: x3 · 4 weeks: x2 · 8 weeks: x1.5 · further away: x1. */
function wkUrg(sid, d){
  const t = (state.exams || []).filter(e => e.d >= d && UNIT_SUBJ[e.u] === sid && takes(e.u)).map(e => e.d).sort()[0];
  if (!t) return 1;
  const n = daysBetween(d, t);
  return n <= 14 ? 3 : n <= 28 ? 2 : n <= 56 ? 1.5 : 1;
}
function wkPlan(W, from, to, kept, skip){
  const out = {}, now = todayStr(), nowHM = wtHM(new Date().getHours() * 60 + new Date().getMinutes());
  const subsAll = Object.keys(W.per).filter(k => SUBJ[k]);
  const weak = {}; subsAll.forEach(k => { try { weak[k] = wkWeakness(k).w; } catch(e){ weak[k] = 0.3; } });
  const mins = {}; subsAll.forEach(k => { mins[k] = Math.max(0, Math.min(+W.per[k] || 0, wtSuggest(k, W.len).min)); });
  const p = prefs(), end = to < addDays(from, 400) ? to : addDays(from, 400);
  for (let wk = wkMonday(from); wk < end; wk = addDays(wk, 7)){
    const slots = [];
    for (let day = 0; day < 7; day++){
      const d = addDays(wk, day); if (d < from || d >= end) continue;
      if ((p.offDays || []).includes(parseD(d).getDay()) || (p.busy || []).includes(d)) continue;
      W.grid.filter(g => g.day === day).forEach(g => {
        if (d === now && g.s < nowHM) return;
        const k = d + '|' + g.s; if (kept.has(k) || skip[k]) return;
        slots.push({ d, day, s: g.s, pref: g.sid, lock: !!g.lock });
      });
    }
    if (!slots.length) continue;
    const subs = subsAll.filter(k => wkActive(k, slots[0].d));
    if (!subs.length) continue;
    // how many periods each subject gets this week
    const urg = {}; subs.forEach(k => { urg[k] = wkUrg(k, wk < from ? from : wk); });
    const q = {}; let need = 0; subs.forEach(k => { q[k] = Math.round(mins[k] * Math.min(2, urg[k])); need += q[k]; });
    while (need > slots.length){ const k = subs.filter(x => q[x] > 0).sort((a, b) => q[b] / urg[b] - q[a] / urg[a] || weak[a] - weak[b])[0]; if (!k) break; q[k]--; need--; }
    let extra = slots.length - need;
    const ew = k => weak[k] * urg[k], wsum = subs.reduce((a, k) => a + ew(k), 0) || 1;
    const share = subs.map(k => ({ k, x: extra * ew(k) / wsum })), give = {};
    share.forEach(o => { give[o.k] = Math.floor(o.x); extra -= give[o.k]; });
    share.sort((a, b) => (b.x - Math.floor(b.x)) - (a.x - Math.floor(a.x)) || ew(b.k) - ew(a.k)).forEach(o => { if (extra > 0){ give[o.k]++; extra--; } });
    subs.forEach(k => q[k] += give[k] || 0);
    // put them in: fixed slots first, then the timetable's own subject, then spread the rest
    const res = {}, onDay = {};
    const take = (sl, k) => { res[sl.d + '|' + sl.s] = k; q[k]--; onDay[sl.d + k] = (onDay[sl.d + k] || 0) + 1; };
    slots.filter(sl => sl.lock && subs.includes(sl.pref)).forEach(sl => { take(sl, sl.pref); if (q[sl.pref] < 0) q[sl.pref] = 0; });
    slots.forEach(sl => { if (!res[sl.d + '|' + sl.s] && q[sl.pref] > 0) take(sl, sl.pref); });
    slots.filter(sl => !res[sl.d + '|' + sl.s]).forEach(sl => {
      const k = subs.filter(x => q[x] > 0).sort((a, b) => (onDay[sl.d + a] || 0) - (onDay[sl.d + b] || 0) || q[b] - q[a] || weak[b] - weak[a])[0];
      if (k) take(sl, k);
    });
    slots.forEach(sl => { const k = res[sl.d + '|' + sl.s]; if (k) (out[sl.d] = out[sl.d] || []).push({ s: sl.s, sid: k }); });
  }
  Object.keys(out).forEach(d => out[d].sort((a, b) => wtMin(a.s) - wtMin(b.s)));
  return out;
}
/* every Sunday (or the first visit after it) next week's plan is rebuilt; today's sessions, ticked-off ones and
   ones changed by hand stay as they are */
function rtAutoCheck(){
  try {
    if (!rtUseWt() || !rtExams().length || !state.rt) return;
    const t = todayStr(), sun = addDays(wkMonday(t), -1), mark = parseD(t).getDay() === 0 ? t : sun;
    if ((state.rt.auto || '') >= mark) return;
    const r = state.rt; rtBuild(r.min || goalMin(), r.rest === undefined ? -1 : r.rest, true, addDays(t, 1));
    state.rt.auto = mark; commit();
  } catch(e){}
}
window.addEventListener('load', () => setTimeout(rtAutoCheck, 4000));
setInterval(rtAutoCheck, 60 * 60000);

/* ============================================================
   Plan calendar: the planned sessions as a week timetable, in the saved timetable's theme.
   Tap a session to change its subject or topic (that day, or that slot every week), tick it or remove it;
   tap an empty period to add one.
   ============================================================ */
function pcState(){ ui.pcal = ui.pcal || { off: 0, ed: null }; return ui.pcal; }
function pcSubs(){ const W = wtSaved(); const l = W ? Object.keys(W.per).filter(k => SUBJ[k] && (+W.per[k] || 0) > 0) : []; return l.length ? l : wtSubjects().map(s => s.id); }
function pcCol(sid){ const W = wtSaved(), th = WT_THEMES[(W && W.theme) || 'brass'] || WT_THEMES.brass, subs = pcSubs(); const i = subs.indexOf(sid); return i < 0 ? th.soft : th.cols[i % th.cols.length]; }
function pcTopicName(x){ const u = x.u && UNIT[x.u]; return u && x.ti !== null && x.ti !== undefined && u.t[x.ti] ? u.t[x.ti] : String(x.t || '').replace(/^\d\d:\d\d · /, '').replace(/ · \d+ min$/, ''); }
function pcCard(){
  const W = wtSaved(), P = pcState(), t = todayStr(), nowHM = wtHM(new Date().getHours() * 60 + new Date().getMinutes()), wk = addDays(wkMonday(t), 7 * P.off);
  const days = [0, 1, 2, 3, 4, 5, 6].map(i => addDays(wk, i));
  const tasks = state.tasks.filter(x => x.d && x.d >= wk && x.d <= days[6] && (x.gen === 'rt' || x.tm || x.s));
  if (!W && !tasks.length) return '';
  const th = WT_THEMES[(W && W.theme) || 'brass'] || WT_THEMES.brass;
  const times = new Set(); tasks.forEach(x => { if (x.tm) times.add(x.tm); }); if (W) W.grid.forEach(g => times.add(g.s));
  const rows = [...times].sort((a, b) => wtMin(a) - wtMin(b)), any = tasks.filter(x => !x.tm);
  const slotOpen = {}; if (W) W.grid.forEach(g => slotOpen[g.day + '|' + g.s] = 1);
  const cell = (x) => '<div class="wtc wtp pcs' + (x.done ? ' done' : '') + '" role="cell" data-act="pc-open" data-id="' + esc(x.id) + '" tabindex="0" style="--c:' + pcCol(x.s) + ';color:' + wtTextOn(pcCol(x.s)) + '" title="' + esc(x.t) + '"><span class="pcsub">' + (x.done ? '✓ ' : '') + esc(x.s && SUBJ[x.s] ? wtAbbr(x.s) : 'Task') + '</span><span class="pctop">' + esc(pcTopicName(x)) + '</span></div>';
  const style = '--wt-bg:' + th.bg + ';--wt-ink:' + th.ink + ';--wt-soft:' + th.soft + ';--wt-line:' + th.line + ';--wt-cell:' + th.cell + ';--wt-deco:' + th.deco + (th.rule ? ';--wt-rule:' + th.rule : '');
  const fmtR = fmtDate(days[0], {day:'numeric', month:'short'}) + ' – ' + fmtDate(days[6], {day:'numeric', month:'short'});
  const doneN = tasks.filter(x => x.done).length;
  const grid = '<div class="wtgrid pcgrid" role="table" aria-label="Planned sessions this week" style="grid-template-columns:52px repeat(7,minmax(0,1fr))">' +
    '<div class="wtc wth" role="columnheader"></div>' + days.map((d, i) => '<div class="wtc wth' + (d === t ? ' today' : '') + '" role="columnheader">' + WT_DAYS[i] + '<small>' + parseD(d).getDate() + '</small></div>').join('') +
    rows.map(tm => '<div class="wtc wtt" role="rowheader">' + tm + '</div>' + days.map((d, i) => {
      const here = tasks.filter(x => x.d === d && x.tm === tm);
      if (here.length) return here.length === 1 ? cell(here[0]) : '<div class="wtc pcmulti" role="cell">' + here.map(cell).join('') + '</div>';
      if (W && slotOpen[i + '|' + tm] && (d > t || (d === t && tm >= nowHM))) return '<div class="wtc wte" role="cell" data-act="pc-add" data-v="' + d + '|' + tm + '" tabindex="0" aria-label="Add a session ' + WT_DAYS_LONG[i] + ' ' + tm + '"><span aria-hidden="true">+</span></div>';
      return '<div class="wtc wtx" role="cell"></div>';
    }).join('')).join('') +
    (any.length ? '<div class="wtc wtt" role="rowheader">Any time</div>' + days.map(d => { const h = any.filter(x => x.d === d); return '<div class="wtc pcmulti" role="cell">' + h.slice(0, 3).map(cell).join('') + (h.length > 3 ? '<span class="small">+' + (h.length - 3) + '</span>' : '') + '</div>'; }).join('') : '') +
    '</div>';
  return '<div class="card stack pccard"><div class="card-h"><h2>Your week</h2><span class="small muted">' + tasks.length + ' sessions · ' + doneN + ' done</span></div>' +
    '<div class="row pcnav"><button class="btn sm" data-act="pc-week" data-v="-1" aria-label="Previous week">‹</button><b class="pcrange">' + fmtR + '</b><button class="btn sm" data-act="pc-week" data-v="1" aria-label="Next week">›</button>' + (P.off ? '<button class="btn sm ghost" data-act="pc-week" data-v="0">This week</button>' : '') + '</div>' +
    '<div class="wtsheet wt-' + ((W && W.theme) || 'brass') + '" style="' + style + '">' + (rows.length || any.length ? grid : '<p class="wtsub" style="margin:0;padding:8px">Nothing planned this week.</p>') + '</div>' +
    (P.ed ? pcEditor() : '') +
    bnCard(wk) + pcRampNote(wk) +
    (W && rtUseWt() ? '<p class="small muted" style="margin:0">Each week every subject gets at least its minimum, and the extra periods go to your weakest subjects and to subjects with an exam coming up: three times the share in the last two weeks, double in the two weeks before that. A new week is planned every Sunday; sessions you’ve ticked off or changed stay as they are.</p>' : '') +
  '</div>';
}
/* Burnout check for one week of Plan: too many hours, a day that's too long, no day off, or late nights several days running.
   Limits are for a student who is also at school: 25 h a week; 5 h on a school day, 7 h at the weekend; sessions ending after 10:30 pm on 3+ days. */
const BN_DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const BN = { week: 1500, school: 300, weekend: 420, late: 22 * 60 + 30, lateDays: 3 };
function bnLen(x){ if (+x.min > 0) return +x.min; const m = /(\d+) min\b/.exec(x.t || ''); return m ? +m[1] : 0; }
function bnCheck(wk){
  const days = [0, 1, 2, 3, 4, 5, 6].map(i => addDays(wk, i));
  const tasks = state.tasks.filter(x => x.d && x.d >= wk && x.d <= days[6] && (x.gen === 'rt' || x.tm || x.s));
  const per = days.map(d => tasks.filter(x => x.d === d).reduce((a, x) => a + bnLen(x), 0));
  const total = per.reduce((a, b) => a + b, 0);
  const late = days.filter(d => tasks.some(x => x.d === d && x.tm && wtMin(x.tm) + bnLen(x) > BN.late));
  const long = days.map((d, i) => ({ d, i, m: per[i], cap: i >= 5 ? BN.weekend : BN.school })).filter(x => x.m > x.cap);
  const out = [];
  const h = m => (Math.round(m / 6) / 10) + ' h';
  if (total > BN.week) out.push({ k: 'week', t: h(total) + ' planned this week. More than about 25 hours on top of school is hard to keep up, and tired revision sticks less.', fix: 'wt' });
  const nm = xs => xs.map(x => fmtDate(x.d, {weekday:'short'})).join(', ');
  const sch = long.filter(x => x.i < 5), wke = long.filter(x => x.i >= 5);
  if (sch.length) out.push({ k: 'day', t: 'Over 5 hours on a school day (' + nm(sch) + ', up to ' + h(Math.max(...sch.map(x => x.m))) + '). Keep school days under 5 hours.', fix: 'wt' });
  if (wke.length) out.push({ k: 'day', t: 'Over 7 hours on a weekend day (' + nm(wke) + ', up to ' + h(Math.max(...wke.map(x => x.m))) + ').', fix: 'wt' });
  if (per.every(m => m > 0)) { const light = per.indexOf(Math.min(...per)); out.push({ k: 'rest', t: 'No day off this week. One full rest day a week helps you remember more.', fix: 'rest', day: parseD(days[light]).getDay() }); }
  if (late.length >= BN.lateDays) out.push({ k: 'late', t: 'Study ends after 10:30 pm on ' + late.length + ' days. Late nights cut into sleep, and sleep is when what you learnt gets stored.', fix: 'wt' });
  return { out, total };
}
function bnCard(wk){
  if (wk < wkMonday(todayStr())) return '';
  const r = bnCheck(wk); if (!r.out.length) return '';
  const rest = r.out.find(x => x.fix === 'rest'), W = wtSaved();
  return '<div class="bnwarn stack" role="status"><b>This week looks too heavy</b><ul>' + r.out.map(x => '<li>' + esc(x.t) + '</li>').join('') + '</ul><div class="row" style="gap:8px">' +
    (rest ? '<button class="btn sm" type="button" data-act="pc-rest" data-v="' + rest.day + '">Make ' + esc(BN_DAYS[rest.day]) + ' a rest day</button>' : '') +
    (W && r.out.some(x => x.fix === 'wt') ? '<button class="btn sm" type="button" data-act="wt-edit">Edit weekly timetable</button>' : '') + '</div></div>';
}
/* "Exam soon" line: which subjects get extra time this week because their exam is close. */
function pcRampNote(wk){
  const from = wk < todayStr() ? todayStr() : wk;
  const xs = mySubjects().map(s => ({ s, u: wkUrg(s.id, from) })).filter(x => x.u > 1).sort((a, b) => b.u - a.u);
  if (!xs.length) return '';
  return '<p class="small pcramp" style="margin:0"><b>Exam soon:</b> ' + xs.map(x => { const e = (state.exams || []).filter(e => e.d >= from && UNIT_SUBJ[e.u] === x.s.id && takes(e.u)).sort((a, b) => a.d.localeCompare(b.d))[0]; const n = daysBetween(todayStr(), e.d); return esc(x.s.short) + ' <span class="muted">(' + esc(UNIT[e.u].l) + ' in ' + n + ' day' + (n === 1 ? '' : 's') + ', ' + (x.u === 3 ? '×3' : x.u === 2 ? '×2' : '×1.5') + ' time)</span>'; }).join(' · ') + '</p>';
}
function pcWeakTopics(sid){
  return SUBJ[sid].units.filter(u => takes(u.c)).flatMap(u => u.t.map((n, i) => ({ c: u.c, i, n, l: u.l, st: state.topics[topicId(u.c, i)] || 0, lost: topicMistakes(u.c, i).reduce((a, m) => a + m.lost, 0) })))
    .sort((a, b) => a.st - b.st || b.lost - a.lost);
}
function pcEditor(){
  const P = pcState(), E = P.ed, W = wtSaved();
  const sid = E.sid, tops = sid && SUBJ[sid] ? pcWeakTopics(sid) : [];
  const cur = E.c && E.ti !== null && E.ti !== undefined ? E.c + '|' + E.ti : (tops[0] ? tops[0].c + '|' + tops[0].i : '');
  const conf = ['not started', 'shaky', 'getting there', 'confident'];
  return '<div class="pced stack" role="group" aria-label="Edit session"><div class="row" style="justify-content:space-between;align-items:baseline"><b>' + esc(fmtDate(E.d, {weekday:'long', day:'numeric', month:'short'})) + (E.tm ? ' · ' + E.tm : '') + '</b>' + (E.id ? '<span class="small muted">' + (E.done ? 'Done' : 'Planned') + '</span>' : '<span class="small muted">New session</span>') + '</div>' +
    '<div class="chips" role="group" aria-label="Subject">' + pcSubs().map(k => '<button class="chip" data-act="pc-subj" data-v="' + k + '" aria-pressed="' + (k === sid) + '"><i class="wtdot" style="background:' + pcCol(k) + '"></i>' + esc(SUBJ[k].short) + '</button>').join('') + '</div>' +
    (sid ? '<label class="f">Topic (weakest first)<select id="pc-topic">' + tops.map(x => '<option value="' + x.c + '|' + x.i + '"' + (x.c + '|' + x.i === cur ? ' selected' : '') + '>' + esc(x.l + ': ' + x.n) + ' · ' + conf[Math.min(3, x.st)] + '</option>').join('') + '</select></label>' : '') +
    '<label class="f" style="max-width:160px">Length<select id="pc-min">' + [20, 30, 40, 45, 50, 60, 90, 120].map(m => '<option value="' + m + '"' + (m === (+E.min || (W ? W.len : 45)) ? ' selected' : '') + '>' + m + ' min</option>').join('') + '</select></label>' +
    (W && E.tm ? '<label class="row small" style="gap:8px;align-items:flex-start;flex-wrap:nowrap"><input type="checkbox" id="pc-every" style="flex:none;margin-top:3px"> <span>Use this subject in this period every week (' + WT_DAYS_LONG[(parseD(E.d).getDay() + 6) % 7] + ' ' + E.tm + ')</span></label>' : '') +
    '<div class="row"><button class="btn primary" data-act="pc-save">Save</button>' +
      (E.id ? '<button class="btn" data-act="pc-done">' + (E.done ? 'Not done' : 'Mark done') + '</button><button class="btn ghost" data-act="pc-del">Remove</button>' : '') +
      '<button class="btn ghost" data-act="pc-cancel">Cancel</button></div></div>';
}
function pcAct(el){
  const a = el.dataset.act, v = el.dataset.v, id = el.dataset.id, P = pcState(), W = wtSaved();
  switch (a){
    case 'pc-week': P.off = v === '0' ? 0 : P.off + (+v); P.ed = null; break;
    case 'pc-open': { const x = state.tasks.find(y => y.id === id); if (!x) return true; P.ed = { id, d: x.d, tm: x.tm || '', sid: x.s || '', c: x.u || '', ti: x.ti, min: x.min || (W ? W.len : 45), done: !!x.done }; break; }
    case 'pc-add': { const [d, tm] = v.split('|'); P.ed = { id: null, d, tm, sid: '', c: '', ti: null, min: W ? W.len : 45 }; break; }
    case 'pc-subj': P.ed.sid = v; P.ed.c = ''; P.ed.ti = null; break;
    case 'pc-cancel': P.ed = null; break;
    case 'pc-rest': { const p = prefs(), d = +v; if (!p.offDays.includes(d)) p.offDays.push(d); const r = state.rt || {}; let n = 0; if (rtExams().length) n = rtBuild(r.min || goalMin(), r.rest === undefined ? -1 : r.rest); commit(); toast(BN_DAYS[d] + ' is now a rest day every week. ' + (n ? 'Your plan has been rebuilt.' : 'Nothing new will be planned on it.')); break; }
    case 'pc-done': { const x = state.tasks.find(y => y.id === P.ed.id); if (x){ x.done = !x.done; if (x.done) x.doneAt = todayStr(); else delete x.doneAt; commit(); } P.ed = null; break; }
    case 'pc-del': { const x = state.tasks.find(y => y.id === P.ed.id); if (x){ state.tasks = state.tasks.filter(y => y !== x); if (x.gen === 'rt' && x.tm){ state.rt = state.rt || {}; state.rt.skip = Object.assign({}, state.rt.skip || {}, { [x.d + '|' + x.tm]: 1 }); } commit(); toast('Session removed. That period stays free when the week is re-planned.'); } P.ed = null; break; }
    case 'pc-save': {
      const E = P.ed; if (!E.sid){ toast('Pick a subject first'); return true; }
      const tsel = document.getElementById('pc-topic'), msel = document.getElementById('pc-min'), every = document.getElementById('pc-every');
      const [c, ti] = tsel && tsel.value ? tsel.value.split('|') : ['', ''];
      const u = UNIT[c], m = +(msel && msel.value) || 45;
      const lab = u ? u.l + (E.sid === 'math' || E.sid === 'fm' ? '' : ' ' + SUBJ[E.sid].short) : SUBJ[E.sid].short;
      const text = (E.tm ? E.tm + ' · ' : '') + (u ? 'Revise ' + u.t[+ti] + ' (' + lab + ')' : SUBJ[E.sid].short + ': topic questions or notes on your weakest topic') + ' · ' + m + ' min';
      let x = E.id ? state.tasks.find(y => y.id === E.id) : null;
      if (!x){ x = { id: uid(), d: E.d, tm: E.tm || undefined, p: 2, done: false, gen: 'rt', k: 'topic', sr: null }; state.tasks.push(x); }
      Object.assign(x, { t: text, s: E.sid, u: c || null, ti: c ? +ti : null, min: m, man: true, k: c ? 'topic' : 'review' });
      if (state.rt && state.rt.skip && E.tm) delete state.rt.skip[E.d + '|' + E.tm];
      if (every && every.checked && W){
        const day = (parseD(E.d).getDay() + 6) % 7, g = W.grid.find(y => y.day === day && y.s === E.tm);
        if (g){ g.sid = E.sid; g.lock = true; } else W.grid.push({ day, s: E.tm, sid: E.sid, lock: true });
        if (!(+W.per[E.sid] > 0)) W.per[E.sid] = 1;
        if (rtUseWt() && rtExams().length){ const r = state.rt || {}; rtBuild(r.min || goalMin(), r.rest === undefined ? -1 : r.rest, true, addDays(E.d, 1)); }
        toast('Saved. ' + SUBJ[E.sid].short + ' is now in this period every week.');
      } else toast('Saved for ' + fmtDate(E.d, {weekday:'short', day:'numeric', month:'short'}) + '.');
      commit(); P.ed = null; break;
    }
    default: return false;
  }
  render(); return true;
}
document.addEventListener('keydown', e => { const el = e.target; if ((e.key === 'Enter' || e.key === ' ') && el && el.dataset && (el.dataset.act === 'pc-open' || el.dataset.act === 'pc-add')){ e.preventDefault(); pcAct(el); } });
