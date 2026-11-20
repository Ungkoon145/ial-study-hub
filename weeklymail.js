/* ============================================================
   Weekly email: every Sunday evening, a summary goes to the email the student signed in with.
   The site has no server, so a small Google Apps Script (in the site owner's Gmail) does the sending.
   While the student uses the site (at most every 6 hours) their device builds this week's email and hands it to
   the script, signed with their sign-in token. The script checks the token with Google, keeps only the latest
   copy, and on Sunday at 18:00 (Bangkok) sends it to that verified address and nowhere else.
   It's off until the student turns it on.
   ============================================================ */
const WM_URL = window.__WM_URL__ || 'https://script.google.com/macros/s/AKfycbzHJs_o3DeB6XZ9YgSsMuswOvj6Scf36M7UTwteV2hc-nfjbHGu2Iv3pe2M7nhqnpWiMQ/exec';   // the Apps Script web app address, filled in once it's deployed
const WM_EVERY = 6 * 3600000;

function wmPrefs(){ state.wm = Object.assign({ on: false, at: 0, err: '' }, state.wm || {}); return state.wm; }
function wmReady(){ return !!WM_URL && typeof ACCT !== 'undefined' && ACCT && FB.user && typeof FB.user.getIdToken === 'function'; }
function wmL(s){ try { if (isTH()){ const r = thText(s); if (r != null) return r; } } catch(e){} return s; }
function wmE(s){ return esc(wmL(s)); }

/* the email itself: plain HTML with inline styles, so it looks right in Gmail, Outlook and phone mail apps */
function wmBuild(){
  const t = todayStr(), mon = wkMonday(t), nextMon = addDays(mon, 7), th = isTH();
  const days = [0, 1, 2, 3, 4, 5, 6].map(i => addDays(mon, i)).filter(d => d <= t);
  const mins = days.reduce((a, d) => a + minutesOn(d), 0), act = days.filter(d => minutesOn(d) > 0).length;
  const prevMins = [0, 1, 2, 3, 4, 5, 6].map(i => addDays(mon, i - 7)).reduce((a, d) => a + minutesOn(d), 0);
  const papers = Object.entries(state.papers || {}).filter(([, r]) => r && r.d >= mon && r.d <= t).length;
  const conf = Object.keys(state.topics || {}).length;
  const st = typeof streak === 'function' ? streak() : 0;
  const name = String((prof().name || '').trim().split(/\s+/)[0] || '').slice(0, 30);
  const fd = (d, o) => { try { return th ? parseD(d).toLocaleDateString('th-TH', o) : fmtDate(d, o); } catch(e){ return d; } };

  // next week's plan, day by day
  const plan = [0, 1, 2, 3, 4, 5, 6].map(i => {
    const d = addDays(nextMon, i), ts = state.tasks.filter(x => x.d === d && !x.done).sort((a, b) => (a.tm || '99').localeCompare(b.tm || '99'));
    return { d, ts };
  });
  const planN = plan.reduce((a, x) => a + x.ts.length, 0), planMin = plan.reduce((a, x) => a + x.ts.reduce((b, y) => b + (+y.min || 0), 0), 0);

  // weakest topics: not yet confident, most marks lost first, two per subject
  const weak = [];
  try {
    wtSubjects().forEach(s => {
      const tops = s.units.filter(u => takes(u.c)).flatMap(u => u.t.map((n, i) => ({ u, n, st: state.topics[topicId(u.c, i)] || 0, lost: topicMistakes(u.c, i).reduce((a, m) => a + (+m.lost || 0), 0) })))
        .filter(x => x.st < 3).sort((a, b) => b.lost - a.lost || a.st - b.st);
      const w = typeof wkWeakness === 'function' ? wkWeakness(s.id).w : 0.5;
      tops.slice(0, 2).forEach(x => weak.push({ s: s.short, l: x.u.l, n: x.n, st: x.st, w }));
    });
  } catch(e){}
  weak.sort((a, b) => b.w - a.w);
  const stLab = ['Not started', 'Shaky', 'Getting there'];

  const exams = (typeof upcomingExams === 'function' ? upcomingExams() : []).filter(e => e.d <= addDays(t, 60)).slice(0, 6);

  const C = { ink: '#1d2433', soft: '#5b6578', line: '#e3e6ec', acc: '#b5893a', bg: '#f6f4ef' };
  const font = th ? "'TH Sarabun PSK','Sarabun',Tahoma,sans-serif" : "'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif";
  const h2 = s => '<h2 style="font-size:17px;margin:26px 0 8px;color:' + C.ink + '">' + wmE(s) + '</h2>';
  const stat = (big, small) => '<td style="padding:12px 10px;border:1px solid ' + C.line + ';border-radius:10px;background:#fff;width:33%;vertical-align:top"><div style="font-size:22px;font-weight:700;color:' + C.ink + '">' + big + '</div><div style="font-size:13px;color:' + C.soft + '">' + small + '</div></td>';
  const diff = mins - prevMins;

  let html = '<div style="background:' + C.bg + ';padding:20px 12px;font-family:' + font + ';color:' + C.ink + ';font-size:' + (th ? 18 : 15) + 'px;line-height:1.5">' +
    '<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;padding:24px 22px;border:1px solid ' + C.line + '">' +
    '<div style="font-size:13px;letter-spacing:.04em;color:' + C.acc + ';font-weight:700">IAL Revise</div>' +
    '<h1 style="font-size:23px;margin:4px 0 2px">' + (name ? esc(wmL('Your week, ') + name) : wmE('Your week')) + '</h1>' +
    '<div style="color:' + C.soft + ';font-size:14px">' + esc(fd(mon, { day: 'numeric', month: 'short' }) + ' – ' + fd(addDays(mon, 6), { day: 'numeric', month: 'short' })) + '</div>' +

    h2('This week') +
    '<table role="presentation" cellspacing="6" cellpadding="0" style="width:100%;border-collapse:separate"><tr>' +
      stat(esc(fmtMin(mins)), wmE('studied') + (prevMins || mins ? ' · ' + (diff >= 0 ? '+' : '−') + esc(fmtMin(Math.abs(diff))) + ' ' + wmE('vs last week') : '')) +
      stat(act + '/7', wmE('days you studied')) +
      stat(String(st), wmE(st === 1 ? 'day in a row' : 'days in a row')) +
    '</tr></table>' +
    (papers ? '<p style="margin:8px 0 0">' + esc(wmL('Past papers logged this week: ') + papers) + '</p>' : '') +

    h2('Next week’s plan') +
    (planN ? '<p style="margin:0 0 8px;color:' + C.soft + '">' + esc(planN + ' ' + wmL(planN === 1 ? 'session' : 'sessions') + ' · ' + fmtMin(planMin)) + '</p>' +
      '<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse">' +
      plan.filter(x => x.ts.length).map(x => '<tr><td style="padding:8px 10px 8px 0;vertical-align:top;white-space:nowrap;font-weight:700;border-top:1px solid ' + C.line + '">' + esc(fd(x.d, { weekday: 'short', day: 'numeric' })) + '</td>' +
        '<td style="padding:8px 0;border-top:1px solid ' + C.line + '">' + x.ts.slice(0, 6).map(y => '<div>' + esc(wmL(String(y.t || ''))) + '</div>').join('') + (x.ts.length > 6 ? '<div style="color:' + C.soft + '">+' + (x.ts.length - 6) + '</div>' : '') + '</td></tr>').join('') +
      '</table>'
      : '<p style="margin:0">' + wmE('Nothing planned yet. Open Plan on the site to make one, or add your exam dates first.') + '</p>') +

    h2('Topics to work on') +
    (weak.length ? '<ul style="margin:0;padding-left:20px">' + weak.slice(0, 6).map(x => '<li style="margin:3px 0"><b>' + esc(x.n) + '</b> <span style="color:' + C.soft + '">· ' + esc(x.l + ' ' + x.s) + ' · ' + wmE(stLab[Math.min(2, x.st)]) + '</span></li>').join('') + '</ul>'
      : '<p style="margin:0">' + wmE('No weak topics marked yet. Rate your topics on the site and they’ll show up here.') + '</p>') +

    (exams.length ? h2('Exams coming up') + '<ul style="margin:0;padding-left:20px">' + exams.map(e => { const u = UNIT[e.u], n = daysBetween(t, e.d); return '<li style="margin:3px 0"><b>' + esc(u ? u.l + ' ' + SUBJ[UNIT_SUBJ[e.u]].short : e.u) + '</b> · ' + esc(fd(e.d, { weekday: 'short', day: 'numeric', month: 'short' })) + ' <span style="color:' + C.soft + '">(' + esc(n + ' ' + wmL(n === 1 ? 'day' : 'days')) + ')</span></li>'; }).join('') + '</ul>' : '') +

    '<p style="margin:26px 0 0"><a href="' + MAIN_URL + '#planner" style="display:inline-block;background:' + C.ink + ';color:#fff;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:700">' + wmE('Open your plan') + '</a></p>' +
    '<p style="margin:22px 0 0;font-size:12px;color:' + C.soft + '">' + wmE('Please don’t reply to this email: replies aren’t delivered.') + ' ' + wmE('You get this because you turned on the weekly email in IAL Revise. To stop it, turn it off in Settings on the site.') + ' ' + esc(wmL('Updated ') + fd(t, { day: 'numeric', month: 'short' })) + '.</p>' +
    '</div></div>';
  const subject = wmL('Your week on IAL Revise') + ' · ' + fd(nextMon, { day: 'numeric', month: 'short' });
  return { subject, html };
}

async function wmPost(action){
  if (!wmReady()) return { ok: false, err: 'setup' };
  const W = wmPrefs();
  try {
    const token = await FB.user.getIdToken();
    const body = { action, token };
    if (action === 'save' || action === 'test'){ const m = wmBuild(); body.subject = m.subject; body.html = m.html; }
    const r = await fetch(WM_URL, { method: 'POST', body: JSON.stringify(body) });   // text/plain, so no CORS pre-check
    const j = await r.json();
    if (j.ok){ W.err = ''; if (action !== 'off') W.at = Date.now(); }
    else W.err = j.err || 'error';
    commit(); return j;
  } catch(e){ W.err = 'network'; return { ok: false, err: 'network' }; }
}
/* keep the copy the script holds up to date while the site is in use */
function wmSync(){
  const W = wmPrefs();
  if (!W.on || !wmReady() || Date.now() - (W.at || 0) < WM_EVERY) return;
  wmPost('save');
}
window.addEventListener('load', () => setTimeout(wmSync, 8000));
setInterval(wmSync, 30 * 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) setTimeout(wmSync, 3000); });

const WM_ERR = {
  auth: 'Your sign-in couldn’t be checked. Sign out and in again, then try once more.',
  unverified: 'Verify your email address first (Account, above), so the email can only go to you.',
  size: 'This week’s email is too long to save. Tick off or remove some old tasks and try again.',
  limit: 'You’ve sent the most test emails for today. Try again tomorrow.',
  quota: 'The site has sent its email limit for today. Yours will still go out on Sunday.',
  network: 'Couldn’t reach the email service. Check your connection; it will try again later.',
  setup: 'The weekly email is still being set up.'
};
function wmCard(){
  if (!(typeof ACCT !== 'undefined' && ACCT)) return '';
  const W = wmPrefs(), u = FB.user, ready = wmReady();
  const head = '<div class="card stack" id="wmail"><div class="card-h"><h2>Weekly email</h2>' + (u && ready ? '<button class="btn sm' + (W.on ? '' : ' primary') + '" data-act="wm-toggle">' + (W.on ? 'Turn off' : 'Turn on') + '</button>' : '') + '</div>';
  if (!u) return head + '<p class="small muted" style="margin:0">Sign in to get a summary by email every Sunday evening.</p></div>';
  if (!ready) return head + '<p class="small muted" style="margin:0">Every Sunday evening: your study time this week, next week’s plan and the topics to work on. Coming soon.</p></div>';
  return head +
    '<p class="small muted" style="margin:0">Every Sunday at 6 pm: your study time this week, next week’s plan and the topics to work on, sent to <b class="notr">' + esc(u.email || '') + '</b>.</p>' +
    (W.on ? (W.err ? '<p class="small warnline" role="alert" style="margin:0">' + esc(WM_ERR[W.err] || 'Something went wrong. It will try again later.') + '</p>'
        : '<p class="small" style="margin:0">On. ' + (W.at ? 'This week’s email last updated ' + esc(fmtDate(new Date(W.at).toISOString().slice(0, 10), { day: 'numeric', month: 'short' })) + ' ' + pad(new Date(W.at).getHours()) + ':' + pad(new Date(W.at).getMinutes()) + '.' : 'Getting this week’s email ready…') + '</p>') +
      '<div class="row"><button class="btn sm" data-act="wm-test">Send me one now</button><button class="btn sm ghost" data-act="wm-preview">' + (ui.wmPrev ? 'Hide preview' : 'Preview') + '</button></div>' +
      (ui.wmPrev ? '<div class="wmprev"><iframe title="Email preview" sandbox="" srcdoc="' + esc('<!doctype html><meta charset="utf-8">' + wmBuild().html) + '"></iframe></div>' : '') : '') +
    '<details class="howto"><summary>What’s in it, and who can see it</summary><ul class="small">' +
      '<li>Your study minutes and days, next week’s plan, your weakest topics (names only) and exams in the next 60 days. Never your marks, mistakes or notes.</li>' +
      '<li>It goes only to the email you signed in with. Google checks your sign-in before anything is saved or sent.</li>' +
      '<li>It’s sent through the site owner’s Google account, so a copy stays in that account’s sent mail. Only the latest week is kept, and turning this off deletes it.</li>' +
      '<li>It uses what’s on your device when you last opened the site, so open the site during the week to keep it current.</li></ul></details>' +
  '</div>';
}
async function wmAct(el){
  const a = el.dataset.act, W = wmPrefs();
  if (a === 'wm-toggle'){
    W.on = !W.on; W.err = ''; commit(); render();
    const j = await wmPost(W.on ? 'save' : 'off');
    toast(W.on ? (j.ok ? 'Weekly email on. The first one comes on Sunday at 6 pm.' : 'Weekly email on, but it couldn’t be set up yet: it will try again.') : 'Weekly email off. Your saved copy was deleted.');
    render(); return true;
  }
  if (a === 'wm-test'){
    el.disabled = true; const j = await wmPost('test');
    toast(j.ok ? 'Sent. Check your inbox (and spam) in a minute.' : (WM_ERR[j.err] || 'Couldn’t send it.')); render(); return true;
  }
  if (a === 'wm-preview'){ ui.wmPrev = !ui.wmPrev; render(); return true; }
  return false;
}
