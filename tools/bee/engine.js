/* ---------- Integration Bee (Stretch → Integration Bee) ----------
   Solo game: 6 levels, easy to hard. The player types the answer; it is checked by working it out
   at numbers, so any equivalent form is right (pi/4, 0.25pi, π/4 …). Scores stay on this device
   and in the player's own saved data, never shared. */
(function(){
const th = () => typeof isTH === 'function' && isTH();
const L = (en, tht) => th() ? tht : en;
/* --- answer reader: numbers, x, pi, e, + − × ÷ ^, brackets, |x|, functions, implicit × (2pi, 4ln x) --- */
const FN = { sin:Math.sin, cos:Math.cos, tan:Math.tan, sec:x => 1 / Math.cos(x), csc:x => 1 / Math.sin(x), cosec:x => 1 / Math.sin(x), cot:x => 1 / Math.tan(x),
  arcsin:Math.asin, asin:Math.asin, arccos:Math.acos, acos:Math.acos, arctan:Math.atan, atan:Math.atan, tan1:Math.atan,
  sinh:Math.sinh, cosh:Math.cosh, tanh:Math.tanh, arsinh:Math.asinh, arcsinh:Math.asinh, asinh:Math.asinh, arcosh:Math.acosh, arccosh:Math.acosh, acosh:Math.acosh, artanh:Math.atanh, arctanh:Math.atanh, atanh:Math.atanh,
  ln:Math.log, log:Math.log, exp:Math.exp, sqrt:Math.sqrt, abs:Math.abs };
const TEXF = { sin:'\\sin', cos:'\\cos', tan:'\\tan', sec:'\\sec', csc:'\\csc', cosec:'\\operatorname{cosec}', cot:'\\cot', arcsin:'\\arcsin', asin:'\\arcsin', arccos:'\\arccos', acos:'\\arccos', arctan:'\\arctan', atan:'\\arctan',
  sinh:'\\sinh', cosh:'\\cosh', tanh:'\\tanh', arsinh:'\\operatorname{arsinh}', arcsinh:'\\operatorname{arsinh}', asinh:'\\operatorname{arsinh}', arcosh:'\\operatorname{arcosh}', arccosh:'\\operatorname{arcosh}', acosh:'\\operatorname{arcosh}', artanh:'\\operatorname{artanh}', arctanh:'\\operatorname{artanh}', atanh:'\\operatorname{artanh}', ln:'\\ln', log:'\\ln', exp:'\\exp' };
const NAMES = Object.keys(FN).filter(k => k !== 'tan1').concat(['pi', 'e', 'x']).sort((a, b) => b.length - a.length);
function beeTok(s){
  s = String(s).toLowerCase().replace(/\s+/g, '').replace(/[−–—]/g, '-').replace(/[×·∙]/g, '*').replace(/÷/g, '/').replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/²/g, '^2').replace(/³/g, '^3').replace(/\*\*/g, '^')
    .replace(/^(.*?)(dx)$/, '$1').replace(/\+c$/, '');
  const out = []; let i = 0;
  while (i < s.length){
    const c = s[i];
    if (/[0-9.]/.test(c)){ let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; const t = s.slice(i, j); if (!/^(\d+\.?\d*|\.\d+)$/.test(t)) throw L('I can’t read the number “' + t + '”.', 'อ่านตัวเลข “' + t + '” ไม่ได้'); out.push({ k:'n', v:parseFloat(t), t }); i = j; continue; }
    if (/[a-z]/.test(c)){ let j = i; while (j < s.length && /[a-z]/.test(s[j])) j++; let w = s.slice(i, j); i = j;
      while (w){ const m = NAMES.find(n => w.startsWith(n)); if (!m) throw L('I don’t know “' + w + '”. Use x, pi, e and functions like sin, ln, sqrt.', 'ไม่รู้จัก “' + w + '” ใช้ x, pi, e และฟังก์ชันเช่น sin, ln, sqrt'); out.push(m === 'pi' || m === 'e' ? { k:'c', v:m } : m === 'x' ? { k:'x' } : { k:'f', v:m }); w = w.slice(m.length); }
      continue; }
    if ('+-*/^()|'.includes(c)){ out.push({ k:c }); i++; continue; }
    if (c === '[' || c === '{'){ out.push({ k:'(' }); i++; continue; }
    if (c === ']' || c === '}'){ out.push({ k:')' }); i++; continue; }
    throw L('I can’t read “' + c + '”.', 'อ่าน “' + c + '” ไม่ได้');
  }
  return out;
}
function beeParse(src){
  const T = beeTok(src); let p = 0;
  if (!T.length) throw L('Type an answer first.', 'พิมพ์คำตอบก่อน');
  const peek = () => T[p] && T[p].k, eat = k => { if (peek() !== k) throw L('Check your brackets.', 'ตรวจวงเล็บอีกครั้ง'); p++; };
  const starts = () => { const k = peek(); return k === 'n' || k === 'c' || k === 'x' || k === 'f' || k === '('; };
  function expr(){ let a = term(); while (peek() === '+' || peek() === '-'){ const o = T[p++].k, b = term(); a = { o, a, b }; } return a; }
  function term(){ let a = unary(); for (;;){ if (peek() === '*' || peek() === '/'){ const o = T[p++].k; a = { o, a, b:unary() }; } else if (starts()) a = { o:'*', a, b:power(), im:1 }; else return a; } }
  function unary(){ if (peek() === '-'){ p++; return { o:'neg', a:unary() }; } if (peek() === '+'){ p++; return unary(); } return power(); }
  function power(){ const b = prim(); if (peek() === '^'){ p++; return { o:'^', a:b, b:unary() }; } return b; }
  function prim(){
    const t = T[p];
    if (!t) throw L('Your answer stops too early.', 'คำตอบยังไม่ครบ');
    if (t.k === 'n'){ p++; return { o:'n', v:t.v, t:t.t }; }
    if (t.k === 'c'){ p++; return { o:'c', v:t.v }; }
    if (t.k === 'x'){ p++; return { o:'x' }; }
    if (t.k === '('){ p++; const e = expr(); eat(')'); return { o:'()', a:e }; }
    if (t.k === '|'){ p++; const e = expr(); eat('|'); return { o:'f', f:'abs', a:e }; }
    if (t.k === 'f'){ p++; let ex = null; if (peek() === '^'){ p++; ex = unary(); }
      const a = peek() === '(' ? (p++, (() => { const e = expr(); eat(')'); return e; })()) : power();
      const node = { o:'f', f:t.v, a }; return ex ? { o:'^', a:node, b:ex, fp:1 } : node; }
    throw L('Something is missing near “' + (t.k === 'f' ? t.v : t.k) + '”.', 'มีบางอย่างขาดไปใกล้ “' + (t.k === 'f' ? t.v : t.k) + '”');
  }
  const tree = expr(); if (p < T.length) throw L('Check your brackets.', 'ตรวจวงเล็บอีกครั้ง');
  return tree;
}
function beeEval(n, x){
  switch (n.o){
    case 'n': return n.v; case 'c': return n.v === 'pi' ? Math.PI : Math.E; case 'x': return x; case '()': return beeEval(n.a, x);
    case 'neg': return -beeEval(n.a, x); case '+': return beeEval(n.a, x) + beeEval(n.b, x); case '-': return beeEval(n.a, x) - beeEval(n.b, x);
    case '*': return beeEval(n.a, x) * beeEval(n.b, x); case '/': return beeEval(n.a, x) / beeEval(n.b, x); case '^': return Math.pow(beeEval(n.a, x), beeEval(n.b, x));
    case 'f': return FN[n.f](beeEval(n.a, x));
  }
}
function hasX(n){ return !!n && (n.o === 'x' || hasX(n.a) || hasX(n.b)); }
function hasDec(n){ return !!n && ((n.o === 'n' && n.t.includes('.')) || hasDec(n.a) || hasDec(n.b)); }
function beeTex(n){
  const g = m => m.o === '()' ? beeTex(m) : (m.o === '+' || m.o === '-' || m.o === 'neg') ? '\\left(' + beeTex(m) + '\\right)' : beeTex(m);
  switch (n.o){
    case 'n': return n.t; case 'c': return n.v === 'pi' ? '\\pi' : 'e'; case 'x': return 'x'; case '()': return '\\left(' + beeTex(n.a) + '\\right)';
    case 'neg': return '-' + g(n.a); case '+': return beeTex(n.a) + '+' + beeTex(n.b); case '-': return beeTex(n.a) + '-' + ((n.b.o === '+' || n.b.o === '-') ? '\\left(' + beeTex(n.b) + '\\right)' : beeTex(n.b));
    case '*': { const a = g(n.a), b = g(n.b); return a + (/^[0-9.]/.test(b) || /[0-9.]$/.test(a) && /^[0-9.]/.test(b) ? '\\times ' : n.im ? '\\,' : '\\times ') + b; }
    case '/': return '\\dfrac{' + beeTex(n.a.o === '()' ? n.a.a : n.a) + '}{' + beeTex(n.b.o === '()' ? n.b.a : n.b) + '}';
    case '^': { if (n.fp) return beeTex(n.a).replace(/^(\\[a-z]+|\\operatorname\{[a-z]+\})/, '$1^{' + beeTex(n.b) + '}'); const a = n.a.o === 'n' || n.a.o === 'c' || n.a.o === 'x' || n.a.o === '()' ? beeTex(n.a) : '\\left(' + beeTex(n.a) + '\\right)'; return a + '^{' + beeTex(n.b.o === '()' ? n.b.a : n.b) + '}'; }
    case 'f': return n.f === 'sqrt' ? '\\sqrt{' + beeTex(n.a.o === '()' ? n.a.a : n.a) + '}' : n.f === 'abs' ? '\\left|' + beeTex(n.a) + '\\right|' : n.a.o === 'f' && n.a.f === 'abs' ? TEXF[n.f] + beeTex(n.a) : TEXF[n.f] + '\\left(' + beeTex(n.a.o === '()' ? n.a.a : n.a) + '\\right)';
  }
}
/* right / wrong for one question. Returns { ok, dec, msg } */
function beeCheck(q, typed){
  let tree; try { tree = beeParse(typed); } catch(err){ return { ok:false, msg:String(err) }; }
  const close = (a, b) => isFinite(a) && Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(b));
  if (q.v != null){
    if (hasX(tree)) return { ok:false, msg:L('This is a definite integral, so the answer is a number: there should be no $x$ in it.', 'นี่คืออินทิกรัลจำกัดเขต คำตอบเป็นตัวเลข ไม่ควรมี x') };
    return { ok:close(beeEval(tree, 0), q.v), dec:hasDec(tree) };
  }
  if (!hasX(tree)) return { ok:false, msg:L('This is an indefinite integral, so the answer is a function of $x$.', 'นี่คืออินทิกรัลไม่จำกัดเขต คำตอบเป็นฟังก์ชันของ x') };
  return { ok:q.p.every(([a, b, v]) => close(beeEval(tree, b) - beeEval(tree, a), v)), dec:hasDec(tree) };
}
window.beeParse = beeParse; window.beeCheck = beeCheck; window.beeTex = beeTex; window.beeEval = beeEval;

/* --- game --- */
const ROUND = 5;
const qid = (lv, i) => 'b' + lv + '-' + i;
function bs(){ if (!state.bee || typeof state.bee !== 'object') state.bee = { s:{}, best:{}, pts:0 }; const b = state.bee; b.s = b.s || {}; b.best = b.best || {}; b.pts = b.pts || 0; return b; }
function lvQs(lv){ return BEE_Q.map((q, i) => Object.assign({ i, id:qid(q.l, BEE_Q.slice(0, i).filter(r => r.l === q.l).length) }, q)).filter(q => q.l === lv); }
function solvedIn(lv){ const b = bs(); return lvQs(lv).filter(q => b.s[q.id] && b.s[q.id].ok).length; }
function unlocked(lv){ return lv === 1 || bs().all || solvedIn(lv - 1) >= 5; }
function U(){ if (!ui.bee) ui.bee = { mode:'ladder' }; return ui.bee; }
const fmtT = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const D = t => '$\\displaystyle ' + t + '$';
const K = (c, t) => '<code>' + c + '</code> → $' + t + '$';
function lvName(lv){ const v = BEE_LV[lv - 1]; return th() && v.nt ? v.nt : v.n; }
function techCard(lv){ const v = BEE_LV[lv - 1], c = th() && v.ct ? v.ct : v.card; return '<ul class="bee-card">' + c.map(x => '<li>' + x + '</li>').join('') + '</ul>'; }

function viewLadder(){
  const b = bs();
  const tot = BEE_Q.length, done = Object.values(b.s).filter(x => x.ok).length;
  return '<div><h1>' + L('Integration Bee', 'Integration Bee') + '</h1><p class="muted">' + L('A race against the clock, like the famous MIT Integration Bee. Six levels from A-level warm-ups to Bee-final classics, including King’s rule and Feynman’s trick. Type the answer in any correct form.', 'แข่งกับเวลาแบบ MIT Integration Bee อันโด่งดัง 6 ระดับ ตั้งแต่อุ่นเครื่องระดับ A-level ไปจนถึงข้อคลาสสิกรอบชิง รวมถึง King’s rule และ Feynman’s trick พิมพ์คำตอบในรูปที่ถูกต้องแบบใดก็ได้') + '</p></div>' +
    '<div class="card row bee-sum" style="justify-content:space-between"><div><div class="bee-pts">' + b.pts + '</div><div class="small muted">' + L('points', 'คะแนน') + '</div></div><div><div class="bee-pts">' + done + '<span class="small muted"> / ' + tot + '</span></div><div class="small muted">' + L('integrals solved', 'ข้อที่ทำได้') + '</div></div></div>' +
    '<ol class="bee-ladder">' + BEE_LV.map((v, k) => { const lv = k + 1, n = lvQs(lv).length, s = solvedIn(lv), open = unlocked(lv), best = b.best[lv];
      return '<li class="card bee-lv' + (open ? '' : ' locked') + '"><div class="row" style="justify-content:space-between;align-items:flex-start;gap:12px"><div class="grow"><h2><span class="bee-n">' + lv + '</span>' + esc(lvName(lv)) + '</h2><p class="small">' + (th() && v.dt ? v.dt : v.d) + '</p>' +
        '<div class="small muted">' + s + ' / ' + n + ' ' + L('solved', 'ข้อที่ทำได้') + ' · ' + fmtT(v.t * 1000) + ' ' + L('each', 'ต่อข้อ') + (best ? ' · ' + L('best round', 'รอบที่ดีที่สุด') + ' ' + best : '') + '</div>' +
        '<div class="meter"><i style="width:' + Math.round(s / n * 100) + '%;background:var(--math)"></i></div></div>' +
        (open ? '<button class="btn primary" data-bee="play" data-v="' + lv + '">' + L('Play', 'เล่น') + '</button>' : '<span class="small muted bee-lock">' + L('Solve 5 in ' + lvName(lv - 1) + ' to open', 'ทำให้ได้ 5 ข้อใน ' + lvName(lv - 1) + ' เพื่อเปิด') + '</span>') + '</div>' +
        '<details class="bee-tech"><summary>' + L('Technique card', 'การ์ดเทคนิค') + '</summary>' + techCard(lv) + '</details></li>'; }).join('') + '</ol>' +
    (BEE_LV.some((v, k) => !unlocked(k + 1)) ? '<p class="small"><button class="linkbtn" data-bee="all">' + L('Open every level now', 'เปิดทุกระดับเลย') + '</button></p>' : '') +
    '<details class="card bee-help"><summary><b>' + L('How to type answers', 'วิธีพิมพ์คำตอบ') + '</b></summary><ul class="small">' +
      '<li>' + L('Fractions and powers: ', 'เศษส่วนและเลขยกกำลัง: ') + K('3/4', '\\dfrac{3}{4}') + ', ' + K('x^6', 'x^{6}') + ', ' + K('(e^2-1)/2', '\\dfrac{e^{2}-1}{2}') + '</li>' +
      '<li>' + L('Constants and roots: ', 'ค่าคงที่และรากที่สอง: ') + K('pi', '\\pi') + L(' (or π), ', ' (หรือ π), ') + K('e', 'e') + ', ' + K('sqrt(2)', '\\sqrt{2}') + '</li>' +
      '<li>' + L('Functions: ', 'ฟังก์ชัน: ') + K('ln(2)', '\\ln 2') + ', ' + K('sin(x)', '\\sin x') + ', ' + K('arctan(x)', '\\arctan x') + ', ' + K('arsinh(1)', '\\operatorname{arsinh} 1') + '</li>' +
      '<li>' + L('You can leave out the × sign: ', 'ไม่ต้องใส่เครื่องหมาย × ก็ได้: ') + K('2pi', '2\\pi') + ', ' + K('pi ln2/8', '\\dfrac{\\pi\\ln 2}{8}') + '</li>' +
      '<li>' + L('Indefinite integrals: give $F(x)$; writing $+C$ is optional. Any equivalent form is marked right.', 'อินทิกรัลไม่จำกัดเขต: ตอบ $F(x)$ จะใส่ $+C$ หรือไม่ก็ได้ รูปที่เท่ากันแบบใดก็ถูก') + '</li>' +
      '<li>' + L('Give exact answers. A decimal that is right scores half points.', 'ให้คำตอบแบบค่าแม่นตรง ทศนิยมที่ถูกได้ครึ่งคะแนน') + '</li></ul></details>' +
    '<p class="small muted">' + L('All integrals and solutions were written for IAL Revise. For real past Bee rounds, see ', 'โจทย์และเฉลยทั้งหมดเขียนขึ้นสำหรับ IAL Revise ดูโจทย์จริงจากการแข่งที่ผ่านมาได้ที่ ') + '<a href="https://math.mit.edu/~yyao1/integrationbee.html" target="_blank" rel="noopener">MIT Integration Bee ↗</a>. ' + L('Your scores stay private.', 'คะแนนของคุณเป็นความลับ') + '</p>';
}
function startRound(lv){
  const b = bs(), qs = lvQs(lv), sh = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const list = sh(qs.filter(q => !(b.s[q.id] && b.s[q.id].ok))).concat(sh(qs.filter(q => b.s[q.id] && b.s[q.id].ok))).slice(0, ROUND);
  Object.assign(U(), { mode:'play', lv, list:list.map(q => q.i), k:0, res:[], streak:0, score:0, typed:'', msg:'', st:'ask', t0:Date.now(), hint:false });
  render(); window.scrollTo({ top:0 }); focusIn();
}
function cur(){ const u = U(), q = BEE_Q[u.list[u.k]]; return Object.assign({ id:lvQs(u.lv).find(r => r.i === u.list[u.k]).id }, q); }
function limit(){ return BEE_LV[U().lv - 1].t * 1000; }
function viewPlay(){
  const u = U(), q = cur(), left = limit() - (Date.now() - u.t0), lvv = BEE_LV[u.lv - 1];
  const head = '<div class="row bee-top" style="justify-content:space-between"><button class="btn sm" data-bee="quit">' + L('← Levels', '← ระดับ') + '</button><span class="small muted">' + esc(lvName(u.lv)) + ' · ' + (u.k + 1) + ' / ' + u.list.length + '</span><span class="bee-score">' + u.score + ' ' + L('pts', 'คะแนน') + (u.streak >= 2 ? ' · 🔥' + u.streak : '') + '</span></div>';
  const qbox = '<div class="card bee-q notr"><div class="bee-int">' + D(q.q) + '</div>' + (u.st === 'ask' ? '<div class="bee-clock' + (left < 15000 ? ' low' : '') + '" id="bee-clock" aria-live="off">' + fmtT(left) + '</div>' : '') + '</div>';
  if (u.st === 'ask'){
    return head + qbox +
      '<form id="bee-form" class="card stack bee-ans" autocomplete="off"><label for="bee-in" class="small"><b>' + L(q.c ? 'Your answer $F(x)$' : 'Your answer', q.c ? 'คำตอบของคุณ $F(x)$' : 'คำตอบของคุณ') + '</b></label>' +
      '<input id="bee-in" class="bee-in" inputmode="text" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" value="' + esc(u.typed) + '" placeholder="' + (q.c ? 'e.g. x^2 ln(x)' : 'e.g. pi/4') + '">' +
      '<div class="bee-prev notr small" id="bee-prev" aria-live="polite">' + prevHtml(u.typed) + '</div>' +
      (u.msg ? '<div class="bee-msg bad" role="alert">' + esc(u.msg) + '</div>' : '') +
      (u.hint ? '<div class="small bee-hint">' + L('Technique: ', 'เทคนิค: ') + '<b>' + esc(q.h) + '</b></div>' : '') +
      '<div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn primary" type="submit">' + L('Check', 'ตรวจ') + '</button>' + (u.hint ? '' : '<button class="btn" type="button" data-bee="hint">' + L('Hint', 'คำใบ้') + '</button>') + '<button class="btn" type="button" data-bee="give">' + L('Show solution', 'ดูเฉลย') + '</button></div></form>';
  }
  const r = u.res[u.k] || {};
  return head + qbox + '<div class="card stack bee-sol notr"><div class="bee-msg ' + (r.ok ? 'good' : 'bad') + '" role="status">' + (r.ok ? L('Correct! ', 'ถูกต้อง! ') + '+' + r.pts + (r.dec ? L(' (half points for a decimal)', ' (ทศนิยมได้ครึ่งคะแนน)') : '') + (r.bonus ? L(' including a streak bonus', ' รวมโบนัสต่อเนื่อง') : '') : r.late ? L('Time’s up.', 'หมดเวลา') : L('Here’s the solution.', 'นี่คือเฉลย')) + '</div>' +
    '<div><span class="small muted">' + L('Answer', 'คำตอบ') + '</span> ' + D(q.al) + (r.ok ? ' <span class="small muted">· ' + (r.ms < 60000 ? Math.max(1, Math.round(r.ms / 1000)) + ' s' : fmtT(r.ms)) + '</span>' : '') + '</div>' +
    '<div class="small"><span class="pill">' + esc(q.h) + '</span></div><ol class="bee-steps">' + q.s.map(x => '<li>' + D(x) + '</li>').join('') + '</ol>' +
    '<div class="row"><button class="btn primary" data-bee="next">' + (u.k + 1 < u.list.length ? L('Next integral', 'ข้อต่อไป') : L('See my round', 'ดูผลรอบนี้')) + '</button></div></div>';
}
function prevHtml(s){
  if (!String(s || '').trim()) return '<span class="muted">' + L('Your answer will show here as maths.', 'คำตอบจะแสดงเป็นสูตรตรงนี้') + '</span>';
  try { const t = beeTex(beeParse(s)); return '<span class="muted">' + L('Reads as ', 'อ่านว่า ') + '</span>' + (window.katex ? katex.renderToString(t, { throwOnError:false }) : esc(s)); }
  catch(err){ return '<span class="muted">' + esc(String(err)) + '</span>'; }
}
function viewDone(){
  const u = U(), b = bs(), ok = u.res.filter(r => r.ok).length, nb = u.newBest;
  return '<div class="card stack bee-done"><h1>' + L('Round complete', 'จบรอบแล้ว') + '</h1><div class="bee-pts">' + u.score + ' <span class="small muted">' + L('points', 'คะแนน') + '</span></div><p>' + ok + ' / ' + u.res.length + ' ' + L('correct in ', 'ข้อถูกใน ') + esc(lvName(u.lv)) + (nb ? ' · <b>' + L('New best round!', 'สถิติใหม่!') + '</b>' : '') + '</p>' +
    (u.lv < 6 && !unlocked(u.lv + 1) ? '<p class="small muted">' + L('Solve ' + Math.max(0, 5 - solvedIn(u.lv)) + ' more here to open ' + lvName(u.lv + 1) + '.', 'ทำอีก ' + Math.max(0, 5 - solvedIn(u.lv)) + ' ข้อเพื่อเปิด ' + lvName(u.lv + 1)) + '</p>' : u.lv < 6 && solvedIn(u.lv) >= 5 && unlocked(u.lv + 1) && u.opened ? '<p><b>' + L(lvName(u.lv + 1) + ' is now open.', lvName(u.lv + 1) + ' เปิดแล้ว') + '</b></p>' : '') +
    '<div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn primary" data-bee="play" data-v="' + u.lv + '">' + L('Play again', 'เล่นอีกครั้ง') + '</button>' + (u.lv < 6 && unlocked(u.lv + 1) ? '<button class="btn" data-bee="play" data-v="' + (u.lv + 1) + '">' + L('Next level', 'ระดับถัดไป') + '</button>' : '') + '<button class="btn" data-bee="quit">' + L('All levels', 'ทุกระดับ') + '</button></div></div>';
}
window.viewBee = function(){
  const u = U(); clockOn();
  return '<div class="stack bee subjtint" style="--sc:var(--math)">' + strSeg('bee') + '<div class="stack notr">' + (u.mode === 'play' ? viewPlay() : u.mode === 'done' ? viewDone() : viewLadder()) + '</div></div>';
};
function finish(r){
  const u = U(), q = cur(), b = bs(), ms = Date.now() - u.t0;
  r.ms = ms;
  if (r.ok){ u.streak++; const base = 10 * u.lv, sp = Math.round(base * Math.max(0, limit() - ms) / limit()); r.pts = r.dec ? Math.round(base / 2) : base + sp; if (!r.dec && u.streak >= 3){ r.pts += 5 * u.lv; r.bonus = 1; } u.score += r.pts;
    const was = solvedIn(u.lv); const o = b.s[q.id] || {}; b.s[q.id] = { ok:1, ms:Math.min(o.ms || 1e9, ms) }; b.pts += r.pts; if (was < 5 && solvedIn(u.lv) >= 5) u.opened = 1; }
  else { u.streak = 0; if (!b.s[q.id]) b.s[q.id] = { ok:0 }; }
  u.res[u.k] = r; u.st = 'show'; commit();
}
function check(){
  const u = U(); if (u.st !== 'ask') return; const q = cur(), el = document.getElementById('bee-in'); if (el) u.typed = el.value;
  if (Date.now() - u.t0 > limit()){ finish({ ok:false, late:1 }); return; }
  const c = beeCheck(q, u.typed);
  if (c.msg){ u.msg = c.msg; render(); focusIn(); return; }
  if (!c.ok){ u.msg = L('Not quite. Check your working and try again.', 'ยังไม่ถูก ลองตรวจวิธีทำแล้วลองใหม่'); render(); focusIn(); return; }
  u.msg = ''; finish({ ok:true, dec:c.dec });
}
function focusIn(){ setTimeout(() => { const el = document.getElementById('bee-in'); if (el){ el.focus({ preventScroll:true }); try { el.setSelectionRange(el.value.length, el.value.length); } catch(e){} } }, 0); }
let CLK = null;
function clockOn(){ if (CLK) return; CLK = setInterval(() => {
  const u = ui.bee, el = document.getElementById('bee-clock');
  if (!u || u.mode !== 'play' || u.st !== 'ask' || !el){ clearInterval(CLK); CLK = null; return; }
  const left = limit() - (Date.now() - u.t0);
  if (left <= 0){ const i = document.getElementById('bee-in'); if (i) u.typed = i.value; finish({ ok:false, late:1 }); return; }
  el.textContent = fmtT(left); el.classList.toggle('low', left < 15000);
}, 250); }
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('[data-bee]'); if (!b) return;
  const u = U(), v = b.dataset.v;
  switch (b.dataset.bee){
    case 'play': startRound(+v); break;
    case 'quit': u.mode = 'ladder'; render(); window.scrollTo({ top:0 }); break;
    case 'hint': { const el = document.getElementById('bee-in'); if (el) u.typed = el.value; u.hint = true; render(); focusIn(); break; }
    case 'give': { const el = document.getElementById('bee-in'); if (el) u.typed = el.value; finish({ ok:false }); break; }
    case 'next': if (u.k + 1 < u.list.length){ Object.assign(u, { k:u.k + 1, typed:'', msg:'', st:'ask', t0:Date.now(), hint:false }); render(); window.scrollTo({ top:0 }); focusIn(); }
      else { const bb = bs(); u.newBest = u.score > (bb.best[u.lv] || 0) && u.score > 0; if (u.newBest) bb.best[u.lv] = u.score; u.mode = 'done'; commit(); window.scrollTo({ top:0 }); } break;
    case 'all': bs().all = 1; commit(); break;
  }
});
document.addEventListener('submit', e => { if (e.target && e.target.id === 'bee-form'){ e.preventDefault(); check(); } });
document.addEventListener('input', e => { if (e.target && e.target.id === 'bee-in'){ const u = U(); u.typed = e.target.value; const p = document.getElementById('bee-prev'); if (p) p.innerHTML = prevHtml(u.typed); } });
})();
