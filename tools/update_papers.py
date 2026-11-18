#!/usr/bin/env python3
"""Monthly check for newly released Pearson Edexcel IAL papers.

Asks Pearson's own search service for every IAL subject's question papers, mark schemes and
examiners' reports, and adds links that are new and publicly downloadable (HTTP 200; Pearson keeps
the newest series locked with 401/403 for a while). Existing links are never changed or removed.

Run from the repository root:   python3 tools/update_papers.py [--dry-run]
Edits papers.js and reports.js, bumps the offline-cache version in sw.js, and appends to
tools/papers-log.md. Needs only Python 3 and curl. Links only: nothing from Pearson is copied here.
"""
import json, re, subprocess, sys, urllib.parse, datetime
from concurrent.futures import ThreadPoolExecutor

DRY = '--dry-run' in sys.argv
SERVLET = 'https://qualifications.pearson.com/services/pearson/algolia/GET.servlet'
SUBJECTS = ['Mathematics', 'Further-Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Geography',
            'Psychology', 'History', 'Computer-Science', 'Accounting', 'Business', 'Business-Studies',
            'English-Language', 'English-Literature', 'Information-Technology', 'Law',
            'French', 'German', 'Spanish', 'Arabic', 'Greek']
TYPES = {'Question-paper': 'qp', 'Mark-scheme': 'ms', 'Examiner-report': 'er'}
CODE = re.compile(r'(?i)(?<![a-z])(ws?[a-z]{2}\d\d|yla1)(?:[ _-]+(0[12])(a?))?(?![0-9a-z])')
EXTRA = re.compile(r'(?i)insert|source|answer.?book|transcript|audio|chief|grade|resource|teacher|pre-release|\.zip|data.?booklet|formula')
MONTH = {'January': 1, 'May': 5, 'June': 6, 'October': 10, 'November': 11}

def curl(args, timeout=90):
    return subprocess.run(['curl', '-s', '--max-time', str(timeout)] + args, capture_output=True, text=True).stdout

def search(subject, doctype):
    fq = ('category:"Pearson-UK:Qualification-Family/International-Advanced-Level" AND '
          f'category:"Pearson-UK:Qualification-Subject/{subject}" AND category:"Pearson-UK:Document-Type/{doctype}"')
    for _ in range(3):
        out = curl(['-G', SERVLET, '--data-urlencode', 'fq=' + fq])
        try: return json.loads(out)['searchResults']['algoliaRecords']
        except Exception: continue
    print(f'  ! search failed: {subject} / {doctype}', file=sys.stderr)
    return []

def status(url):
    out = curl(['-o', '/dev/null', '-w', '%{http_code}', '-I', '-L', url], 60).strip()
    if out == '405' or out == '403':   # some servers refuse HEAD; try a 1-byte GET
        out = curl(['-o', '/dev/null', '-w', '%{http_code}', '-r', '0-0', '-L', url], 60).strip()
    return out

NOTICE = re.compile(r'(?i)insufficient (number of )?(entries|candidates)|not (been )?possible to provide|will not (be )?publish')
def is_notice(url):
    """Pearson sometimes publishes a one-page notice ("insufficient entries") instead of an examiner's report."""
    head = curl(['-s', '-I', '-L', url], 60)
    size = re.findall(r'(?i)content-length:\s*(\d+)', head)
    if size and int(size[-1]) > 90000: return False
    import tempfile, os, shutil, glob
    d = tempfile.mkdtemp()
    try:
        f = os.path.join(d, 'r.pdf'); curl(['-s', '-L', '-o', f, url], 120)
        txt = subprocess.run(['pdftotext', '-q', '-l', '2', f, '-'], capture_output=True, text=True).stdout
        if len(txt.strip()) < 200 and shutil.which('tesseract') and shutil.which('pdftoppm'):
            subprocess.run(['pdftoppm', '-r', '120', '-l', '1', '-png', f, os.path.join(d, 'p')])
            txt += ''.join(subprocess.run(['tesseract', g, '-'], capture_output=True, text=True).stdout for g in glob.glob(os.path.join(d, 'p*.png')))
        return bool(NOTICE.search(txt))
    except Exception:
        return False
    finally:
        shutil.rmtree(d, ignore_errors=True)

def series_key(s):
    opt = s.split(' · ')[1] if ' · ' in s else ''
    p = s.split(' · ')[0].split()
    try: return (opt, int(p[-1]) * 100 + MONTH.get(p[0], 5))
    except ValueError: return (opt, 0)

def load(path, name):
    src = open(path, encoding='utf-8').read()
    m = re.search(r'const ' + name + r' = (\{.*?\});', src, re.S)
    return src, m, json.loads(m.group(1))

def main():
    psrc, pm, PAPERS = load('papers.js', 'PAPERS')
    rsrc, rm, ER = load('reports.js', 'PAPER_ER')
    nm = re.search(r'const PAPER_ER_NONE = (\{.*?\});', rsrc, re.S)
    NONE = json.loads(nm.group(1)) if nm else {}
    known = set(PAPERS)
    jobs = [(s, d) for s in SUBJECTS for d in TYPES]
    found = {}   # (code, series) -> {qp, ms, er, qpR, msR, erR}
    with ThreadPoolExecutor(6) as ex:
        for (s, d), recs in zip(jobs, ex.map(lambda j: search(*j), jobs)):
            for x in recs:
                url, title, desc = x.get('url', ''), x.get('title', ''), x.get('description', '')
                ser = [c.split('/')[-1].replace('-', ' ') for c in x.get('category', []) if 'Exam-Series' in c]
                fn = url.split('/')[-1]
                m = CODE.search(fn) or CODE.search(title + ' ') or CODE.search(desc + ' ')
                if not m or not ser or EXTRA.search(fn + ' ' + title): continue
                code = m.group(1).upper().replace('WSFR', 'WFR')
                if code == 'YLA1': code = 'YLA1' + (m.group(2) or '01')[-1]
                if code not in known: continue          # only units the site already covers (current specs)
                key = ser[0]
                if code.startswith('WHI'):              # History: one paper per option, stored as "June 2022 · 1A"
                    o = re.search(r'(?i)whi0\d[ _-]+1([a-d])(?![a-z])', fn) or re.search(r'(?i)(?:unit|paper)\s*\d\s*([a-d])\b', title + ' ' + desc)
                    if not o: continue
                    key = f'{ser[0]} · 1{o.group(1).upper()}'
                k = TYPES[d] + ('R' if (m.group(3) or '').lower() == 'a' or re.search(r'(?i)regional', fn + desc) else '')
                found.setdefault((code, key), {}).setdefault(k, 'https://qualifications.pearson.com' + urllib.parse.quote(url))
    have = {(c, r[0]): r for c, rows in PAPERS.items() for r in rows}
    todo = []
    for (code, ser), v in found.items():
        row = have.get((code, ser))
        for kind in ('qp', 'ms'):
            idx = 1 if kind == 'qp' else 2
            if row is None or not row[idx]:
                for u in (v.get(kind), v.get(kind + 'R')):
                    if u: todo.append((code, ser, kind, u))
        if (v.get('er') or v.get('erR')) and ser not in ER.get(code, {}) and ser not in NONE.get(code, []):
            for u in (v.get('er'), v.get('erR')):
                if u: todo.append((code, ser, 'er', u))
    print(f'{len(found)} unit/series found on Pearson; {len(todo)} candidate new links to test')
    with ThreadPoolExecutor(8) as ex:
        codes = list(ex.map(lambda t: status(t[3]), todo))
    added, locked = [], 0
    for (code, ser, kind, u), st in zip(todo, codes):
        if st != '200':
            locked += 1; continue
        if kind == 'er':
            if ser in ER.setdefault(code, {}) or ser in NONE.get(code, []): continue
            if is_notice(u):
                NONE.setdefault(code, []).append(ser); added.append(f'{code} {ser}: no examiner report (too few candidates)')
                continue
            ER[code][ser] = u; added.append(f'{code} {ser} examiner report')
            continue
        rows = PAPERS.setdefault(code, [])
        row = next((r for r in rows if r[0] == ser), None)
        if row is None:
            row = [ser, None, None]; rows.append(row)   # the site sorts series itself
        idx = 1 if kind == 'qp' else 2
        if not row[idx]:
            row[idx] = u; added.append(f'{code} {ser} {"question paper" if kind == "qp" else "mark scheme"}')
    print(f'{len(added)} new links added; {locked} still locked or unavailable')
    for a in sorted(added): print('  +', a)
    if DRY or not added: return 0
    psrc = psrc[:pm.start(1)] + json.dumps(PAPERS, ensure_ascii=False, separators=(',', ':')) + psrc[pm.end(1):]
    new_r = rsrc[:rm.start(1)] + json.dumps(ER, ensure_ascii=False, separators=(',', ':')) + rsrc[rm.end(1):]
    nm2 = re.search(r'const PAPER_ER_NONE = (\{.*?\});', new_r, re.S)
    if nm2: new_r = new_r[:nm2.start(1)] + json.dumps(NONE, ensure_ascii=False, separators=(',', ':')) + new_r[nm2.end(1):]
    elif NONE: new_r = new_r.rstrip() + '\nconst PAPER_ER_NONE = ' + json.dumps(NONE, ensure_ascii=False, separators=(',', ':')) + ';\n'
    rsrc = new_r
    open('papers.js', 'w', encoding='utf-8').write(psrc)
    open('reports.js', 'w', encoding='utf-8').write(rsrc)
    sw = open('sw.js', encoding='utf-8').read()
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%d%H%M%S')
    sw = re.sub(r"const CACHE = 'ial-study-hub-\d+';", f"const CACHE = 'ial-study-hub-{stamp}';", sw)
    open('sw.js', 'w', encoding='utf-8').write(sw)
    with open('tools/papers-log.md', 'a', encoding='utf-8') as f:
        f.write(f'\n## {datetime.date.today().isoformat()}: {len(added)} new links\n' + ''.join(f'- {a}\n' for a in sorted(added)))
    return 0

if __name__ == '__main__':
    sys.exit(main())
