# Exam-style questions for Pure Mathematics 4 (WMA14), written for IAL Revise (not Pearson questions).
# Every answer was checked with sympy (see check_p4.py). Row: (topic index, question, [mark points])
U = 'WMA14'
Q = [
 (0, r"(a) Express $\dfrac{7x+1}{(x+1)(2x-1)}$ in partial fractions. [3]" "\n"
     r"(b) Hence find the exact value of $\displaystyle\int_{1}^{2}\frac{7x+1}{(x+1)(2x-1)}\,dx$, giving your answer in the form $a\ln3+b\ln2$. [4] [7 marks]",
  [r"(a) $7x+1\equiv A(2x-1)+B(x+1)$", r"(a) $x=-1$: $A=2$", r"(a) $x=\dfrac{1}{2}$: $B=3$, so $\dfrac{2}{x+1}+\dfrac{3}{2x-1}$",
   r"(b) $2\ln|x+1|$", r"(b) $+\dfrac{3}{2}\ln|2x-1|$", r"(b) $\left(2\ln3+\dfrac{3}{2}\ln3\right)-\left(2\ln2+0\right)$",
   r"(b) $\dfrac{7}{2}\ln3-2\ln2$"]),
 (0, r"(a) Express $\dfrac{3x^{2}+9x+7}{(x+1)(x+2)^{2}}$ in partial fractions. [4]" "\n"
     r"(b) Hence find the exact value of $\displaystyle\int_{0}^{1}\frac{3x^{2}+9x+7}{(x+1)(x+2)^{2}}\,dx$. [4] [8 marks]",
  [r"(a) $\dfrac{A}{x+1}+\dfrac{B}{x+2}+\dfrac{C}{(x+2)^{2}}$", r"(a) $A=1$", r"(a) $C=-1$", r"(a) $B=2$",
   r"(b) $\ln|x+1|+2\ln|x+2|$", r"(b) $+\dfrac{1}{x+2}$",
   r"(b) $\left(\ln2+2\ln3+\dfrac{1}{3}\right)-\left(2\ln2+\dfrac{1}{2}\right)$", r"(b) $2\ln3-\ln2-\dfrac{1}{6}$"]),
 (1, r"(a) Find the binomial expansion of $\sqrt{1+4x}$, in ascending powers of $x$, up to and including the term in $x^{3}$. State the values of $x$ for which it is valid. [5]" "\n"
     r"(b) Use your expansion with $x=0.01$ to estimate $\sqrt{1.04}$, and hence estimate $\sqrt{26}$ to 5 decimal places. [4] [9 marks]",
  [r"(a) $1+\dfrac{1}{2}(4x)$", r"(a) $+\dfrac{\frac{1}{2}\left(-\frac{1}{2}\right)}{2!}(4x)^{2}$", r"(a) $=1+2x-2x^{2}$", r"(a) $+4x^{3}$",
   r"(a) Valid for $|x|<\dfrac{1}{4}$",
   r"(b) $1+0.02-0.0002+0.000004$", r"(b) $=1.019804$",
   r"(b) $\sqrt{1.04}=\dfrac{\sqrt{26}}{5}$", r"(b) $\sqrt{26}\approx5.09902$"]),
 (1, r"(a) Find the binomial expansion of $\dfrac{1}{(2-x)^{2}}$, in ascending powers of $x$, up to and including the term in $x^{3}$. State the values of $x$ for which it is valid. [6]" "\n"
     r"(b) Find the coefficient of $x^{2}$ in the expansion of $\dfrac{1+3x}{(2-x)^{2}}$. [2] [8 marks]",
  [r"(a) Takes out the factor: $2^{-2}\left(1-\dfrac{x}{2}\right)^{-2}$", r"(a) $\dfrac{1}{4}\left(1+x+\ldots\right)$",
   r"(a) $\dfrac{1}{4}$", r"(a) $+\dfrac{1}{4}x+\dfrac{3}{16}x^{2}$", r"(a) $+\dfrac{1}{8}x^{3}$", r"(a) Valid for $|x|<2$",
   r"(b) $\dfrac{3}{16}+3\times\dfrac{1}{4}$", r"(b) $=\dfrac{15}{16}$"]),
 (2, r"A curve has parametric equations $x=t-1$, $y=t^{2}+2t$." "\n"
     r"(a) Find a Cartesian equation of the curve in the form $y=f(x)$. [2]" "\n"
     r"(b) Find $\dfrac{dy}{dx}$ in terms of $t$. [2]" "\n"
     r"(c) Find an equation of the normal to the curve at the point where $t=1$, in the form $ax+by+c=0$. [3]" "\n"
     r"(d) Find the coordinates of the point where this normal meets the curve again. [3] [10 marks]",
  [r"(a) $t=x+1$", r"(a) $y=(x+1)^{2}+2(x+1)=x^{2}+4x+3$",
   r"(b) $\dfrac{dx}{dt}=1$, $\dfrac{dy}{dt}=2t+2$", r"(b) $\dfrac{dy}{dx}=2t+2$",
   r"(c) At $t=1$: point $(0,3)$, gradient $4$", r"(c) Normal gradient $-\dfrac{1}{4}$", r"(c) $x+4y-12=0$",
   r"(d) $x^{2}+4x+3=3-\dfrac{x}{4}$", r"(d) $x\left(x+\dfrac{17}{4}\right)=0$", r"(d) $\left(-\dfrac{17}{4},\ \dfrac{65}{16}\right)$"]),
 (2, r"A curve has parametric equations $x=3\cos t$, $y=2\sin t$, $0\le t<2\pi$." "\n"
     r"(a) Find a Cartesian equation of the curve. [2]" "\n"
     r"(b) Find $\dfrac{dy}{dx}$ in terms of $t$. [2]" "\n"
     r"(c) Show that the tangent at the point where $t=\dfrac{\pi}{4}$ has equation $2x+3y=6\sqrt{2}$. [3]" "\n"
     r"(d) Using integration, show that the area enclosed by the curve is $6\pi$. [3] [10 marks]",
  [r"(a) Uses $\cos^{2}t+\sin^{2}t=1$", r"(a) $\dfrac{x^{2}}{9}+\dfrac{y^{2}}{4}=1$",
   r"(b) $\dfrac{dx}{dt}=-3\sin t$, $\dfrac{dy}{dt}=2\cos t$", r"(b) $\dfrac{dy}{dx}=-\dfrac{2\cos t}{3\sin t}$",
   r"(c) Point $\left(\dfrac{3}{\sqrt{2}},\ \sqrt{2}\right)$, gradient $-\dfrac{2}{3}$", r"(c) $y-\sqrt{2}=-\dfrac{2}{3}\left(x-\dfrac{3}{\sqrt{2}}\right)$",
   r"(c) Rearranges to $2x+3y=6\sqrt{2}$",
   r"(d) Area $=4\displaystyle\int_{0}^{\frac{\pi}{2}}2\sin t\times3\sin t\,dt$ (quarter by symmetry)",
   r"(d) Uses $\sin^{2}t=\dfrac{1}{2}(1-\cos2t)$: $12\left[t-\dfrac{1}{2}\sin2t\right]_{0}^{\frac{\pi}{2}}$", r"(d) $=6\pi$"]),
 (3, r"The curve $C$ has equation $x^{2}+3xy+y^{2}=11$." "\n"
     r"(a) Find $\dfrac{dy}{dx}$ in terms of $x$ and $y$. [4]" "\n"
     r"(b) Show that $(1,2)$ lies on $C$ and find an equation of the tangent there, in the form $ax+by+c=0$. [3]" "\n"
     r"(c) Show that $C$ has no stationary points. [2] [9 marks]",
  [r"(a) $2x+2y\dfrac{dy}{dx}$", r"(a) Product rule: $3y+3x\dfrac{dy}{dx}$", r"(a) Collects terms", r"(a) $\dfrac{dy}{dx}=-\dfrac{2x+3y}{3x+2y}$",
   r"(b) $1+6+4=11$ ✓", r"(b) Gradient $-\dfrac{8}{7}$", r"(b) $8x+7y-22=0$",
   r"(c) $\dfrac{dy}{dx}=0$ needs $2x+3y=0$; substitutes $x=-\dfrac{3}{2}y$", r"(c) Gets $-\dfrac{5}{4}y^{2}=11$, which has no real solution"]),
 (3, r"(a) Given $y=3^{x}$, show that $\dfrac{dy}{dx}=3^{x}\ln3$. [3]" "\n"
     r"(b) The curve $x^{3}+y^{3}=9xy$ passes through $P(2,4)$. Find $\dfrac{dy}{dx}$ in terms of $x$ and $y$. [4]" "\n"
     r"(c) Find an equation of the normal to the curve at $P$, in the form $ax+by+c=0$. [3] [10 marks]",
  [r"(a) $\ln y=x\ln3$", r"(a) $\dfrac{1}{y}\dfrac{dy}{dx}=\ln3$", r"(a) $\dfrac{dy}{dx}=y\ln3=3^{x}\ln3$",
   r"(b) $3x^{2}+3y^{2}\dfrac{dy}{dx}$", r"(b) $=9y+9x\dfrac{dy}{dx}$", r"(b) Collects terms", r"(b) $\dfrac{dy}{dx}=\dfrac{3y-x^{2}}{y^{2}-3x}$",
   r"(c) At $P$: $\dfrac{12-4}{16-6}=\dfrac{4}{5}$", r"(c) Normal gradient $-\dfrac{5}{4}$", r"(c) $5x+4y-26=0$"]),
 (4, r"(a) Find $\displaystyle\int xe^{2x}\,dx$. [3]" "\n"
     r"(b) Find the exact value of $\displaystyle\int_{1}^{e}x^{2}\ln x\,dx$. [4] [7 marks]",
  [r"(a) Parts with $u=x$, $\dfrac{dv}{dx}=e^{2x}$", r"(a) $\dfrac{1}{2}xe^{2x}-\displaystyle\int\frac{1}{2}e^{2x}dx$", r"(a) $\dfrac{1}{2}xe^{2x}-\dfrac{1}{4}e^{2x}+c$",
   r"(b) Parts with $u=\ln x$, $\dfrac{dv}{dx}=x^{2}$", r"(b) $\dfrac{x^{3}}{3}\ln x-\displaystyle\int\frac{x^{2}}{3}dx$",
   r"(b) $\left[\dfrac{x^{3}}{3}\ln x-\dfrac{x^{3}}{9}\right]_{1}^{e}$", r"(b) $=\dfrac{2e^{3}+1}{9}$"]),
 (4, r"(a) Use the substitution $u=x+1$ to find the exact value of $\displaystyle\int_{0}^{3}x\sqrt{x+1}\,dx$. [5]" "\n"
     r"(b) Find $\displaystyle\int\sin x\cos^{3}x\,dx$. [2]" "\n"
     r"(c) Find the exact value of $\displaystyle\int_{0}^{\frac{\pi}{2}}\sin^{2}x\,dx$. [2] [9 marks]",
  [r"(a) $\displaystyle\int_{1}^{4}(u-1)\sqrt{u}\,du$ (with new limits)", r"(a) $=\displaystyle\int_{1}^{4}\left(u^{\frac{3}{2}}-u^{\frac{1}{2}}\right)du$",
   r"(a) $\left[\dfrac{2}{5}u^{\frac{5}{2}}-\dfrac{2}{3}u^{\frac{3}{2}}\right]_{1}^{4}$", r"(a) $\left(\dfrac{64}{5}-\dfrac{16}{3}\right)-\left(\dfrac{2}{5}-\dfrac{2}{3}\right)$", r"(a) $=\dfrac{116}{15}$",
   r"(b) Recognises the form $f'(x)\left[f(x)\right]^{3}$ with $f(x)=\cos x$", r"(b) $-\dfrac{1}{4}\cos^{4}x+c$",
   r"(c) $\dfrac{1}{2}\displaystyle\int_{0}^{\frac{\pi}{2}}(1-\cos2x)\,dx$", r"(c) $=\dfrac{\pi}{4}$"]),
 (5, r"(a) Solve the differential equation $\dfrac{dy}{dx}=2xy^{2}$, given that $y=1$ when $x=0$. Give $y$ in terms of $x$. [6]" "\n"
     r"(b) Find $y$ when $x=\dfrac{1}{2}$. [1] [7 marks]",
  [r"(a) Separates: $\displaystyle\int\frac{1}{y^{2}}dy=\int2x\,dx$", r"(a) $-\dfrac{1}{y}$", r"(a) $=x^{2}+c$",
   r"(a) Uses $x=0$, $y=1$: $c=-1$", r"(a) $-\dfrac{1}{y}=x^{2}-1$", r"(a) $y=\dfrac{1}{1-x^{2}}$",
   r"(b) $y=\dfrac{4}{3}$"]),
 (5, r"A cup of tea cools in a room at $20^{\circ}\mathrm{C}$. Its temperature $\theta^{\circ}\mathrm{C}$ after $t$ minutes satisfies $\dfrac{d\theta}{dt}=-k(\theta-20)$, where $k$ is a positive constant. Initially $\theta=90$." "\n"
     r"(a) Show that $\theta=20+70e^{-kt}$. [4]" "\n"
     r"(b) After $10$ minutes the temperature is $55^{\circ}\mathrm{C}$. Find the exact value of $k$. [2]" "\n"
     r"(c) Find the time taken for the tea to cool to $30^{\circ}\mathrm{C}$, to the nearest tenth of a minute. [3] [9 marks]",
  [r"(a) $\displaystyle\int\frac{1}{\theta-20}d\theta=\int-k\,dt$", r"(a) $\ln(\theta-20)=-kt+c$",
   r"(a) $t=0$, $\theta=90$: $c=\ln70$", r"(a) $\theta-20=70e^{-kt}$, so $\theta=20+70e^{-kt}$",
   r"(b) $35=70e^{-10k}$", r"(b) $k=\dfrac{\ln2}{10}$",
   r"(c) $10=70e^{-kt}$", r"(c) $t=\dfrac{\ln7}{k}=\dfrac{10\ln7}{\ln2}$", r"(c) $t=28.1$ minutes"]),
 (6, r"The lines $l_{1}$ and $l_{2}$ have equations" "\n"
     r"$l_{1}:\ \mathbf{r}=(\mathbf{i}+2\mathbf{j}-\mathbf{k})+\lambda(2\mathbf{i}-\mathbf{j}+3\mathbf{k})$" "\n"
     r"$l_{2}:\ \mathbf{r}=(2\mathbf{i}-\mathbf{j}+3\mathbf{k})+\mu(\mathbf{i}+2\mathbf{j}-\mathbf{k})$" "\n"
     r"(a) Show that $l_{1}$ and $l_{2}$ meet, and find the position vector of their point of intersection. [5]" "\n"
     r"(b) Find the acute angle between $l_{1}$ and $l_{2}$, to one decimal place. [3] [8 marks]",
  [r"(a) $1+2\lambda=2+\mu$ and $2-\lambda=-1+2\mu$", r"(a) Solves: $\lambda=1$", r"(a) $\mu=1$",
   r"(a) Checks the $\mathbf{k}$ components: $-1+3=2$ and $3-1=2$ ✓", r"(a) $3\mathbf{i}+\mathbf{j}+2\mathbf{k}$",
   r"(b) $(2,-1,3)\cdot(1,2,-1)=2-2-3=-3$", r"(b) $\cos\theta=\dfrac{3}{\sqrt{14}\sqrt{6}}$", r"(b) $70.9^{\circ}$"]),
 (6, r"The points $A$ and $B$ have position vectors $\mathbf{i}+2\mathbf{k}$ and $3\mathbf{i}+4\mathbf{j}-2\mathbf{k}$. The point $C$ has position vector $5\mathbf{i}+\mathbf{j}$." "\n"
     r"(a) Find $\overrightarrow{AB}$ and $|\overrightarrow{AB}|$. [2]" "\n"
     r"(b) Write down a vector equation of the line $AB$. [1]" "\n"
     r"(c) The point $P$ on line $AB$ is such that $CP$ is perpendicular to $AB$. Find the position vector of $P$. [4]" "\n"
     r"(d) Hence find the shortest distance from $C$ to the line $AB$, to 3 significant figures. [2] [9 marks]",
  [r"(a) $\overrightarrow{AB}=2\mathbf{i}+4\mathbf{j}-4\mathbf{k}$", r"(a) $|\overrightarrow{AB}|=6$",
   r"(b) $\mathbf{r}=(\mathbf{i}+2\mathbf{k})+t(2\mathbf{i}+4\mathbf{j}-4\mathbf{k})$",
   r"(c) $\overrightarrow{CP}=(2t-4)\mathbf{i}+(4t-1)\mathbf{j}+(2-4t)\mathbf{k}$", r"(c) $\overrightarrow{CP}\cdot(2,4,-4)=0$",
   r"(c) $36t-20=0$, so $t=\dfrac{5}{9}$", r"(c) $\dfrac{19}{9}\mathbf{i}+\dfrac{20}{9}\mathbf{j}-\dfrac{2}{9}\mathbf{k}$",
   r"(d) $|\overrightarrow{CP}|=\dfrac{\sqrt{801}}{9}$", r"(d) $=3.14$"]),
]
