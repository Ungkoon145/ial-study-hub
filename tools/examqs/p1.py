# Exam-style questions for Pure Mathematics 1 (WMA11), written for IAL Revise (not Pearson questions).
# Every answer was checked with sympy (see /tmp/check_p1.py). Row: (unit, topic index, question, [mark points])
U = 'WMA11'
Q = [
 (0, r"(a) Write $\sqrt{75}+\sqrt{48}$ in the form $a\sqrt{3}$, where $a$ is an integer. [2]" "\n"
     r"(b) Hence write $\dfrac{\sqrt{75}+\sqrt{48}}{2+\sqrt{3}}$ in the form $p\sqrt{3}+q$, where $p$ and $q$ are integers. [3]" "\n"
     r"(c) Solve $\sqrt{3}\,x+5=\sqrt{75}$, giving your answer in the form $m+n\sqrt{3}$, where $m$ and $n$ are rational. [2] [7 marks]",
  [r"(a) $\sqrt{75}=5\sqrt{3}$ and $\sqrt{48}=4\sqrt{3}$",
   r"(a) $9\sqrt{3}$",
   r"(b) Multiplies top and bottom by $2-\sqrt{3}$",
   r"(b) Denominator $(2+\sqrt{3})(2-\sqrt{3})=4-3=1$",
   r"(b) $9\sqrt{3}(2-\sqrt{3})=18\sqrt{3}-27$, so $p=18$, $q=-27$",
   r"(c) $\sqrt{3}\,x=5\sqrt{3}-5$, so $x=5-\dfrac{5}{\sqrt{3}}$",
   r"(c) Rationalises: $x=5-\dfrac{5}{3}\sqrt{3}$"]),
 (0, r"(a) Given that $y=2^{x}$, write $4^{x}$ and $2^{x+1}$ in terms of $y$. [2]" "\n"
     r"(b) Hence solve $4^{x}-5\times2^{x+1}+16=0$. [5] [7 marks]",
  [r"(a) $4^{x}=(2^{2})^{x}=y^{2}$",
   r"(a) $2^{x+1}=2\times2^{x}=2y$",
   r"(b) Substitutes: $y^{2}-10y+16=0$",
   r"(b) Factorises: $(y-2)(y-8)=0$",
   r"(b) $y=2$ or $y=8$",
   r"(b) $2^{x}=2$ gives $x=1$",
   r"(b) $2^{x}=8$ gives $x=3$"]),
 (1, r"$f(x)=2x^{2}-12x+23$" "\n"
     r"(a) Write $f(x)$ in the form $a(x+b)^{2}+c$, where $a$, $b$ and $c$ are integers. [3]" "\n"
     r"(b) State the coordinates of the minimum point of $y=f(x)$. [1]" "\n"
     r"(c) Explain why $f(x)>0$ for all real values of $x$. [1]" "\n"
     r"(d) Find the set of values of $k$ for which $f(x)=k$ has two distinct real roots. [3] [8 marks]",
  [r"(a) $2(x^{2}-6x)+23$", r"(a) $2(x-3)^{2}-18+23$", r"(a) $2(x-3)^{2}+5$",
   r"(b) $(3,5)$",
   r"(c) $2(x-3)^{2}\ge0$, so $f(x)\ge5>0$",
   r"(d) Uses $b^{2}-4ac>0$ with $2x^{2}-12x+(23-k)=0$: $144-8(23-k)>0$",
   r"(d) Simplifies: $8k-40>0$",
   r"(d) $k>5$"]),
 (1, r"The equation $kx^{2}+(k+3)x+4=0$, where $k\neq0$, has equal roots." "\n"
     r"(a) Show that $k^{2}-10k+9=0$. [2]" "\n"
     r"(b) Hence find the possible values of $k$. [2]" "\n"
     r"(c) For the smaller value of $k$, find the repeated root of the equation. [1]" "\n"
     r"(d) Find the set of values of $k$ for which the equation has no real roots. [2] [7 marks]",
  [r"(a) Uses $b^{2}-4ac=0$: $(k+3)^{2}-4\times k\times4=0$",
   r"(a) $k^{2}+6k+9-16k=0$, so $k^{2}-10k+9=0$",
   r"(b) $(k-1)(k-9)=0$", r"(b) $k=1$ or $k=9$",
   r"(c) $x^{2}+4x+4=0$, so $x=-2$",
   r"(d) Needs $k^{2}-10k+9<0$, critical values $1$ and $9$",
   r"(d) $1<k<9$"]),
 (2, r"(a) Solve the simultaneous equations" "\n" r"$y=2x-3$" "\n" r"$x^{2}+xy+y^{2}=7$ [6]" "\n"
     r"(b) Find the set of values of $x$ for which both $2x-3<x+1$ and $x^{2}-4x<0$. [3] [9 marks]",
  [r"(a) Substitutes: $x^{2}+x(2x-3)+(2x-3)^{2}=7$",
   r"(a) Simplifies to $7x^{2}-15x+2=0$",
   r"(a) Factorises: $(7x-1)(x-2)=0$",
   r"(a) $x=2$ or $x=\dfrac{1}{7}$",
   r"(a) $x=2$, $y=1$",
   r"(a) $x=\dfrac{1}{7}$, $y=-\dfrac{19}{7}$",
   r"(b) First inequality: $x<4$",
   r"(b) $x(x-4)<0$, critical values $0$ and $4$, so $0<x<4$",
   r"(b) Both: $0<x<4$"]),
 (2, r"The curve $C$ has equation $y=x^{2}-5x+4$ and the line $l$ has equation $y=2x-6$." "\n"
     r"(a) Find the coordinates of the points where $l$ meets $C$. [4]" "\n"
     r"(b) Hence find the set of values of $x$ for which $C$ lies below $l$. [2]" "\n"
     r"(c) Find the set of values of $x$ for which $x^{2}-5x+4>0$. [2] [8 marks]",
  [r"(a) $x^{2}-5x+4=2x-6$, so $x^{2}-7x+10=0$",
   r"(a) $(x-2)(x-5)=0$",
   r"(a) $(2,-2)$", r"(a) $(5,4)$",
   r"(b) Needs $x^{2}-7x+10<0$", r"(b) $2<x<5$",
   r"(c) $(x-1)(x-4)>0$, critical values $1$ and $4$", r"(c) $x<1$ or $x>4$"]),
 (3, r"$f(x)=x(x-3)^{2}$" "\n"
     r"(a) Sketch the curve $y=f(x)$, showing the coordinates of the points where it meets the coordinate axes. [3]" "\n"
     r"(b) On the same axes, sketch $y=\dfrac{2}{x}$ and hence state the number of real solutions of $x^{2}(x-3)^{2}=2$. [3]" "\n"
     r"(c) The curve $y=f(x)$ is translated to give $y=f(x+2)$. Find the coordinates of the points where this curve meets the $x$-axis. [2] [8 marks]",
  [r"(a) Positive cubic shape (bottom left to top right)",
   r"(a) Passes through the origin $(0,0)$",
   r"(a) Touches the $x$-axis at $(3,0)$ (repeated root)",
   r"(b) Reciprocal curve in the first and third quadrants",
   r"(b) Explains $x(x-3)^{2}=\dfrac{2}{x}$ is the same as $x^{2}(x-3)^{2}=2$ (with $x\neq0$)",
   r"(b) $4$ intersections, so $4$ real solutions",
   r"(c) $(-2,0)$", r"(c) $(1,0)$"]),
 (3, r"The point $P(4,-6)$ lies on the curve $y=f(x)$. State the coordinates of the image of $P$ on" "\n"
     r"(a) $y=f(2x)$ [1]   (b) $y=3f(x)$ [1]   (c) $y=f(x)+5$ [1]   (d) $y=-f(x-1)$ [2]" "\n"
     r"(e) The curve $y=\dfrac{1}{x-2}+3$. State the equations of its asymptotes and find where it crosses the $y$-axis. [3] [8 marks]",
  [r"(a) $(2,-6)$", r"(b) $(4,-18)$", r"(c) $(4,-1)$",
   r"(d) Translates $1$ right: $x=5$", r"(d) Reflects in the $x$-axis: $(5,6)$",
   r"(e) Vertical asymptote $x=2$", r"(e) Horizontal asymptote $y=3$",
   r"(e) $x=0$: $y=-\dfrac{1}{2}+3$, so $\left(0,\dfrac{5}{2}\right)$"]),
 (4, r"The points $A$ and $B$ have coordinates $(-1,4)$ and $(5,-2)$." "\n"
     r"(a) Find the gradient of $AB$. [1]" "\n"
     r"(b) Find an equation of the perpendicular bisector of $AB$, giving your answer in the form $ax+by+c=0$. [4]" "\n"
     r"(c) The perpendicular bisector meets the $y$-axis at $C$. Find the area of triangle $ABC$. [4] [9 marks]",
  [r"(a) $\dfrac{-2-4}{5-(-1)}=-1$",
   r"(b) Midpoint of $AB$ is $(2,1)$",
   r"(b) Perpendicular gradient is $1$",
   r"(b) $y-1=1(x-2)$",
   r"(b) $x-y-1=0$",
   r"(c) $C=(0,-1)$",
   r"(c) Uses a correct method, e.g. $AB=6\sqrt{2}$ and height $MC=2\sqrt{2}$ where $M(2,1)$",
   r"(c) Area $=\dfrac{1}{2}\times6\sqrt{2}\times2\sqrt{2}$",
   r"(c) $=12$"]),
 (4, r"The line $l_{1}$ has equation $2x+3y=12$. The line $l_{2}$ has equation $y=3x-7$." "\n"
     r"(a) Find the coordinates of $P$, where $l_{1}$ and $l_{2}$ meet. [3]" "\n"
     r"(b) $l_{1}$ meets the $x$-axis at $Q$ and $l_{2}$ meets the $x$-axis at $R$. Find the area of triangle $PQR$. [4]" "\n"
     r"(c) The line $l_{3}$ passes through $P$ and is perpendicular to $l_{1}$. Show that $l_{3}$ passes through $(5,5)$. [2] [9 marks]",
  [r"(a) Substitutes: $2x+3(3x-7)=12$", r"(a) $11x=33$, so $x=3$", r"(a) $P(3,2)$",
   r"(b) $Q=(6,0)$", r"(b) $R=\left(\dfrac{7}{3},0\right)$",
   r"(b) Base $QR=6-\dfrac{7}{3}=\dfrac{11}{3}$, height $2$",
   r"(b) Area $=\dfrac{11}{3}$",
   r"(c) Gradient of $l_{1}$ is $-\dfrac{2}{3}$, so gradient of $l_{3}$ is $\dfrac{3}{2}$",
   r"(c) $y-2=\dfrac{3}{2}(x-3)$; when $x=5$, $y=5$ ✓"]),
 (5, r"In triangle $ABC$, $AB=7\text{ cm}$, $BC=8\text{ cm}$ and $AC=13\text{ cm}$." "\n"
     r"(a) Show that angle $ABC=120^{\circ}$. [3]" "\n"
     r"(b) Find the exact area of the triangle. [2]" "\n"
     r"(c) Find angle $BAC$, giving your answer to one decimal place. [3] [8 marks]",
  [r"(a) Uses the cosine rule: $\cos B=\dfrac{7^{2}+8^{2}-13^{2}}{2\times7\times8}$",
   r"(a) $\cos B=\dfrac{-56}{112}=-\dfrac{1}{2}$", r"(a) $B=120^{\circ}$",
   r"(b) $\dfrac{1}{2}\times7\times8\times\sin120^{\circ}$", r"(b) $14\sqrt{3}\text{ cm}^{2}$",
   r"(c) Uses the sine rule: $\dfrac{\sin A}{8}=\dfrac{\sin120^{\circ}}{13}$",
   r"(c) $\sin A=0.5329\ldots$", r"(c) $A=32.2^{\circ}$ (acute, because $B$ is obtuse)"]),
 (5, r"A ship sails $12\text{ km}$ from port $P$ on a bearing of $060^{\circ}$ to $Q$. It then sails $9\text{ km}$ on a bearing of $150^{\circ}$ to $R$." "\n"
     r"(a) Show that angle $PQR=90^{\circ}$. [2]" "\n"
     r"(b) Find the distance $PR$. [2]" "\n"
     r"(c) Find the bearing of $R$ from $P$, to one decimal place. [4] [8 marks]",
  [r"(a) Bearing of $P$ from $Q$ is $240^{\circ}$",
   r"(a) $240^{\circ}-150^{\circ}=90^{\circ}$",
   r"(b) $PR^{2}=12^{2}+9^{2}=225$", r"(b) $PR=15\text{ km}$",
   r"(c) Uses $\tan(\angle QPR)=\dfrac{9}{12}$ (or sine or cosine)",
   r"(c) $\angle QPR=36.87^{\circ}$",
   r"(c) Adds to $60^{\circ}$",
   r"(c) Bearing $096.9^{\circ}$"]),
 (6, r"The sector $OAB$ of a circle with centre $O$ has radius $6\text{ cm}$ and angle $\theta$ radians. The perimeter of the sector is $20\text{ cm}$." "\n"
     r"(a) Show that $\theta=\dfrac{4}{3}$. [2]" "\n"
     r"(b) Find the area of the sector. [2]" "\n"
     r"(c) Find the area of the segment between the chord $AB$ and the arc $AB$, to 3 significant figures. [4] [8 marks]",
  [r"(a) $6+6+6\theta=20$", r"(a) $6\theta=8$, so $\theta=\dfrac{4}{3}$",
   r"(b) $\dfrac{1}{2}\times6^{2}\times\dfrac{4}{3}$", r"(b) $24\text{ cm}^{2}$",
   r"(c) Triangle $OAB$: $\dfrac{1}{2}\times6^{2}\times\sin\dfrac{4}{3}$ (calculator in radians)",
   r"(c) $=17.49\ldots$",
   r"(c) Segment $=24-17.49\ldots$",
   r"(c) $=6.51\text{ cm}^{2}$"]),
 (6, r"A sector of a circle has area $48\text{ cm}^{2}$ and arc length $12\text{ cm}$." "\n"
     r"(a) Find the radius $r$ and the angle $\theta$ of the sector, in radians. [4]" "\n"
     r"(b) Find the perimeter of the triangle formed by the two radii and the chord, to 3 significant figures. [3] [7 marks]",
  [r"(a) $\dfrac{1}{2}r^{2}\theta=48$ and $r\theta=12$",
   r"(a) Substitutes: $\dfrac{1}{2}r\times12=48$",
   r"(a) $r=8\text{ cm}$", r"(a) $\theta=1.5$",
   r"(b) Chord $=2\times8\times\sin0.75$ (or cosine rule)",
   r"(b) Chord $=10.9\text{ cm}$",
   r"(b) Perimeter $=26.9\text{ cm}$"]),
 (7, r"The curve $C$ has equation $y=x^{3}-4x^{2}+5x-2$." "\n"
     r"(a) Find $\dfrac{dy}{dx}$. [2]" "\n"
     r"(b) Find an equation of the tangent to $C$ at the point where $x=2$. [3]" "\n"
     r"(c) Find the $x$-coordinates of the points on $C$ where the gradient is zero. [2]" "\n"
     r"(d) Find an equation of the normal to $C$ at the point where $x=0$, giving your answer in the form $ax+by+c=0$. [2] [9 marks]",
  [r"(a) Two terms correct", r"(a) $3x^{2}-8x+5$",
   r"(b) $y=8-16+10-2=0$", r"(b) Gradient $=12-16+5=1$", r"(b) $y=x-2$",
   r"(c) $3x^{2}-8x+5=0$, so $(3x-5)(x-1)=0$", r"(c) $x=1$ or $x=\dfrac{5}{3}$",
   r"(d) At $(0,-2)$ the gradient is $5$, so the normal gradient is $-\dfrac{1}{5}$",
   r"(d) $x+5y+10=0$"]),
 (7, r"$f(x)=\dfrac{x^{2}+4}{\sqrt{x}}$, $x>0$" "\n"
     r"(a) Write $f(x)$ as a sum of powers of $x$. [2]" "\n"
     r"(b) Find $f'(x)$. [2]" "\n"
     r"(c) The point $P$ on the curve $y=f(x)$ has $x$-coordinate $4$. Find an equation of the tangent at $P$, in the form $ax+by+c=0$. [4] [8 marks]",
  [r"(a) $x^{\frac{3}{2}}$", r"(a) $+4x^{-\frac{1}{2}}$",
   r"(b) $\dfrac{3}{2}x^{\frac{1}{2}}$", r"(b) $-2x^{-\frac{3}{2}}$",
   r"(c) $f(4)=\dfrac{20}{2}=10$",
   r"(c) $f'(4)=3-\dfrac{2}{8}=\dfrac{11}{4}$",
   r"(c) $y-10=\dfrac{11}{4}(x-4)$",
   r"(c) $11x-4y-4=0$"]),
 (8, r"(a) Find $\displaystyle\int\left(6x^{2}-\frac{4}{x^{3}}+3\sqrt{x}\right)dx$. [4]" "\n"
     r"(b) A curve has $\dfrac{dy}{dx}=6x^{2}-\dfrac{4}{x^{3}}+3\sqrt{x}$ and passes through $(1,5)$. Find $y$ in terms of $x$. [3] [7 marks]",
  [r"(a) $2x^{3}$", r"(a) $+2x^{-2}$", r"(a) $+2x^{\frac{3}{2}}$", r"(a) $+c$",
   r"(b) Substitutes $(1,5)$: $2+2+2+c=5$", r"(b) $c=-1$",
   r"(b) $y=2x^{3}+\dfrac{2}{x^{2}}+2x^{\frac{3}{2}}-1$"]),
 (8, r"A curve has $\dfrac{dy}{dx}=\dfrac{(2\sqrt{x}-3)^{2}}{\sqrt{x}}$, $x>0$, and passes through $(4,10)$." "\n"
     r"(a) Write $\dfrac{dy}{dx}$ in the form $ax^{\frac{1}{2}}+b+cx^{-\frac{1}{2}}$. [2]" "\n"
     r"(b) Find $y$ in terms of $x$. [5] [7 marks]",
  [r"(a) Expands: $\dfrac{4x-12\sqrt{x}+9}{\sqrt{x}}$", r"(a) $4x^{\frac{1}{2}}-12+9x^{-\frac{1}{2}}$",
   r"(b) $\dfrac{8}{3}x^{\frac{3}{2}}$", r"(b) $-12x$", r"(b) $+18x^{\frac{1}{2}}+c$",
   r"(b) Substitutes $(4,10)$: $\dfrac{64}{3}-48+36+c=10$",
   r"(b) $c=\dfrac{2}{3}$, so $y=\dfrac{8}{3}x^{\frac{3}{2}}-12x+18\sqrt{x}+\dfrac{2}{3}$"]),
]
