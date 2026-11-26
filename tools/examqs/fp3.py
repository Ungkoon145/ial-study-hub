# Exam-style questions for Further Pure Mathematics 3 (WFM03), written for IAL Revise (not Pearson questions).
# Every answer was checked with sympy (see check_fp.py). Row: (topic index, question, [mark points])
U = 'WFM03'
Q = [
 (0, r"(a) Using the definitions of $\cosh x$ and $\sinh x$ in terms of exponentials, prove that $\cosh^{2}x-\sinh^{2}x\equiv1$. [3]" "\n"
     r"(b) Solve $2\cosh x-\sinh x=2$, giving your answers in exact form. [5] [8 marks]",
  [r"(a) $\cosh^{2}x=\dfrac{e^{2x}+2+e^{-2x}}{4}$", r"(a) $\sinh^{2}x=\dfrac{e^{2x}-2+e^{-2x}}{4}$", r"(a) Subtracts to get $1$",
   r"(b) $(e^{x}+e^{-x})-\dfrac{1}{2}(e^{x}-e^{-x})=2$", r"(b) $e^{x}+3e^{-x}=4$", r"(b) $e^{2x}-4e^{x}+3=0$",
   r"(b) $(e^{x}-1)(e^{x}-3)=0$", r"(b) $x=0$ or $x=\ln3$"]),
 (0, r"(a) Show that $\operatorname{artanh}x=\dfrac{1}{2}\ln\left(\dfrac{1+x}{1-x}\right)$, $|x|<1$. [4]" "\n"
     r"(b) Solve $\operatorname{arsinh}x=\ln3$. [2] [6 marks]",
  [r"(a) Lets $y=\operatorname{artanh}x$, so $x=\tanh y=\dfrac{e^{2y}-1}{e^{2y}+1}$", r"(a) $x(e^{2y}+1)=e^{2y}-1$",
   r"(a) $e^{2y}=\dfrac{1+x}{1-x}$", r"(a) $y=\dfrac{1}{2}\ln\left(\dfrac{1+x}{1-x}\right)$",
   r"(b) $x=\sinh(\ln3)=\dfrac{3-\frac{1}{3}}{2}$", r"(b) $x=\dfrac{4}{3}$"]),
 (1, r"The ellipse $E$ has equation $\dfrac{x^{2}}{25}+\dfrac{y^{2}}{9}=1$." "\n"
     r"(a) Find the eccentricity of $E$, the coordinates of its foci and the equations of its directrices. [4]" "\n"
     r"(b) Show that the tangent to $E$ at $P(5\cos\theta,3\sin\theta)$ has equation $\dfrac{x\cos\theta}{5}+\dfrac{y\sin\theta}{3}=1$. [4] [8 marks]",
  [r"(a) $b^{2}=a^{2}(1-e^{2})$: $9=25(1-e^{2})$", r"(a) $e=\dfrac{4}{5}$", r"(a) Foci $(\pm4,0)$", r"(a) Directrices $x=\pm\dfrac{25}{4}$",
   r"(b) $\dfrac{dy}{dx}=\dfrac{3\cos\theta}{-5\sin\theta}$", r"(b) $y-3\sin\theta=-\dfrac{3\cos\theta}{5\sin\theta}(x-5\cos\theta)$",
   r"(b) Multiplies out and uses $\sin^{2}\theta+\cos^{2}\theta=1$", r"(b) Obtains the given equation"]),
 (1, r"The hyperbola $H$ has equation $\dfrac{x^{2}}{16}-\dfrac{y^{2}}{9}=1$." "\n"
     r"(a) Find the eccentricity, the coordinates of the foci and the equations of the asymptotes. [4]" "\n"
     r"(b) Show that $(4\cosh u,\,3\sinh u)$ lies on $H$ for every $u$. [1]" "\n"
     r"(c) Write down the equations of the directrices. [1] [6 marks]",
  [r"(a) $b^{2}=a^{2}(e^{2}-1)$: $9=16(e^{2}-1)$", r"(a) $e=\dfrac{5}{4}$", r"(a) Foci $(\pm5,0)$", r"(a) Asymptotes $y=\pm\dfrac{3}{4}x$",
   r"(b) $\cosh^{2}u-\sinh^{2}u=1$ ✓",
   r"(c) $x=\pm\dfrac{16}{5}$"]),
 (2, r"Differentiate with respect to $x$:" "\n"
     r"(a) $\arcsin(2x)$ [3]   (b) $\arctan(e^{x})$ [2]   (c) $\operatorname{arcosh}(3x)$ [2] [7 marks]",
  [r"(a) Uses the chain rule with $\dfrac{d}{du}\arcsin u=\dfrac{1}{\sqrt{1-u^{2}}}$", r"(a) $\dfrac{1}{\sqrt{1-4x^{2}}}\times2$", r"(a) $\dfrac{2}{\sqrt{1-4x^{2}}}$",
   r"(b) $\dfrac{1}{1+e^{2x}}\times e^{x}$", r"(b) $\dfrac{e^{x}}{1+e^{2x}}$",
   r"(c) $\dfrac{1}{\sqrt{9x^{2}-1}}\times3$", r"(c) $\dfrac{3}{\sqrt{9x^{2}-1}}$"]),
 (2, r"(a) Find $\displaystyle\int\frac{1}{\sqrt{x^{2}+4x+13}}\,dx$. [4]" "\n"
     r"(b) Find the exact value of $\displaystyle\int_{0}^{\frac{1}{2}}\frac{1}{\sqrt{1-x^{2}}}\,dx$. [2] [6 marks]",
  [r"(a) Completes the square: $(x+2)^{2}+9$", r"(a) Recognises the $\operatorname{arsinh}$ form", r"(a) $\operatorname{arsinh}\left(\dfrac{x+2}{3}\right)$", r"(a) $+c$",
   r"(b) $\left[\arcsin x\right]_{0}^{\frac{1}{2}}$", r"(b) $=\dfrac{\pi}{6}$"]),
 (3, r"$I_{n}=\displaystyle\int_{0}^{1}x^{n}e^{x}\,dx$, $n\ge0$" "\n"
     r"(a) Show that $I_{n}=e-nI_{n-1}$ for $n\ge1$. [4]" "\n"
     r"(b) Hence find the exact value of $I_{3}$. [3] [7 marks]",
  [r"(a) Integrates by parts with $u=x^{n}$, $\dfrac{dv}{dx}=e^{x}$", r"(a) $\left[x^{n}e^{x}\right]_{0}^{1}-n\displaystyle\int_{0}^{1}x^{n-1}e^{x}dx$",
   r"(a) $\left[x^{n}e^{x}\right]_{0}^{1}=e$", r"(a) $I_{n}=e-nI_{n-1}$",
   r"(b) $I_{0}=e-1$, $I_{1}=1$", r"(b) $I_{2}=e-2$", r"(b) $I_{3}=e-3(e-2)=6-2e$"]),
 (3, r"Find the exact length of the curve $y=\cosh x$ from $x=0$ to $x=\ln2$. [5] [5 marks]",
  [r"Uses $s=\displaystyle\int\sqrt{1+\left(\frac{dy}{dx}\right)^{2}}\,dx$", r"$\dfrac{dy}{dx}=\sinh x$, and $1+\sinh^{2}x=\cosh^{2}x$",
   r"$s=\displaystyle\int_{0}^{\ln2}\cosh x\,dx=\left[\sinh x\right]_{0}^{\ln2}$", r"$\sinh(\ln2)=\dfrac{2-\frac{1}{2}}{2}$", r"$=\dfrac{3}{4}$"]),
 (4, r"The plane $\Pi$ contains the points $A(1,0,2)$, $B(3,1,1)$ and $C(2,-1,4)$." "\n"
     r"(a) Find a vector normal to $\Pi$. [3]" "\n"
     r"(b) Find a Cartesian equation of $\Pi$. [2]" "\n"
     r"(c) Find the perpendicular distance from the origin to $\Pi$, to 3 significant figures. [2] [7 marks]",
  [r"(a) $\overrightarrow{AB}=(2,1,-1)$, $\overrightarrow{AC}=(1,-1,2)$", r"(a) Uses the cross product", r"(a) $\mathbf{n}=(1,-5,-3)$",
   r"(b) $x-5y-3z=d$ with $A$: $d=1-0-6$", r"(b) $x-5y-3z+5=0$",
   r"(c) $\dfrac{|5|}{\sqrt{1+25+9}}=\dfrac{5}{\sqrt{35}}$", r"(c) $0.845$"]),
 (4, r"The line $l$ has equation $\mathbf{r}=(\mathbf{i}+2\mathbf{j}+3\mathbf{k})+t(2\mathbf{i}+\mathbf{j}-\mathbf{k})$ and the plane $\Pi$ has equation $2x-y+z=9$." "\n"
     r"(a) Find the coordinates of the point where $l$ meets $\Pi$. [3]" "\n"
     r"(b) Find the acute angle between $l$ and $\Pi$, to one decimal place. [3] [6 marks]",
  [r"(a) $2(1+2t)-(2+t)+(3-t)=9$", r"(a) $t=3$", r"(a) $(7,5,0)$",
   r"(b) $\sin\phi=\dfrac{|(2,1,-1)\cdot(2,-1,1)|}{\sqrt{6}\sqrt{6}}$", r"(b) $=\dfrac{2}{6}$", r"(b) $\phi=19.5^{\circ}$"]),
 (5, r"$\mathbf{M}=\begin{pmatrix}4&1\\2&3\end{pmatrix}$" "\n"
     r"(a) Find the eigenvalues of $\mathbf{M}$. [3]" "\n"
     r"(b) Find a corresponding eigenvector for each eigenvalue. [3]" "\n"
     r"(c) Write down a matrix $\mathbf{P}$ and a diagonal matrix $\mathbf{D}$ such that $\mathbf{M}=\mathbf{P}\mathbf{D}\mathbf{P}^{-1}$. [2] [8 marks]",
  [r"(a) $\det(\mathbf{M}-\lambda\mathbf{I})=(4-\lambda)(3-\lambda)-2$", r"(a) $\lambda^{2}-7\lambda+10=0$", r"(a) $\lambda=2,\ 5$",
   r"(b) Solves $(\mathbf{M}-2\mathbf{I})\mathbf{x}=\mathbf{0}$", r"(b) $\lambda=2$: $\begin{pmatrix}1\\-2\end{pmatrix}$", r"(b) $\lambda=5$: $\begin{pmatrix}1\\1\end{pmatrix}$",
   r"(c) $\mathbf{P}=\begin{pmatrix}1&1\\-2&1\end{pmatrix}$", r"(c) $\mathbf{D}=\begin{pmatrix}2&0\\0&5\end{pmatrix}$ (columns in the matching order)"]),
 (5, r"$\mathbf{A}=\begin{pmatrix}1&2&0\\0&1&k\\2&0&1\end{pmatrix}$" "\n"
     r"(a) Find $\det\mathbf{A}$ in terms of $k$, and the value of $k$ for which $\mathbf{A}$ is singular. [2]" "\n"
     r"(b) For $k=1$, find $\mathbf{A}^{-1}$. [4] [6 marks]",
  [r"(a) $\det\mathbf{A}=1(1)-2(0-2k)=1+4k$", r"(a) Singular when $k=-\dfrac{1}{4}$",
   r"(b) $\det\mathbf{A}=5$", r"(b) Finds the matrix of cofactors", r"(b) Transposes and divides by $5$",
   r"(b) $\mathbf{A}^{-1}=\dfrac{1}{5}\begin{pmatrix}1&-2&2\\2&1&-1\\-2&4&1\end{pmatrix}$"]),
]
