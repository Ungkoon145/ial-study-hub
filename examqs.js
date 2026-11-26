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
],
[
"w",
"WMA14",
0,
4,
"(a) Express $\\dfrac{7x+1}{(x+1)(2x-1)}$ in partial fractions. [3]\n(b) Hence find the exact value of $\\displaystyle\\int_{1}^{2}\\frac{7x+1}{(x+1)(2x-1)}\\,dx$, giving your answer in the form $a\\ln3+b\\ln2$. [4] [7 marks]",
[
"(a) $7x+1\\equiv A(2x-1)+B(x+1)$",
"(a) $x=-1$: $A=2$",
"(a) $x=\\dfrac{1}{2}$: $B=3$, so $\\dfrac{2}{x+1}+\\dfrac{3}{2x-1}$",
"(b) $2\\ln|x+1|$",
"(b) $+\\dfrac{3}{2}\\ln|2x-1|$",
"(b) $\\left(2\\ln3+\\dfrac{3}{2}\\ln3\\right)-\\left(2\\ln2+0\\right)$",
"(b) $\\dfrac{7}{2}\\ln3-2\\ln2$"
]
],
[
"w",
"WMA14",
0,
4,
"(a) Express $\\dfrac{3x^{2}+9x+7}{(x+1)(x+2)^{2}}$ in partial fractions. [4]\n(b) Hence find the exact value of $\\displaystyle\\int_{0}^{1}\\frac{3x^{2}+9x+7}{(x+1)(x+2)^{2}}\\,dx$. [4] [8 marks]",
[
"(a) $\\dfrac{A}{x+1}+\\dfrac{B}{x+2}+\\dfrac{C}{(x+2)^{2}}$",
"(a) $A=1$",
"(a) $C=-1$",
"(a) $B=2$",
"(b) $\\ln|x+1|+2\\ln|x+2|$",
"(b) $+\\dfrac{1}{x+2}$",
"(b) $\\left(\\ln2+2\\ln3+\\dfrac{1}{3}\\right)-\\left(2\\ln2+\\dfrac{1}{2}\\right)$",
"(b) $2\\ln3-\\ln2-\\dfrac{1}{6}$"
]
],
[
"w",
"WMA14",
1,
4,
"(a) Find the binomial expansion of $\\sqrt{1+4x}$, in ascending powers of $x$, up to and including the term in $x^{3}$. State the values of $x$ for which it is valid. [5]\n(b) Use your expansion with $x=0.01$ to estimate $\\sqrt{1.04}$, and hence estimate $\\sqrt{26}$ to 5 decimal places. [4] [9 marks]",
[
"(a) $1+\\dfrac{1}{2}(4x)$",
"(a) $+\\dfrac{\\frac{1}{2}\\left(-\\frac{1}{2}\\right)}{2!}(4x)^{2}$",
"(a) $=1+2x-2x^{2}$",
"(a) $+4x^{3}$",
"(a) Valid for $|x|<\\dfrac{1}{4}$",
"(b) $1+0.02-0.0002+0.000004$",
"(b) $=1.019804$",
"(b) $\\sqrt{1.04}=\\dfrac{\\sqrt{26}}{5}$",
"(b) $\\sqrt{26}\\approx5.09902$"
]
],
[
"w",
"WMA14",
1,
4,
"(a) Find the binomial expansion of $\\dfrac{1}{(2-x)^{2}}$, in ascending powers of $x$, up to and including the term in $x^{3}$. State the values of $x$ for which it is valid. [6]\n(b) Find the coefficient of $x^{2}$ in the expansion of $\\dfrac{1+3x}{(2-x)^{2}}$. [2] [8 marks]",
[
"(a) Takes out the factor: $2^{-2}\\left(1-\\dfrac{x}{2}\\right)^{-2}$",
"(a) $\\dfrac{1}{4}\\left(1+x+\\ldots\\right)$",
"(a) $\\dfrac{1}{4}$",
"(a) $+\\dfrac{1}{4}x+\\dfrac{3}{16}x^{2}$",
"(a) $+\\dfrac{1}{8}x^{3}$",
"(a) Valid for $|x|<2$",
"(b) $\\dfrac{3}{16}+3\\times\\dfrac{1}{4}$",
"(b) $=\\dfrac{15}{16}$"
]
],
[
"w",
"WMA14",
2,
4,
"A curve has parametric equations $x=t-1$, $y=t^{2}+2t$.\n(a) Find a Cartesian equation of the curve in the form $y=f(x)$. [2]\n(b) Find $\\dfrac{dy}{dx}$ in terms of $t$. [2]\n(c) Find an equation of the normal to the curve at the point where $t=1$, in the form $ax+by+c=0$. [3]\n(d) Find the coordinates of the point where this normal meets the curve again. [3] [10 marks]",
[
"(a) $t=x+1$",
"(a) $y=(x+1)^{2}+2(x+1)=x^{2}+4x+3$",
"(b) $\\dfrac{dx}{dt}=1$, $\\dfrac{dy}{dt}=2t+2$",
"(b) $\\dfrac{dy}{dx}=2t+2$",
"(c) At $t=1$: point $(0,3)$, gradient $4$",
"(c) Normal gradient $-\\dfrac{1}{4}$",
"(c) $x+4y-12=0$",
"(d) $x^{2}+4x+3=3-\\dfrac{x}{4}$",
"(d) $x\\left(x+\\dfrac{17}{4}\\right)=0$",
"(d) $\\left(-\\dfrac{17}{4},\\ \\dfrac{65}{16}\\right)$"
]
],
[
"w",
"WMA14",
2,
4,
"A curve has parametric equations $x=3\\cos t$, $y=2\\sin t$, $0\\le t<2\\pi$.\n(a) Find a Cartesian equation of the curve. [2]\n(b) Find $\\dfrac{dy}{dx}$ in terms of $t$. [2]\n(c) Show that the tangent at the point where $t=\\dfrac{\\pi}{4}$ has equation $2x+3y=6\\sqrt{2}$. [3]\n(d) Using integration, show that the area enclosed by the curve is $6\\pi$. [3] [10 marks]",
[
"(a) Uses $\\cos^{2}t+\\sin^{2}t=1$",
"(a) $\\dfrac{x^{2}}{9}+\\dfrac{y^{2}}{4}=1$",
"(b) $\\dfrac{dx}{dt}=-3\\sin t$, $\\dfrac{dy}{dt}=2\\cos t$",
"(b) $\\dfrac{dy}{dx}=-\\dfrac{2\\cos t}{3\\sin t}$",
"(c) Point $\\left(\\dfrac{3}{\\sqrt{2}},\\ \\sqrt{2}\\right)$, gradient $-\\dfrac{2}{3}$",
"(c) $y-\\sqrt{2}=-\\dfrac{2}{3}\\left(x-\\dfrac{3}{\\sqrt{2}}\\right)$",
"(c) Rearranges to $2x+3y=6\\sqrt{2}$",
"(d) Area $=4\\displaystyle\\int_{0}^{\\frac{\\pi}{2}}2\\sin t\\times3\\sin t\\,dt$ (quarter by symmetry)",
"(d) Uses $\\sin^{2}t=\\dfrac{1}{2}(1-\\cos2t)$: $12\\left[t-\\dfrac{1}{2}\\sin2t\\right]_{0}^{\\frac{\\pi}{2}}$",
"(d) $=6\\pi$"
]
],
[
"w",
"WMA14",
3,
4,
"The curve $C$ has equation $x^{2}+3xy+y^{2}=11$.\n(a) Find $\\dfrac{dy}{dx}$ in terms of $x$ and $y$. [4]\n(b) Show that $(1,2)$ lies on $C$ and find an equation of the tangent there, in the form $ax+by+c=0$. [3]\n(c) Show that $C$ has no stationary points. [2] [9 marks]",
[
"(a) $2x+2y\\dfrac{dy}{dx}$",
"(a) Product rule: $3y+3x\\dfrac{dy}{dx}$",
"(a) Collects terms",
"(a) $\\dfrac{dy}{dx}=-\\dfrac{2x+3y}{3x+2y}$",
"(b) $1+6+4=11$ ✓",
"(b) Gradient $-\\dfrac{8}{7}$",
"(b) $8x+7y-22=0$",
"(c) $\\dfrac{dy}{dx}=0$ needs $2x+3y=0$; substitutes $x=-\\dfrac{3}{2}y$",
"(c) Gets $-\\dfrac{5}{4}y^{2}=11$, which has no real solution"
]
],
[
"w",
"WMA14",
3,
4,
"(a) Given $y=3^{x}$, show that $\\dfrac{dy}{dx}=3^{x}\\ln3$. [3]\n(b) The curve $x^{3}+y^{3}=9xy$ passes through $P(2,4)$. Find $\\dfrac{dy}{dx}$ in terms of $x$ and $y$. [4]\n(c) Find an equation of the normal to the curve at $P$, in the form $ax+by+c=0$. [3] [10 marks]",
[
"(a) $\\ln y=x\\ln3$",
"(a) $\\dfrac{1}{y}\\dfrac{dy}{dx}=\\ln3$",
"(a) $\\dfrac{dy}{dx}=y\\ln3=3^{x}\\ln3$",
"(b) $3x^{2}+3y^{2}\\dfrac{dy}{dx}$",
"(b) $=9y+9x\\dfrac{dy}{dx}$",
"(b) Collects terms",
"(b) $\\dfrac{dy}{dx}=\\dfrac{3y-x^{2}}{y^{2}-3x}$",
"(c) At $P$: $\\dfrac{12-4}{16-6}=\\dfrac{4}{5}$",
"(c) Normal gradient $-\\dfrac{5}{4}$",
"(c) $5x+4y-26=0$"
]
],
[
"w",
"WMA14",
4,
4,
"(a) Find $\\displaystyle\\int xe^{2x}\\,dx$. [3]\n(b) Find the exact value of $\\displaystyle\\int_{1}^{e}x^{2}\\ln x\\,dx$. [4] [7 marks]",
[
"(a) Parts with $u=x$, $\\dfrac{dv}{dx}=e^{2x}$",
"(a) $\\dfrac{1}{2}xe^{2x}-\\displaystyle\\int\\frac{1}{2}e^{2x}dx$",
"(a) $\\dfrac{1}{2}xe^{2x}-\\dfrac{1}{4}e^{2x}+c$",
"(b) Parts with $u=\\ln x$, $\\dfrac{dv}{dx}=x^{2}$",
"(b) $\\dfrac{x^{3}}{3}\\ln x-\\displaystyle\\int\\frac{x^{2}}{3}dx$",
"(b) $\\left[\\dfrac{x^{3}}{3}\\ln x-\\dfrac{x^{3}}{9}\\right]_{1}^{e}$",
"(b) $=\\dfrac{2e^{3}+1}{9}$"
]
],
[
"w",
"WMA14",
4,
4,
"(a) Use the substitution $u=x+1$ to find the exact value of $\\displaystyle\\int_{0}^{3}x\\sqrt{x+1}\\,dx$. [5]\n(b) Find $\\displaystyle\\int\\sin x\\cos^{3}x\\,dx$. [2]\n(c) Find the exact value of $\\displaystyle\\int_{0}^{\\frac{\\pi}{2}}\\sin^{2}x\\,dx$. [2] [9 marks]",
[
"(a) $\\displaystyle\\int_{1}^{4}(u-1)\\sqrt{u}\\,du$ (with new limits)",
"(a) $=\\displaystyle\\int_{1}^{4}\\left(u^{\\frac{3}{2}}-u^{\\frac{1}{2}}\\right)du$",
"(a) $\\left[\\dfrac{2}{5}u^{\\frac{5}{2}}-\\dfrac{2}{3}u^{\\frac{3}{2}}\\right]_{1}^{4}$",
"(a) $\\left(\\dfrac{64}{5}-\\dfrac{16}{3}\\right)-\\left(\\dfrac{2}{5}-\\dfrac{2}{3}\\right)$",
"(a) $=\\dfrac{116}{15}$",
"(b) Recognises the form $f'(x)\\left[f(x)\\right]^{3}$ with $f(x)=\\cos x$",
"(b) $-\\dfrac{1}{4}\\cos^{4}x+c$",
"(c) $\\dfrac{1}{2}\\displaystyle\\int_{0}^{\\frac{\\pi}{2}}(1-\\cos2x)\\,dx$",
"(c) $=\\dfrac{\\pi}{4}$"
]
],
[
"w",
"WMA14",
5,
4,
"(a) Solve the differential equation $\\dfrac{dy}{dx}=2xy^{2}$, given that $y=1$ when $x=0$. Give $y$ in terms of $x$. [6]\n(b) Find $y$ when $x=\\dfrac{1}{2}$. [1] [7 marks]",
[
"(a) Separates: $\\displaystyle\\int\\frac{1}{y^{2}}dy=\\int2x\\,dx$",
"(a) $-\\dfrac{1}{y}$",
"(a) $=x^{2}+c$",
"(a) Uses $x=0$, $y=1$: $c=-1$",
"(a) $-\\dfrac{1}{y}=x^{2}-1$",
"(a) $y=\\dfrac{1}{1-x^{2}}$",
"(b) $y=\\dfrac{4}{3}$"
]
],
[
"w",
"WMA14",
5,
4,
"A cup of tea cools in a room at $20^{\\circ}\\mathrm{C}$. Its temperature $\\theta^{\\circ}\\mathrm{C}$ after $t$ minutes satisfies $\\dfrac{d\\theta}{dt}=-k(\\theta-20)$, where $k$ is a positive constant. Initially $\\theta=90$.\n(a) Show that $\\theta=20+70e^{-kt}$. [4]\n(b) After $10$ minutes the temperature is $55^{\\circ}\\mathrm{C}$. Find the exact value of $k$. [2]\n(c) Find the time taken for the tea to cool to $30^{\\circ}\\mathrm{C}$, to the nearest tenth of a minute. [3] [9 marks]",
[
"(a) $\\displaystyle\\int\\frac{1}{\\theta-20}d\\theta=\\int-k\\,dt$",
"(a) $\\ln(\\theta-20)=-kt+c$",
"(a) $t=0$, $\\theta=90$: $c=\\ln70$",
"(a) $\\theta-20=70e^{-kt}$, so $\\theta=20+70e^{-kt}$",
"(b) $35=70e^{-10k}$",
"(b) $k=\\dfrac{\\ln2}{10}$",
"(c) $10=70e^{-kt}$",
"(c) $t=\\dfrac{\\ln7}{k}=\\dfrac{10\\ln7}{\\ln2}$",
"(c) $t=28.1$ minutes"
]
],
[
"w",
"WMA14",
6,
4,
"The lines $l_{1}$ and $l_{2}$ have equations\n$l_{1}:\\ \\mathbf{r}=(\\mathbf{i}+2\\mathbf{j}-\\mathbf{k})+\\lambda(2\\mathbf{i}-\\mathbf{j}+3\\mathbf{k})$\n$l_{2}:\\ \\mathbf{r}=(2\\mathbf{i}-\\mathbf{j}+3\\mathbf{k})+\\mu(\\mathbf{i}+2\\mathbf{j}-\\mathbf{k})$\n(a) Show that $l_{1}$ and $l_{2}$ meet, and find the position vector of their point of intersection. [5]\n(b) Find the acute angle between $l_{1}$ and $l_{2}$, to one decimal place. [3] [8 marks]",
[
"(a) $1+2\\lambda=2+\\mu$ and $2-\\lambda=-1+2\\mu$",
"(a) Solves: $\\lambda=1$",
"(a) $\\mu=1$",
"(a) Checks the $\\mathbf{k}$ components: $-1+3=2$ and $3-1=2$ ✓",
"(a) $3\\mathbf{i}+\\mathbf{j}+2\\mathbf{k}$",
"(b) $(2,-1,3)\\cdot(1,2,-1)=2-2-3=-3$",
"(b) $\\cos\\theta=\\dfrac{3}{\\sqrt{14}\\sqrt{6}}$",
"(b) $70.9^{\\circ}$"
]
],
[
"w",
"WMA14",
6,
4,
"The points $A$ and $B$ have position vectors $\\mathbf{i}+2\\mathbf{k}$ and $3\\mathbf{i}+4\\mathbf{j}-2\\mathbf{k}$. The point $C$ has position vector $5\\mathbf{i}+\\mathbf{j}$.\n(a) Find $\\overrightarrow{AB}$ and $|\\overrightarrow{AB}|$. [2]\n(b) Write down a vector equation of the line $AB$. [1]\n(c) The point $P$ on line $AB$ is such that $CP$ is perpendicular to $AB$. Find the position vector of $P$. [4]\n(d) Hence find the shortest distance from $C$ to the line $AB$, to 3 significant figures. [2] [9 marks]",
[
"(a) $\\overrightarrow{AB}=2\\mathbf{i}+4\\mathbf{j}-4\\mathbf{k}$",
"(a) $|\\overrightarrow{AB}|=6$",
"(b) $\\mathbf{r}=(\\mathbf{i}+2\\mathbf{k})+t(2\\mathbf{i}+4\\mathbf{j}-4\\mathbf{k})$",
"(c) $\\overrightarrow{CP}=(2t-4)\\mathbf{i}+(4t-1)\\mathbf{j}+(2-4t)\\mathbf{k}$",
"(c) $\\overrightarrow{CP}\\cdot(2,4,-4)=0$",
"(c) $36t-20=0$, so $t=\\dfrac{5}{9}$",
"(c) $\\dfrac{19}{9}\\mathbf{i}+\\dfrac{20}{9}\\mathbf{j}-\\dfrac{2}{9}\\mathbf{k}$",
"(d) $|\\overrightarrow{CP}|=\\dfrac{\\sqrt{801}}{9}$",
"(d) $=3.14$"
]
],
[
"w",
"WME01",
0,
4,
"A box of mass $5\\text{ kg}$ is pulled along a horizontal floor by a light inextensible string. The string is horizontal and the tension in it is $20\\text{ N}$. Take $g=9.8\\text{ m s}^{-2}$.\n(a) State what is meant by the string being (i) light and (ii) inextensible, in this model. [2]\n(b) Modelling the floor as smooth, find the acceleration of the box. [2]\n(c) The acceleration is actually $2.04\\text{ m s}^{-2}$. Modelling the floor as rough, find the coefficient of friction. [3]\n(d) Suggest one further refinement to the model. [1] [8 marks]",
[
"(a)(i) The string has no mass, so the tension is the same throughout",
"(a)(ii) The string does not stretch, so the box and the end of the string move together",
"(b) $20=5a$",
"(b) $a=4\\text{ m s}^{-2}$",
"(c) $20-F=5\\times2.04$",
"(c) $F=\\mu R$ with $R=5g=49$",
"(c) $\\mu=\\dfrac{9.8}{49}=0.2$",
"(d) E.g. include air resistance, or model the box as a body with size rather than a particle"
]
],
[
"w",
"WME01",
0,
4,
"A stone is dropped from rest from the top of a cliff $44.1\\text{ m}$ above the sea. It is modelled as a particle moving freely under gravity. Take $g=9.8\\text{ m s}^{-2}$.\n(a) Find the time it takes to reach the sea. [3]\n(b) Find its speed as it reaches the sea. [2]\n(c) The actual time is $3.2\\text{ s}$. State two assumptions of the model and which one is most likely to explain the difference. [2] [7 marks]",
[
"(a) Uses $s=ut+\\dfrac{1}{2}at^{2}$ with $u=0$",
"(a) $44.1=4.9t^{2}$",
"(a) $t=3\\text{ s}$",
"(b) $v=u+at=9.8\\times3$",
"(b) $29.4\\text{ m s}^{-1}$",
"(c) Two of: no air resistance; the stone is a particle (no size or spin); $g$ is constant",
"(c) Air resistance is ignored, and it slows the stone, so the real time is longer"
]
],
[
"w",
"WME01",
1,
4,
"A particle of mass $2\\text{ kg}$ is acted on by three forces $(3\\mathbf{i}+4\\mathbf{j})\\text{ N}$, $(p\\mathbf{i}-2\\mathbf{j})\\text{ N}$ and $(-5\\mathbf{i}+q\\mathbf{j})\\text{ N}$. Its acceleration is $(2\\mathbf{i}+3\\mathbf{j})\\text{ m s}^{-2}$.\n(a) Find the values of $p$ and $q$. [4]\n(b) Find the magnitude of the acceleration, and the angle it makes with $\\mathbf{i}$. [3]\n(c) The particle starts from rest at the origin. Find its position vector after $4\\text{ s}$. [2] [9 marks]",
[
"(a) Resultant $=(p-2)\\mathbf{i}+(2+q)\\mathbf{j}$",
"(a) $\\mathbf{F}=m\\mathbf{a}=4\\mathbf{i}+6\\mathbf{j}$",
"(a) $p=6$",
"(a) $q=4$",
"(b) $|\\mathbf{a}|=\\sqrt{13}=3.61\\text{ m s}^{-2}$",
"(b) $\\tan\\theta=\\dfrac{3}{2}$",
"(b) $56.3^{\\circ}$",
"(c) $\\mathbf{r}=\\dfrac{1}{2}\\mathbf{a}t^{2}=8(2\\mathbf{i}+3\\mathbf{j})$",
"(c) $(16\\mathbf{i}+24\\mathbf{j})\\text{ m}$"
]
],
[
"w",
"WME01",
1,
4,
"At noon, ship $A$ is at $(2\\mathbf{i}+3\\mathbf{j})\\text{ km}$ moving with velocity $(4\\mathbf{i}-\\mathbf{j})\\text{ km h}^{-1}$, and ship $B$ is at $(-6\\mathbf{i}+7\\mathbf{j})\\text{ km}$ moving with velocity $(6\\mathbf{i}-2\\mathbf{j})\\text{ km h}^{-1}$.\n(a) Write down the position vectors of $A$ and $B$ at time $t$ hours after noon. [2]\n(b) Show that $\\overrightarrow{BA}=(8-2t)\\mathbf{i}+(t-4)\\mathbf{j}$. [2]\n(c) Show that the ships would collide if they kept these velocities, and find when and where. [3] [7 marks]",
[
"(a) $\\mathbf{r}_{A}=(2+4t)\\mathbf{i}+(3-t)\\mathbf{j}$",
"(a) $\\mathbf{r}_{B}=(-6+6t)\\mathbf{i}+(7-2t)\\mathbf{j}$",
"(b) $\\overrightarrow{BA}=\\mathbf{r}_{A}-\\mathbf{r}_{B}$",
"(b) $=(8-2t)\\mathbf{i}+(t-4)\\mathbf{j}$",
"(c) Both components are $0$ when $t=4$",
"(c) So they collide at $4\\text{ pm}$",
"(c) At $(18\\mathbf{i}-\\mathbf{j})\\text{ km}$"
]
],
[
"w",
"WME01",
2,
4,
"A car accelerates uniformly from $5\\text{ m s}^{-1}$ to $25\\text{ m s}^{-1}$ in $8\\text{ s}$.\n(a) Find its acceleration. [2]\n(b) Find the distance it travels in this time. [2]\n(c) It then decelerates uniformly from $25\\text{ m s}^{-1}$ to rest in a distance of $50\\text{ m}$. Find the deceleration and the time taken. [4] [8 marks]",
[
"(a) $25=5+8a$",
"(a) $a=2.5\\text{ m s}^{-2}$",
"(b) $s=\\dfrac{(5+25)}{2}\\times8$",
"(b) $120\\text{ m}$",
"(c) $0=25^{2}-2a\\times50$",
"(c) Deceleration $6.25\\text{ m s}^{-2}$",
"(c) $0=25-6.25t$",
"(c) $t=4\\text{ s}$"
]
],
[
"w",
"WME01",
2,
4,
"A ball is projected vertically upwards at $14.7\\text{ m s}^{-1}$ from a point $2\\text{ m}$ above the ground. Take $g=9.8\\text{ m s}^{-2}$.\n(a) Find the greatest height of the ball above the ground. [3]\n(b) Find the time taken for the ball to hit the ground, to 3 significant figures. [4]\n(c) Find, to 3 significant figures, how long the ball is more than $10\\text{ m}$ above the ground. [3] [10 marks]",
[
"(a) $0=14.7^{2}-2\\times9.8\\times s$",
"(a) $s=11.025\\text{ m}$",
"(a) Height $=13.0\\text{ m}$",
"(b) $-2=14.7t-4.9t^{2}$",
"(b) $4.9t^{2}-14.7t-2=0$",
"(b) Uses the quadratic formula",
"(b) $t=3.13\\text{ s}$",
"(c) $8=14.7t-4.9t^{2}$",
"(c) $t=0.714$ or $t=2.29$",
"(c) Time $=1.57\\text{ s}$"
]
],
[
"w",
"WME01",
3,
4,
"A train starts from rest and accelerates uniformly for $20\\text{ s}$ to $15\\text{ m s}^{-1}$. It travels at $15\\text{ m s}^{-1}$ for $T$ seconds, then decelerates uniformly to rest in $30\\text{ s}$. The total distance is $3\\text{ km}$.\n(a) Sketch a speed–time graph for the journey. [2]\n(b) Find $T$. [3]\n(c) Find the acceleration and the deceleration. [2] [7 marks]",
[
"(a) Correct shape (trapezium) starting and ending at $0$",
"(a) $15$, $20$, $T$ and $30$ marked",
"(b) Area $=\\dfrac{1}{2}\\times20\\times15+15T+\\dfrac{1}{2}\\times30\\times15$",
"(b) $375+15T=3000$",
"(b) $T=175$",
"(c) Acceleration $0.75\\text{ m s}^{-2}$",
"(c) Deceleration $0.5\\text{ m s}^{-2}$"
]
],
[
"w",
"WME01",
3,
4,
"At time $t=0$ car $P$ passes point $O$ moving at a constant $20\\text{ m s}^{-1}$. At the same moment car $Q$ starts from rest at $O$ and accelerates uniformly at $2.5\\text{ m s}^{-2}$ until its speed is $30\\text{ m s}^{-1}$, then keeps this speed. Both move along the same straight road.\n(a) Find the time when $Q$ reaches $30\\text{ m s}^{-1}$. [1]\n(b) Sketch both speed–time graphs on one diagram. [2]\n(c) Find the time when $Q$ overtakes $P$. [4] [7 marks]",
[
"(a) $t=12\\text{ s}$",
"(b) Horizontal line at $20$ for $P$",
"(b) Line from $(0,0)$ to $(12,30)$ then horizontal for $Q$",
"(c) At $t=12$: $Q$ has gone $180\\text{ m}$, $P$ has gone $240\\text{ m}$ (so not yet overtaken)",
"(c) For $t>12$: $180+30(t-12)$",
"(c) $=20t$",
"(c) $t=18\\text{ s}$"
]
],
[
"w",
"WME01",
4,
4,
"A particle of mass $4\\text{ kg}$ hangs in equilibrium from two light strings. One string makes an angle of $30^{\\circ}$ with the vertical and the other makes $45^{\\circ}$ with the vertical, on opposite sides. Take $g=9.8\\text{ m s}^{-2}$.\n(a) Find the tension in each string, to 3 significant figures. [6]\n(b) State how you have used the fact that the strings are light. [1] [7 marks]",
[
"(a) Resolves horizontally: $T_{1}\\sin30^{\\circ}=T_{2}\\sin45^{\\circ}$",
"(a) Resolves vertically: $T_{1}\\cos30^{\\circ}+T_{2}\\cos45^{\\circ}=4g$",
"(a) Eliminates one tension",
"(a) Solves",
"(a) $T_{1}=28.7\\text{ N}$ (the $30^{\\circ}$ string)",
"(a) $T_{2}=20.3\\text{ N}$",
"(b) The tension is the same all along each string (and the strings' weight is ignored)"
]
],
[
"w",
"WME01",
4,
4,
"Three forces $\\mathbf{F}_{1}=(3\\mathbf{i}-2\\mathbf{j})\\text{ N}$, $\\mathbf{F}_{2}=(p\\mathbf{i}+5\\mathbf{j})\\text{ N}$ and $\\mathbf{F}_{3}=(-4\\mathbf{i}+q\\mathbf{j})\\text{ N}$ act on a particle of mass $2\\text{ kg}$, which is in equilibrium.\n(a) Find $p$ and $q$. [3]\n(b) $\\mathbf{F}_{3}$ is removed. Find the magnitude of the resultant force and the acceleration of the particle. [3]\n(c) Find the angle between the resultant force and $\\mathbf{i}$. [2] [8 marks]",
[
"(a) Resultant is zero: $3+p-4=0$ and $-2+5+q=0$",
"(a) $p=1$",
"(a) $q=-3$",
"(b) Resultant $=\\mathbf{F}_{1}+\\mathbf{F}_{2}=4\\mathbf{i}+3\\mathbf{j}$",
"(b) Magnitude $5\\text{ N}$",
"(b) $a=\\dfrac{5}{2}=2.5\\text{ m s}^{-2}$",
"(c) $\\tan\\theta=\\dfrac{3}{4}$",
"(c) $36.9^{\\circ}$"
]
],
[
"w",
"WME01",
6,
4,
"A particle of mass $3\\text{ kg}$ rests on a rough plane inclined at $30^{\\circ}$ to the horizontal. It is held at rest by a horizontal force of magnitude $P\\text{ N}$ acting towards the plane, in the vertical plane containing a line of greatest slope. The coefficient of friction is $0.25$, and the particle is on the point of slipping down the plane. Take $g=9.8\\text{ m s}^{-2}$.\n(a) Explain why friction acts up the plane. [1]\n(b) Find $P$, to 3 significant figures. [7] [8 marks]",
[
"(a) The particle is about to move down the plane, and friction opposes this motion",
"(b) Resolves perpendicular to the plane: $R=3g\\cos30^{\\circ}+P\\sin30^{\\circ}$",
"(b) Correct components",
"(b) Resolves along the plane: $P\\cos30^{\\circ}+F=3g\\sin30^{\\circ}$",
"(b) Correct components",
"(b) Uses $F=0.25R$",
"(b) Solves for $P$",
"(b) $P=8.41$"
]
],
[
"w",
"WME01",
5,
4,
"Particle $A$ of mass $3\\text{ kg}$ lies on a smooth horizontal table. It is attached by a light inextensible string, passing over a smooth pulley at the edge of the table, to particle $B$ of mass $2\\text{ kg}$ hanging freely. The system is released from rest with $B$ $0.8\\text{ m}$ above the floor. Take $g=9.8\\text{ m s}^{-2}$.\n(a) Find the acceleration of the system and the tension in the string. [4]\n(b) Find the speed of $B$ just before it hits the floor, to 3 significant figures. [2]\n(c) State where in your working you used the fact that the pulley is smooth. [1] [7 marks]",
[
"(a) For $A$: $T=3a$",
"(a) For $B$: $2g-T=2a$",
"(a) $a=\\dfrac{2g}{5}=3.92\\text{ m s}^{-2}$",
"(a) $T=11.76\\text{ N}$ ($11.8\\text{ N}$)",
"(b) $v^{2}=2\\times3.92\\times0.8$",
"(b) $v=2.50\\text{ m s}^{-1}$",
"(c) The tension is the same on both sides of the pulley"
]
],
[
"w",
"WME01",
5,
4,
"A car of mass $1200\\text{ kg}$ tows a trailer of mass $800\\text{ kg}$ along a level road by a light rigid towbar. The resistances are $400\\text{ N}$ on the car and $200\\text{ N}$ on the trailer, and the driving force is $2600\\text{ N}$.\n(a) Find the acceleration. [3]\n(b) Find the tension in the towbar. [2]\n(c) When the speed is $15\\text{ m s}^{-1}$ the towbar breaks. Find the distance the trailer travels before stopping, assuming the resistance on it stays $200\\text{ N}$. [3] [8 marks]",
[
"(a) Whole system: $2600-400-200=2000a$",
"(a) Correct equation",
"(a) $a=1\\text{ m s}^{-2}$",
"(b) Trailer: $T-200=800\\times1$",
"(b) $T=1000\\text{ N}$",
"(c) Deceleration $=\\dfrac{200}{800}=0.25\\text{ m s}^{-2}$",
"(c) $0=15^{2}-2\\times0.25\\times s$",
"(c) $s=450\\text{ m}$"
]
],
[
"w",
"WME01",
6,
4,
"A box of mass $10\\text{ kg}$ is pulled across a rough horizontal floor by a force of $50\\text{ N}$ at $20^{\\circ}$ above the horizontal. The coefficient of friction is $0.3$. Take $g=9.8\\text{ m s}^{-2}$.\n(a) Find the normal reaction and the friction force. [3]\n(b) Find the acceleration of the box, to 3 significant figures. [3]\n(c) The box starts from rest. After $3\\text{ s}$ the force is removed. Find how much further the box slides. [3] [9 marks]",
[
"(a) $R+50\\sin20^{\\circ}=10g$",
"(a) $R=80.9\\text{ N}$",
"(a) $F=0.3R=24.3\\text{ N}$",
"(b) $50\\cos20^{\\circ}-F=10a$",
"(b) Correct values",
"(b) $a=2.27\\text{ m s}^{-2}$",
"(c) Speed after $3\\text{ s}$: $6.81\\text{ m s}^{-1}$",
"(c) New deceleration $\\mu g=2.94\\text{ m s}^{-2}$ (now $R=10g$)",
"(c) $s=\\dfrac{6.81^{2}}{2\\times2.94}=7.90\\text{ m}$"
]
],
[
"w",
"WME01",
7,
4,
"Particle $P$ of mass $2\\text{ kg}$, moving at $6\\text{ m s}^{-1}$, collides directly with particle $Q$ of mass $3\\text{ kg}$ moving towards it at $2\\text{ m s}^{-1}$. After the collision $P$ moves back the way it came at $1.5\\text{ m s}^{-1}$.\n(a) Find the speed and direction of $Q$ after the collision. [4]\n(b) Find the magnitude of the impulse on $P$. [2]\n(c) $Q$ then hits a wall at right angles and rebounds at $1\\text{ m s}^{-1}$. Find the impulse the wall exerts on $Q$. [2] [8 marks]",
[
"(a) Conservation of momentum, with directions: $2(6)+3(-2)$",
"(a) $=2(-1.5)+3v$",
"(a) $v=3$",
"(a) $Q$ moves at $3\\text{ m s}^{-1}$ in $P$'s original direction (reversed)",
"(b) $I=2(-1.5-6)$",
"(b) $15\\text{ N s}$",
"(c) $I=3(1-(-3))$",
"(c) $12\\text{ N s}$"
]
],
[
"w",
"WME01",
7,
4,
"A railway truck $A$ of mass $4000\\text{ kg}$, moving at $3\\text{ m s}^{-1}$, collides with a stationary truck $B$ of mass $2000\\text{ kg}$. They couple together.\n(a) Find their common speed after the collision. [3]\n(b) Find the impulse exerted on $B$. [2]\n(c) The collision lasts $0.4\\text{ s}$. Find the average force on $B$. [2] [7 marks]",
[
"(a) $4000\\times3=6000v$",
"(a) Correct equation",
"(a) $v=2\\text{ m s}^{-1}$",
"(b) $I=2000\\times2$",
"(b) $4000\\text{ N s}$",
"(c) $F=\\dfrac{I}{t}$",
"(c) $10\\,000\\text{ N}$"
]
],
[
"w",
"WME01",
8,
4,
"A uniform rod $AB$ of length $4\\text{ m}$ and mass $20\\text{ kg}$ rests horizontally on two supports at $C$ and $D$, where $AC=0.5\\text{ m}$ and $DB=1\\text{ m}$. Take $g=9.8\\text{ m s}^{-2}$.\n(a) Find the reactions at $C$ and $D$. [4]\n(b) A child of mass $m\\text{ kg}$ stands at $B$, and the rod is on the point of tilting about $D$. Find $m$. [3] [7 marks]",
[
"(a) Moments about $C$: $R_{D}\\times2.5=20g\\times1.5$",
"(a) $R_{D}=12g=117.6\\text{ N}$",
"(a) Resolves vertically: $R_{C}+R_{D}=20g$",
"(a) $R_{C}=8g=78.4\\text{ N}$",
"(b) About to tilt, so $R_{C}=0$",
"(b) Moments about $D$: $20g\\times1=mg\\times1$",
"(b) $m=20$"
]
],
[
"w",
"WME01",
8,
4,
"A non-uniform plank $AB$ of length $6\\text{ m}$ and mass $30\\text{ kg}$ hangs horizontally from two vertical ropes at $A$ and $B$. The tension at $B$ is twice the tension at $A$.\n(a) Find the distance of the centre of mass from $A$. [4]\n(b) A $15\\text{ kg}$ load is placed on the plank so that the two tensions become equal. Find the distance of the load from $A$. [4] [8 marks]",
[
"(a) $T_{A}+T_{B}=30g$ with $T_{B}=2T_{A}$",
"(a) $T_{A}=10g$, $T_{B}=20g$",
"(a) Moments about $A$: $20g\\times6=30g\\times x$",
"(a) $x=4\\text{ m}$",
"(b) Each tension $=\\dfrac{45g}{2}=22.5g$",
"(b) Moments about $A$: $22.5g\\times6=30g\\times4+15g\\times d$",
"(b) $135=120+15d$",
"(b) $d=1\\text{ m}$"
]
],
[
"w",
"WST01",
0,
4,
"A spinner is modelled by $P(X=x)=kx$ for $x=1,2,3,4$.\n(a) Give two reasons why statisticians use models like this. [2]\n(b) Find $k$. [2]\n(c) The spinner is spun $50$ times. Find the expected number of 4s. [2]\n(d) There were actually $12$ fours. Comment on the model. [1]\n(e) State one limitation of using a model. [1] [8 marks]",
[
"(a) A model is quicker and cheaper than collecting lots of data",
"(a) It can be used to make predictions (and can be refined)",
"(b) $k(1+2+3+4)=1$",
"(b) $k=0.1$",
"(c) $P(X=4)=0.4$",
"(c) Expected $=50\\times0.4=20$",
"(d) $12$ is well below $20$, so the model may not be a good fit (the spinner may not be as modelled)",
"(e) E.g. a model simplifies reality, so its predictions may not be accurate"
]
],
[
"w",
"WST01",
0,
4,
"The heights of adult men in a town are modelled by a normal distribution with mean $170\\text{ cm}$ and standard deviation $8\\text{ cm}$.\n(a) Give one reason why a normal model is suitable and one reason why it cannot be exactly right. [2]\n(b) Use the model to estimate the proportion of men taller than $186\\text{ cm}$. [3]\n(c) In a sample of $200$ men, $11$ were taller than $186\\text{ cm}$. Comment on the model. [2] [7 marks]",
[
"(a) Heights are continuous and roughly symmetrical about the mean",
"(a) The normal model allows negative or impossibly large heights",
"(b) $z=\\dfrac{186-170}{8}=2$",
"(b) $1-\\Phi(2)$",
"(b) $=0.0228$",
"(c) Expected about $200\\times0.0228\\approx5$",
"(c) $11$ is more than twice that, so the model may underestimate tall men"
]
],
[
"w",
"WST01",
1,
4,
"For $20$ values, $\\sum x=860$ and $\\sum x^{2}=37\\,400$.\n(a) Find the mean and the standard deviation. [4]\n(b) Each value is increased by $5$ and then doubled. Find the new mean and standard deviation. [2]\n(c) A $21$st value of $43$ is added to the original data. State the effect on the mean and find the new standard deviation. [2] [8 marks]",
[
"(a) Mean $=\\dfrac{860}{20}=43$",
"(a) Variance $=\\dfrac{37\\,400}{20}-43^{2}$",
"(a) $=21$",
"(a) Standard deviation $=4.58$",
"(b) New mean $=2(43+5)=96$",
"(b) New standard deviation $=2\\times4.58=9.17$",
"(c) Mean unchanged ($43$)",
"(c) $\\sqrt{\\dfrac{39\\,249}{21}-43^{2}}=\\sqrt{20}=4.47$"
]
],
[
"w",
"WST01",
1,
4,
"The times, in minutes, that $50$ students spent on homework are grouped: $0\\text{–}10$: $5$; $10\\text{–}20$: $12$; $20\\text{–}30$: $18$; $30\\text{–}50$: $10$; $50\\text{–}80$: $5$.\n(a) Use interpolation to estimate the median. [3]\n(b) Estimate the mean. [2]\n(c) On a histogram the $20\\text{–}30$ bar is $9\\text{ cm}$ tall. Find the height of the $50\\text{–}80$ bar. [2]\n(d) Describe the skewness of the data, giving a reason. [1] [8 marks]",
[
"(a) The median is the $25$th value, in the $20\\text{–}30$ class",
"(a) $20+\\dfrac{25-17}{18}\\times10$",
"(a) $=24.4$",
"(b) Uses midpoints $5,15,25,40,65$: $\\sum fx=1380$",
"(b) Mean $=27.6$",
"(c) Frequency densities $1.8$ and $\\dfrac{5}{30}$",
"(c) $\\dfrac{5/30}{1.8}\\times9=0.833\\text{ cm}$",
"(d) Positive skew, because the mean is greater than the median"
]
],
[
"w",
"WST01",
2,
4,
"For events $A$ and $B$, $P(A)=0.4$, $P(B)=0.5$ and $P(A\\cup B)=0.7$.\n(a) Find $P(A\\cap B)$. [2]\n(b) Show that $A$ and $B$ are independent. [2]\n(c) Find $P(A\\mid B')$. [2]\n(d) Find $P(A'\\cap B')$. [1] [7 marks]",
[
"(a) $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$",
"(a) $P(A\\cap B)=0.2$",
"(b) $P(A)P(B)=0.4\\times0.5=0.2$",
"(b) $=P(A\\cap B)$, so independent",
"(c) $\\dfrac{P(A\\cap B')}{P(B')}=\\dfrac{0.2}{0.5}$",
"(c) $=0.4$",
"(d) $1-0.7=0.3$"
]
],
[
"w",
"WST01",
2,
4,
"$30\\%$ of students walk to school. Of those who walk, $10\\%$ are late; of those who don't, $25\\%$ are late.\n(a) Find the probability that a randomly chosen student is late. [3]\n(b) Given that a student is late, find the probability that they walked. [3]\n(c) Two students are chosen independently. Find the probability that exactly one of them is late. [2] [8 marks]",
[
"(a) Tree diagram or $0.3\\times0.1$",
"(a) $+0.7\\times0.25$",
"(a) $=0.205$",
"(b) $\\dfrac{P(\\text{walk and late})}{P(\\text{late})}$",
"(b) $\\dfrac{0.03}{0.205}$",
"(b) $=0.146$",
"(c) $2\\times0.205\\times0.795$",
"(c) $=0.326$"
]
],
[
"w",
"WST01",
3,
4,
"For $10$ pairs of data: $S_{xx}=120$, $S_{yy}=450$, $S_{xy}=216$, $\\bar{x}=6$, $\\bar{y}=30$.\n(a) Find the product moment correlation coefficient. [2]\n(b) Find the equation of the regression line of $y$ on $x$. [4]\n(c) Estimate $y$ when $x=8$, and comment on the reliability of your estimate. [2] [8 marks]",
[
"(a) $r=\\dfrac{216}{\\sqrt{120\\times450}}$",
"(a) $r=0.930$",
"(b) $b=\\dfrac{S_{xy}}{S_{xx}}=\\dfrac{216}{120}$",
"(b) $b=1.8$",
"(b) $a=\\bar{y}-b\\bar{x}=30-1.8\\times6=19.2$",
"(b) $y=19.2+1.8x$",
"(c) $y=33.6$",
"(c) Reliable: $r$ is close to $1$ and $x=8$ is likely within the data (interpolation)"
]
],
[
"w",
"WST01",
3,
4,
"Data are coded using $u=\\dfrac{x-100}{5}$ and $v=\\dfrac{y}{2}$. The regression line of $v$ on $u$ is $v=3+0.4u$, and the correlation between $u$ and $v$ is $0.82$.\n(a) Find the regression line of $y$ on $x$, in the form $y=a+bx$. [4]\n(b) State the correlation between $x$ and $y$. [1]\n(c) Interpret the gradient of your line. [1] [6 marks]",
[
"(a) Substitutes: $\\dfrac{y}{2}=3+0.4\\times\\dfrac{x-100}{5}$",
"(a) $y=6+0.16(x-100)$",
"(a) Expands",
"(a) $y=0.16x-10$",
"(b) $0.82$ (coding does not change correlation)",
"(c) Each increase of $1$ in $x$ increases $y$ by $0.16$ on average"
]
],
[
"w",
"WST01",
4,
4,
"The random variable $X$ has $P(X=x)=k(x+1)$ for $x=0,1,2,3$.\n(a) Find $k$. [2]\n(b) Find $E(X)$. [2]\n(c) Find $\\operatorname{Var}(X)$. [3]\n(d) Find $E(3X-2)$ and $\\operatorname{Var}(3X-2)$. [2] [9 marks]",
[
"(a) $k(1+2+3+4)=1$",
"(a) $k=0.1$",
"(b) $0.1(0+2+6+12)$",
"(b) $E(X)=2$",
"(c) $E(X^{2})=0.1(0+2+12+36)=5$",
"(c) $\\operatorname{Var}(X)=5-2^{2}$",
"(c) $=1$",
"(d) $E(3X-2)=4$",
"(d) $\\operatorname{Var}(3X-2)=9$"
]
],
[
"w",
"WST01",
4,
4,
"A spinner's score $S$ has $P(S=1)=0.2$, $P(S=2)=0.3$, $P(S=3)=a$, $P(S=4)=b$, and $E(S)=2.7$.\n(a) Find $a$ and $b$. [4]\n(b) Find $P(S>E(S))$. [1]\n(c) Write down $F(2)$. [1]\n(d) The spinner is spun twice. Find the probability that the total is $5$. [2] [8 marks]",
[
"(a) $a+b=0.5$",
"(a) $0.2+0.6+3a+4b=2.7$",
"(a) Solves",
"(a) $a=0.1$, $b=0.4$",
"(b) $P(S=3)+P(S=4)=0.5$",
"(c) $F(2)=0.5$",
"(d) Pairs $(1,4),(4,1),(2,3),(3,2)$: $2(0.2)(0.4)+2(0.3)(0.1)$",
"(d) $=0.22$"
]
],
[
"w",
"WST01",
5,
4,
"$X\\sim N(50,\\,4^{2})$\n(a) Find $P(X>56)$. [2]\n(b) Find $P(45<X<55)$. [3]\n(c) Find the value of $a$ such that $P(X<a)=0.9$. [2] [7 marks]",
[
"(a) $z=1.5$",
"(a) $1-0.9332=0.0668$",
"(b) $z=\\pm1.25$",
"(b) $\\Phi(1.25)-\\Phi(-1.25)$",
"(b) $=0.7887$",
"(c) $\\dfrac{a-50}{4}=1.2816$",
"(c) $a=55.1$"
]
],
[
"w",
"WST01",
5,
4,
"The masses $W$ of loaves are normally distributed. $10\\%$ weigh less than $480\\text{ g}$ and $5\\%$ weigh more than $530\\text{ g}$.\n(a) Find the mean $\\mu$ and standard deviation $\\sigma$ of $W$. [6]\n(b) Find the proportion of loaves that weigh more than $520\\text{ g}$. [2] [8 marks]",
[
"(a) $\\dfrac{480-\\mu}{\\sigma}=-1.2816$",
"(a) $\\dfrac{530-\\mu}{\\sigma}=1.6449$",
"(a) Correct $z$-values from tables",
"(a) Solves simultaneously",
"(a) $\\sigma=17.1$",
"(a) $\\mu=502$ (501.9)",
"(b) $z=\\dfrac{520-501.9}{17.09}=1.06$",
"(b) $0.145$"
]
],
[
"w",
"WFM01",
0,
4,
"$z_{1}=3+4\\mathrm{i}$ and $z_{2}=1-2\\mathrm{i}$.\n(a) Find $z_{1}z_{2}$. [2]\n(b) Find $\\dfrac{z_{1}}{z_{2}}$ in the form $a+b\\mathrm{i}$. [3]\n(c) Find $|z_{1}|$ and $\\arg z_{1}$, in radians to 3 decimal places. [2]\n(d) Show $z_{1}$ and $z_{2}$ on an Argand diagram. [1] [8 marks]",
[
"(a) $3-6\\mathrm{i}+4\\mathrm{i}-8\\mathrm{i}^{2}$",
"(a) $11-2\\mathrm{i}$",
"(b) Multiplies by $\\dfrac{1+2\\mathrm{i}}{1+2\\mathrm{i}}$",
"(b) Numerator $-5+10\\mathrm{i}$, denominator $5$",
"(b) $-1+2\\mathrm{i}$",
"(c) $|z_{1}|=5$",
"(c) $\\arg z_{1}=\\arctan\\dfrac{4}{3}=0.927$",
"(d) Points $(3,4)$ and $(1,-2)$ plotted"
]
],
[
"w",
"WFM01",
0,
4,
"$f(z)=z^{3}-5z^{2}+17z-13$\n(a) Show that $z=1$ is a root of $f(z)=0$. [1]\n(b) Find the other two roots. [4]\n(c) Show all three roots on an Argand diagram. [1]\n(d) Verify that the sum of the roots is $5$. [1] [7 marks]",
[
"(a) $1-5+17-13=0$",
"(b) $f(z)=(z-1)(z^{2}-4z+13)$",
"(b) Correct quadratic factor",
"(b) Solves: $z=\\dfrac{4\\pm\\sqrt{-36}}{2}$",
"(b) $z=2\\pm3\\mathrm{i}$",
"(c) Points $(1,0)$, $(2,3)$, $(2,-3)$",
"(d) $1+(2+3\\mathrm{i})+(2-3\\mathrm{i})=5$ ✓"
]
],
[
"w",
"WFM01",
1,
4,
"The roots of $2x^{2}-3x+5=0$ are $\\alpha$ and $\\beta$.\n(a) Write down $\\alpha+\\beta$ and $\\alpha\\beta$. [1]\n(b) Find $\\alpha^{2}+\\beta^{2}$. [2]\n(c) Find a quadratic equation with integer coefficients whose roots are $\\alpha^{2}$ and $\\beta^{2}$. [4] [7 marks]",
[
"(a) $\\alpha+\\beta=\\dfrac{3}{2}$, $\\alpha\\beta=\\dfrac{5}{2}$",
"(b) $(\\alpha+\\beta)^{2}-2\\alpha\\beta$",
"(b) $=\\dfrac{9}{4}-5=-\\dfrac{11}{4}$",
"(c) Sum of new roots $=-\\dfrac{11}{4}$",
"(c) Product $=(\\alpha\\beta)^{2}=\\dfrac{25}{4}$",
"(c) $x^{2}+\\dfrac{11}{4}x+\\dfrac{25}{4}=0$",
"(c) $4x^{2}+11x+25=0$"
]
],
[
"w",
"WFM01",
1,
4,
"The roots of $x^{2}-4x+1=0$ are $\\alpha$ and $\\beta$.\n(a) Find the value of $\\alpha^{3}+\\beta^{3}$. [3]\n(b) Find a quadratic equation with roots $\\dfrac{\\alpha}{\\beta}$ and $\\dfrac{\\beta}{\\alpha}$. [4] [7 marks]",
[
"(a) $\\alpha^{3}+\\beta^{3}=(\\alpha+\\beta)^{3}-3\\alpha\\beta(\\alpha+\\beta)$",
"(a) $=64-12$",
"(a) $=52$",
"(b) Sum $=\\dfrac{\\alpha^{2}+\\beta^{2}}{\\alpha\\beta}$",
"(b) $=\\dfrac{16-2}{1}=14$",
"(b) Product $=1$",
"(b) $x^{2}-14x+1=0$"
]
],
[
"w",
"WFM01",
2,
4,
"$f(x)=x^{3}+2x-7$\n(a) Show that $f(x)=0$ has a root $\\alpha$ in $[1,2]$. [2]\n(b) Use interval bisection twice, starting with $[1,2]$, to find an interval of width $0.25$ containing $\\alpha$. [3]\n(c) Use linear interpolation once on your interval to estimate $\\alpha$, to 3 decimal places. [3] [8 marks]",
[
"(a) $f(1)=-4$, $f(2)=5$",
"(a) Sign change (and $f$ continuous), so a root lies in $[1,2]$",
"(b) $f(1.5)=-0.625$, so $\\alpha\\in[1.5,2]$",
"(b) $f(1.75)=1.859\\ldots$",
"(b) $\\alpha\\in[1.5,1.75]$",
"(c) $\\dfrac{\\alpha-1.5}{0.625}=\\dfrac{1.75-\\alpha}{1.859}$",
"(c) Solves",
"(c) $\\alpha\\approx1.563$"
]
],
[
"w",
"WFM01",
2,
4,
"$g(x)=x^{3}-6x+2$\n(a) Show that $g(x)=0$ has a root $\\beta$ between $2$ and $3$. [2]\n(b) Using $x_{0}=2.3$, apply the Newton–Raphson method once to find $x_{1}$, to 4 decimal places. [5] [7 marks]",
[
"(a) $g(2)=-2$, $g(3)=11$",
"(a) Sign change, so a root between $2$ and $3$",
"(b) $g'(x)=3x^{2}-6$",
"(b) $g(2.3)=0.367$",
"(b) $g'(2.3)=9.87$",
"(b) $x_{1}=2.3-\\dfrac{0.367}{9.87}$",
"(b) $x_{1}=2.2628$"
]
],
[
"w",
"WFM01",
3,
4,
"The parabola $C$ has equation $y^{2}=12x$. The point $P(3t^{2},6t)$ lies on $C$.\n(a) Write down the coordinates of the focus and the equation of the directrix. [2]\n(b) Show that the normal to $C$ at $P$ has equation $y+tx=6t+3t^{3}$. [5]\n(c) The normal at the point where $t=2$ meets $C$ again at $Q$. Find the coordinates of $Q$. [3] [10 marks]",
[
"(a) Focus $(3,0)$",
"(a) Directrix $x=-3$",
"(b) $\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{6}{6t}=\\dfrac{1}{t}$",
"(b) Normal gradient $-t$",
"(b) $y-6t=-t(x-3t^{2})$",
"(b) Expands",
"(b) $y+tx=6t+3t^{3}$ ✓",
"(c) $t=2$: $y+2x=36$",
"(c) Substitutes $(3s^{2},6s)$: $s^{2}+s-6=0$, so $s=-3$",
"(c) $Q(27,-18)$"
]
],
[
"w",
"WFM01",
3,
4,
"The rectangular hyperbola $H$ has equation $xy=16$. The point $P\\left(4t,\\dfrac{4}{t}\\right)$ lies on $H$.\n(a) Show that the tangent to $H$ at $P$ has equation $x+t^{2}y=8t$. [4]\n(b) The tangent meets the $x$-axis at $A$ and the $y$-axis at $B$. Show that the area of triangle $OAB$ is the same for every $t$. [3] [7 marks]",
[
"(a) $y=\\dfrac{16}{x}$, so $\\dfrac{dy}{dx}=-\\dfrac{16}{x^{2}}$ (or parametric)",
"(a) At $P$: gradient $-\\dfrac{1}{t^{2}}$",
"(a) $y-\\dfrac{4}{t}=-\\dfrac{1}{t^{2}}(x-4t)$",
"(a) $x+t^{2}y=8t$ ✓",
"(b) $A(8t,0)$",
"(b) $B\\left(0,\\dfrac{8}{t}\\right)$",
"(b) Area $=\\dfrac{1}{2}\\times8t\\times\\dfrac{8}{t}=32$, independent of $t$"
]
],
[
"w",
"WFM01",
4,
4,
"$\\mathbf{A}=\\begin{pmatrix}3&1\\\\5&2\\end{pmatrix}$\n(a) Find $\\mathbf{A}^{-1}$. [3]\n(b) Hence solve $\\mathbf{A}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}4\\\\7\\end{pmatrix}$. [2]\n(c) $\\mathbf{B}=\\begin{pmatrix}k&2\\\\3&k-1\\end{pmatrix}$ is singular. Find the possible values of $k$. [2] [7 marks]",
[
"(a) $\\det\\mathbf{A}=6-5=1$",
"(a) Swaps and changes signs",
"(a) $\\mathbf{A}^{-1}=\\begin{pmatrix}2&-1\\\\-5&3\\end{pmatrix}$",
"(b) $\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\mathbf{A}^{-1}\\begin{pmatrix}4\\\\7\\end{pmatrix}$",
"(b) $x=1$, $y=1$",
"(c) $k(k-1)-6=0$",
"(c) $k=3$ or $k=-2$"
]
],
[
"w",
"WFM01",
4,
4,
"$\\mathbf{M}=\\begin{pmatrix}1&2\\\\2&-2\\end{pmatrix}$\n(a) Find $\\mathbf{M}^{2}$. [2]\n(b) Find constants $p$ and $q$ such that $\\mathbf{M}^{2}=p\\mathbf{M}+q\\mathbf{I}$. [4]\n(c) Hence show that $\\mathbf{M}^{-1}=\\dfrac{1}{6}(\\mathbf{M}+\\mathbf{I})$. [2] [8 marks]",
[
"(a) Correct method",
"(a) $\\begin{pmatrix}5&-2\\\\-2&8\\end{pmatrix}$",
"(b) Compares entries: $2p=-2$",
"(b) $p=-1$",
"(b) $5=p+q$",
"(b) $q=6$ (and checks $8=-2p\\ldots$: $8=2+6$ ✓)",
"(c) $\\mathbf{M}^{2}+\\mathbf{M}=6\\mathbf{I}$, so $\\mathbf{M}(\\mathbf{M}+\\mathbf{I})=6\\mathbf{I}$",
"(c) $\\mathbf{M}^{-1}=\\dfrac{1}{6}(\\mathbf{M}+\\mathbf{I})$"
]
],
[
"w",
"WFM01",
5,
4,
"$\\mathbf{R}$ represents a rotation of $90^{\\circ}$ anticlockwise about the origin and $\\mathbf{S}$ represents an enlargement, scale factor $3$, centre the origin.\n(a) Write down $\\mathbf{R}$ and $\\mathbf{S}$. [2]\n(b) Find the single matrix for $\\mathbf{R}$ followed by $\\mathbf{S}$. [1]\n(c) A triangle of area $5$ is transformed by this matrix. Find the area of the image. [2]\n(d) Find the point that is mapped onto $(6,-3)$. [2] [7 marks]",
[
"(a) $\\mathbf{R}=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$",
"(a) $\\mathbf{S}=\\begin{pmatrix}3&0\\\\0&3\\end{pmatrix}$",
"(b) $\\mathbf{SR}=\\begin{pmatrix}0&-3\\\\3&0\\end{pmatrix}$",
"(c) $\\det(\\mathbf{SR})=9$",
"(c) Area $=45$",
"(d) $(\\mathbf{SR})^{-1}=\\dfrac{1}{9}\\begin{pmatrix}0&3\\\\-3&0\\end{pmatrix}$",
"(d) $(-1,-2)$"
]
],
[
"w",
"WFM01",
5,
4,
"The transformation $T$ is represented by $\\mathbf{T}=\\begin{pmatrix}2&-1\\\\4&-2\\end{pmatrix}$.\n(a) Show that $T$ maps every point of the plane onto the line $y=2x$. [3]\n(b) Find the equation of the line of points mapped onto $(3,6)$. [2]\n(c) Explain why $\\mathbf{T}$ has no inverse. [1] [6 marks]",
[
"(a) $\\mathbf{T}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}2x-y\\\\4x-2y\\end{pmatrix}$",
"(a) $y'=4x-2y=2(2x-y)$",
"(a) $=2x'$, so every image is on $y=2x$",
"(b) $2x-y=3$",
"(b) $y=2x-3$",
"(c) $\\det\\mathbf{T}=-4+4=0$ (many points map to one point)"
]
],
[
"w",
"WFM01",
6,
4,
"(a) Use the standard results for $\\sum r$ and $\\sum r^{2}$ to show that $\\displaystyle\\sum_{r=1}^{n}r(r+1)=\\frac{n(n+1)(n+2)}{3}$. [4]\n(b) Hence find $\\displaystyle\\sum_{r=11}^{20}r(r+1)$. [3] [7 marks]",
[
"(a) $\\sum r^{2}+\\sum r$",
"(a) $\\dfrac{n(n+1)(2n+1)}{6}+\\dfrac{n(n+1)}{2}$",
"(a) Takes out $\\dfrac{n(n+1)}{6}$: $\\dfrac{n(n+1)}{6}(2n+4)$",
"(a) $=\\dfrac{n(n+1)(n+2)}{3}$",
"(b) $\\displaystyle\\sum_{1}^{20}-\\sum_{1}^{10}$",
"(b) $3080-440$",
"(b) $2640$"
]
],
[
"w",
"WFM01",
6,
4,
"(a) Show that $\\displaystyle\\sum_{r=1}^{n}(2r-1)^{2}=\\frac{n(2n-1)(2n+1)}{3}$. [5]\n(b) Find $n$ such that this sum is $1330$. [2] [7 marks]",
[
"(a) Expands: $4\\sum r^{2}-4\\sum r+\\sum1$",
"(a) $\\dfrac{4n(n+1)(2n+1)}{6}-2n(n+1)+n$",
"(a) Takes out a common factor $\\dfrac{n}{3}$",
"(a) $\\dfrac{n}{3}(4n^{2}-1)$",
"(a) $=\\dfrac{n(2n-1)(2n+1)}{3}$",
"(b) $4n^{3}-n=3990$",
"(b) $n=10$"
]
],
[
"w",
"WFM01",
7,
4,
"Prove by induction that, for all positive integers $n$, $\\displaystyle\\sum_{r=1}^{n}r\\,2^{r}=2+(n-1)2^{n+1}$. [6] [6 marks]",
[
"Base case $n=1$: LHS $=2$, RHS $=2+0=2$",
"Assumes true for $n=k$",
"Adds the next term: $2+(k-1)2^{k+1}+(k+1)2^{k+1}$",
"$=2+2k\\times2^{k+1}$",
"$=2+k\\times2^{k+2}$, the formula for $n=k+1$",
"Conclusion: true for $n=1$, and true for $k$ implies true for $k+1$, so true for all positive integers $n$"
]
],
[
"w",
"WFM01",
7,
4,
"Prove by induction that $7^{n}-3^{n}$ is divisible by $4$ for all positive integers $n$. [6] [6 marks]",
[
"Base case: $7-3=4$, divisible by $4$",
"Assumes $7^{k}-3^{k}=4m$ for some integer $m$",
"$7^{k+1}-3^{k+1}=7\\times7^{k}-3\\times3^{k}$",
"$=7(7^{k}-3^{k})+4\\times3^{k}$",
"$=28m+4\\times3^{k}$, divisible by $4$",
"Conclusion: true for $n=1$, and true for $k$ implies true for $k+1$, so true for all positive integers $n$"
]
],
[
"w",
"WFM02",
0,
4,
"(a) Solve the inequality $\\dfrac{x+3}{x-1}>2$. [5]\n(b) Solve $|x^{2}-4|<3x$. [4] [9 marks]",
[
"(a) Rearranges: $\\dfrac{x+3}{x-1}-2>0$ (or multiplies by $(x-1)^{2}$)",
"(a) $\\dfrac{5-x}{x-1}>0$",
"(a) Critical values $1$ and $5$",
"(a) Checks the sign in each region",
"(a) $1<x<5$",
"(b) $x^{2}-4<3x$ gives $-1<x<4$",
"(b) $-(x^{2}-4)<3x$ gives $x<-4$ or $x>1$",
"(b) Needs $3x>0$, so $x>0$",
"(b) $1<x<4$"
]
],
[
"w",
"WFM02",
0,
4,
"Solve the inequality $\\dfrac{2x}{x+1}\\le x$. [6] [6 marks]",
[
"Moves everything to one side: $x-\\dfrac{2x}{x+1}\\ge0$",
"$\\dfrac{x(x-1)}{x+1}\\ge0$",
"Critical values $-1$, $0$, $1$",
"Sign diagram or sketch",
"$-1<x\\le0$",
"$x\\ge1$"
]
],
[
"w",
"WFM02",
1,
4,
"(a) Express $\\dfrac{1}{r(r+2)}$ in partial fractions. [2]\n(b) Hence show that $\\displaystyle\\sum_{r=1}^{n}\\frac{1}{r(r+2)}=\\frac{3}{4}-\\frac{2n+3}{2(n+1)(n+2)}$. [5]\n(c) State the limit of the sum as $n\\to\\infty$. [1] [8 marks]",
[
"(a) $\\dfrac{1}{2}\\left(\\dfrac{1}{r}-\\dfrac{1}{r+2}\\right)$",
"(a) Correct constants",
"(b) Writes out several terms to show the cancelling",
"(b) Terms left: $1+\\dfrac{1}{2}$",
"(b) and $-\\dfrac{1}{n+1}-\\dfrac{1}{n+2}$",
"(b) $\\dfrac{1}{2}\\left(\\dfrac{3}{2}-\\dfrac{1}{n+1}-\\dfrac{1}{n+2}\\right)$",
"(b) Simplifies to the given result",
"(c) $\\dfrac{3}{4}$"
]
],
[
"w",
"WFM02",
1,
4,
"(a) Show that $r\\times r!=(r+1)!-r!$. [2]\n(b) Hence show that $\\displaystyle\\sum_{r=1}^{n}r\\times r!=(n+1)!-1$. [3]\n(c) Find $n$ such that the sum is $719$. [2] [7 marks]",
[
"(a) $(r+1)!=(r+1)\\times r!$",
"(a) $(r+1)r!-r!=r\\times r!$",
"(b) Method of differences: $(2!-1!)+(3!-2!)+\\ldots$",
"(b) Shows the cancelling",
"(b) $=(n+1)!-1$",
"(c) $(n+1)!=720=6!$",
"(c) $n=5$"
]
],
[
"w",
"WFM02",
2,
4,
"$z=1+\\sqrt{3}\\,\\mathrm{i}$\n(a) Write $z$ in modulus–argument form. [2]\n(b) Use de Moivre's theorem to find $z^{6}$. [2]\n(c) Solve $w^{3}=8\\mathrm{i}$, giving your answers in the form $a+b\\mathrm{i}$. [4] [8 marks]",
[
"(a) $|z|=2$, $\\arg z=\\dfrac{\\pi}{3}$",
"(a) $z=2\\left(\\cos\\dfrac{\\pi}{3}+\\mathrm{i}\\sin\\dfrac{\\pi}{3}\\right)$",
"(b) $z^{6}=2^{6}(\\cos2\\pi+\\mathrm{i}\\sin2\\pi)$",
"(b) $=64$",
"(c) $8\\mathrm{i}=8e^{\\mathrm{i}\\frac{\\pi}{2}}$, so $w=2e^{\\mathrm{i}\\left(\\frac{\\pi}{6}+\\frac{2k\\pi}{3}\\right)}$",
"(c) $\\sqrt{3}+\\mathrm{i}$",
"(c) $-\\sqrt{3}+\\mathrm{i}$",
"(c) $-2\\mathrm{i}$"
]
],
[
"w",
"WFM02",
2,
4,
"The point $P$ represents $z$ on an Argand diagram, and $|z-3\\mathrm{i}|=2|z|$.\n(a) Show that the locus of $P$ is a circle, and find its centre and radius. [5]\n(b) Show that the half-line $\\arg(z+2)=\\dfrac{\\pi}{4}$ does not meet this circle. [3] [8 marks]",
[
"(a) $x^{2}+(y-3)^{2}=4(x^{2}+y^{2})$",
"(a) $3x^{2}+3y^{2}+6y-9=0$",
"(a) $x^{2}+(y+1)^{2}=4$",
"(a) Centre $(0,-1)$",
"(a) Radius $2$",
"(b) The half-line is $y=x+2$, $x>-2$",
"(b) Substitutes: $2x^{2}+6x+5=0$",
"(b) Discriminant $36-40<0$, so no intersection"
]
],
[
"w",
"WFM02",
3,
4,
"Solve the differential equation $\\dfrac{dy}{dx}+\\dfrac{2y}{x}=x^{2}$, $x>0$, given that $y=1$ when $x=1$. [7] [7 marks]",
[
"Integrating factor $e^{\\int\\frac{2}{x}dx}$",
"$=x^{2}$",
"$\\dfrac{d}{dx}\\left(x^{2}y\\right)=x^{4}$",
"$x^{2}y=\\dfrac{x^{5}}{5}+c$",
"$y=\\dfrac{x^{3}}{5}+\\dfrac{c}{x^{2}}$",
"Uses $x=1$, $y=1$: $c=\\dfrac{4}{5}$",
"$y=\\dfrac{x^{3}}{5}+\\dfrac{4}{5x^{2}}$"
]
],
[
"w",
"WFM02",
3,
4,
"Find the general solution of $\\dfrac{dy}{dx}-y\\tan x=\\cos x$, $0<x<\\dfrac{\\pi}{2}$, giving $y$ in terms of $x$. [6] [6 marks]",
[
"Integrating factor $e^{-\\int\\tan x\\,dx}=e^{\\ln\\cos x}$",
"$=\\cos x$",
"$\\dfrac{d}{dx}(y\\cos x)=\\cos^{2}x$",
"$\\displaystyle\\int\\cos^{2}x\\,dx=\\frac{x}{2}+\\frac{\\sin2x}{4}$",
"$+c$",
"$y=\\dfrac{1}{\\cos x}\\left(\\dfrac{x}{2}+\\dfrac{\\sin2x}{4}+c\\right)$"
]
],
[
"w",
"WFM02",
4,
4,
"Find the general solution of $\\dfrac{d^{2}y}{dx^{2}}-5\\dfrac{dy}{dx}+6y=12x$. [7] [7 marks]",
[
"Auxiliary equation $m^{2}-5m+6=0$",
"$m=2,\\ 3$",
"Complementary function $Ae^{2x}+Be^{3x}$",
"Particular integral $y=ax+b$",
"$-5a+6(ax+b)=12x$",
"$a=2$, $b=\\dfrac{5}{3}$",
"$y=Ae^{2x}+Be^{3x}+2x+\\dfrac{5}{3}$"
]
],
[
"w",
"WFM02",
4,
4,
"Solve $\\dfrac{d^{2}y}{dx^{2}}+4y=8$, given that $y=0$ and $\\dfrac{dy}{dx}=4$ when $x=0$. [7] [7 marks]",
[
"Auxiliary equation $m^{2}+4=0$, $m=\\pm2\\mathrm{i}$",
"Complementary function $A\\cos2x+B\\sin2x$",
"Particular integral $y=2$",
"General solution $y=A\\cos2x+B\\sin2x+2$",
"$y(0)=0$: $A=-2$",
"$y'(0)=4$: $2B=4$, so $B=2$",
"$y=2-2\\cos2x+2\\sin2x$"
]
],
[
"w",
"WFM02",
5,
4,
"(a) Find the Maclaurin series of $e^{x}\\sin x$ up to and including the term in $x^{3}$. [5]\n(b) Use your series to estimate $e^{0.1}\\sin0.1$, to 6 decimal places. [1] [6 marks]",
[
"(a) Uses $e^{x}=1+x+\\dfrac{x^{2}}{2}+\\ldots$ and $\\sin x=x-\\dfrac{x^{3}}{6}+\\ldots$ (or differentiates)",
"(a) Multiplies the series",
"(a) $x$",
"(a) $+x^{2}$",
"(a) $+\\dfrac{x^{3}}{3}$",
"(b) $0.1+0.01+0.000333=0.110333$"
]
],
[
"w",
"WFM02",
5,
4,
"(a) Find the Taylor series of $\\ln x$ about $x=1$ up to and including the term in $(x-1)^{3}$. [4]\n(b) Use it to estimate $\\ln1.1$, to 5 decimal places. [2] [6 marks]",
[
"(a) $f(1)=0$, $f'(1)=1$",
"(a) $f''(1)=-1$, $f'''(1)=2$",
"(a) Uses $f(1)+f'(1)(x-1)+\\dfrac{f''(1)}{2!}(x-1)^{2}+\\ldots$",
"(a) $(x-1)-\\dfrac{(x-1)^{2}}{2}+\\dfrac{(x-1)^{3}}{3}$",
"(b) $0.1-0.005+0.000333$",
"(b) $0.09533$"
]
],
[
"w",
"WFM02",
6,
4,
"The curve $C$ has polar equation $r=2(1+\\cos\\theta)$, $0\\le\\theta<2\\pi$.\n(a) Sketch $C$. [1]\n(b) Find the exact area enclosed by $C$. [6] [7 marks]",
[
"(a) Cardioid shape through the pole, with $r=4$ at $\\theta=0$",
"(b) Area $=\\dfrac{1}{2}\\displaystyle\\int_{0}^{2\\pi}4(1+\\cos\\theta)^{2}d\\theta$",
"(b) Expands: $1+2\\cos\\theta+\\cos^{2}\\theta$",
"(b) Uses $\\cos^{2}\\theta=\\dfrac{1}{2}(1+\\cos2\\theta)$",
"(b) Integrates correctly",
"(b) Uses limits",
"(b) $6\\pi$"
]
],
[
"w",
"WFM02",
6,
4,
"The curve $C$ has polar equation $r=4\\cos\\theta$, $-\\dfrac{\\pi}{2}<\\theta\\le\\dfrac{\\pi}{2}$.\n(a) Find a Cartesian equation of $C$ and describe the curve. [3]\n(b) Find the polar coordinates of the points where $C$ meets the circle $r=2$. [2]\n(c) Find the exact area of the region of $C$ for which $-\\dfrac{\\pi}{4}\\le\\theta\\le\\dfrac{\\pi}{4}$. [3] [8 marks]",
[
"(a) $r^{2}=4r\\cos\\theta$",
"(a) $x^{2}+y^{2}=4x$",
"(a) Circle centre $(2,0)$, radius $2$",
"(b) $4\\cos\\theta=2$",
"(b) $\\left(2,\\dfrac{\\pi}{3}\\right)$ and $\\left(2,-\\dfrac{\\pi}{3}\\right)$",
"(c) $\\dfrac{1}{2}\\displaystyle\\int_{-\\frac{\\pi}{4}}^{\\frac{\\pi}{4}}16\\cos^{2}\\theta\\,d\\theta$",
"(c) $=4\\left[\\theta+\\dfrac{1}{2}\\sin2\\theta\\right]_{-\\frac{\\pi}{4}}^{\\frac{\\pi}{4}}$",
"(c) $=2\\pi+4$"
]
],
[
"w",
"WFM03",
0,
4,
"(a) Using the definitions of $\\cosh x$ and $\\sinh x$ in terms of exponentials, prove that $\\cosh^{2}x-\\sinh^{2}x\\equiv1$. [3]\n(b) Solve $2\\cosh x-\\sinh x=2$, giving your answers in exact form. [5] [8 marks]",
[
"(a) $\\cosh^{2}x=\\dfrac{e^{2x}+2+e^{-2x}}{4}$",
"(a) $\\sinh^{2}x=\\dfrac{e^{2x}-2+e^{-2x}}{4}$",
"(a) Subtracts to get $1$",
"(b) $(e^{x}+e^{-x})-\\dfrac{1}{2}(e^{x}-e^{-x})=2$",
"(b) $e^{x}+3e^{-x}=4$",
"(b) $e^{2x}-4e^{x}+3=0$",
"(b) $(e^{x}-1)(e^{x}-3)=0$",
"(b) $x=0$ or $x=\\ln3$"
]
],
[
"w",
"WFM03",
0,
4,
"(a) Show that $\\operatorname{artanh}x=\\dfrac{1}{2}\\ln\\left(\\dfrac{1+x}{1-x}\\right)$, $|x|<1$. [4]\n(b) Solve $\\operatorname{arsinh}x=\\ln3$. [2] [6 marks]",
[
"(a) Lets $y=\\operatorname{artanh}x$, so $x=\\tanh y=\\dfrac{e^{2y}-1}{e^{2y}+1}$",
"(a) $x(e^{2y}+1)=e^{2y}-1$",
"(a) $e^{2y}=\\dfrac{1+x}{1-x}$",
"(a) $y=\\dfrac{1}{2}\\ln\\left(\\dfrac{1+x}{1-x}\\right)$",
"(b) $x=\\sinh(\\ln3)=\\dfrac{3-\\frac{1}{3}}{2}$",
"(b) $x=\\dfrac{4}{3}$"
]
],
[
"w",
"WFM03",
1,
4,
"The ellipse $E$ has equation $\\dfrac{x^{2}}{25}+\\dfrac{y^{2}}{9}=1$.\n(a) Find the eccentricity of $E$, the coordinates of its foci and the equations of its directrices. [4]\n(b) Show that the tangent to $E$ at $P(5\\cos\\theta,3\\sin\\theta)$ has equation $\\dfrac{x\\cos\\theta}{5}+\\dfrac{y\\sin\\theta}{3}=1$. [4] [8 marks]",
[
"(a) $b^{2}=a^{2}(1-e^{2})$: $9=25(1-e^{2})$",
"(a) $e=\\dfrac{4}{5}$",
"(a) Foci $(\\pm4,0)$",
"(a) Directrices $x=\\pm\\dfrac{25}{4}$",
"(b) $\\dfrac{dy}{dx}=\\dfrac{3\\cos\\theta}{-5\\sin\\theta}$",
"(b) $y-3\\sin\\theta=-\\dfrac{3\\cos\\theta}{5\\sin\\theta}(x-5\\cos\\theta)$",
"(b) Multiplies out and uses $\\sin^{2}\\theta+\\cos^{2}\\theta=1$",
"(b) Obtains the given equation"
]
],
[
"w",
"WFM03",
1,
4,
"The hyperbola $H$ has equation $\\dfrac{x^{2}}{16}-\\dfrac{y^{2}}{9}=1$.\n(a) Find the eccentricity, the coordinates of the foci and the equations of the asymptotes. [4]\n(b) Show that $(4\\cosh u,\\,3\\sinh u)$ lies on $H$ for every $u$. [1]\n(c) Write down the equations of the directrices. [1] [6 marks]",
[
"(a) $b^{2}=a^{2}(e^{2}-1)$: $9=16(e^{2}-1)$",
"(a) $e=\\dfrac{5}{4}$",
"(a) Foci $(\\pm5,0)$",
"(a) Asymptotes $y=\\pm\\dfrac{3}{4}x$",
"(b) $\\cosh^{2}u-\\sinh^{2}u=1$ ✓",
"(c) $x=\\pm\\dfrac{16}{5}$"
]
],
[
"w",
"WFM03",
2,
4,
"Differentiate with respect to $x$:\n(a) $\\arcsin(2x)$ [3]   (b) $\\arctan(e^{x})$ [2]   (c) $\\operatorname{arcosh}(3x)$ [2] [7 marks]",
[
"(a) Uses the chain rule with $\\dfrac{d}{du}\\arcsin u=\\dfrac{1}{\\sqrt{1-u^{2}}}$",
"(a) $\\dfrac{1}{\\sqrt{1-4x^{2}}}\\times2$",
"(a) $\\dfrac{2}{\\sqrt{1-4x^{2}}}$",
"(b) $\\dfrac{1}{1+e^{2x}}\\times e^{x}$",
"(b) $\\dfrac{e^{x}}{1+e^{2x}}$",
"(c) $\\dfrac{1}{\\sqrt{9x^{2}-1}}\\times3$",
"(c) $\\dfrac{3}{\\sqrt{9x^{2}-1}}$"
]
],
[
"w",
"WFM03",
2,
4,
"(a) Find $\\displaystyle\\int\\frac{1}{\\sqrt{x^{2}+4x+13}}\\,dx$. [4]\n(b) Find the exact value of $\\displaystyle\\int_{0}^{\\frac{1}{2}}\\frac{1}{\\sqrt{1-x^{2}}}\\,dx$. [2] [6 marks]",
[
"(a) Completes the square: $(x+2)^{2}+9$",
"(a) Recognises the $\\operatorname{arsinh}$ form",
"(a) $\\operatorname{arsinh}\\left(\\dfrac{x+2}{3}\\right)$",
"(a) $+c$",
"(b) $\\left[\\arcsin x\\right]_{0}^{\\frac{1}{2}}$",
"(b) $=\\dfrac{\\pi}{6}$"
]
],
[
"w",
"WFM03",
3,
4,
"$I_{n}=\\displaystyle\\int_{0}^{1}x^{n}e^{x}\\,dx$, $n\\ge0$\n(a) Show that $I_{n}=e-nI_{n-1}$ for $n\\ge1$. [4]\n(b) Hence find the exact value of $I_{3}$. [3] [7 marks]",
[
"(a) Integrates by parts with $u=x^{n}$, $\\dfrac{dv}{dx}=e^{x}$",
"(a) $\\left[x^{n}e^{x}\\right]_{0}^{1}-n\\displaystyle\\int_{0}^{1}x^{n-1}e^{x}dx$",
"(a) $\\left[x^{n}e^{x}\\right]_{0}^{1}=e$",
"(a) $I_{n}=e-nI_{n-1}$",
"(b) $I_{0}=e-1$, $I_{1}=1$",
"(b) $I_{2}=e-2$",
"(b) $I_{3}=e-3(e-2)=6-2e$"
]
],
[
"w",
"WFM03",
3,
4,
"Find the exact length of the curve $y=\\cosh x$ from $x=0$ to $x=\\ln2$. [5] [5 marks]",
[
"Uses $s=\\displaystyle\\int\\sqrt{1+\\left(\\frac{dy}{dx}\\right)^{2}}\\,dx$",
"$\\dfrac{dy}{dx}=\\sinh x$, and $1+\\sinh^{2}x=\\cosh^{2}x$",
"$s=\\displaystyle\\int_{0}^{\\ln2}\\cosh x\\,dx=\\left[\\sinh x\\right]_{0}^{\\ln2}$",
"$\\sinh(\\ln2)=\\dfrac{2-\\frac{1}{2}}{2}$",
"$=\\dfrac{3}{4}$"
]
],
[
"w",
"WFM03",
4,
4,
"The plane $\\Pi$ contains the points $A(1,0,2)$, $B(3,1,1)$ and $C(2,-1,4)$.\n(a) Find a vector normal to $\\Pi$. [3]\n(b) Find a Cartesian equation of $\\Pi$. [2]\n(c) Find the perpendicular distance from the origin to $\\Pi$, to 3 significant figures. [2] [7 marks]",
[
"(a) $\\overrightarrow{AB}=(2,1,-1)$, $\\overrightarrow{AC}=(1,-1,2)$",
"(a) Uses the cross product",
"(a) $\\mathbf{n}=(1,-5,-3)$",
"(b) $x-5y-3z=d$ with $A$: $d=1-0-6$",
"(b) $x-5y-3z+5=0$",
"(c) $\\dfrac{|5|}{\\sqrt{1+25+9}}=\\dfrac{5}{\\sqrt{35}}$",
"(c) $0.845$"
]
],
[
"w",
"WFM03",
4,
4,
"The line $l$ has equation $\\mathbf{r}=(\\mathbf{i}+2\\mathbf{j}+3\\mathbf{k})+t(2\\mathbf{i}+\\mathbf{j}-\\mathbf{k})$ and the plane $\\Pi$ has equation $2x-y+z=9$.\n(a) Find the coordinates of the point where $l$ meets $\\Pi$. [3]\n(b) Find the acute angle between $l$ and $\\Pi$, to one decimal place. [3] [6 marks]",
[
"(a) $2(1+2t)-(2+t)+(3-t)=9$",
"(a) $t=3$",
"(a) $(7,5,0)$",
"(b) $\\sin\\phi=\\dfrac{|(2,1,-1)\\cdot(2,-1,1)|}{\\sqrt{6}\\sqrt{6}}$",
"(b) $=\\dfrac{2}{6}$",
"(b) $\\phi=19.5^{\\circ}$"
]
],
[
"w",
"WFM03",
5,
4,
"$\\mathbf{M}=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$\n(a) Find the eigenvalues of $\\mathbf{M}$. [3]\n(b) Find a corresponding eigenvector for each eigenvalue. [3]\n(c) Write down a matrix $\\mathbf{P}$ and a diagonal matrix $\\mathbf{D}$ such that $\\mathbf{M}=\\mathbf{P}\\mathbf{D}\\mathbf{P}^{-1}$. [2] [8 marks]",
[
"(a) $\\det(\\mathbf{M}-\\lambda\\mathbf{I})=(4-\\lambda)(3-\\lambda)-2$",
"(a) $\\lambda^{2}-7\\lambda+10=0$",
"(a) $\\lambda=2,\\ 5$",
"(b) Solves $(\\mathbf{M}-2\\mathbf{I})\\mathbf{x}=\\mathbf{0}$",
"(b) $\\lambda=2$: $\\begin{pmatrix}1\\\\-2\\end{pmatrix}$",
"(b) $\\lambda=5$: $\\begin{pmatrix}1\\\\1\\end{pmatrix}$",
"(c) $\\mathbf{P}=\\begin{pmatrix}1&1\\\\-2&1\\end{pmatrix}$",
"(c) $\\mathbf{D}=\\begin{pmatrix}2&0\\\\0&5\\end{pmatrix}$ (columns in the matching order)"
]
],
[
"w",
"WFM03",
5,
4,
"$\\mathbf{A}=\\begin{pmatrix}1&2&0\\\\0&1&k\\\\2&0&1\\end{pmatrix}$\n(a) Find $\\det\\mathbf{A}$ in terms of $k$, and the value of $k$ for which $\\mathbf{A}$ is singular. [2]\n(b) For $k=1$, find $\\mathbf{A}^{-1}$. [4] [6 marks]",
[
"(a) $\\det\\mathbf{A}=1(1)-2(0-2k)=1+4k$",
"(a) Singular when $k=-\\dfrac{1}{4}$",
"(b) $\\det\\mathbf{A}=5$",
"(b) Finds the matrix of cofactors",
"(b) Transposes and divides by $5$",
"(b) $\\mathbf{A}^{-1}=\\dfrac{1}{5}\\begin{pmatrix}1&-2&2\\\\2&1&-1\\\\-2&4&1\\end{pmatrix}$"
]
]
];
  D.forEach(r => out.push({ id: id(r[1], r[2]), u: r[1], t: r[2], d: r[3], type: "w", q: r[4], ms: r[5], m: r[5].length }));
  return out;
})();
