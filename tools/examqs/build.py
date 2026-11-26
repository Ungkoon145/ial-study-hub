# Builds examqs.js from the per-unit files here. Checks each question's stated total equals its number of mark points.
import json, re, glob, importlib.util, os
rows = []
order = ['p1','p2','p3','p4','m1','s1','fp1','fp2','fp3']
for name in order:
    f = os.path.join(os.path.dirname(__file__), name + '.py')
    if not os.path.exists(f): continue
    spec = importlib.util.spec_from_file_location(name, f); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for t, q, ms in m.Q:
        tot = int(re.search(r'\[(\d+) marks\]\s*$', q).group(1))
        parts = sum(int(x) for x in re.findall(r'\[(\d+)\](?!\s*marks)', q.replace('[%d marks]' % tot, '')))
        assert tot == len(ms), (m.U, t, q[:50], tot, len(ms))
        assert parts in (0, tot), (m.U, t, q[:50], 'parts', parts, tot)
        rows.append(['w', m.U, t, 4, q, ms])
js = ('/* Exam-style questions written for IAL Revise (not Pearson questions): longer, multi-part, with a step-by-step\n'
      '   mark scheme (one mark per step). Every answer was checked with a computer algebra system before publishing.\n'
      '   Row: ["w", unit, topic index, 4 (exam-style), question, [mark points]]. Merged into the question list by tqIndex(). */\n'
      'var TQ_EXAM = (function(){\n  const seen = {}, out = [];\n'
      '  const id = (u, t) => { const k = u + "-" + t; seen[k] = (seen[k] || 0) + 1; return k + "-x" + seen[k]; };\n'
      '  const D = ' + json.dumps(rows, ensure_ascii=False, indent=0) + ';\n'
      '  D.forEach(r => out.push({ id: id(r[1], r[2]), u: r[1], t: r[2], d: r[3], type: "w", q: r[4], ms: r[5], m: r[5].length }));\n'
      '  return out;\n})();\n')
open('/home/claude/ial-study-hub/examqs.js', 'w').write(js)
print(len(rows), 'questions')
