# Exam-style questions for Pure Mathematics 3 (WMA13), written for IAL Revise (not Pearson questions).
# Every answer was checked with sympy (see check_p3.py). Row: (topic index, question, [mark points])
U = 'WMA13'
Q = [
 (0, r"(a) Simplify fully $\dfrac{2x^{2}+5x-3}{x^{2}-9}$. [3]" "\n"
     r"(b) Hence solve $\dfrac{2x^{2}+5x-3}{x^{2}-9}=3$. [2]" "\n"
     r"(c) Write $\dfrac{2}{x-3}-\dfrac{1}{x+3}$ as a single fraction in its simplest form. [2] [7 marks]",
  [r"(a) Numerator: $(2x-1)(x+3)$", r"(a) Denominator: $(x-3)(x+3)$", r"(a) $\dfrac{2x-1}{x-3}$",
   r"(b) $2x-1=3(x-3)$", r"(b) $x=8$ (allowed, since $x\neq\pm3$)",
   r"(c) $\dfrac{2(x+3)-(x-3)}{(x-3)(x+3)}$", r"(c) $\dfrac{x+9}{x^{2}-9}$"]),
 (0, r"$f(x)=1-\dfrac{3}{x+2}+\dfrac{6}{(x+2)^{2}}$, $x\neq-2$" "\n"
     r"(a) Show that $f(x)=\dfrac{x^{2}+x+4}{(x+2)^{2}}$. [3]" "\n"
     r"(b) Hence show that $f(x)>0$ for all $x\neq-2$. [3]" "\n"
     r"(c) Solve $f(x)=1$. [2] [8 marks]",
  [r"(a) Common denominator $(x+2)^{2}$", r"(a) $(x+2)^{2}-3(x+2)+6$", r"(a) $=x^{2}+4x+4-3x-6+6=x^{2}+x+4$",
   r"(b) Discriminant of $x^{2}+x+4$: $1-16=-15<0$ (or completes the square: $\left(x+\frac{1}{2}\right)^{2}+\frac{15}{4}$)",
   r"(b) So the numerator is always positive", r"(b) and $(x+2)^{2}>0$ for $x\neq-2$, so $f(x)>0$",
   r"(c) $x^{2}+x+4=x^{2}+4x+4$", r"(c) $x=0$"]),
 (1, r"$f(x)=2x+3$, $x\in\mathbb{R}$ and $g(x)=\dfrac{4}{x-1}$, $x>1$" "\n"
     r"(a) Find $fg(3)$. [2]" "\n"
     r"(b) Find $g^{-1}(x)$ and state its domain. [4]" "\n"
     r"(c) Solve $fg(x)=11$. [2] [8 marks]",
  [r"(a) $g(3)=2$", r"(a) $f(2)=7$",
   r"(b) $y=\dfrac{4}{x-1}$, so $x-1=\dfrac{4}{y}$", r"(b) $x=1+\dfrac{4}{y}$", r"(b) $g^{-1}(x)=1+\dfrac{4}{x}$",
   r"(b) Domain $x>0$ (the range of $g$)",
   r"(c) $\dfrac{8}{x-1}+3=11$", r"(c) $x-1=1$, so $x=2$"]),
 (1, r"(a) Sketch the graph of $y=|2x-5|$, showing the coordinates of the points where it meets the axes. [2]" "\n"
     r"(b) Solve $|2x-5|=x+1$. [4]" "\n"
     r"(c) Hence find the set of values of $x$ for which $|2x-5|<x+1$. [2] [8 marks]",
  [r"(a) V shape with vertex at $\left(\dfrac{5}{2},0\right)$", r"(a) Meets the $y$-axis at $(0,5)$",
   r"(b) $2x-5=x+1$", r"(b) $x=6$", r"(b) $-(2x-5)=x+1$", r"(b) $x=\dfrac{4}{3}$",
   r"(c) The line is above the V between the two solutions", r"(c) $\dfrac{4}{3}<x<6$"]),
 (2, r"The population $P$ of a colony of bacteria after $t$ hours is modelled by $P=200e^{0.3t}$." "\n"
     r"(a) State the initial population. [1]" "\n"
     r"(b) Find the population after $5$ hours, to the nearest whole number. [1]" "\n"
     r"(c) Find the time when the population reaches $1000$, to 3 significant figures. [3]" "\n"
     r"(d) Find the rate at which the population is growing when $t=5$. [2] [7 marks]",
  [r"(a) $200$", r"(b) $200e^{1.5}=896$",
   r"(c) $e^{0.3t}=5$", r"(c) $0.3t=\ln5$", r"(c) $t=5.36$ hours",
   r"(d) $\dfrac{dP}{dt}=60e^{0.3t}$", r"(d) $60e^{1.5}=269$ bacteria per hour"]),
 (2, r"(a) Solve $e^{2x}-5e^{x}+6=0$, giving exact answers. [4]" "\n"
     r"(b) Solve $2\ln x-\ln(x+2)=\ln3$, giving your answer in exact form. [4] [8 marks]",
  [r"(a) $(e^{x}-2)(e^{x}-3)=0$", r"(a) $e^{x}=2$ or $e^{x}=3$", r"(a) $x=\ln2$", r"(a) $x=\ln3$",
   r"(b) $\ln\dfrac{x^{2}}{x+2}=\ln3$", r"(b) $x^{2}-3x-6=0$", r"(b) $x=\dfrac{3\pm\sqrt{33}}{2}$",
   r"(b) $x=\dfrac{3+\sqrt{33}}{2}$ only (since $x>0$)"]),
 (3, r"(a) Solve, for $0\le\theta<360^{\circ}$, $\sec^{2}\theta-3\tan\theta+1=0$, giving answers to one decimal place where appropriate. [6]" "\n"
     r"(b) Prove that $\sec\theta-\cos\theta\equiv\sin\theta\tan\theta$. [2] [8 marks]",
  [r"(a) Uses $\sec^{2}\theta=1+\tan^{2}\theta$", r"(a) $\tan^{2}\theta-3\tan\theta+2=0$", r"(a) $(\tan\theta-1)(\tan\theta-2)=0$",
   r"(a) $\tan\theta=1$: $\theta=45^{\circ},\ 225^{\circ}$", r"(a) $\tan\theta=2$: $\theta=63.4^{\circ}$", r"(a) and $243.4^{\circ}$",
   r"(b) $\dfrac{1}{\cos\theta}-\cos\theta=\dfrac{1-\cos^{2}\theta}{\cos\theta}$", r"(b) $=\dfrac{\sin^{2}\theta}{\cos\theta}=\sin\theta\tan\theta$"]),
 (3, r"(a) Given that $\theta=\arcsin\dfrac{1}{3}$, find the exact values of $\cot\theta$ and $\sec\theta$. [4]" "\n"
     r"(b) Solve, for $0\le x<2\pi$, $3\operatorname{cosec}^{2}x-5\cot x-5=0$, giving answers to 3 significant figures. [5] [9 marks]",
  [r"(a) $\cos\theta=\sqrt{1-\frac{1}{9}}=\dfrac{2\sqrt{2}}{3}$ ($\theta$ is acute)", r"(a) $\cot\theta=2\sqrt{2}$",
   r"(a) $\sec\theta=\dfrac{3}{2\sqrt{2}}$", r"(a) $=\dfrac{3\sqrt{2}}{4}$",
   r"(b) Uses $\operatorname{cosec}^{2}x=1+\cot^{2}x$: $3\cot^{2}x-5\cot x-2=0$", r"(b) $(3\cot x+1)(\cot x-2)=0$",
   r"(b) $\tan x=\dfrac{1}{2}$: $x=0.464,\ 3.61$", r"(b) $\tan x=-3$: $x=1.89$", r"(b) and $5.03$"]),
 (4, r"(a) Write $3\cos\theta+4\sin\theta$ in the form $R\cos(\theta-\alpha)$, where $R>0$ and $0<\alpha<90^{\circ}$. Give $\alpha$ to 2 decimal places. [4]" "\n"
     r"(b) Hence solve, for $0\le\theta<360^{\circ}$, $3\cos\theta+4\sin\theta=2.5$, to one decimal place. [4]" "\n"
     r"(c) Find the maximum value of $\dfrac{12}{7+3\cos\theta+4\sin\theta}$. [2] [10 marks]",
  [r"(a) $R\cos\alpha=3$ and $R\sin\alpha=4$", r"(a) $R=5$", r"(a) $\tan\alpha=\dfrac{4}{3}$", r"(a) $\alpha=53.13^{\circ}$",
   r"(b) $\cos(\theta-53.13^{\circ})=0.5$", r"(b) $\theta-53.13^{\circ}=60^{\circ}$ or $300^{\circ}$", r"(b) $\theta=113.1^{\circ}$", r"(b) $\theta=353.1^{\circ}$",
   r"(c) Uses the minimum of the denominator: $7-5=2$", r"(c) Maximum $=6$"]),
 (4, r"(a) Show that $\sin(x+30^{\circ})+\cos(x+60^{\circ})\equiv\cos x$. [3]" "\n"
     r"(b) Solve, for $0\le x<360^{\circ}$, $\cos2x=3\sin x-1$. [4]" "\n"
     r"(c) Given that $\tan A=\dfrac{1}{2}$ and $\tan B=\dfrac{1}{3}$, find the exact value of $\tan(A+B)$. [2] [9 marks]",
  [r"(a) Expands $\sin(x+30^{\circ})=\dfrac{\sqrt{3}}{2}\sin x+\dfrac{1}{2}\cos x$",
   r"(a) Expands $\cos(x+60^{\circ})=\dfrac{1}{2}\cos x-\dfrac{\sqrt{3}}{2}\sin x$", r"(a) Adds to get $\cos x$",
   r"(b) Uses $\cos2x=1-2\sin^{2}x$", r"(b) $2\sin^{2}x+3\sin x-2=0$", r"(b) $(2\sin x-1)(\sin x+2)=0$, so $\sin x=\dfrac{1}{2}$",
   r"(b) $x=30^{\circ},\ 150^{\circ}$",
   r"(c) $\dfrac{\frac{1}{2}+\frac{1}{3}}{1-\frac{1}{2}\times\frac{1}{3}}$", r"(c) $=1$"]),
 (5, r"The curve $C$ has equation $y=x^{2}e^{3x}$." "\n"
     r"(a) Show that $\dfrac{dy}{dx}=xe^{3x}(2+3x)$. [3]" "\n"
     r"(b) Find the exact coordinates of the stationary points of $C$. [3]" "\n"
     r"(c) Differentiate $\dfrac{\ln(x^{2}+1)}{x}$ with respect to $x$. [3] [9 marks]",
  [r"(a) Uses the product rule", r"(a) $2xe^{3x}+3x^{2}e^{3x}$", r"(a) $=xe^{3x}(2+3x)$",
   r"(b) $e^{3x}>0$, so $x=0$ or $x=-\dfrac{2}{3}$", r"(b) $(0,0)$", r"(b) $\left(-\dfrac{2}{3},\ \dfrac{4}{9}e^{-2}\right)$",
   r"(c) Uses the quotient rule", r"(c) Derivative of $\ln(x^{2}+1)$ is $\dfrac{2x}{x^{2}+1}$",
   r"(c) $\dfrac{\frac{2x^{2}}{x^{2}+1}-\ln(x^{2}+1)}{x^{2}}$"]),
 (5, r"(a) Differentiate $y=\sqrt{4x+1}$. [2]" "\n"
     r"(b) A curve has equation $x=3\sin2y$. Find $\dfrac{dy}{dx}$ in terms of $y$. [3]" "\n"
     r"(c) Find an equation of the tangent to this curve at the point where $y=\dfrac{\pi}{12}$. [3] [8 marks]",
  [r"(a) Uses the chain rule: $\dfrac{1}{2}(4x+1)^{-\frac{1}{2}}\times4$", r"(a) $\dfrac{2}{\sqrt{4x+1}}$",
   r"(b) $\dfrac{dx}{dy}=6\cos2y$", r"(b) Uses $\dfrac{dy}{dx}=1\Big/\dfrac{dx}{dy}$", r"(b) $\dfrac{dy}{dx}=\dfrac{1}{6\cos2y}$",
   r"(c) $x=3\sin\dfrac{\pi}{6}=\dfrac{3}{2}$", r"(c) $\dfrac{dy}{dx}=\dfrac{1}{6\times\frac{\sqrt{3}}{2}}=\dfrac{\sqrt{3}}{9}$",
   r"(c) $y-\dfrac{\pi}{12}=\dfrac{\sqrt{3}}{9}\left(x-\dfrac{3}{2}\right)$"]),
 (6, r"$f(x)=x^{3}-3x-5$" "\n"
     r"(a) Show that $f(x)=0$ has a root $\alpha$ between $x=2$ and $x=3$. [2]" "\n"
     r"(b) Show that $f(x)=0$ can be written as $x=\sqrt[3]{3x+5}$. [1]" "\n"
     r"(c) Using $x_{n+1}=\sqrt[3]{3x_{n}+5}$ with $x_{0}=2$, find $x_{1}$, $x_{2}$ and $x_{3}$ to 4 decimal places. [3]" "\n"
     r"(d) Show that $\alpha=2.279$ to 3 decimal places. [3] [9 marks]",
  [r"(a) $f(2)=-3$ and $f(3)=13$", r"(a) Sign change and $f$ is continuous, so a root lies between",
   r"(b) $x^{3}=3x+5$, so $x=\sqrt[3]{3x+5}$",
   r"(c) $x_{1}=2.2240$", r"(c) $x_{2}=2.2684$", r"(c) $x_{3}=2.2770$",
   r"(d) Chooses the interval $[2.2785,\ 2.2795]$", r"(d) $f(2.2785)<0$ and $f(2.2795)>0$",
   r"(d) Sign change, so $\alpha=2.279$ to 3 d.p."]),
 (6, r"$g(x)=e^{x}-4x$" "\n"
     r"(a) Show that $g(x)=0$ has a root $\beta$ in the interval $[0,1]$. [2]" "\n"
     r"(b) Using $x_{n+1}=\dfrac{e^{x_{n}}}{4}$ with $x_{0}=0.3$, find $x_{1}$, $x_{2}$ and $x_{3}$ to 4 decimal places. [3]" "\n"
     r"(c) Show that $\beta=0.3574$ to 4 decimal places. [3] [8 marks]",
  [r"(a) $g(0)=1>0$ and $g(1)=e-4<0$", r"(a) Sign change and $g$ is continuous, so a root lies in $[0,1]$",
   r"(b) $x_{1}=0.3375$", r"(b) $x_{2}=0.3503$", r"(b) $x_{3}=0.3549$",
   r"(c) Chooses the interval $[0.35735,\ 0.35745]$", r"(c) $g(0.35735)>0$ and $g(0.35745)<0$",
   r"(c) Sign change, so $\beta=0.3574$ to 4 d.p."]),
 (7, r"(a) Find $\displaystyle\int\left(e^{2x}+\frac{3}{x}\right)dx$. [3]" "\n"
     r"(b) Find the exact value of $\displaystyle\int_{0}^{\frac{\pi}{4}}\left(\sec^{2}x+\sin2x\right)dx$. [4] [7 marks]",
  [r"(a) $\dfrac{1}{2}e^{2x}$", r"(a) $+3\ln|x|$", r"(a) $+c$",
   r"(b) $\tan x$", r"(b) $-\dfrac{1}{2}\cos2x$", r"(b) $\left(1-0\right)-\left(0-\dfrac{1}{2}\right)$", r"(b) $=\dfrac{3}{2}$"]),
 (7, r"(a) Find $\displaystyle\int\left(\frac{4}{2x+1}+\cos3x\right)dx$. [3]" "\n"
     r"(b) Find the exact value of $\displaystyle\int_{1}^{e}\left(2x-\frac{3}{x}\right)dx$. [3]" "\n"
     r"(c) Evaluate $\displaystyle\int_{0}^{1}(2x+1)^{4}\,dx$. [3] [9 marks]",
  [r"(a) $2\ln|2x+1|$", r"(a) $+\dfrac{1}{3}\sin3x$", r"(a) $+c$",
   r"(b) $\left[x^{2}-3\ln x\right]_{1}^{e}$", r"(b) $(e^{2}-3)-(1-0)$", r"(b) $=e^{2}-4$",
   r"(c) $\left[\dfrac{(2x+1)^{5}}{10}\right]_{0}^{1}$", r"(c) $\dfrac{243-1}{10}$", r"(c) $=24.2$"]),
]
