// Builds plain web pages that search engines can read: one per subject and one per unit, in English and Thai,
// plus sitemap.xml. Everything comes from the site's own data files, so it stays in step with the app.
// Run from the site folder:  node tools/build-pages.mjs
// GitHub runs it again whenever papers.js, reports.js, timetable.js or subjects.json change, and once a week
// (so "upcoming exam" dates stay current). See .github/workflows/pages.yml.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SITE = (process.env.SITE_URL || 'https://ungkoon145.github.io/ial-study-hub/').replace(/\/?$/, '/');
const TODAY = new Date().toISOString().slice(0, 10);

function loadJs(file, names){
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return new Function(src + '\nreturn {' + names.map(n => n + ': typeof ' + n + ' !== "undefined" ? ' + n + ' : null').join(',') + '};')();
}
const SUBJECTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'subjects.json'), 'utf8'));
const { PAPERS } = loadJs('papers.js', ['PAPERS']);
const { PAPER_ER } = loadJs('reports.js', ['PAPER_ER']);
const { IAL_TT, IAL_TT_SRC } = loadJs('timetable.js', ['IAL_TT', 'IAL_TT_SRC']);

const FULL = { math: 'Mathematics', fm: 'Further Mathematics' };
const SLUG = { math: 'mathematics', fm: 'further-mathematics', phys: 'physics', chem: 'chemistry', bio: 'biology', econ: 'economics', geog: 'geography', psych: 'psychology', hist: 'history', cs: 'computer-science', acc: 'accounting', bus: 'business', enlang: 'english-language', enlit: 'english-literature', it: 'information-technology', law: 'law', fre: 'french', ger: 'german', spa: 'spanish', ara: 'arabic', gre: 'greek' };
const TH_SUBJ = { math: 'คณิตศาสตร์', fm: 'คณิตศาสตร์เพิ่มเติม', phys: 'ฟิสิกส์', chem: 'เคมี', bio: 'ชีววิทยา', econ: 'เศรษฐศาสตร์', geog: 'ภูมิศาสตร์', psych: 'จิตวิทยา', hist: 'ประวัติศาสตร์', cs: 'วิทยาการคอมพิวเตอร์', acc: 'การบัญชี', bus: 'ธุรกิจ', enlang: 'ภาษาอังกฤษ', enlit: 'วรรณคดีอังกฤษ', it: 'เทคโนโลยีสารสนเทศ', law: 'กฎหมาย', fre: 'ภาษาฝรั่งเศส', ger: 'ภาษาเยอรมัน', spa: 'ภาษาสเปน', ara: 'ภาษาอาหรับ', gre: 'ภาษากรีก' };
const TH_MONTH = { January: 'มกราคม', May: 'พฤษภาคม', June: 'มิถุนายน', October: 'ตุลาคม', November: 'พฤศจิกายน' };
const MONTH_N = { January: 1, May: 5, June: 6, October: 10, November: 11 };

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const subjName = s => FULL[s.id] || s.name;
const subjNameTh = s => TH_SUBJ[s.id] || s.name;
const unitUrl = (u, th) => (th ? 'th/' : '') + 'past-papers/' + u.c.toLowerCase() + '/';
const subjUrl = (s, th) => (th ? 'th/' : '') + 'past-papers/' + SLUG[s.id] + '/';
const hubUrl = th => (th ? 'th/' : '') + 'past-papers/';
function seriesKey(sr){ const y = +(sr.match(/\d{4}/) || [0])[0], m = MONTH_N[(sr.match(/^[A-Za-z]+/) || [''])[0]] || 0, v = (sr.match(/· (\w+)$/) || ['', ''])[1]; return [y * 100 + m, v]; }
function seriesTh(sr){ return sr.replace(/^Specimen/, 'ข้อสอบตัวอย่าง').replace(/^(January|May|June|October|November)/, m => TH_MONTH[m]); }
function hostOf(url){ try { const h = new URL(url).host; return /physicsandmathstutor/.test(h) ? 'PMT' : /pearson/.test(h) ? 'Pearson' : /paperlords/.test(h) ? 'PaperLords' : h; } catch(e){ return ''; } }
function rows(u){
  const er = (PAPER_ER && PAPER_ER[u.c]) || {};
  return (PAPERS[u.c] || []).map(([sr, qp, ms]) => ({ sr, qp, ms, er: er[sr] || '' }))
    .sort((a, b) => { const [x, xv] = seriesKey(a.sr), [y, yv] = seriesKey(b.sr); return y - x || xv.localeCompare(yv); });
}
function span(R){ const ys = R.map(r => +(r.sr.match(/\d{4}/) || [0])[0]).filter(Boolean); return ys.length ? [Math.min(...ys), Math.max(...ys)] : null; }
function exams(u){
  const out = [];
  Object.entries(IAL_TT || {}).forEach(([series, list]) => { const x = list[u.c]; if (x && x[0] >= TODAY) out.push({ series, d: x[0], s: x[1], src: (IAL_TT_SRC || {})[series] }); });
  return out.sort((a, b) => a.d.localeCompare(b.d));
}
function fmtDate(d, th){ const dt = new Date(d + 'T00:00:00Z'); return dt.toLocaleDateString(th ? 'th-TH' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); }

/* ---------- page shell ---------- */
const CSS = `
@font-face{font-family:"IAL PSK";font-weight:100 599;src:local("TH SarabunPSK"),local("TH Sarabun PSK"),local("THSarabunPSK");size-adjust:133%;unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}
@font-face{font-family:"IAL PSK";font-weight:600 900;src:local("TH SarabunPSK Bold"),local("TH Sarabun PSK Bold"),local("THSarabunPSK-Bold");size-adjust:133%;unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}
@font-face{font-family:"IAL Thai";font-weight:300 549;font-display:swap;src:url(%FONTS%sarabun-thai-400-normal.woff2) format("woff2");unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}
@font-face{font-family:"IAL Thai";font-weight:550 900;font-display:swap;src:url(%FONTS%sarabun-thai-700-normal.woff2) format("woff2");unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}
:root{--bg:#fff;--ink:#18202f;--muted:#5d6577;--line:#e4e6eb;--soft:#f3f4f7;--navy:#101a2e;--brass:#c9a96e;--brass-ink:#80683c;--link:#1d4f91;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#0e1422;--ink:#e8ebf2;--muted:#9aa3b5;--line:#263048;--soft:#1b2335;--navy:#0a101c;--brass-ink:#c9a96e;--link:#9cc0f5;color-scheme:dark}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 "IAL PSK","IAL Thai","Gill Sans","Gill Sans MT","Gill Sans Nova",Calibri,"Trebuchet MS","Leelawadee UI",Thonburi,Sarabun,sans-serif}
a{color:var(--link)}a:focus-visible,button:focus-visible{outline:3px solid var(--brass);outline-offset:2px;border-radius:4px}
.skip{position:absolute;left:-999px}.skip:focus{left:12px;top:12px;background:var(--bg);padding:8px 12px;z-index:9}
header{background:var(--navy);color:#fff}
.bar{max-width:980px;margin:0 auto;padding:12px 18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none;font-size:1.15rem;letter-spacing:.02em}
.brand b{border:1px solid var(--brass);color:var(--brass);border-radius:6px;padding:1px 6px;font-size:.8rem;font-weight:500}
.brand span{color:var(--brass)}
.bar .lang{margin-left:auto;color:#dfe4ee;font-size:.95rem}.bar .lang a{color:#fff}
main{max-width:980px;margin:0 auto;padding:18px 18px 48px}
nav.crumbs{font-size:.9rem;color:var(--muted)}nav.crumbs ol{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}nav.crumbs li+li::before{content:"›";margin-right:6px}
h1{font-size:1.9rem;line-height:1.15;margin:.4em 0 .3em;font-weight:600}h2{font-size:1.3rem;margin:1.6em 0 .5em;font-weight:600}
.lead{font-size:1.08rem;max-width:68ch;margin:0 0 14px}
.cta{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 6px}
.btn{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:999px;text-decoration:none;font-weight:600;border:1px solid var(--line);color:var(--ink);background:var(--bg)}
.btn.primary{background:var(--navy);color:#fff;border-color:var(--navy)}
@media (prefers-color-scheme:dark){.btn.primary{background:var(--brass);color:#101a2e;border-color:var(--brass)}}
.note{color:var(--muted);font-size:.92rem;max-width:72ch}
.tbl{overflow-x:auto;border:1px solid var(--line);border-radius:12px}
table{border-collapse:collapse;width:100%;font-size:.97rem}caption{text-align:left;padding:10px 12px;color:var(--muted);font-size:.9rem}
th,td{padding:9px 12px;border-top:1px solid var(--line);text-align:left;vertical-align:top}thead th{background:var(--soft);border-top:0;font-size:.88rem}
td a{display:inline-block;min-height:32px;padding:4px 0}.src{color:var(--muted);font-size:.8rem}
.exams{list-style:none;padding:0;margin:0;display:grid;gap:8px}.exams li{padding:10px 14px;border:1px solid var(--line);border-left:4px solid var(--brass-ink);border-radius:10px}
.topics{columns:2 260px;padding-left:20px;margin:0}.topics li{margin:0 0 4px;break-inside:avoid}
.cards{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
.cards a{display:block;height:100%;padding:12px 14px;border:1px solid var(--line);border-radius:12px;text-decoration:none;color:var(--ink)}
.cards a:hover{border-color:var(--brass-ink)}.cards b{display:block}.cards span{color:var(--muted);font-size:.9rem}
.subj{margin-top:22px}.subj h2{margin:0 0 8px}
footer{border-top:1px solid var(--line);margin-top:36px;padding-top:16px;color:var(--muted);font-size:.86rem}
`;
function page({ th, rel, title, desc, h1, crumbs, body, alt, ld }){
  const depth = rel.split('/').filter(Boolean).length, up = '../'.repeat(depth);
  const canon = SITE + rel, altUrl = SITE + alt;
  const L = th ? { lang: 'th', other: 'English', otherLang: 'en', skip: 'ข้ามไปยังเนื้อหา', home: 'หน้าหลัก' } : { lang: 'en', other: 'ภาษาไทย', otherLang: 'th', skip: 'Skip to content', home: 'Home' };
  const crumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: SITE + c[1] })) };
  return `<!DOCTYPE html>
<html lang="${L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canon}">
<link rel="alternate" hreflang="${L.lang}" href="${canon}">
<link rel="alternate" hreflang="${L.otherLang}" href="${altUrl}">
<link rel="alternate" hreflang="x-default" href="${th ? altUrl : canon}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="IAL Revise">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${SITE}og.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="${th ? 'th_TH' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#101a2e">
<link rel="icon" type="image/png" sizes="32x32" href="${up}icons/favicon-32.png">
<link rel="apple-touch-icon" href="${up}icons/apple-touch-icon.png">
<style>${CSS.replace(/%FONTS%/g, up + 'fonts/')}</style>
<script type="application/ld+json">${JSON.stringify(ld ? [crumbLd, ld] : crumbLd)}</script>
</head>
<body>
<a class="skip" href="#main">${L.skip}</a>
<header><div class="bar"><a class="brand" href="${up}${th ? '?lang=th' : ''}"><b>IAL</b><span>Revise</span></a><span class="lang"><a href="${up}${alt}" hreflang="${L.otherLang}" lang="${L.otherLang}">${L.other}</a></span></div></header>
<main id="main">
<nav class="crumbs" aria-label="${th ? 'ตำแหน่งของหน้า' : 'Breadcrumb'}"><ol>${crumbs.map((c, i) => '<li>' + (i < crumbs.length - 1 ? '<a href="' + up + c[1] + '">' + esc(c[0]) + '</a>' : '<span aria-current="page">' + esc(c[0]) + '</span>') + '</li>').join('')}</ol></nav>
<h1>${h1}</h1>
${body}
<footer>${th
  ? 'IAL Revise เป็นเว็บไซต์ทบทวนบทเรียนฟรีที่ทำขึ้นอย่างอิสระ ไม่ได้เกี่ยวข้องหรือได้รับการรับรองจาก Pearson Edexcel, Physics &amp; Maths Tutor หรือ PaperLords ไฟล์ข้อสอบเปิดจากเว็บไซต์ของผู้เผยแพร่เอง ไม่มีโฆษณา'
  : 'IAL Revise is a free, independent study site, not affiliated with or endorsed by Pearson Edexcel, Physics &amp; Maths Tutor or PaperLords. Papers open on the publishers’ own sites. No ads.'} <a href="${up}privacy.html">${th ? 'ความเป็นส่วนตัว' : 'Privacy'}</a> · ${th ? 'อัปเดต' : 'Updated'} ${esc(fmtDate(TODAY, th))}</footer>
</main>
</body>
</html>
`;
}
const appLink = (rel, th, q, route) => '../'.repeat(rel.split('/').filter(Boolean).length) + '?' + (q ? 'u=' + q : '') + (th ? (q ? '&' : '') + 'lang=th' : '') + '#' + route;

/* ---------- unit page ---------- */
function unitPage(s, u, th){
  const rel = unitUrl(u, th), R = rows(u), sp = span(R), ex = exams(u), nEr = R.filter(r => r.er).length;
  const nm = th ? subjNameTh(s) : subjName(s), yr = sp ? sp[0] + (sp[1] !== sp[0] ? '–' + sp[1] : '') : '';
  const title = th ? `ข้อสอบเก่า ${u.c} ${u.n} พร้อมเฉลย | IAL ${nm}` : `${u.c} ${u.n} past papers and mark schemes | IAL ${nm}`;
  const desc = th
    ? `ข้อสอบเก่าและเกณฑ์การให้คะแนน (mark scheme) Pearson Edexcel IAL ${u.c} ${u.n}${yr ? ' ปี ' + yr : ''} ฟรี ${nEr ? 'พร้อมรายงานผู้ตรวจข้อสอบ ' : ''}หัวข้อในยูนิต และวันสอบครั้งถัดไป`
    : `Free Pearson Edexcel IAL ${u.c} ${u.n} (${u.l}) question papers and mark schemes${yr ? ', ' + yr : ''}${nEr ? ', with examiner reports' : ''}. Topic list and next exam dates.`;
  const t = th ? { ser: 'ชุดข้อสอบ', qp: 'ข้อสอบ', ms: 'เฉลย (mark scheme)', er: 'รายงานผู้ตรวจ', pdf: 'PDF', none: '–', cap: `ข้อสอบเก่า ${u.c} ใหม่สุดอยู่ด้านบน`, open: `เปิด ${u.c} ใน IAL Revise`, rev: 'ทบทวนหัวข้อและแฟลชการ์ด', all: 'ข้อสอบทุกชุด', ex: 'วันสอบครั้งถัดไป', am: 'ช่วงเช้า', pm: 'ช่วงบ่าย', tt: 'ตารางสอบของ Pearson', top: 'หัวข้อในยูนิตนี้', other: `ยูนิตอื่นในวิชา${nm}`, from: 'จาก' }
    : { ser: 'Series', qp: 'Question paper', ms: 'Mark scheme', er: 'Examiner report', pdf: 'PDF', none: '–', cap: `${u.c} past papers, newest first`, open: `Open ${u.c} in IAL Revise`, rev: 'Revise topics and flashcards', all: 'All past papers', ex: 'Next exams', am: 'morning', pm: 'afternoon', tt: 'Pearson timetable', top: 'Topics in this unit', other: `Other ${nm} units`, from: 'from' };
  const link = (url, label) => url ? `<a href="${esc(url)}" rel="noopener">${label}</a> <span class="src">${hostOf(url)}</span>` : t.none;
  const lead = th
    ? `ข้อสอบเก่า (question paper) และเกณฑ์การให้คะแนน (mark scheme) ของ Pearson Edexcel International A Level ยูนิต ${u.c} ${esc(u.n)} มีทั้งหมด ${R.length} ชุด${yr ? ' ตั้งแต่ปี ' + yr : ''}${nEr ? ' พร้อมรายงานผู้ตรวจข้อสอบ (examiner report) ' + nEr + ' ชุด' : ''} ใช้ฟรี ไม่ต้องสมัครสมาชิก ใน IAL Revise ยังจดคะแนน คำนวณเกรด UMS และทำแผนทบทวนได้`
    : `Every Pearson Edexcel International A Level ${u.c} ${esc(u.n)} (${esc(u.l)}) question paper and mark scheme we can link to: ${R.length} papers${yr ? ' from ' + yr : ''}${nEr ? ', with ' + nEr + ' examiner reports' : ''}. Free, with no sign-up. In IAL Revise you can also log your marks, see your UMS grade and plan your revision.`;
  const body = `<p class="lead">${lead}</p>
<div class="cta"><a class="btn primary" href="${appLink(rel, th, u.c, 'papers')}">${t.open}</a><a class="btn" href="${appLink(rel, th, u.c, 'syllabus')}">${t.rev}</a></div>
${ex.length ? `<h2>${t.ex}</h2><ul class="exams">${ex.map(e => `<li><b>${esc(fmtDate(e.d, th))}</b>, ${e.s === 'AM' ? t.am : t.pm} · ${th ? seriesTh(e.series) : esc(e.series)}${e.src ? ` (<a href="${esc(e.src)}" rel="noopener">${t.tt}</a>)` : ''}</li>`).join('')}</ul>` : ''}
<h2>${t.all}</h2>
<div class="tbl"><table><caption>${t.cap}</caption><thead><tr><th scope="col">${t.ser}</th><th scope="col">${t.qp}</th><th scope="col">${t.ms}</th><th scope="col">${t.er}</th></tr></thead><tbody>
${R.map(r => `<tr><th scope="row">${esc(th ? seriesTh(r.sr) : r.sr)}</th><td>${link(r.qp, t.pdf)}</td><td>${link(r.ms, t.pdf)}</td><td>${link(r.er, t.pdf)}</td></tr>`).join('\n')}
</tbody></table></div>
${(u.t || []).length ? `<h2>${t.top}</h2><ul class="topics">${u.t.map(x => '<li>' + esc(x) + '</li>').join('')}</ul>` : ''}
<h2>${t.other}</h2><ul class="cards">${s.units.filter(v => v.c !== u.c).map(v => `<li><a href="../${v.c.toLowerCase()}/"><b>${v.c} ${esc(v.n)}</b><span>${esc(v.l)} · ${(PAPERS[v.c] || []).length} ${th ? 'ชุด' : 'papers'}</span></a></li>`).join('')}</ul>`;
  const crumbs = th ? [['IAL Revise', ''], ['ข้อสอบเก่า', hubUrl(true)], [nm, subjUrl(s, true)], [u.c, rel]] : [['IAL Revise', ''], ['Past papers', hubUrl(false)], [nm, subjUrl(s, false)], [u.c, rel]];
  return { rel, html: page({ th, rel, title, desc, h1: th ? `ข้อสอบเก่า ${u.c} ${esc(u.n)} <small style="font-weight:400">(${esc(u.l)})</small>` : `${u.c} ${esc(u.n)} past papers <small style="font-weight:400">(${esc(u.l)})</small>`, crumbs, body, alt: unitUrl(u, !th) }) };
}
/* ---------- subject page ---------- */
function subjPage(s, th){
  const rel = subjUrl(s, th), nm = th ? subjNameTh(s) : subjName(s), n = s.units.reduce((a, u) => a + (PAPERS[u.c] || []).length, 0);
  const title = th ? `ข้อสอบเก่า IAL ${nm} พร้อมเฉลย ทุกยูนิต | Pearson Edexcel` : `IAL ${nm} past papers and mark schemes, every unit | Pearson Edexcel`;
  const desc = th ? `ข้อสอบเก่าและเฉลย Pearson Edexcel International A Level วิชา${nm} ครบทุกยูนิต (${s.units.map(u => u.c).join(', ')}) รวม ${n} ชุด ฟรี ไม่มีโฆษณา` : `Free Pearson Edexcel International A Level ${nm} past papers and mark schemes for every unit (${s.units.map(u => u.c).join(', ')}): ${n} papers. No ads, no sign-up.`;
  const lead = th ? `เลือกยูนิตเพื่อดูข้อสอบเก่า เฉลย และรายงานผู้ตรวจข้อสอบทุกชุดของวิชา${nm} หลักสูตร International A Level ของ Pearson Edexcel รวม ${n} ชุด` : `Choose a unit to see every question paper, mark scheme and examiner report for Pearson Edexcel International A Level ${nm}: ${n} papers in all.`;
  const body = `<p class="lead">${lead}</p>
<div class="cta"><a class="btn primary" href="${appLink(rel, th, s.units[0].c, 'papers')}">${th ? 'เปิด IAL Revise' : 'Open IAL Revise'}</a></div>
<h2>${th ? 'ยูนิต' : 'Units'}</h2><ul class="cards">${s.units.map(u => { const sp = span(rows(u)); return `<li><a href="../${u.c.toLowerCase()}/"><b>${u.c} ${esc(u.n)}</b><span>${esc(u.l)} · ${(PAPERS[u.c] || []).length} ${th ? 'ชุด' : 'papers'}${sp ? ' · ' + sp[0] + '–' + sp[1] : ''}</span></a></li>`; }).join('')}</ul>`;
  const crumbs = th ? [['IAL Revise', ''], ['ข้อสอบเก่า', hubUrl(true)], [nm, rel]] : [['IAL Revise', ''], ['Past papers', hubUrl(false)], [nm, rel]];
  return { rel, html: page({ th, rel, title, desc, h1: th ? `ข้อสอบเก่า IAL ${nm}` : `IAL ${nm} past papers`, crumbs, body, alt: subjUrl(s, !th) }) };
}
/* ---------- hub ---------- */
function hubPage(th){
  const rel = hubUrl(th), total = Object.values(PAPERS).reduce((a, x) => a + x.length, 0);
  const title = th ? 'ข้อสอบเก่า IAL พร้อมเฉลย ทุกวิชา ฟรี | IAL Revise' : 'Pearson Edexcel IAL past papers and mark schemes, every subject | IAL Revise';
  const desc = th ? `ข้อสอบเก่าและเฉลย Pearson Edexcel International A Level ${SUBJECTS.length} วิชา ${total} ชุด ฟรี พร้อมแฟลชการ์ด คำนวณเกรด และวางแผนทบทวน ภาษาไทยได้` : `Free Pearson Edexcel International A Level past papers and mark schemes: ${SUBJECTS.length} subjects, ${total} papers. Plus flashcards, a UMS grade calculator and a revision planner.`;
  const lead = th
    ? `IAL Revise เป็นเว็บไซต์ทบทวนบทเรียนฟรีสำหรับนักเรียน Pearson Edexcel International A Level (IAL) รวมข้อสอบเก่าและเฉลย ${total} ชุดจาก ${SUBJECTS.length} วิชา พร้อมแฟลชการ์ด โจทย์ตามหัวข้อ คำนวณเกรด UMS ตัวจับเวลาโฟกัส และวางแผนทบทวน ใช้ภาษาไทยได้ ไม่มีโฆษณา`
    : `IAL Revise is a free revision site for Pearson Edexcel International A Level (IAL) students: ${total} past papers and mark schemes across ${SUBJECTS.length} subjects, plus flashcards, topic questions, a UMS grade calculator, a focus timer and a revision planner. No ads.`;
  const body = `<p class="lead">${lead}</p>
<div class="cta"><a class="btn primary" href="${'../'.repeat(rel.split('/').filter(Boolean).length)}${th ? '?lang=th' : ''}">${th ? 'เปิด IAL Revise' : 'Open IAL Revise'}</a></div>
${SUBJECTS.map(s => `<section class="subj"><h2><a href="${SLUG[s.id]}/">${esc(th ? 'IAL ' + subjNameTh(s) : 'IAL ' + subjName(s))}</a></h2><ul class="cards">${s.units.map(u => `<li><a href="${u.c.toLowerCase()}/"><b>${u.c} ${esc(u.n)}</b><span>${esc(u.l)} · ${(PAPERS[u.c] || []).length} ${th ? 'ชุด' : 'papers'}</span></a></li>`).join('')}</ul></section>`).join('\n')}`;
  const ld = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'IAL Revise', url: SITE, inLanguage: ['en', 'th'], description: desc };
  return { rel, html: page({ th, rel, title, desc, h1: th ? 'ข้อสอบเก่า IAL ทุกวิชา' : 'IAL past papers by subject and unit', crumbs: th ? [['IAL Revise', ''], ['ข้อสอบเก่า', rel]] : [['IAL Revise', ''], ['Past papers', rel]], body, alt: hubUrl(!th), ld }) };
}

/* ---------- write ---------- */
for (const d of ['past-papers', 'th/past-papers']) fs.rmSync(path.join(ROOT, d), { recursive: true, force: true });
const pages = [];
for (const th of [false, true]){
  pages.push(hubPage(th));
  for (const s of SUBJECTS){ pages.push(subjPage(s, th)); for (const u of s.units) pages.push(unitPage(s, u, th)); }
}
for (const p of pages){ const f = path.join(ROOT, p.rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, p.html); }
const alt = rel => rel.startsWith('th/') ? rel.slice(3) : 'th/' + rel;
const urls = [{ rel: '', alt: null }].concat(pages.map(p => ({ rel: p.rel, alt: alt(p.rel) })));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `<url><loc>${SITE}${u.rel}</loc><lastmod>${TODAY}</lastmod>${u.alt ? `<xhtml:link rel="alternate" hreflang="${u.rel.startsWith('th/') ? 'th' : 'en'}" href="${SITE}${u.rel}"/><xhtml:link rel="alternate" hreflang="${u.rel.startsWith('th/') ? 'en' : 'th'}" href="${SITE}${u.alt}"/>` : ''}</url>`).join('\n')}
</urlset>
`);
console.log('built', pages.length, 'pages and sitemap.xml with', urls.length, 'addresses');
