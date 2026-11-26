# Helpers for Learn lessons. Prose strings may contain $...$ (inline LaTeX) and <b>, <i>.
def T(en, th):            # a theorem paragraph
    return {"en": en, "th": th}
def S(en, th, m=""):      # a proof step: prose (why) + optional display maths
    return {"en": en, "th": th, "m": m}
def X(q, ans, al, f, lim, s, qp=None):   # worked example (verified numerically)
    return {"q": q, "ans": ans, "al": al, "f": f, "lim": lim, "s": s, "qp": qp}
def P(q, ans, al, f, lim, s, h, ht, qp=None):  # practice question
    return {"q": q, "ans": ans, "al": al, "f": f, "lim": lim, "s": s, "h": h, "ht": ht, "qp": qp}
def L(id, u, n, nt, thm, proof, ex, pr, gate=None):
    assert len(pr) == 5, id
    return {"id": id, "u": u, "n": n, "nt": nt, "thm": thm, "proof": proof, "ex": ex, "pr": pr}
