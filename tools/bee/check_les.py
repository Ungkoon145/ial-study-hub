import sys, json, importlib, os
sys.path.insert(0, '.')
from mpmath import *
mp.dps = 30
mods = [m for m in ['les_a','les_b','les_c','les_d','les_e','les_f'] if os.path.exists(m+'.py')]
LES = sum([importlib.import_module(m).LES for m in mods], [])
def val(it):
    lim = it['lim']; g = lambda x: eval(it['f'], globals(), {'x': x})
    k = lim[0]
    if k == 'v': return {'v': float(eval(lim[1]))}
    if k == 'n': return {'v': float(eval(lim[1])), 'tol': float(lim[2])}
    if k == 'i':
        a0, b0 = mpf(eval(lim[1])), mpf(eval(lim[2])); Lr = b0 - a0
        P = [(a0+Lr*p, a0+Lr*q) for p, q in ((0.1, 0.9), (0.23, 0.61), (0.4, 0.77))]
        return {'p': [[float(x1), float(x2), float(quad(g, [x1, x2]))] for x1, x2 in P]}
    a, b = eval(lim[1]), eval(lim[2])
    pts = [a, b] if len(lim) < 4 else [a] + sum([eval('['+z+']') if ' for ' in z else [eval(z)] for z in lim[3]], []) + [b]
    if b == inf and len(lim) < 4: pts = [a, a+1, b]
    if a == -inf and len(lim) < 4: pts = [a, 0, b]
    return {'v': float(quad(g, pts))}
out = []
for l in LES:
    for kind in ('ex', 'pr'):
        for j, it in enumerate(l[kind]):
            out.append(dict(id=l['id'], k=kind, j=j, ans=it['ans'], **val(it)))
json.dump(out, open('/tmp/lesvals.json', 'w'))
print(len(LES), 'lessons', len(out), 'items')
