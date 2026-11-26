# Exam-style questions for Pure Mathematics 2 (WMA12), written for IAL Revise (not Pearson questions).
# Every answer was checked with sympy (see check_p2.py). Row: (topic index, question, [mark points])
U = 'WMA12'
Q = [
 (0, r"$f(x)=2x^{3}-3x^{2}-11x+6$" "\n"
     r"(a) Use the factor theorem to show that $(x-3)$ is a factor of $f(x)$. [2]" "\n"
     r"(b) Factorise $f(x)$ completely. [3]" "\n"
     r"(c) Hence solve $2\left(3^{t}\right)^{3}-3\left(3^{t}\right)^{2}-11\left(3^{t}\right)+6=0$, giving any non-exact answer to 3 significant figures. [3] [8 marks]",
  [r"(a) $f(3)=54-27-33+6$", r"(a) $f(3)=0$, so $(x-3)$ is a factor",
   r"(b) Divides: $f(x)=(x-3)(2x^{2}+3x-2)$", r"(b) Attempts to factorise the quadratic", r"(b) $(x-3)(2x-1)(x+2)$",
   r"(c) $3^{t}=3$ gives $t=1$", r"(c) $3^{t}=\dfrac{1}{2}$ gives $t=\log_{3}\dfrac{1}{2}=-0.631$",
   r"(c) $3^{t}=-2$ has no solution (because $3^{t}>0$)"]),
 (0, r"$f(x)=x^{3}+px^{2}+qx-6$, where $p$ and $q$ are constants. $(x+1)$ is a factor of $f(x)$, and when $f(x)$ is divided by $(x-2)$ the remainder is $12$." "\n"
     r"(a) Find the values of $p$ and $q$. [5]" "\n"
     r"(b) Hence write $f(x)$ as a product of a linear factor and a quadratic factor. [2]" "\n"
     r"(c) Find the exact roots of $f(x)=0$. [1] [8 marks]",
  [r"(a) $f(-1)=0$: $-1+p-q-6=0$, so $p-q=7$",
   r"(a) $f(2)=12$: $8+4p+2q-6=12$, so $2p+q=5$",
   r"(a) Solves the simultaneous equations", r"(a) $p=4$", r"(a) $q=-3$",
   r"(b) Divides $x^{3}+4x^{2}-3x-6$ by $(x+1)$", r"(b) $(x+1)(x^{2}+3x-6)$",
   r"(c) $x=-1$, $x=\dfrac{-3\pm\sqrt{33}}{2}$"]),
 (1, r"(a) Find the first four terms, in ascending powers of $x$, of the binomial expansion of $(1-2x)^{6}$. Give each term in its simplest form. [4]" "\n"
     r"(b) Hence find the coefficient of $x^{2}$ in the expansion of $(3+x)(1-2x)^{6}$. [3]" "\n"
     r"(c) Use your expansion with a suitable value of $x$ to estimate $0.98^{6}$, giving your answer to 5 decimal places. [2] [9 marks]",
  [r"(a) $1$", r"(a) $-12x$", r"(a) $+60x^{2}$", r"(a) $-160x^{3}$",
   r"(b) Identifies the two contributions: $3\times60x^{2}$ and $x\times(-12x)$",
   r"(b) $180-12$", r"(b) $168$",
   r"(c) Uses $x=0.01$", r"(c) $1-0.12+0.006-0.00016=0.88584$"]),
 (1, r"In the binomial expansion of $(2+kx)^{5}$, where $k$ is a non-zero constant, the coefficient of $x^{2}$ is three times the coefficient of $x$." "\n"
     r"(a) Find the value of $k$. [4]" "\n"
     r"(b) Find the coefficient of $x^{3}$. [2]" "\n"
     r"(c) Find the term independent of $x$ in the expansion of $(2+kx)^{5}\left(1-\dfrac{1}{x}\right)$. [2] [8 marks]",
  [r"(a) Coefficient of $x$: $\binom{5}{1}2^{4}k=80k$",
   r"(a) Coefficient of $x^{2}$: $\binom{5}{2}2^{3}k^{2}=80k^{2}$",
   r"(a) $80k^{2}=3\times80k$", r"(a) $k=3$",
   r"(b) $\binom{5}{3}2^{2}k^{3}=40\times27$", r"(b) $1080$",
   r"(c) Constant term $=2^{5}\times1+240x\times\left(-\dfrac{1}{x}\right)$", r"(c) $32-240=-208$"]),
 (2, r"The circle $C$ has equation $x^{2}+y^{2}-6x+4y-12=0$." "\n"
     r"(a) Find the centre and the radius of $C$. [3]" "\n"
     r"(b) Show that $P(6,2)$ lies on $C$, and find an equation of the tangent to $C$ at $P$ in the form $ax+by+c=0$. [4]" "\n"
     r"(c) Find the exact length of the chord that $C$ cuts off on the $x$-axis. [2] [9 marks]",
  [r"(a) Completes the square: $(x-3)^{2}+(y+2)^{2}=12+9+4$", r"(a) Centre $(3,-2)$", r"(a) Radius $5$",
   r"(b) $36+4-36+8-12=0$, so $P$ lies on $C$",
   r"(b) Gradient of radius to $P$: $\dfrac{2-(-2)}{6-3}=\dfrac{4}{3}$",
   r"(b) Tangent gradient $-\dfrac{3}{4}$: $y-2=-\dfrac{3}{4}(x-6)$", r"(b) $3x+4y-26=0$",
   r"(c) $y=0$: $x^{2}-6x-12=0$, so $x=3\pm\sqrt{21}$", r"(c) Length $2\sqrt{21}$"]),
 (2, r"The points $A(-2,1)$ and $B(4,9)$ are the ends of a diameter of a circle $C$." "\n"
     r"(a) Find an equation of $C$. [4]" "\n"
     r"(b) Show that the point $(5,2)$ lies on $C$. [1]" "\n"
     r"(c) The line $y=x+k$ is a tangent to $C$. Find the exact possible values of $k$. [4] [9 marks]",
  [r"(a) Centre is the midpoint: $(1,5)$", r"(a) Radius $=\dfrac{1}{2}\sqrt{6^{2}+8^{2}}$", r"(a) $=5$",
   r"(a) $(x-1)^{2}+(y-5)^{2}=25$",
   r"(b) $(5-1)^{2}+(2-5)^{2}=16+9=25$ ✓",
   r"(c) Uses distance from centre to line $=$ radius, or substitutes and uses $b^{2}-4ac=0$",
   r"(c) $\dfrac{|1-5+k|}{\sqrt{2}}=5$ (or $2x^{2}+(2k-10)x+(k^{2}-10k)=0$ with discriminant $0$)",
   r"(c) $k-4=\pm5\sqrt{2}$", r"(c) $k=4\pm5\sqrt{2}$"]),
 (3, r"The third term of an arithmetic series is $11$ and the sum of the first $10$ terms is $185$." "\n"
     r"(a) Find the first term $a$ and the common difference $d$. [4]" "\n"
     r"(b) Find the least value of $n$ for which the sum of the first $n$ terms exceeds $1000$. [3] [7 marks]",
  [r"(a) $a+2d=11$", r"(a) $\dfrac{10}{2}(2a+9d)=185$, so $2a+9d=37$", r"(a) Solves simultaneously", r"(a) $a=5$, $d=3$",
   r"(b) $\dfrac{n}{2}\left(10+3(n-1)\right)>1000$, so $3n^{2}+7n-2000>0$",
   r"(b) Critical value $n=24.7\ldots$ (or checks $S_{24}=948$ and $S_{25}=1025$)", r"(b) $n=25$"]),
 (3, r"The second term of a geometric series is $12$ and the fifth term is $\dfrac{3}{2}$." "\n"
     r"(a) Find the common ratio and the first term. [3]" "\n"
     r"(b) Find the sum to infinity. [1]" "\n"
     r"(c) Find the least value of $n$ for which the sum to infinity exceeds the sum of the first $n$ terms by less than $0.01$. [4] [8 marks]",
  [r"(a) $ar=12$ and $ar^{4}=\dfrac{3}{2}$", r"(a) $r^{3}=\dfrac{1}{8}$, so $r=\dfrac{1}{2}$", r"(a) $a=24$",
   r"(b) $\dfrac{24}{1-\frac{1}{2}}=48$",
   r"(c) $S_{\infty}-S_{n}=48\left(\dfrac{1}{2}\right)^{n}$", r"(c) $48\left(\dfrac{1}{2}\right)^{n}<0.01$, so $2^{n}>4800$",
   r"(c) Uses logs: $n>\dfrac{\log4800}{\log2}=12.2\ldots$", r"(c) $n=13$"]),
 (4, r"(a) Solve $3^{2x}-4\left(3^{x}\right)+3=0$. [4]" "\n"
     r"(b) Solve $\log_{2}(x+1)-\log_{2}(x-2)=2$. [4] [8 marks]",
  [r"(a) Lets $y=3^{x}$: $y^{2}-4y+3=0$", r"(a) $(y-1)(y-3)=0$", r"(a) $3^{x}=1$ gives $x=0$", r"(a) $3^{x}=3$ gives $x=1$",
   r"(b) Uses the subtraction law: $\log_{2}\dfrac{x+1}{x-2}=2$", r"(b) $\dfrac{x+1}{x-2}=4$",
   r"(b) $x+1=4x-8$", r"(b) $x=3$ (valid, because $x-2>0$)"]),
 (4, r"Given that $\log_{a}3=p$ and $\log_{a}5=q$," "\n"
     r"(a) write $\log_{a}45$ and $\log_{a}\left(\dfrac{25}{\sqrt{3}}\right)$ in terms of $p$ and $q$. [4]" "\n"
     r"(b) Solve $5^{x}=2^{x+3}$, giving your answer to 3 significant figures. [3] [7 marks]",
  [r"(a) $\log_{a}45=\log_{a}9+\log_{a}5$", r"(a) $=2p+q$",
   r"(a) $\log_{a}25-\log_{a}3^{\frac{1}{2}}$", r"(a) $=2q-\dfrac{1}{2}p$",
   r"(b) Takes logs: $x\log5=(x+3)\log2$", r"(b) $x=\dfrac{3\log2}{\log5-\log2}$", r"(b) $x=2.27$"]),
 (5, r"(a) Solve, for $0\le\theta<360^{\circ}$, $2\sin^{2}\theta=3\cos\theta$. [5]" "\n"
     r"(b) Solve, for $0\le x<180^{\circ}$, $\tan(2x-30^{\circ})=\sqrt{3}$. [3] [8 marks]",
  [r"(a) Uses $\sin^{2}\theta=1-\cos^{2}\theta$", r"(a) $2\cos^{2}\theta+3\cos\theta-2=0$",
   r"(a) $(2\cos\theta-1)(\cos\theta+2)=0$", r"(a) $\cos\theta=\dfrac{1}{2}$ ($\cos\theta=-2$ is impossible)",
   r"(a) $\theta=60^{\circ},\ 300^{\circ}$",
   r"(b) $2x-30^{\circ}=60^{\circ}$", r"(b) or $240^{\circ}$", r"(b) $x=45^{\circ},\ 135^{\circ}$"]),
 (5, r"(a) Show that $\dfrac{1-\cos^{2}\theta}{\sin\theta\cos\theta}\equiv\tan\theta$. [2]" "\n"
     r"(b) Solve, for $0\le\theta<360^{\circ}$, $4\sin\theta=3\tan\theta$, giving your answers to one decimal place where appropriate. [5] [7 marks]",
  [r"(a) $1-\cos^{2}\theta=\sin^{2}\theta$", r"(a) $\dfrac{\sin^{2}\theta}{\sin\theta\cos\theta}=\dfrac{\sin\theta}{\cos\theta}=\tan\theta$",
   r"(b) $4\sin\theta\cos\theta=3\sin\theta$", r"(b) $\sin\theta(4\cos\theta-3)=0$ (does not divide by $\sin\theta$)",
   r"(b) $\sin\theta=0$: $\theta=0^{\circ},\ 180^{\circ}$", r"(b) $\cos\theta=\dfrac{3}{4}$: $\theta=41.4^{\circ}$", r"(b) and $318.6^{\circ}$"]),
 (6, r"The curve $C$ has equation $y=x^{3}-6x^{2}+9x+2$." "\n"
     r"(a) Find the coordinates of the stationary points of $C$. [4]" "\n"
     r"(b) Use $\dfrac{d^{2}y}{dx^{2}}$ to determine the nature of each stationary point. [3]" "\n"
     r"(c) State the set of values of $x$ for which $y$ is increasing. [1] [8 marks]",
  [r"(a) $\dfrac{dy}{dx}=3x^{2}-12x+9$", r"(a) $3(x-1)(x-3)=0$", r"(a) $(1,6)$", r"(a) $(3,2)$",
   r"(b) $\dfrac{d^{2}y}{dx^{2}}=6x-12$", r"(b) At $x=1$: $-6<0$, so maximum", r"(b) At $x=3$: $6>0$, so minimum",
   r"(c) $x<1$ or $x>3$"]),
 (6, r"An open box (no lid) has a square base of side $x\text{ cm}$ and a volume of $500\text{ cm}^{3}$." "\n"
     r"(a) Show that the external surface area $A\text{ cm}^{2}$ is given by $A=x^{2}+\dfrac{2000}{x}$. [3]" "\n"
     r"(b) Find the minimum value of $A$. [4]" "\n"
     r"(c) Justify that this value is a minimum. [2] [9 marks]",
  [r"(a) Height $h=\dfrac{500}{x^{2}}$", r"(a) $A=x^{2}+4xh$", r"(a) $A=x^{2}+4x\times\dfrac{500}{x^{2}}=x^{2}+\dfrac{2000}{x}$",
   r"(b) $\dfrac{dA}{dx}=2x-\dfrac{2000}{x^{2}}$", r"(b) Sets $\dfrac{dA}{dx}=0$: $x^{3}=1000$", r"(b) $x=10$", r"(b) $A=100+200=300\text{ cm}^{2}$",
   r"(c) $\dfrac{d^{2}A}{dx^{2}}=2+\dfrac{4000}{x^{3}}$", r"(c) $=6>0$ at $x=10$, so minimum"]),
 (7, r"The curve $y=4x-x^{2}$ and the line $y=x$ meet at the origin $O$ and at the point $P$." "\n"
     r"(a) Find the coordinates of $P$. [2]" "\n"
     r"(b) Find the area of the finite region bounded by the curve and the line. [5] [7 marks]",
  [r"(a) $4x-x^{2}=x$, so $x(3-x)=0$", r"(a) $P(3,3)$",
   r"(b) Area $=\displaystyle\int_{0}^{3}\left(4x-x^{2}-x\right)dx$ (or area under curve minus triangle)",
   r"(b) $=\left[\dfrac{3x^{2}}{2}-\dfrac{x^{3}}{3}\right]_{0}^{3}$", r"(b) Uses limits $0$ and $3$",
   r"(b) $\dfrac{27}{2}-9$", r"(b) $=\dfrac{9}{2}$"]),
 (7, r"(a) Find the exact value of $\displaystyle\int_{1}^{4}\left(3\sqrt{x}-\frac{2}{x^{2}}\right)dx$. [4]" "\n"
     r"(b) The curve $y=(x-1)(x-3)$ meets the $x$-axis at $A$ and $B$. Find the area of the region between the curve and the $x$-axis from $A$ to $B$. [4] [8 marks]",
  [r"(a) $2x^{\frac{3}{2}}$", r"(a) $+\dfrac{2}{x}$", r"(a) $\left(16+\dfrac{1}{2}\right)-(2+2)$", r"(a) $=\dfrac{25}{2}$",
   r"(b) $A(1,0)$ and $B(3,0)$; integrates $x^{2}-4x+3$", r"(b) $\left[\dfrac{x^{3}}{3}-2x^{2}+3x\right]_{1}^{3}$",
   r"(b) $=0-\dfrac{4}{3}=-\dfrac{4}{3}$", r"(b) Area $=\dfrac{4}{3}$ (the region is below the $x$-axis)"]),
 (8, r"$y=\sqrt{1+x^{3}}$" "\n"
     r"(a) Find the values of $y$ at $x=0.5$, $1$ and $1.5$, to 4 decimal places. [2]" "\n"
     r"(b) Use the trapezium rule with $4$ strips to estimate $\displaystyle\int_{0}^{2}\sqrt{1+x^{3}}\,dx$, to 3 decimal places. [3]" "\n"
     r"(c) The true value is $3.241$ to 3 d.p. Explain why the trapezium rule gives an overestimate here. [2]" "\n"
     r"(d) Use your answer to (b) to estimate $\displaystyle\int_{0}^{2}\left(2+\sqrt{1+x^{3}}\right)dx$. [1] [8 marks]",
  [r"(a) $1.0607$ and $1.4142$", r"(a) $2.0917$ (and $y(0)=1$, $y(2)=3$)",
   r"(b) $h=0.5$", r"(b) $\dfrac{0.5}{2}\left[1+3+2(1.0607+1.4142+2.0917)\right]$", r"(b) $3.283$",
   r"(c) The curve bends upwards (it is convex) on $0\le x\le2$", r"(c) so each trapezium lies above the curve",
   r"(d) $2\times2+3.283=7.283$"]),
 (8, r"(a) Use the trapezium rule with $4$ strips of equal width to estimate $\displaystyle\int_{0}^{2}2^{x}\,dx$, to 3 decimal places. [4]" "\n"
     r"(b) Given that the exact value is $\dfrac{3}{\ln2}$, find the percentage error in your estimate, to 2 significant figures. [2]" "\n"
     r"(c) State how the estimate could be made more accurate. [1] [7 marks]",
  [r"(a) $h=0.5$", r"(a) $y$-values $1,\ 1.4142,\ 2,\ 2.8284,\ 4$", r"(a) $\dfrac{0.5}{2}\left[1+4+2(1.4142+2+2.8284)\right]$", r"(a) $4.371$",
   r"(b) $\dfrac{3}{\ln2}=4.328$; error $=\dfrac{4.371-4.328}{4.328}\times100$", r"(b) $1.0\%$",
   r"(c) Use more strips (smaller $h$)"]),
]
