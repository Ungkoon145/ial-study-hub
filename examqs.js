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
],
[
"w",
"WMA12",
0,
4,
"$f(x)=2x^{3}-3x^{2}-11x+6$\n(a) Use the factor theorem to show that $(x-3)$ is a factor of $f(x)$. [2]\n(b) Factorise $f(x)$ completely. [3]\n(c) Hence solve $2\\left(3^{t}\\right)^{3}-3\\left(3^{t}\\right)^{2}-11\\left(3^{t}\\right)+6=0$, giving any non-exact answer to 3 significant figures. [3] [8 marks]",
[
"(a) $f(3)=54-27-33+6$",
"(a) $f(3)=0$, so $(x-3)$ is a factor",
"(b) Divides: $f(x)=(x-3)(2x^{2}+3x-2)$",
"(b) Attempts to factorise the quadratic",
"(b) $(x-3)(2x-1)(x+2)$",
"(c) $3^{t}=3$ gives $t=1$",
"(c) $3^{t}=\\dfrac{1}{2}$ gives $t=\\log_{3}\\dfrac{1}{2}=-0.631$",
"(c) $3^{t}=-2$ has no solution (because $3^{t}>0$)"
]
],
[
"w",
"WMA12",
0,
4,
"$f(x)=x^{3}+px^{2}+qx-6$, where $p$ and $q$ are constants. $(x+1)$ is a factor of $f(x)$, and when $f(x)$ is divided by $(x-2)$ the remainder is $12$.\n(a) Find the values of $p$ and $q$. [5]\n(b) Hence write $f(x)$ as a product of a linear factor and a quadratic factor. [2]\n(c) Find the exact roots of $f(x)=0$. [1] [8 marks]",
[
"(a) $f(-1)=0$: $-1+p-q-6=0$, so $p-q=7$",
"(a) $f(2)=12$: $8+4p+2q-6=12$, so $2p+q=5$",
"(a) Solves the simultaneous equations",
"(a) $p=4$",
"(a) $q=-3$",
"(b) Divides $x^{3}+4x^{2}-3x-6$ by $(x+1)$",
"(b) $(x+1)(x^{2}+3x-6)$",
"(c) $x=-1$, $x=\\dfrac{-3\\pm\\sqrt{33}}{2}$"
]
],
[
"w",
"WMA12",
1,
4,
"(a) Find the first four terms, in ascending powers of $x$, of the binomial expansion of $(1-2x)^{6}$. Give each term in its simplest form. [4]\n(b) Hence find the coefficient of $x^{2}$ in the expansion of $(3+x)(1-2x)^{6}$. [3]\n(c) Use your expansion with a suitable value of $x$ to estimate $0.98^{6}$, giving your answer to 5 decimal places. [2] [9 marks]",
[
"(a) $1$",
"(a) $-12x$",
"(a) $+60x^{2}$",
"(a) $-160x^{3}$",
"(b) Identifies the two contributions: $3\\times60x^{2}$ and $x\\times(-12x)$",
"(b) $180-12$",
"(b) $168$",
"(c) Uses $x=0.01$",
"(c) $1-0.12+0.006-0.00016=0.88584$"
]
],
[
"w",
"WMA12",
1,
4,
"In the binomial expansion of $(2+kx)^{5}$, where $k$ is a non-zero constant, the coefficient of $x^{2}$ is three times the coefficient of $x$.\n(a) Find the value of $k$. [4]\n(b) Find the coefficient of $x^{3}$. [2]\n(c) Find the term independent of $x$ in the expansion of $(2+kx)^{5}\\left(1-\\dfrac{1}{x}\\right)$. [2] [8 marks]",
[
"(a) Coefficient of $x$: $\\binom{5}{1}2^{4}k=80k$",
"(a) Coefficient of $x^{2}$: $\\binom{5}{2}2^{3}k^{2}=80k^{2}$",
"(a) $80k^{2}=3\\times80k$",
"(a) $k=3$",
"(b) $\\binom{5}{3}2^{2}k^{3}=40\\times27$",
"(b) $1080$",
"(c) Constant term $=2^{5}\\times1+240x\\times\\left(-\\dfrac{1}{x}\\right)$",
"(c) $32-240=-208$"
]
],
[
"w",
"WMA12",
2,
4,
"The circle $C$ has equation $x^{2}+y^{2}-6x+4y-12=0$.\n(a) Find the centre and the radius of $C$. [3]\n(b) Show that $P(6,2)$ lies on $C$, and find an equation of the tangent to $C$ at $P$ in the form $ax+by+c=0$. [4]\n(c) Find the exact length of the chord that $C$ cuts off on the $x$-axis. [2] [9 marks]",
[
"(a) Completes the square: $(x-3)^{2}+(y+2)^{2}=12+9+4$",
"(a) Centre $(3,-2)$",
"(a) Radius $5$",
"(b) $36+4-36+8-12=0$, so $P$ lies on $C$",
"(b) Gradient of radius to $P$: $\\dfrac{2-(-2)}{6-3}=\\dfrac{4}{3}$",
"(b) Tangent gradient $-\\dfrac{3}{4}$: $y-2=-\\dfrac{3}{4}(x-6)$",
"(b) $3x+4y-26=0$",
"(c) $y=0$: $x^{2}-6x-12=0$, so $x=3\\pm\\sqrt{21}$",
"(c) Length $2\\sqrt{21}$"
]
],
[
"w",
"WMA12",
2,
4,
"The points $A(-2,1)$ and $B(4,9)$ are the ends of a diameter of a circle $C$.\n(a) Find an equation of $C$. [4]\n(b) Show that the point $(5,2)$ lies on $C$. [1]\n(c) The line $y=x+k$ is a tangent to $C$. Find the exact possible values of $k$. [4] [9 marks]",
[
"(a) Centre is the midpoint: $(1,5)$",
"(a) Radius $=\\dfrac{1}{2}\\sqrt{6^{2}+8^{2}}$",
"(a) $=5$",
"(a) $(x-1)^{2}+(y-5)^{2}=25$",
"(b) $(5-1)^{2}+(2-5)^{2}=16+9=25$ ✓",
"(c) Uses distance from centre to line $=$ radius, or substitutes and uses $b^{2}-4ac=0$",
"(c) $\\dfrac{|1-5+k|}{\\sqrt{2}}=5$ (or $2x^{2}+(2k-10)x+(k^{2}-10k)=0$ with discriminant $0$)",
"(c) $k-4=\\pm5\\sqrt{2}$",
"(c) $k=4\\pm5\\sqrt{2}$"
]
],
[
"w",
"WMA12",
3,
4,
"The third term of an arithmetic series is $11$ and the sum of the first $10$ terms is $185$.\n(a) Find the first term $a$ and the common difference $d$. [4]\n(b) Find the least value of $n$ for which the sum of the first $n$ terms exceeds $1000$. [3] [7 marks]",
[
"(a) $a+2d=11$",
"(a) $\\dfrac{10}{2}(2a+9d)=185$, so $2a+9d=37$",
"(a) Solves simultaneously",
"(a) $a=5$, $d=3$",
"(b) $\\dfrac{n}{2}\\left(10+3(n-1)\\right)>1000$, so $3n^{2}+7n-2000>0$",
"(b) Critical value $n=24.7\\ldots$ (or checks $S_{24}=948$ and $S_{25}=1025$)",
"(b) $n=25$"
]
],
[
"w",
"WMA12",
3,
4,
"The second term of a geometric series is $12$ and the fifth term is $\\dfrac{3}{2}$.\n(a) Find the common ratio and the first term. [3]\n(b) Find the sum to infinity. [1]\n(c) Find the least value of $n$ for which the sum to infinity exceeds the sum of the first $n$ terms by less than $0.01$. [4] [8 marks]",
[
"(a) $ar=12$ and $ar^{4}=\\dfrac{3}{2}$",
"(a) $r^{3}=\\dfrac{1}{8}$, so $r=\\dfrac{1}{2}$",
"(a) $a=24$",
"(b) $\\dfrac{24}{1-\\frac{1}{2}}=48$",
"(c) $S_{\\infty}-S_{n}=48\\left(\\dfrac{1}{2}\\right)^{n}$",
"(c) $48\\left(\\dfrac{1}{2}\\right)^{n}<0.01$, so $2^{n}>4800$",
"(c) Uses logs: $n>\\dfrac{\\log4800}{\\log2}=12.2\\ldots$",
"(c) $n=13$"
]
],
[
"w",
"WMA12",
4,
4,
"(a) Solve $3^{2x}-4\\left(3^{x}\\right)+3=0$. [4]\n(b) Solve $\\log_{2}(x+1)-\\log_{2}(x-2)=2$. [4] [8 marks]",
[
"(a) Lets $y=3^{x}$: $y^{2}-4y+3=0$",
"(a) $(y-1)(y-3)=0$",
"(a) $3^{x}=1$ gives $x=0$",
"(a) $3^{x}=3$ gives $x=1$",
"(b) Uses the subtraction law: $\\log_{2}\\dfrac{x+1}{x-2}=2$",
"(b) $\\dfrac{x+1}{x-2}=4$",
"(b) $x+1=4x-8$",
"(b) $x=3$ (valid, because $x-2>0$)"
]
],
[
"w",
"WMA12",
4,
4,
"Given that $\\log_{a}3=p$ and $\\log_{a}5=q$,\n(a) write $\\log_{a}45$ and $\\log_{a}\\left(\\dfrac{25}{\\sqrt{3}}\\right)$ in terms of $p$ and $q$. [4]\n(b) Solve $5^{x}=2^{x+3}$, giving your answer to 3 significant figures. [3] [7 marks]",
[
"(a) $\\log_{a}45=\\log_{a}9+\\log_{a}5$",
"(a) $=2p+q$",
"(a) $\\log_{a}25-\\log_{a}3^{\\frac{1}{2}}$",
"(a) $=2q-\\dfrac{1}{2}p$",
"(b) Takes logs: $x\\log5=(x+3)\\log2$",
"(b) $x=\\dfrac{3\\log2}{\\log5-\\log2}$",
"(b) $x=2.27$"
]
],
[
"w",
"WMA12",
5,
4,
"(a) Solve, for $0\\le\\theta<360^{\\circ}$, $2\\sin^{2}\\theta=3\\cos\\theta$. [5]\n(b) Solve, for $0\\le x<180^{\\circ}$, $\\tan(2x-30^{\\circ})=\\sqrt{3}$. [3] [8 marks]",
[
"(a) Uses $\\sin^{2}\\theta=1-\\cos^{2}\\theta$",
"(a) $2\\cos^{2}\\theta+3\\cos\\theta-2=0$",
"(a) $(2\\cos\\theta-1)(\\cos\\theta+2)=0$",
"(a) $\\cos\\theta=\\dfrac{1}{2}$ ($\\cos\\theta=-2$ is impossible)",
"(a) $\\theta=60^{\\circ},\\ 300^{\\circ}$",
"(b) $2x-30^{\\circ}=60^{\\circ}$",
"(b) or $240^{\\circ}$",
"(b) $x=45^{\\circ},\\ 135^{\\circ}$"
]
],
[
"w",
"WMA12",
5,
4,
"(a) Show that $\\dfrac{1-\\cos^{2}\\theta}{\\sin\\theta\\cos\\theta}\\equiv\\tan\\theta$. [2]\n(b) Solve, for $0\\le\\theta<360^{\\circ}$, $4\\sin\\theta=3\\tan\\theta$, giving your answers to one decimal place where appropriate. [5] [7 marks]",
[
"(a) $1-\\cos^{2}\\theta=\\sin^{2}\\theta$",
"(a) $\\dfrac{\\sin^{2}\\theta}{\\sin\\theta\\cos\\theta}=\\dfrac{\\sin\\theta}{\\cos\\theta}=\\tan\\theta$",
"(b) $4\\sin\\theta\\cos\\theta=3\\sin\\theta$",
"(b) $\\sin\\theta(4\\cos\\theta-3)=0$ (does not divide by $\\sin\\theta$)",
"(b) $\\sin\\theta=0$: $\\theta=0^{\\circ},\\ 180^{\\circ}$",
"(b) $\\cos\\theta=\\dfrac{3}{4}$: $\\theta=41.4^{\\circ}$",
"(b) and $318.6^{\\circ}$"
]
],
[
"w",
"WMA12",
6,
4,
"The curve $C$ has equation $y=x^{3}-6x^{2}+9x+2$.\n(a) Find the coordinates of the stationary points of $C$. [4]\n(b) Use $\\dfrac{d^{2}y}{dx^{2}}$ to determine the nature of each stationary point. [3]\n(c) State the set of values of $x$ for which $y$ is increasing. [1] [8 marks]",
[
"(a) $\\dfrac{dy}{dx}=3x^{2}-12x+9$",
"(a) $3(x-1)(x-3)=0$",
"(a) $(1,6)$",
"(a) $(3,2)$",
"(b) $\\dfrac{d^{2}y}{dx^{2}}=6x-12$",
"(b) At $x=1$: $-6<0$, so maximum",
"(b) At $x=3$: $6>0$, so minimum",
"(c) $x<1$ or $x>3$"
]
],
[
"w",
"WMA12",
6,
4,
"An open box (no lid) has a square base of side $x\\text{ cm}$ and a volume of $500\\text{ cm}^{3}$.\n(a) Show that the external surface area $A\\text{ cm}^{2}$ is given by $A=x^{2}+\\dfrac{2000}{x}$. [3]\n(b) Find the minimum value of $A$. [4]\n(c) Justify that this value is a minimum. [2] [9 marks]",
[
"(a) Height $h=\\dfrac{500}{x^{2}}$",
"(a) $A=x^{2}+4xh$",
"(a) $A=x^{2}+4x\\times\\dfrac{500}{x^{2}}=x^{2}+\\dfrac{2000}{x}$",
"(b) $\\dfrac{dA}{dx}=2x-\\dfrac{2000}{x^{2}}$",
"(b) Sets $\\dfrac{dA}{dx}=0$: $x^{3}=1000$",
"(b) $x=10$",
"(b) $A=100+200=300\\text{ cm}^{2}$",
"(c) $\\dfrac{d^{2}A}{dx^{2}}=2+\\dfrac{4000}{x^{3}}$",
"(c) $=6>0$ at $x=10$, so minimum"
]
],
[
"w",
"WMA12",
7,
4,
"The curve $y=4x-x^{2}$ and the line $y=x$ meet at the origin $O$ and at the point $P$.\n(a) Find the coordinates of $P$. [2]\n(b) Find the area of the finite region bounded by the curve and the line. [5] [7 marks]",
[
"(a) $4x-x^{2}=x$, so $x(3-x)=0$",
"(a) $P(3,3)$",
"(b) Area $=\\displaystyle\\int_{0}^{3}\\left(4x-x^{2}-x\\right)dx$ (or area under curve minus triangle)",
"(b) $=\\left[\\dfrac{3x^{2}}{2}-\\dfrac{x^{3}}{3}\\right]_{0}^{3}$",
"(b) Uses limits $0$ and $3$",
"(b) $\\dfrac{27}{2}-9$",
"(b) $=\\dfrac{9}{2}$"
]
],
[
"w",
"WMA12",
7,
4,
"(a) Find the exact value of $\\displaystyle\\int_{1}^{4}\\left(3\\sqrt{x}-\\frac{2}{x^{2}}\\right)dx$. [4]\n(b) The curve $y=(x-1)(x-3)$ meets the $x$-axis at $A$ and $B$. Find the area of the region between the curve and the $x$-axis from $A$ to $B$. [4] [8 marks]",
[
"(a) $2x^{\\frac{3}{2}}$",
"(a) $+\\dfrac{2}{x}$",
"(a) $\\left(16+\\dfrac{1}{2}\\right)-(2+2)$",
"(a) $=\\dfrac{25}{2}$",
"(b) $A(1,0)$ and $B(3,0)$; integrates $x^{2}-4x+3$",
"(b) $\\left[\\dfrac{x^{3}}{3}-2x^{2}+3x\\right]_{1}^{3}$",
"(b) $=0-\\dfrac{4}{3}=-\\dfrac{4}{3}$",
"(b) Area $=\\dfrac{4}{3}$ (the region is below the $x$-axis)"
]
],
[
"w",
"WMA12",
8,
4,
"$y=\\sqrt{1+x^{3}}$\n(a) Find the values of $y$ at $x=0.5$, $1$ and $1.5$, to 4 decimal places. [2]\n(b) Use the trapezium rule with $4$ strips to estimate $\\displaystyle\\int_{0}^{2}\\sqrt{1+x^{3}}\\,dx$, to 3 decimal places. [3]\n(c) The true value is $3.241$ to 3 d.p. Explain why the trapezium rule gives an overestimate here. [2]\n(d) Use your answer to (b) to estimate $\\displaystyle\\int_{0}^{2}\\left(2+\\sqrt{1+x^{3}}\\right)dx$. [1] [8 marks]",
[
"(a) $1.0607$ and $1.4142$",
"(a) $2.0917$ (and $y(0)=1$, $y(2)=3$)",
"(b) $h=0.5$",
"(b) $\\dfrac{0.5}{2}\\left[1+3+2(1.0607+1.4142+2.0917)\\right]$",
"(b) $3.283$",
"(c) The curve bends upwards (it is convex) on $0\\le x\\le2$",
"(c) so each trapezium lies above the curve",
"(d) $2\\times2+3.283=7.283$"
]
],
[
"w",
"WMA12",
8,
4,
"(a) Use the trapezium rule with $4$ strips of equal width to estimate $\\displaystyle\\int_{0}^{2}2^{x}\\,dx$, to 3 decimal places. [4]\n(b) Given that the exact value is $\\dfrac{3}{\\ln2}$, find the percentage error in your estimate, to 2 significant figures. [2]\n(c) State how the estimate could be made more accurate. [1] [7 marks]",
[
"(a) $h=0.5$",
"(a) $y$-values $1,\\ 1.4142,\\ 2,\\ 2.8284,\\ 4$",
"(a) $\\dfrac{0.5}{2}\\left[1+4+2(1.4142+2+2.8284)\\right]$",
"(a) $4.371$",
"(b) $\\dfrac{3}{\\ln2}=4.328$; error $=\\dfrac{4.371-4.328}{4.328}\\times100$",
"(b) $1.0\\%$",
"(c) Use more strips (smaller $h$)"
]
],
[
"w",
"WMA13",
0,
4,
"(a) Simplify fully $\\dfrac{2x^{2}+5x-3}{x^{2}-9}$. [3]\n(b) Hence solve $\\dfrac{2x^{2}+5x-3}{x^{2}-9}=3$. [2]\n(c) Write $\\dfrac{2}{x-3}-\\dfrac{1}{x+3}$ as a single fraction in its simplest form. [2] [7 marks]",
[
"(a) Numerator: $(2x-1)(x+3)$",
"(a) Denominator: $(x-3)(x+3)$",
"(a) $\\dfrac{2x-1}{x-3}$",
"(b) $2x-1=3(x-3)$",
"(b) $x=8$ (allowed, since $x\\neq\\pm3$)",
"(c) $\\dfrac{2(x+3)-(x-3)}{(x-3)(x+3)}$",
"(c) $\\dfrac{x+9}{x^{2}-9}$"
]
],
[
"w",
"WMA13",
0,
4,
"$f(x)=1-\\dfrac{3}{x+2}+\\dfrac{6}{(x+2)^{2}}$, $x\\neq-2$\n(a) Show that $f(x)=\\dfrac{x^{2}+x+4}{(x+2)^{2}}$. [3]\n(b) Hence show that $f(x)>0$ for all $x\\neq-2$. [3]\n(c) Solve $f(x)=1$. [2] [8 marks]",
[
"(a) Common denominator $(x+2)^{2}$",
"(a) $(x+2)^{2}-3(x+2)+6$",
"(a) $=x^{2}+4x+4-3x-6+6=x^{2}+x+4$",
"(b) Discriminant of $x^{2}+x+4$: $1-16=-15<0$ (or completes the square: $\\left(x+\\frac{1}{2}\\right)^{2}+\\frac{15}{4}$)",
"(b) So the numerator is always positive",
"(b) and $(x+2)^{2}>0$ for $x\\neq-2$, so $f(x)>0$",
"(c) $x^{2}+x+4=x^{2}+4x+4$",
"(c) $x=0$"
]
],
[
"w",
"WMA13",
1,
4,
"$f(x)=2x+3$, $x\\in\\mathbb{R}$ and $g(x)=\\dfrac{4}{x-1}$, $x>1$\n(a) Find $fg(3)$. [2]\n(b) Find $g^{-1}(x)$ and state its domain. [4]\n(c) Solve $fg(x)=11$. [2] [8 marks]",
[
"(a) $g(3)=2$",
"(a) $f(2)=7$",
"(b) $y=\\dfrac{4}{x-1}$, so $x-1=\\dfrac{4}{y}$",
"(b) $x=1+\\dfrac{4}{y}$",
"(b) $g^{-1}(x)=1+\\dfrac{4}{x}$",
"(b) Domain $x>0$ (the range of $g$)",
"(c) $\\dfrac{8}{x-1}+3=11$",
"(c) $x-1=1$, so $x=2$"
]
],
[
"w",
"WMA13",
1,
4,
"(a) Sketch the graph of $y=|2x-5|$, showing the coordinates of the points where it meets the axes. [2]\n(b) Solve $|2x-5|=x+1$. [4]\n(c) Hence find the set of values of $x$ for which $|2x-5|<x+1$. [2] [8 marks]",
[
"(a) V shape with vertex at $\\left(\\dfrac{5}{2},0\\right)$",
"(a) Meets the $y$-axis at $(0,5)$",
"(b) $2x-5=x+1$",
"(b) $x=6$",
"(b) $-(2x-5)=x+1$",
"(b) $x=\\dfrac{4}{3}$",
"(c) The line is above the V between the two solutions",
"(c) $\\dfrac{4}{3}<x<6$"
]
],
[
"w",
"WMA13",
2,
4,
"The population $P$ of a colony of bacteria after $t$ hours is modelled by $P=200e^{0.3t}$.\n(a) State the initial population. [1]\n(b) Find the population after $5$ hours, to the nearest whole number. [1]\n(c) Find the time when the population reaches $1000$, to 3 significant figures. [3]\n(d) Find the rate at which the population is growing when $t=5$. [2] [7 marks]",
[
"(a) $200$",
"(b) $200e^{1.5}=896$",
"(c) $e^{0.3t}=5$",
"(c) $0.3t=\\ln5$",
"(c) $t=5.36$ hours",
"(d) $\\dfrac{dP}{dt}=60e^{0.3t}$",
"(d) $60e^{1.5}=269$ bacteria per hour"
]
],
[
"w",
"WMA13",
2,
4,
"(a) Solve $e^{2x}-5e^{x}+6=0$, giving exact answers. [4]\n(b) Solve $2\\ln x-\\ln(x+2)=\\ln3$, giving your answer in exact form. [4] [8 marks]",
[
"(a) $(e^{x}-2)(e^{x}-3)=0$",
"(a) $e^{x}=2$ or $e^{x}=3$",
"(a) $x=\\ln2$",
"(a) $x=\\ln3$",
"(b) $\\ln\\dfrac{x^{2}}{x+2}=\\ln3$",
"(b) $x^{2}-3x-6=0$",
"(b) $x=\\dfrac{3\\pm\\sqrt{33}}{2}$",
"(b) $x=\\dfrac{3+\\sqrt{33}}{2}$ only (since $x>0$)"
]
],
[
"w",
"WMA13",
3,
4,
"(a) Solve, for $0\\le\\theta<360^{\\circ}$, $\\sec^{2}\\theta-3\\tan\\theta+1=0$, giving answers to one decimal place where appropriate. [6]\n(b) Prove that $\\sec\\theta-\\cos\\theta\\equiv\\sin\\theta\\tan\\theta$. [2] [8 marks]",
[
"(a) Uses $\\sec^{2}\\theta=1+\\tan^{2}\\theta$",
"(a) $\\tan^{2}\\theta-3\\tan\\theta+2=0$",
"(a) $(\\tan\\theta-1)(\\tan\\theta-2)=0$",
"(a) $\\tan\\theta=1$: $\\theta=45^{\\circ},\\ 225^{\\circ}$",
"(a) $\\tan\\theta=2$: $\\theta=63.4^{\\circ}$",
"(a) and $243.4^{\\circ}$",
"(b) $\\dfrac{1}{\\cos\\theta}-\\cos\\theta=\\dfrac{1-\\cos^{2}\\theta}{\\cos\\theta}$",
"(b) $=\\dfrac{\\sin^{2}\\theta}{\\cos\\theta}=\\sin\\theta\\tan\\theta$"
]
],
[
"w",
"WMA13",
3,
4,
"(a) Given that $\\theta=\\arcsin\\dfrac{1}{3}$, find the exact values of $\\cot\\theta$ and $\\sec\\theta$. [4]\n(b) Solve, for $0\\le x<2\\pi$, $3\\operatorname{cosec}^{2}x-5\\cot x-5=0$, giving answers to 3 significant figures. [5] [9 marks]",
[
"(a) $\\cos\\theta=\\sqrt{1-\\frac{1}{9}}=\\dfrac{2\\sqrt{2}}{3}$ ($\\theta$ is acute)",
"(a) $\\cot\\theta=2\\sqrt{2}$",
"(a) $\\sec\\theta=\\dfrac{3}{2\\sqrt{2}}$",
"(a) $=\\dfrac{3\\sqrt{2}}{4}$",
"(b) Uses $\\operatorname{cosec}^{2}x=1+\\cot^{2}x$: $3\\cot^{2}x-5\\cot x-2=0$",
"(b) $(3\\cot x+1)(\\cot x-2)=0$",
"(b) $\\tan x=\\dfrac{1}{2}$: $x=0.464,\\ 3.61$",
"(b) $\\tan x=-3$: $x=1.89$",
"(b) and $5.03$"
]
],
[
"w",
"WMA13",
4,
4,
"(a) Write $3\\cos\\theta+4\\sin\\theta$ in the form $R\\cos(\\theta-\\alpha)$, where $R>0$ and $0<\\alpha<90^{\\circ}$. Give $\\alpha$ to 2 decimal places. [4]\n(b) Hence solve, for $0\\le\\theta<360^{\\circ}$, $3\\cos\\theta+4\\sin\\theta=2.5$, to one decimal place. [4]\n(c) Find the maximum value of $\\dfrac{12}{7+3\\cos\\theta+4\\sin\\theta}$. [2] [10 marks]",
[
"(a) $R\\cos\\alpha=3$ and $R\\sin\\alpha=4$",
"(a) $R=5$",
"(a) $\\tan\\alpha=\\dfrac{4}{3}$",
"(a) $\\alpha=53.13^{\\circ}$",
"(b) $\\cos(\\theta-53.13^{\\circ})=0.5$",
"(b) $\\theta-53.13^{\\circ}=60^{\\circ}$ or $300^{\\circ}$",
"(b) $\\theta=113.1^{\\circ}$",
"(b) $\\theta=353.1^{\\circ}$",
"(c) Uses the minimum of the denominator: $7-5=2$",
"(c) Maximum $=6$"
]
],
[
"w",
"WMA13",
4,
4,
"(a) Show that $\\sin(x+30^{\\circ})+\\cos(x+60^{\\circ})\\equiv\\cos x$. [3]\n(b) Solve, for $0\\le x<360^{\\circ}$, $\\cos2x=3\\sin x-1$. [4]\n(c) Given that $\\tan A=\\dfrac{1}{2}$ and $\\tan B=\\dfrac{1}{3}$, find the exact value of $\\tan(A+B)$. [2] [9 marks]",
[
"(a) Expands $\\sin(x+30^{\\circ})=\\dfrac{\\sqrt{3}}{2}\\sin x+\\dfrac{1}{2}\\cos x$",
"(a) Expands $\\cos(x+60^{\\circ})=\\dfrac{1}{2}\\cos x-\\dfrac{\\sqrt{3}}{2}\\sin x$",
"(a) Adds to get $\\cos x$",
"(b) Uses $\\cos2x=1-2\\sin^{2}x$",
"(b) $2\\sin^{2}x+3\\sin x-2=0$",
"(b) $(2\\sin x-1)(\\sin x+2)=0$, so $\\sin x=\\dfrac{1}{2}$",
"(b) $x=30^{\\circ},\\ 150^{\\circ}$",
"(c) $\\dfrac{\\frac{1}{2}+\\frac{1}{3}}{1-\\frac{1}{2}\\times\\frac{1}{3}}$",
"(c) $=1$"
]
],
[
"w",
"WMA13",
5,
4,
"The curve $C$ has equation $y=x^{2}e^{3x}$.\n(a) Show that $\\dfrac{dy}{dx}=xe^{3x}(2+3x)$. [3]\n(b) Find the exact coordinates of the stationary points of $C$. [3]\n(c) Differentiate $\\dfrac{\\ln(x^{2}+1)}{x}$ with respect to $x$. [3] [9 marks]",
[
"(a) Uses the product rule",
"(a) $2xe^{3x}+3x^{2}e^{3x}$",
"(a) $=xe^{3x}(2+3x)$",
"(b) $e^{3x}>0$, so $x=0$ or $x=-\\dfrac{2}{3}$",
"(b) $(0,0)$",
"(b) $\\left(-\\dfrac{2}{3},\\ \\dfrac{4}{9}e^{-2}\\right)$",
"(c) Uses the quotient rule",
"(c) Derivative of $\\ln(x^{2}+1)$ is $\\dfrac{2x}{x^{2}+1}$",
"(c) $\\dfrac{\\frac{2x^{2}}{x^{2}+1}-\\ln(x^{2}+1)}{x^{2}}$"
]
],
[
"w",
"WMA13",
5,
4,
"(a) Differentiate $y=\\sqrt{4x+1}$. [2]\n(b) A curve has equation $x=3\\sin2y$. Find $\\dfrac{dy}{dx}$ in terms of $y$. [3]\n(c) Find an equation of the tangent to this curve at the point where $y=\\dfrac{\\pi}{12}$. [3] [8 marks]",
[
"(a) Uses the chain rule: $\\dfrac{1}{2}(4x+1)^{-\\frac{1}{2}}\\times4$",
"(a) $\\dfrac{2}{\\sqrt{4x+1}}$",
"(b) $\\dfrac{dx}{dy}=6\\cos2y$",
"(b) Uses $\\dfrac{dy}{dx}=1\\Big/\\dfrac{dx}{dy}$",
"(b) $\\dfrac{dy}{dx}=\\dfrac{1}{6\\cos2y}$",
"(c) $x=3\\sin\\dfrac{\\pi}{6}=\\dfrac{3}{2}$",
"(c) $\\dfrac{dy}{dx}=\\dfrac{1}{6\\times\\frac{\\sqrt{3}}{2}}=\\dfrac{\\sqrt{3}}{9}$",
"(c) $y-\\dfrac{\\pi}{12}=\\dfrac{\\sqrt{3}}{9}\\left(x-\\dfrac{3}{2}\\right)$"
]
],
[
"w",
"WMA13",
6,
4,
"$f(x)=x^{3}-3x-5$\n(a) Show that $f(x)=0$ has a root $\\alpha$ between $x=2$ and $x=3$. [2]\n(b) Show that $f(x)=0$ can be written as $x=\\sqrt[3]{3x+5}$. [1]\n(c) Using $x_{n+1}=\\sqrt[3]{3x_{n}+5}$ with $x_{0}=2$, find $x_{1}$, $x_{2}$ and $x_{3}$ to 4 decimal places. [3]\n(d) Show that $\\alpha=2.279$ to 3 decimal places. [3] [9 marks]",
[
"(a) $f(2)=-3$ and $f(3)=13$",
"(a) Sign change and $f$ is continuous, so a root lies between",
"(b) $x^{3}=3x+5$, so $x=\\sqrt[3]{3x+5}$",
"(c) $x_{1}=2.2240$",
"(c) $x_{2}=2.2684$",
"(c) $x_{3}=2.2770$",
"(d) Chooses the interval $[2.2785,\\ 2.2795]$",
"(d) $f(2.2785)<0$ and $f(2.2795)>0$",
"(d) Sign change, so $\\alpha=2.279$ to 3 d.p."
]
],
[
"w",
"WMA13",
6,
4,
"$g(x)=e^{x}-4x$\n(a) Show that $g(x)=0$ has a root $\\beta$ in the interval $[0,1]$. [2]\n(b) Using $x_{n+1}=\\dfrac{e^{x_{n}}}{4}$ with $x_{0}=0.3$, find $x_{1}$, $x_{2}$ and $x_{3}$ to 4 decimal places. [3]\n(c) Show that $\\beta=0.3574$ to 4 decimal places. [3] [8 marks]",
[
"(a) $g(0)=1>0$ and $g(1)=e-4<0$",
"(a) Sign change and $g$ is continuous, so a root lies in $[0,1]$",
"(b) $x_{1}=0.3375$",
"(b) $x_{2}=0.3503$",
"(b) $x_{3}=0.3549$",
"(c) Chooses the interval $[0.35735,\\ 0.35745]$",
"(c) $g(0.35735)>0$ and $g(0.35745)<0$",
"(c) Sign change, so $\\beta=0.3574$ to 4 d.p."
]
],
[
"w",
"WMA13",
7,
4,
"(a) Find $\\displaystyle\\int\\left(e^{2x}+\\frac{3}{x}\\right)dx$. [3]\n(b) Find the exact value of $\\displaystyle\\int_{0}^{\\frac{\\pi}{4}}\\left(\\sec^{2}x+\\sin2x\\right)dx$. [4] [7 marks]",
[
"(a) $\\dfrac{1}{2}e^{2x}$",
"(a) $+3\\ln|x|$",
"(a) $+c$",
"(b) $\\tan x$",
"(b) $-\\dfrac{1}{2}\\cos2x$",
"(b) $\\left(1-0\\right)-\\left(0-\\dfrac{1}{2}\\right)$",
"(b) $=\\dfrac{3}{2}$"
]
],
[
"w",
"WMA13",
7,
4,
"(a) Find $\\displaystyle\\int\\left(\\frac{4}{2x+1}+\\cos3x\\right)dx$. [3]\n(b) Find the exact value of $\\displaystyle\\int_{1}^{e}\\left(2x-\\frac{3}{x}\\right)dx$. [3]\n(c) Evaluate $\\displaystyle\\int_{0}^{1}(2x+1)^{4}\\,dx$. [3] [9 marks]",
[
"(a) $2\\ln|2x+1|$",
"(a) $+\\dfrac{1}{3}\\sin3x$",
"(a) $+c$",
"(b) $\\left[x^{2}-3\\ln x\\right]_{1}^{e}$",
"(b) $(e^{2}-3)-(1-0)$",
"(b) $=e^{2}-4$",
"(c) $\\left[\\dfrac{(2x+1)^{5}}{10}\\right]_{0}^{1}$",
"(c) $\\dfrac{243-1}{10}$",
"(c) $=24.2$"
]
]
];
  D.forEach(r => out.push({ id: id(r[1], r[2]), u: r[1], t: r[2], d: r[3], type: "w", q: r[4], ms: r[5], m: r[5].length }));
  return out;
})();
