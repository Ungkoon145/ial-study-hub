# Exam-style questions for Further Pure Mathematics 1 (WFM01), written for IAL Revise (not Pearson questions).
# Every answer was checked with sympy (see check_fp.py). Row: (topic index, question, [mark points])
U = 'WFM01'
Q = [
 (0, r"$z_{1}=3+4\mathrm{i}$ and $z_{2}=1-2\mathrm{i}$." "\n"
     r"(a) Find $z_{1}z_{2}$. [2]" "\n"
     r"(b) Find $\dfrac{z_{1}}{z_{2}}$ in the form $a+b\mathrm{i}$. [3]" "\n"
     r"(c) Find $|z_{1}|$ and $\arg z_{1}$, in radians to 3 decimal places. [2]" "\n"
     r"(d) Show $z_{1}$ and $z_{2}$ on an Argand diagram. [1] [8 marks]",
  [r"(a) $3-6\mathrm{i}+4\mathrm{i}-8\mathrm{i}^{2}$", r"(a) $11-2\mathrm{i}$",
   r"(b) Multiplies by $\dfrac{1+2\mathrm{i}}{1+2\mathrm{i}}$", r"(b) Numerator $-5+10\mathrm{i}$, denominator $5$", r"(b) $-1+2\mathrm{i}$",
   r"(c) $|z_{1}|=5$", r"(c) $\arg z_{1}=\arctan\dfrac{4}{3}=0.927$",
   r"(d) Points $(3,4)$ and $(1,-2)$ plotted"]),
 (0, r"$f(z)=z^{3}-5z^{2}+17z-13$" "\n"
     r"(a) Show that $z=1$ is a root of $f(z)=0$. [1]" "\n"
     r"(b) Find the other two roots. [4]" "\n"
     r"(c) Show all three roots on an Argand diagram. [1]" "\n"
     r"(d) Verify that the sum of the roots is $5$. [1] [7 marks]",
  [r"(a) $1-5+17-13=0$",
   r"(b) $f(z)=(z-1)(z^{2}-4z+13)$", r"(b) Correct quadratic factor", r"(b) Solves: $z=\dfrac{4\pm\sqrt{-36}}{2}$", r"(b) $z=2\pm3\mathrm{i}$",
   r"(c) Points $(1,0)$, $(2,3)$, $(2,-3)$",
   r"(d) $1+(2+3\mathrm{i})+(2-3\mathrm{i})=5$ ✓"]),
 (1, r"The roots of $2x^{2}-3x+5=0$ are $\alpha$ and $\beta$." "\n"
     r"(a) Write down $\alpha+\beta$ and $\alpha\beta$. [1]" "\n"
     r"(b) Find $\alpha^{2}+\beta^{2}$. [2]" "\n"
     r"(c) Find a quadratic equation with integer coefficients whose roots are $\alpha^{2}$ and $\beta^{2}$. [4] [7 marks]",
  [r"(a) $\alpha+\beta=\dfrac{3}{2}$, $\alpha\beta=\dfrac{5}{2}$",
   r"(b) $(\alpha+\beta)^{2}-2\alpha\beta$", r"(b) $=\dfrac{9}{4}-5=-\dfrac{11}{4}$",
   r"(c) Sum of new roots $=-\dfrac{11}{4}$", r"(c) Product $=(\alpha\beta)^{2}=\dfrac{25}{4}$",
   r"(c) $x^{2}+\dfrac{11}{4}x+\dfrac{25}{4}=0$", r"(c) $4x^{2}+11x+25=0$"]),
 (1, r"The roots of $x^{2}-4x+1=0$ are $\alpha$ and $\beta$." "\n"
     r"(a) Find the value of $\alpha^{3}+\beta^{3}$. [3]" "\n"
     r"(b) Find a quadratic equation with roots $\dfrac{\alpha}{\beta}$ and $\dfrac{\beta}{\alpha}$. [4] [7 marks]",
  [r"(a) $\alpha^{3}+\beta^{3}=(\alpha+\beta)^{3}-3\alpha\beta(\alpha+\beta)$", r"(a) $=64-12$", r"(a) $=52$",
   r"(b) Sum $=\dfrac{\alpha^{2}+\beta^{2}}{\alpha\beta}$", r"(b) $=\dfrac{16-2}{1}=14$", r"(b) Product $=1$", r"(b) $x^{2}-14x+1=0$"]),
 (2, r"$f(x)=x^{3}+2x-7$" "\n"
     r"(a) Show that $f(x)=0$ has a root $\alpha$ in $[1,2]$. [2]" "\n"
     r"(b) Use interval bisection twice, starting with $[1,2]$, to find an interval of width $0.25$ containing $\alpha$. [3]" "\n"
     r"(c) Use linear interpolation once on your interval to estimate $\alpha$, to 3 decimal places. [3] [8 marks]",
  [r"(a) $f(1)=-4$, $f(2)=5$", r"(a) Sign change (and $f$ continuous), so a root lies in $[1,2]$",
   r"(b) $f(1.5)=-0.625$, so $\alpha\in[1.5,2]$", r"(b) $f(1.75)=1.859\ldots$", r"(b) $\alpha\in[1.5,1.75]$",
   r"(c) $\dfrac{\alpha-1.5}{0.625}=\dfrac{1.75-\alpha}{1.859}$", r"(c) Solves", r"(c) $\alpha\approx1.563$"]),
 (2, r"$g(x)=x^{3}-6x+2$" "\n"
     r"(a) Show that $g(x)=0$ has a root $\beta$ between $2$ and $3$. [2]" "\n"
     r"(b) Using $x_{0}=2.3$, apply the Newton–Raphson method once to find $x_{1}$, to 4 decimal places. [5] [7 marks]",
  [r"(a) $g(2)=-2$, $g(3)=11$", r"(a) Sign change, so a root between $2$ and $3$",
   r"(b) $g'(x)=3x^{2}-6$", r"(b) $g(2.3)=0.367$", r"(b) $g'(2.3)=9.87$",
   r"(b) $x_{1}=2.3-\dfrac{0.367}{9.87}$", r"(b) $x_{1}=2.2628$"]),
 (3, r"The parabola $C$ has equation $y^{2}=12x$. The point $P(3t^{2},6t)$ lies on $C$." "\n"
     r"(a) Write down the coordinates of the focus and the equation of the directrix. [2]" "\n"
     r"(b) Show that the normal to $C$ at $P$ has equation $y+tx=6t+3t^{3}$. [5]" "\n"
     r"(c) The normal at the point where $t=2$ meets $C$ again at $Q$. Find the coordinates of $Q$. [3] [10 marks]",
  [r"(a) Focus $(3,0)$", r"(a) Directrix $x=-3$",
   r"(b) $\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}=\dfrac{6}{6t}=\dfrac{1}{t}$", r"(b) Normal gradient $-t$",
   r"(b) $y-6t=-t(x-3t^{2})$", r"(b) Expands", r"(b) $y+tx=6t+3t^{3}$ ✓",
   r"(c) $t=2$: $y+2x=36$", r"(c) Substitutes $(3s^{2},6s)$: $s^{2}+s-6=0$, so $s=-3$", r"(c) $Q(27,-18)$"]),
 (3, r"The rectangular hyperbola $H$ has equation $xy=16$. The point $P\left(4t,\dfrac{4}{t}\right)$ lies on $H$." "\n"
     r"(a) Show that the tangent to $H$ at $P$ has equation $x+t^{2}y=8t$. [4]" "\n"
     r"(b) The tangent meets the $x$-axis at $A$ and the $y$-axis at $B$. Show that the area of triangle $OAB$ is the same for every $t$. [3] [7 marks]",
  [r"(a) $y=\dfrac{16}{x}$, so $\dfrac{dy}{dx}=-\dfrac{16}{x^{2}}$ (or parametric)", r"(a) At $P$: gradient $-\dfrac{1}{t^{2}}$",
   r"(a) $y-\dfrac{4}{t}=-\dfrac{1}{t^{2}}(x-4t)$", r"(a) $x+t^{2}y=8t$ ✓",
   r"(b) $A(8t,0)$", r"(b) $B\left(0,\dfrac{8}{t}\right)$", r"(b) Area $=\dfrac{1}{2}\times8t\times\dfrac{8}{t}=32$, independent of $t$"]),
 (4, r"$\mathbf{A}=\begin{pmatrix}3&1\\5&2\end{pmatrix}$" "\n"
     r"(a) Find $\mathbf{A}^{-1}$. [3]" "\n"
     r"(b) Hence solve $\mathbf{A}\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}4\\7\end{pmatrix}$. [2]" "\n"
     r"(c) $\mathbf{B}=\begin{pmatrix}k&2\\3&k-1\end{pmatrix}$ is singular. Find the possible values of $k$. [2] [7 marks]",
  [r"(a) $\det\mathbf{A}=6-5=1$", r"(a) Swaps and changes signs", r"(a) $\mathbf{A}^{-1}=\begin{pmatrix}2&-1\\-5&3\end{pmatrix}$",
   r"(b) $\begin{pmatrix}x\\y\end{pmatrix}=\mathbf{A}^{-1}\begin{pmatrix}4\\7\end{pmatrix}$", r"(b) $x=1$, $y=1$",
   r"(c) $k(k-1)-6=0$", r"(c) $k=3$ or $k=-2$"]),
 (4, r"$\mathbf{M}=\begin{pmatrix}1&2\\2&-2\end{pmatrix}$" "\n"
     r"(a) Find $\mathbf{M}^{2}$. [2]" "\n"
     r"(b) Find constants $p$ and $q$ such that $\mathbf{M}^{2}=p\mathbf{M}+q\mathbf{I}$. [4]" "\n"
     r"(c) Hence show that $\mathbf{M}^{-1}=\dfrac{1}{6}(\mathbf{M}+\mathbf{I})$. [2] [8 marks]",
  [r"(a) Correct method", r"(a) $\begin{pmatrix}5&-2\\-2&8\end{pmatrix}$",
   r"(b) Compares entries: $2p=-2$", r"(b) $p=-1$", r"(b) $5=p+q$", r"(b) $q=6$ (and checks $8=-2p\ldots$: $8=2+6$ ✓)",
   r"(c) $\mathbf{M}^{2}+\mathbf{M}=6\mathbf{I}$, so $\mathbf{M}(\mathbf{M}+\mathbf{I})=6\mathbf{I}$", r"(c) $\mathbf{M}^{-1}=\dfrac{1}{6}(\mathbf{M}+\mathbf{I})$"]),
 (5, r"$\mathbf{R}$ represents a rotation of $90^{\circ}$ anticlockwise about the origin and $\mathbf{S}$ represents an enlargement, scale factor $3$, centre the origin." "\n"
     r"(a) Write down $\mathbf{R}$ and $\mathbf{S}$. [2]" "\n"
     r"(b) Find the single matrix for $\mathbf{R}$ followed by $\mathbf{S}$. [1]" "\n"
     r"(c) A triangle of area $5$ is transformed by this matrix. Find the area of the image. [2]" "\n"
     r"(d) Find the point that is mapped onto $(6,-3)$. [2] [7 marks]",
  [r"(a) $\mathbf{R}=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$", r"(a) $\mathbf{S}=\begin{pmatrix}3&0\\0&3\end{pmatrix}$",
   r"(b) $\mathbf{SR}=\begin{pmatrix}0&-3\\3&0\end{pmatrix}$",
   r"(c) $\det(\mathbf{SR})=9$", r"(c) Area $=45$",
   r"(d) $(\mathbf{SR})^{-1}=\dfrac{1}{9}\begin{pmatrix}0&3\\-3&0\end{pmatrix}$", r"(d) $(-1,-2)$"]),
 (5, r"The transformation $T$ is represented by $\mathbf{T}=\begin{pmatrix}2&-1\\4&-2\end{pmatrix}$." "\n"
     r"(a) Show that $T$ maps every point of the plane onto the line $y=2x$. [3]" "\n"
     r"(b) Find the equation of the line of points mapped onto $(3,6)$. [2]" "\n"
     r"(c) Explain why $\mathbf{T}$ has no inverse. [1] [6 marks]",
  [r"(a) $\mathbf{T}\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}2x-y\\4x-2y\end{pmatrix}$", r"(a) $y'=4x-2y=2(2x-y)$", r"(a) $=2x'$, so every image is on $y=2x$",
   r"(b) $2x-y=3$", r"(b) $y=2x-3$",
   r"(c) $\det\mathbf{T}=-4+4=0$ (many points map to one point)"]),
 (6, r"(a) Use the standard results for $\sum r$ and $\sum r^{2}$ to show that $\displaystyle\sum_{r=1}^{n}r(r+1)=\frac{n(n+1)(n+2)}{3}$. [4]" "\n"
     r"(b) Hence find $\displaystyle\sum_{r=11}^{20}r(r+1)$. [3] [7 marks]",
  [r"(a) $\sum r^{2}+\sum r$", r"(a) $\dfrac{n(n+1)(2n+1)}{6}+\dfrac{n(n+1)}{2}$", r"(a) Takes out $\dfrac{n(n+1)}{6}$: $\dfrac{n(n+1)}{6}(2n+4)$", r"(a) $=\dfrac{n(n+1)(n+2)}{3}$",
   r"(b) $\displaystyle\sum_{1}^{20}-\sum_{1}^{10}$", r"(b) $3080-440$", r"(b) $2640$"]),
 (6, r"(a) Show that $\displaystyle\sum_{r=1}^{n}(2r-1)^{2}=\frac{n(2n-1)(2n+1)}{3}$. [5]" "\n"
     r"(b) Find $n$ such that this sum is $1330$. [2] [7 marks]",
  [r"(a) Expands: $4\sum r^{2}-4\sum r+\sum1$", r"(a) $\dfrac{4n(n+1)(2n+1)}{6}-2n(n+1)+n$", r"(a) Takes out a common factor $\dfrac{n}{3}$",
   r"(a) $\dfrac{n}{3}(4n^{2}-1)$", r"(a) $=\dfrac{n(2n-1)(2n+1)}{3}$",
   r"(b) $4n^{3}-n=3990$", r"(b) $n=10$"]),
 (7, r"Prove by induction that, for all positive integers $n$, $\displaystyle\sum_{r=1}^{n}r\,2^{r}=2+(n-1)2^{n+1}$. [6] [6 marks]",
  [r"Base case $n=1$: LHS $=2$, RHS $=2+0=2$", r"Assumes true for $n=k$",
   r"Adds the next term: $2+(k-1)2^{k+1}+(k+1)2^{k+1}$", r"$=2+2k\times2^{k+1}$", r"$=2+k\times2^{k+2}$, the formula for $n=k+1$",
   r"Conclusion: true for $n=1$, and true for $k$ implies true for $k+1$, so true for all positive integers $n$"]),
 (7, r"Prove by induction that $7^{n}-3^{n}$ is divisible by $4$ for all positive integers $n$. [6] [6 marks]",
  [r"Base case: $7-3=4$, divisible by $4$", r"Assumes $7^{k}-3^{k}=4m$ for some integer $m$",
   r"$7^{k+1}-3^{k+1}=7\times7^{k}-3\times3^{k}$", r"$=7(7^{k}-3^{k})+4\times3^{k}$", r"$=28m+4\times3^{k}$, divisible by $4$",
   r"Conclusion: true for $n=1$, and true for $k$ implies true for $k+1$, so true for all positive integers $n$"]),
]
