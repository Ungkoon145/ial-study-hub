# Exam-style questions for Further Pure Mathematics 2 (WFM02), written for IAL Revise (not Pearson questions).
# Every answer was checked with sympy (see check_fp.py). Row: (topic index, question, [mark points])
U = 'WFM02'
Q = [
 (0, r"(a) Solve the inequality $\dfrac{x+3}{x-1}>2$. [5]" "\n"
     r"(b) Solve $|x^{2}-4|<3x$. [4] [9 marks]",
  [r"(a) Rearranges: $\dfrac{x+3}{x-1}-2>0$ (or multiplies by $(x-1)^{2}$)", r"(a) $\dfrac{5-x}{x-1}>0$", r"(a) Critical values $1$ and $5$",
   r"(a) Checks the sign in each region", r"(a) $1<x<5$",
   r"(b) $x^{2}-4<3x$ gives $-1<x<4$", r"(b) $-(x^{2}-4)<3x$ gives $x<-4$ or $x>1$", r"(b) Needs $3x>0$, so $x>0$", r"(b) $1<x<4$"]),
 (0, r"Solve the inequality $\dfrac{2x}{x+1}\le x$. [6] [6 marks]",
  [r"Moves everything to one side: $x-\dfrac{2x}{x+1}\ge0$", r"$\dfrac{x(x-1)}{x+1}\ge0$", r"Critical values $-1$, $0$, $1$",
   r"Sign diagram or sketch", r"$-1<x\le0$", r"$x\ge1$"]),
 (1, r"(a) Express $\dfrac{1}{r(r+2)}$ in partial fractions. [2]" "\n"
     r"(b) Hence show that $\displaystyle\sum_{r=1}^{n}\frac{1}{r(r+2)}=\frac{3}{4}-\frac{2n+3}{2(n+1)(n+2)}$. [5]" "\n"
     r"(c) State the limit of the sum as $n\to\infty$. [1] [8 marks]",
  [r"(a) $\dfrac{1}{2}\left(\dfrac{1}{r}-\dfrac{1}{r+2}\right)$", r"(a) Correct constants",
   r"(b) Writes out several terms to show the cancelling", r"(b) Terms left: $1+\dfrac{1}{2}$", r"(b) and $-\dfrac{1}{n+1}-\dfrac{1}{n+2}$",
   r"(b) $\dfrac{1}{2}\left(\dfrac{3}{2}-\dfrac{1}{n+1}-\dfrac{1}{n+2}\right)$", r"(b) Simplifies to the given result",
   r"(c) $\dfrac{3}{4}$"]),
 (1, r"(a) Show that $r\times r!=(r+1)!-r!$. [2]" "\n"
     r"(b) Hence show that $\displaystyle\sum_{r=1}^{n}r\times r!=(n+1)!-1$. [3]" "\n"
     r"(c) Find $n$ such that the sum is $719$. [2] [7 marks]",
  [r"(a) $(r+1)!=(r+1)\times r!$", r"(a) $(r+1)r!-r!=r\times r!$",
   r"(b) Method of differences: $(2!-1!)+(3!-2!)+\ldots$", r"(b) Shows the cancelling", r"(b) $=(n+1)!-1$",
   r"(c) $(n+1)!=720=6!$", r"(c) $n=5$"]),
 (2, r"$z=1+\sqrt{3}\,\mathrm{i}$" "\n"
     r"(a) Write $z$ in modulus–argument form. [2]" "\n"
     r"(b) Use de Moivre's theorem to find $z^{6}$. [2]" "\n"
     r"(c) Solve $w^{3}=8\mathrm{i}$, giving your answers in the form $a+b\mathrm{i}$. [4] [8 marks]",
  [r"(a) $|z|=2$, $\arg z=\dfrac{\pi}{3}$", r"(a) $z=2\left(\cos\dfrac{\pi}{3}+\mathrm{i}\sin\dfrac{\pi}{3}\right)$",
   r"(b) $z^{6}=2^{6}(\cos2\pi+\mathrm{i}\sin2\pi)$", r"(b) $=64$",
   r"(c) $8\mathrm{i}=8e^{\mathrm{i}\frac{\pi}{2}}$, so $w=2e^{\mathrm{i}\left(\frac{\pi}{6}+\frac{2k\pi}{3}\right)}$", r"(c) $\sqrt{3}+\mathrm{i}$", r"(c) $-\sqrt{3}+\mathrm{i}$", r"(c) $-2\mathrm{i}$"]),
 (2, r"The point $P$ represents $z$ on an Argand diagram, and $|z-3\mathrm{i}|=2|z|$." "\n"
     r"(a) Show that the locus of $P$ is a circle, and find its centre and radius. [5]" "\n"
     r"(b) Show that the half-line $\arg(z+2)=\dfrac{\pi}{4}$ does not meet this circle. [3] [8 marks]",
  [r"(a) $x^{2}+(y-3)^{2}=4(x^{2}+y^{2})$", r"(a) $3x^{2}+3y^{2}+6y-9=0$", r"(a) $x^{2}+(y+1)^{2}=4$", r"(a) Centre $(0,-1)$", r"(a) Radius $2$",
   r"(b) The half-line is $y=x+2$, $x>-2$", r"(b) Substitutes: $2x^{2}+6x+5=0$", r"(b) Discriminant $36-40<0$, so no intersection"]),
 (3, r"Solve the differential equation $\dfrac{dy}{dx}+\dfrac{2y}{x}=x^{2}$, $x>0$, given that $y=1$ when $x=1$. [7] [7 marks]",
  [r"Integrating factor $e^{\int\frac{2}{x}dx}$", r"$=x^{2}$", r"$\dfrac{d}{dx}\left(x^{2}y\right)=x^{4}$", r"$x^{2}y=\dfrac{x^{5}}{5}+c$",
   r"$y=\dfrac{x^{3}}{5}+\dfrac{c}{x^{2}}$", r"Uses $x=1$, $y=1$: $c=\dfrac{4}{5}$", r"$y=\dfrac{x^{3}}{5}+\dfrac{4}{5x^{2}}$"]),
 (3, r"Find the general solution of $\dfrac{dy}{dx}-y\tan x=\cos x$, $0<x<\dfrac{\pi}{2}$, giving $y$ in terms of $x$. [6] [6 marks]",
  [r"Integrating factor $e^{-\int\tan x\,dx}=e^{\ln\cos x}$", r"$=\cos x$", r"$\dfrac{d}{dx}(y\cos x)=\cos^{2}x$",
   r"$\displaystyle\int\cos^{2}x\,dx=\frac{x}{2}+\frac{\sin2x}{4}$", r"$+c$", r"$y=\dfrac{1}{\cos x}\left(\dfrac{x}{2}+\dfrac{\sin2x}{4}+c\right)$"]),
 (4, r"Find the general solution of $\dfrac{d^{2}y}{dx^{2}}-5\dfrac{dy}{dx}+6y=12x$. [7] [7 marks]",
  [r"Auxiliary equation $m^{2}-5m+6=0$", r"$m=2,\ 3$", r"Complementary function $Ae^{2x}+Be^{3x}$",
   r"Particular integral $y=ax+b$", r"$-5a+6(ax+b)=12x$", r"$a=2$, $b=\dfrac{5}{3}$", r"$y=Ae^{2x}+Be^{3x}+2x+\dfrac{5}{3}$"]),
 (4, r"Solve $\dfrac{d^{2}y}{dx^{2}}+4y=8$, given that $y=0$ and $\dfrac{dy}{dx}=4$ when $x=0$. [7] [7 marks]",
  [r"Auxiliary equation $m^{2}+4=0$, $m=\pm2\mathrm{i}$", r"Complementary function $A\cos2x+B\sin2x$", r"Particular integral $y=2$",
   r"General solution $y=A\cos2x+B\sin2x+2$", r"$y(0)=0$: $A=-2$", r"$y'(0)=4$: $2B=4$, so $B=2$", r"$y=2-2\cos2x+2\sin2x$"]),
 (5, r"(a) Find the Maclaurin series of $e^{x}\sin x$ up to and including the term in $x^{3}$. [5]" "\n"
     r"(b) Use your series to estimate $e^{0.1}\sin0.1$, to 6 decimal places. [1] [6 marks]",
  [r"(a) Uses $e^{x}=1+x+\dfrac{x^{2}}{2}+\ldots$ and $\sin x=x-\dfrac{x^{3}}{6}+\ldots$ (or differentiates)", r"(a) Multiplies the series",
   r"(a) $x$", r"(a) $+x^{2}$", r"(a) $+\dfrac{x^{3}}{3}$",
   r"(b) $0.1+0.01+0.000333=0.110333$"]),
 (5, r"(a) Find the Taylor series of $\ln x$ about $x=1$ up to and including the term in $(x-1)^{3}$. [4]" "\n"
     r"(b) Use it to estimate $\ln1.1$, to 5 decimal places. [2] [6 marks]",
  [r"(a) $f(1)=0$, $f'(1)=1$", r"(a) $f''(1)=-1$, $f'''(1)=2$", r"(a) Uses $f(1)+f'(1)(x-1)+\dfrac{f''(1)}{2!}(x-1)^{2}+\ldots$",
   r"(a) $(x-1)-\dfrac{(x-1)^{2}}{2}+\dfrac{(x-1)^{3}}{3}$",
   r"(b) $0.1-0.005+0.000333$", r"(b) $0.09533$"]),
 (6, r"The curve $C$ has polar equation $r=2(1+\cos\theta)$, $0\le\theta<2\pi$." "\n"
     r"(a) Sketch $C$. [1]" "\n"
     r"(b) Find the exact area enclosed by $C$. [6] [7 marks]",
  [r"(a) Cardioid shape through the pole, with $r=4$ at $\theta=0$",
   r"(b) Area $=\dfrac{1}{2}\displaystyle\int_{0}^{2\pi}4(1+\cos\theta)^{2}d\theta$", r"(b) Expands: $1+2\cos\theta+\cos^{2}\theta$",
   r"(b) Uses $\cos^{2}\theta=\dfrac{1}{2}(1+\cos2\theta)$", r"(b) Integrates correctly", r"(b) Uses limits", r"(b) $6\pi$"]),
 (6, r"The curve $C$ has polar equation $r=4\cos\theta$, $-\dfrac{\pi}{2}<\theta\le\dfrac{\pi}{2}$." "\n"
     r"(a) Find a Cartesian equation of $C$ and describe the curve. [3]" "\n"
     r"(b) Find the polar coordinates of the points where $C$ meets the circle $r=2$. [2]" "\n"
     r"(c) Find the exact area of the region of $C$ for which $-\dfrac{\pi}{4}\le\theta\le\dfrac{\pi}{4}$. [3] [8 marks]",
  [r"(a) $r^{2}=4r\cos\theta$", r"(a) $x^{2}+y^{2}=4x$", r"(a) Circle centre $(2,0)$, radius $2$",
   r"(b) $4\cos\theta=2$", r"(b) $\left(2,\dfrac{\pi}{3}\right)$ and $\left(2,-\dfrac{\pi}{3}\right)$",
   r"(c) $\dfrac{1}{2}\displaystyle\int_{-\frac{\pi}{4}}^{\frac{\pi}{4}}16\cos^{2}\theta\,d\theta$", r"(c) $=4\left[\theta+\dfrac{1}{2}\sin2\theta\right]_{-\frac{\pi}{4}}^{\frac{\pi}{4}}$", r"(c) $=2\pi+4$"]),
]
