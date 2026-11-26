/* Exam-style questions written for IAL Revise (not Pearson questions): longer, multi-part, with a step-by-step
   mark scheme (one mark per step). Every answer was checked with a computer algebra system before publishing.
   Row: ["w", unit, topic index, 4 (exam-style), question, [mark points]]. Merged into the question list by tqIndex(). */
var TQ_EXAM = (function(){
  const seen = {}, out = [];
  const id = (u, t) => { const k = u + "-" + t; seen[k] = (seen[k] || 0) + 1; return k + "-x" + seen[k]; };
  const D = [
[
"w",
"WMA11",
0,
4,
"(a) Write $\\sqrt{75}+\\sqrt{48}$ in the form $a\\sqrt{3}$, where $a$ is an integer. [2]\n(b) Hence write $\\dfrac{\\sqrt{75}+\\sqrt{48}}{2+\\sqrt{3}}$ in the form $p\\sqrt{3}+q$, where $p$ and $q$ are integers. [3]\n(c) Solve $\\sqrt{3}\\,x+5=\\sqrt{75}$, giving your answer in the form $m+n\\sqrt{3}$, where $m$ and $n$ are rational. [2] [7 marks]",
[
"(a) $\\sqrt{75}=5\\sqrt{3}$ and $\\sqrt{48}=4\\sqrt{3}$",
"(a) $9\\sqrt{3}$",
"(b) Multiplies top and bottom by $2-\\sqrt{3}$",
"(b) Denominator $(2+\\sqrt{3})(2-\\sqrt{3})=4-3=1$",
"(b) $9\\sqrt{3}(2-\\sqrt{3})=18\\sqrt{3}-27$, so $p=18$, $q=-27$",
"(c) $\\sqrt{3}\\,x=5\\sqrt{3}-5$, so $x=5-\\dfrac{5}{\\sqrt{3}}$",
"(c) Rationalises: $x=5-\\dfrac{5}{3}\\sqrt{3}$"
]
],
[
"w",
"WMA11",
0,
4,
"(a) Given that $y=2^{x}$, write $4^{x}$ and $2^{x+1}$ in terms of $y$. [2]\n(b) Hence solve $4^{x}-5\\times2^{x+1}+16=0$. [5] [7 marks]",
[
"(a) $4^{x}=(2^{2})^{x}=y^{2}$",
"(a) $2^{x+1}=2\\times2^{x}=2y$",
"(b) Substitutes: $y^{2}-10y+16=0$",
"(b) Factorises: $(y-2)(y-8)=0$",
"(b) $y=2$ or $y=8$",
"(b) $2^{x}=2$ gives $x=1$",
"(b) $2^{x}=8$ gives $x=3$"
]
],
[
"w",
"WMA11",
1,
4,
"$f(x)=2x^{2}-12x+23$\n(a) Write $f(x)$ in the form $a(x+b)^{2}+c$, where $a$, $b$ and $c$ are integers. [3]\n(b) State the coordinates of the minimum point of $y=f(x)$. [1]\n(c) Explain why $f(x)>0$ for all real values of $x$. [1]\n(d) Find the set of values of $k$ for which $f(x)=k$ has two distinct real roots. [3] [8 marks]",
[
"(a) $2(x^{2}-6x)+23$",
"(a) $2(x-3)^{2}-18+23$",
"(a) $2(x-3)^{2}+5$",
"(b) $(3,5)$",
"(c) $2(x-3)^{2}\\ge0$, so $f(x)\\ge5>0$",
"(d) Uses $b^{2}-4ac>0$ with $2x^{2}-12x+(23-k)=0$: $144-8(23-k)>0$",
"(d) Simplifies: $8k-40>0$",
"(d) $k>5$"
]
],
[
"w",
"WMA11",
1,
4,
"The equation $kx^{2}+(k+3)x+4=0$, where $k\\neq0$, has equal roots.\n(a) Show that $k^{2}-10k+9=0$. [2]\n(b) Hence find the possible values of $k$. [2]\n(c) For the smaller value of $k$, find the repeated root of the equation. [1]\n(d) Find the set of values of $k$ for which the equation has no real roots. [2] [7 marks]",
[
"(a) Uses $b^{2}-4ac=0$: $(k+3)^{2}-4\\times k\\times4=0$",
"(a) $k^{2}+6k+9-16k=0$, so $k^{2}-10k+9=0$",
"(b) $(k-1)(k-9)=0$",
"(b) $k=1$ or $k=9$",
"(c) $x^{2}+4x+4=0$, so $x=-2$",
"(d) Needs $k^{2}-10k+9<0$, critical values $1$ and $9$",
"(d) $1<k<9$"
]
],
[
"w",
"WMA11",
2,
4,
"(a) Solve the simultaneous equations\n$y=2x-3$\n$x^{2}+xy+y^{2}=7$ [6]\n(b) Find the set of values of $x$ for which both $2x-3<x+1$ and $x^{2}-4x<0$. [3] [9 marks]",
[
"(a) Substitutes: $x^{2}+x(2x-3)+(2x-3)^{2}=7$",
"(a) Simplifies to $7x^{2}-15x+2=0$",
"(a) Factorises: $(7x-1)(x-2)=0$",
"(a) $x=2$ or $x=\\dfrac{1}{7}$",
"(a) $x=2$, $y=1$",
"(a) $x=\\dfrac{1}{7}$, $y=-\\dfrac{19}{7}$",
"(b) First inequality: $x<4$",
"(b) $x(x-4)<0$, critical values $0$ and $4$, so $0<x<4$",
"(b) Both: $0<x<4$"
]
],
[
"w",
"WMA11",
2,
4,
"The curve $C$ has equation $y=x^{2}-5x+4$ and the line $l$ has equation $y=2x-6$.\n(a) Find the coordinates of the points where $l$ meets $C$. [4]\n(b) Hence find the set of values of $x$ for which $C$ lies below $l$. [2]\n(c) Find the set of values of $x$ for which $x^{2}-5x+4>0$. [2] [8 marks]",
[
"(a) $x^{2}-5x+4=2x-6$, so $x^{2}-7x+10=0$",
"(a) $(x-2)(x-5)=0$",
"(a) $(2,-2)$",
"(a) $(5,4)$",
"(b) Needs $x^{2}-7x+10<0$",
"(b) $2<x<5$",
"(c) $(x-1)(x-4)>0$, critical values $1$ and $4$",
"(c) $x<1$ or $x>4$"
]
],
[
"w",
"WMA11",
3,
4,
"$f(x)=x(x-3)^{2}$\n(a) Sketch the curve $y=f(x)$, showing the coordinates of the points where it meets the coordinate axes. [3]\n(b) On the same axes, sketch $y=\\dfrac{2}{x}$ and hence state the number of real solutions of $x^{2}(x-3)^{2}=2$. [3]\n(c) The curve $y=f(x)$ is translated to give $y=f(x+2)$. Find the coordinates of the points where this curve meets the $x$-axis. [2] [8 marks]",
[
"(a) Positive cubic shape (bottom left to top right)",
"(a) Passes through the origin $(0,0)$",
"(a) Touches the $x$-axis at $(3,0)$ (repeated root)",
"(b) Reciprocal curve in the first and third quadrants",
"(b) Explains $x(x-3)^{2}=\\dfrac{2}{x}$ is the same as $x^{2}(x-3)^{2}=2$ (with $x\\neq0$)",
"(b) $4$ intersections, so $4$ real solutions",
"(c) $(-2,0)$",
"(c) $(1,0)$"
]
],
[
"w",
"WMA11",
3,
4,
"The point $P(4,-6)$ lies on the curve $y=f(x)$. State the coordinates of the image of $P$ on\n(a) $y=f(2x)$ [1]   (b) $y=3f(x)$ [1]   (c) $y=f(x)+5$ [1]   (d) $y=-f(x-1)$ [2]\n(e) The curve $y=\\dfrac{1}{x-2}+3$. State the equations of its asymptotes and find where it crosses the $y$-axis. [3] [8 marks]",
[
"(a) $(2,-6)$",
"(b) $(4,-18)$",
"(c) $(4,-1)$",
"(d) Translates $1$ right: $x=5$",
"(d) Reflects in the $x$-axis: $(5,6)$",
"(e) Vertical asymptote $x=2$",
"(e) Horizontal asymptote $y=3$",
"(e) $x=0$: $y=-\\dfrac{1}{2}+3$, so $\\left(0,\\dfrac{5}{2}\\right)$"
]
],
[
"w",
"WMA11",
4,
4,
"The points $A$ and $B$ have coordinates $(-1,4)$ and $(5,-2)$.\n(a) Find the gradient of $AB$. [1]\n(b) Find an equation of the perpendicular bisector of $AB$, giving your answer in the form $ax+by+c=0$. [4]\n(c) The perpendicular bisector meets the $y$-axis at $C$. Find the area of triangle $ABC$. [4] [9 marks]",
[
"(a) $\\dfrac{-2-4}{5-(-1)}=-1$",
"(b) Midpoint of $AB$ is $(2,1)$",
"(b) Perpendicular gradient is $1$",
"(b) $y-1=1(x-2)$",
"(b) $x-y-1=0$",
"(c) $C=(0,-1)$",
"(c) Uses a correct method, e.g. $AB=6\\sqrt{2}$ and height $MC=2\\sqrt{2}$ where $M(2,1)$",
"(c) Area $=\\dfrac{1}{2}\\times6\\sqrt{2}\\times2\\sqrt{2}$",
"(c) $=12$"
]
],
[
"w",
"WMA11",
4,
4,
"The line $l_{1}$ has equation $2x+3y=12$. The line $l_{2}$ has equation $y=3x-7$.\n(a) Find the coordinates of $P$, where $l_{1}$ and $l_{2}$ meet. [3]\n(b) $l_{1}$ meets the $x$-axis at $Q$ and $l_{2}$ meets the $x$-axis at $R$. Find the area of triangle $PQR$. [4]\n(c) The line $l_{3}$ passes through $P$ and is perpendicular to $l_{1}$. Show that $l_{3}$ passes through $(5,5)$. [2] [9 marks]",
[
"(a) Substitutes: $2x+3(3x-7)=12$",
"(a) $11x=33$, so $x=3$",
"(a) $P(3,2)$",
"(b) $Q=(6,0)$",
"(b) $R=\\left(\\dfrac{7}{3},0\\right)$",
"(b) Base $QR=6-\\dfrac{7}{3}=\\dfrac{11}{3}$, height $2$",
"(b) Area $=\\dfrac{11}{3}$",
"(c) Gradient of $l_{1}$ is $-\\dfrac{2}{3}$, so gradient of $l_{3}$ is $\\dfrac{3}{2}$",
"(c) $y-2=\\dfrac{3}{2}(x-3)$; when $x=5$, $y=5$ ✓"
]
],
[
"w",
"WMA11",
5,
4,
"In triangle $ABC$, $AB=7\\text{ cm}$, $BC=8\\text{ cm}$ and $AC=13\\text{ cm}$.\n(a) Show that angle $ABC=120^{\\circ}$. [3]\n(b) Find the exact area of the triangle. [2]\n(c) Find angle $BAC$, giving your answer to one decimal place. [3] [8 marks]",
[
"(a) Uses the cosine rule: $\\cos B=\\dfrac{7^{2}+8^{2}-13^{2}}{2\\times7\\times8}$",
"(a) $\\cos B=\\dfrac{-56}{112}=-\\dfrac{1}{2}$",
"(a) $B=120^{\\circ}$",
"(b) $\\dfrac{1}{2}\\times7\\times8\\times\\sin120^{\\circ}$",
"(b) $14\\sqrt{3}\\text{ cm}^{2}$",
"(c) Uses the sine rule: $\\dfrac{\\sin A}{8}=\\dfrac{\\sin120^{\\circ}}{13}$",
"(c) $\\sin A=0.5329\\ldots$",
"(c) $A=32.2^{\\circ}$ (acute, because $B$ is obtuse)"
]
],
[
"w",
"WMA11",
5,
4,
"A ship sails $12\\text{ km}$ from port $P$ on a bearing of $060^{\\circ}$ to $Q$. It then sails $9\\text{ km}$ on a bearing of $150^{\\circ}$ to $R$.\n(a) Show that angle $PQR=90^{\\circ}$. [2]\n(b) Find the distance $PR$. [2]\n(c) Find the bearing of $R$ from $P$, to one decimal place. [4] [8 marks]",
[
"(a) Bearing of $P$ from $Q$ is $240^{\\circ}$",
"(a) $240^{\\circ}-150^{\\circ}=90^{\\circ}$",
"(b) $PR^{2}=12^{2}+9^{2}=225$",
"(b) $PR=15\\text{ km}$",
"(c) Uses $\\tan(\\angle QPR)=\\dfrac{9}{12}$ (or sine or cosine)",
"(c) $\\angle QPR=36.87^{\\circ}$",
"(c) Adds to $60^{\\circ}$",
"(c) Bearing $096.9^{\\circ}$"
]
],
[
"w",
"WMA11",
6,
4,
"The sector $OAB$ of a circle with centre $O$ has radius $6\\text{ cm}$ and angle $\\theta$ radians. The perimeter of the sector is $20\\text{ cm}$.\n(a) Show that $\\theta=\\dfrac{4}{3}$. [2]\n(b) Find the area of the sector. [2]\n(c) Find the area of the segment between the chord $AB$ and the arc $AB$, to 3 significant figures. [4] [8 marks]",
[
"(a) $6+6+6\\theta=20$",
"(a) $6\\theta=8$, so $\\theta=\\dfrac{4}{3}$",
"(b) $\\dfrac{1}{2}\\times6^{2}\\times\\dfrac{4}{3}$",
"(b) $24\\text{ cm}^{2}$",
"(c) Triangle $OAB$: $\\dfrac{1}{2}\\times6^{2}\\times\\sin\\dfrac{4}{3}$ (calculator in radians)",
"(c) $=17.49\\ldots$",
"(c) Segment $=24-17.49\\ldots$",
"(c) $=6.51\\text{ cm}^{2}$"
]
],
[
"w",
"WMA11",
6,
4,
"A sector of a circle has area $48\\text{ cm}^{2}$ and arc length $12\\text{ cm}$.\n(a) Find the radius $r$ and the angle $\\theta$ of the sector, in radians. [4]\n(b) Find the perimeter of the triangle formed by the two radii and the chord, to 3 significant figures. [3] [7 marks]",
[
"(a) $\\dfrac{1}{2}r^{2}\\theta=48$ and $r\\theta=12$",
"(a) Substitutes: $\\dfrac{1}{2}r\\times12=48$",
"(a) $r=8\\text{ cm}$",
"(a) $\\theta=1.5$",
"(b) Chord $=2\\times8\\times\\sin0.75$ (or cosine rule)",
"(b) Chord $=10.9\\text{ cm}$",
"(b) Perimeter $=26.9\\text{ cm}$"
]
],
[
"w",
"WMA11",
7,
4,
"The curve $C$ has equation $y=x^{3}-4x^{2}+5x-2$.\n(a) Find $\\dfrac{dy}{dx}$. [2]\n(b) Find an equation of the tangent to $C$ at the point where $x=2$. [3]\n(c) Find the $x$-coordinates of the points on $C$ where the gradient is zero. [2]\n(d) Find an equation of the normal to $C$ at the point where $x=0$, giving your answer in the form $ax+by+c=0$. [2] [9 marks]",
[
"(a) Two terms correct",
"(a) $3x^{2}-8x+5$",
"(b) $y=8-16+10-2=0$",
"(b) Gradient $=12-16+5=1$",
"(b) $y=x-2$",
"(c) $3x^{2}-8x+5=0$, so $(3x-5)(x-1)=0$",
"(c) $x=1$ or $x=\\dfrac{5}{3}$",
"(d) At $(0,-2)$ the gradient is $5$, so the normal gradient is $-\\dfrac{1}{5}$",
"(d) $x+5y+10=0$"
]
],
[
"w",
"WMA11",
7,
4,
"$f(x)=\\dfrac{x^{2}+4}{\\sqrt{x}}$, $x>0$\n(a) Write $f(x)$ as a sum of powers of $x$. [2]\n(b) Find $f'(x)$. [2]\n(c) The point $P$ on the curve $y=f(x)$ has $x$-coordinate $4$. Find an equation of the tangent at $P$, in the form $ax+by+c=0$. [4] [8 marks]",
[
"(a) $x^{\\frac{3}{2}}$",
"(a) $+4x^{-\\frac{1}{2}}$",
"(b) $\\dfrac{3}{2}x^{\\frac{1}{2}}$",
"(b) $-2x^{-\\frac{3}{2}}$",
"(c) $f(4)=\\dfrac{20}{2}=10$",
"(c) $f'(4)=3-\\dfrac{2}{8}=\\dfrac{11}{4}$",
"(c) $y-10=\\dfrac{11}{4}(x-4)$",
"(c) $11x-4y-4=0$"
]
],
[
"w",
"WMA11",
8,
4,
"(a) Find $\\displaystyle\\int\\left(6x^{2}-\\frac{4}{x^{3}}+3\\sqrt{x}\\right)dx$. [4]\n(b) A curve has $\\dfrac{dy}{dx}=6x^{2}-\\dfrac{4}{x^{3}}+3\\sqrt{x}$ and passes through $(1,5)$. Find $y$ in terms of $x$. [3] [7 marks]",
[
"(a) $2x^{3}$",
"(a) $+2x^{-2}$",
"(a) $+2x^{\\frac{3}{2}}$",
"(a) $+c$",
"(b) Substitutes $(1,5)$: $2+2+2+c=5$",
"(b) $c=-1$",
"(b) $y=2x^{3}+\\dfrac{2}{x^{2}}+2x^{\\frac{3}{2}}-1$"
]
],
[
"w",
"WMA11",
8,
4,
"A curve has $\\dfrac{dy}{dx}=\\dfrac{(2\\sqrt{x}-3)^{2}}{\\sqrt{x}}$, $x>0$, and passes through $(4,10)$.\n(a) Write $\\dfrac{dy}{dx}$ in the form $ax^{\\frac{1}{2}}+b+cx^{-\\frac{1}{2}}$. [2]\n(b) Find $y$ in terms of $x$. [5] [7 marks]",
[
"(a) Expands: $\\dfrac{4x-12\\sqrt{x}+9}{\\sqrt{x}}$",
"(a) $4x^{\\frac{1}{2}}-12+9x^{-\\frac{1}{2}}$",
"(b) $\\dfrac{8}{3}x^{\\frac{3}{2}}$",
"(b) $-12x$",
"(b) $+18x^{\\frac{1}{2}}+c$",
"(b) Substitutes $(4,10)$: $\\dfrac{64}{3}-48+36+c=10$",
"(b) $c=\\dfrac{2}{3}$, so $y=\\dfrac{8}{3}x^{\\frac{3}{2}}-12x+18\\sqrt{x}+\\dfrac{2}{3}$"
]
]
];
  D.forEach(r => out.push({ id: id(r[1], r[2]), u: r[1], t: r[2], d: r[3], type: "w", q: r[4], ms: r[5], m: r[5].length }));
  return out;
})();
