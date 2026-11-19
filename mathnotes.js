/* Key points for each Maths topic, written for this site in our own words, with maths in LaTeX.
   MATH_KEYPOINTS[unit][topic index] is a list of short points. */
const MATH_KEYPOINTS = {
"WMA11": [
[
"Index laws: $a^{m}\\times a^{n}=a^{m+n}$, $(a^{m})^{n}=a^{mn}$, $a^{-n}=\\dfrac{1}{a^{n}}$, $a^{\\frac{m}{n}}=\\left(\\sqrt[n]{a}\\right)^{m}$.",
"Simplify surds with $\\sqrt{ab}=\\sqrt{a}\\sqrt{b}$, e.g. $\\sqrt{50}=5\\sqrt{2}$.",
"Rationalise $\\dfrac{1}{a+\\sqrt{b}}$ by multiplying top and bottom by $a-\\sqrt{b}$."
],
[
"Completing the square: $x^{2}+bx+c=\\left(x+\\dfrac{b}{2}\\right)^{2}-\\dfrac{b^{2}}{4}+c$; the turning point is $\\left(-\\dfrac{b}{2},\\ c-\\dfrac{b^{2}}{4}\\right)$.",
"Discriminant $b^{2}-4ac$: $>0$ two real roots, $=0$ one repeated root, $<0$ no real roots.",
"Quadratics in disguise: substitute, e.g. $u=x^{2}$ or $u=\\sqrt{x}$, then solve for $u$ first."
],
[
"Solve simultaneous linear and quadratic equations by substituting the linear one into the quadratic.",
"Quadratic inequalities: find the critical values, sketch, then choose the inside or outside region.",
"Never multiply an inequality by an expression that might be negative; multiplying by a negative number flips the sign."
],
[
"$y=f(x)+a$ moves up $a$; $y=f(x+a)$ moves left $a$; $y=af(x)$ stretches vertically by $a$; $y=f(ax)$ stretches horizontally by $\\dfrac{1}{a}$.",
"Cubic sketches: find roots and the $y$-intercept, and note a repeated root touches the axis.",
"$y=\\dfrac{k}{x}$ has asymptotes $x=0$ and $y=0$; count intersections of two curves to find the number of solutions."
],
[
"Gradient $m=\\dfrac{y_2-y_1}{x_2-x_1}$; line through $(x_1,y_1)$: $y-y_1=m(x-x_1)$.",
"Parallel lines have equal gradients; perpendicular gradients satisfy $m_1m_2=-1$.",
"\"Form $ax+by+c=0$\" means $a$, $b$, $c$ are integers."
],
[
"Sine rule $\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}$; cosine rule $a^{2}=b^{2}+c^{2}-2bc\\cos A$.",
"Area $=\\dfrac{1}{2}ab\\sin C$.",
"Ambiguous case: if $\\sin B=k$, both $B$ and $180^\\circ-B$ may be possible."
],
[
"$\\pi\\text{ rad}=180^\\circ$.",
"Arc length $s=r\\theta$ and sector area $A=\\dfrac{1}{2}r^{2}\\theta$, with $\\theta$ in radians.",
"Segment area $=\\dfrac{1}{2}r^{2}(\\theta-\\sin\\theta)$."
],
[
"$\\dfrac{d}{dx}\\left(x^{n}\\right)=nx^{n-1}$; write roots and fractions as powers first.",
"The gradient of the tangent is $\\dfrac{dy}{dx}$ at the point; the normal has gradient $-\\dfrac{1}{m}$.",
"Increasing where $\\dfrac{dy}{dx}>0$, decreasing where $\\dfrac{dy}{dx}<0$."
],
[
"$\\displaystyle\\int x^{n}\\,dx=\\frac{x^{n+1}}{n+1}+c$ for $n\\neq-1$.",
"Always add $+c$ to an indefinite integral.",
"Use a known point on the curve to find $c$."
]
],
"WMA12": [
[
"Factor theorem: $f(a)=0$ means $(x-a)$ is a factor; for $(ax-b)$, test $f\\left(\\dfrac{b}{a}\\right)$.",
"Use algebraic division (or comparing coefficients) to find the quadratic factor.",
"Remainder theorem: dividing $f(x)$ by $(x-a)$ leaves remainder $f(a)$."
],
[
"$(a+b)^{n}=\\displaystyle\\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^{r}$.",
"Keep brackets: the term in $x^{2}$ from $(1+3x)^{5}$ is $\\binom{5}{2}(3x)^{2}=90x^{2}$.",
"For an approximation, substitute a small value of $x$ into the first few terms."
],
[
"Circle with centre $(a,b)$ and radius $r$: $(x-a)^{2}+(y-b)^{2}=r^{2}$.",
"Complete the square in $x$ and $y$ to find the centre and radius.",
"A tangent is perpendicular to the radius; the perpendicular bisector of a chord passes through the centre."
],
[
"Arithmetic: $u_n=a+(n-1)d$, $S_n=\\dfrac{n}{2}\\left(2a+(n-1)d\\right)$.",
"Geometric: $u_n=ar^{n-1}$, $S_n=\\dfrac{a(1-r^{n})}{1-r}$.",
"A geometric series converges when $|r|<1$, with $S_\\infty=\\dfrac{a}{1-r}$."
],
[
"$\\log_a x=n\\iff a^{n}=x$.",
"Laws: $\\log ab=\\log a+\\log b$, $\\log\\dfrac{a}{b}=\\log a-\\log b$, $\\log a^{k}=k\\log a$.",
"Solve $a^{x}=b$ by taking logs: $x=\\dfrac{\\log b}{\\log a}$."
],
[
"$\\tan\\theta\\equiv\\dfrac{\\sin\\theta}{\\cos\\theta}$ and $\\sin^{2}\\theta+\\cos^{2}\\theta\\equiv1$.",
"Find every solution in the interval: use the CAST diagram or the graph symmetry.",
"For $\\sin2\\theta=k$ on $0\\le\\theta<360^\\circ$, solve for $2\\theta$ on $0\\le2\\theta<720^\\circ$, then halve."
],
[
"Stationary points: solve $\\dfrac{dy}{dx}=0$.",
"$\\dfrac{d^{2}y}{dx^{2}}>0$ gives a minimum and $\\dfrac{d^{2}y}{dx^{2}}<0$ a maximum.",
"Optimisation: write the quantity in one variable using the constraint, then differentiate."
],
[
"$\\displaystyle\\int_{a}^{b}f(x)\\,dx=F(b)-F(a)$.",
"Area below the $x$-axis comes out negative: split the integral at the roots.",
"Area between a line and a curve $=\\displaystyle\\int_{a}^{b}(\\text{top}-\\text{bottom})\\,dx$."
],
[
"$\\displaystyle\\int_{a}^{b}y\\,dx\\approx\\frac{h}{2}\\left[y_0+2(y_1+\\ldots+y_{n-1})+y_n\\right]$ with $h=\\dfrac{b-a}{n}$.",
"$n$ strips means $n+1$ ordinates.",
"It overestimates when the curve is convex (bending upwards) and underestimates when concave."
]
],
"WMA13": [
[
"Factorise fully before cancelling common factors.",
"To divide by a fraction, multiply by its reciprocal.",
"Improper fractions: divide first, e.g. $\\dfrac{x^{2}+1}{x-1}=x+1+\\dfrac{2}{x-1}$."
],
[
"$fg(x)$ means apply $g$ first, then $f$.",
"Inverse: swap $x$ and $y$ and rearrange; the domain of $f^{-1}$ is the range of $f$, and the graphs reflect in $y=x$.",
"$y=|f(x)|$ reflects the parts below the $x$-axis upwards; $y=f(|x|)$ reflects the right-hand side in the $y$-axis."
],
[
"$\\mathrm{e}^{\\ln x}=x$ and $\\ln\\mathrm{e}^{x}=x$.",
"$\\dfrac{d}{dx}\\mathrm{e}^{kx}=k\\mathrm{e}^{kx}$ and $\\dfrac{d}{dx}\\ln x=\\dfrac{1}{x}$.",
"Models like $y=ab^{t}$ become straight lines when you plot $\\log y$ against $t$."
],
[
"$\\sec\\theta=\\dfrac{1}{\\cos\\theta}$, $\\operatorname{cosec}\\theta=\\dfrac{1}{\\sin\\theta}$, $\\cot\\theta=\\dfrac{1}{\\tan\\theta}$.",
"$1+\\tan^{2}\\theta\\equiv\\sec^{2}\\theta$ and $1+\\cot^{2}\\theta\\equiv\\operatorname{cosec}^{2}\\theta$.",
"$\\arcsin$ and $\\arctan$ take values in $\\left[-\\dfrac{\\pi}{2},\\dfrac{\\pi}{2}\\right]$; $\\arccos$ in $[0,\\pi]$."
],
[
"$\\sin(A\\pm B)\\equiv\\sin A\\cos B\\pm\\cos A\\sin B$; $\\cos(A\\pm B)\\equiv\\cos A\\cos B\\mp\\sin A\\sin B$.",
"$\\sin2A\\equiv2\\sin A\\cos A$; $\\cos2A\\equiv\\cos^{2}A-\\sin^{2}A\\equiv2\\cos^{2}A-1\\equiv1-2\\sin^{2}A$.",
"$a\\cos\\theta+b\\sin\\theta\\equiv R\\cos(\\theta-\\alpha)$ with $R=\\sqrt{a^{2}+b^{2}}$ and $\\tan\\alpha=\\dfrac{b}{a}$; the maximum is $R$."
],
[
"Chain rule: $\\dfrac{dy}{dx}=\\dfrac{dy}{du}\\times\\dfrac{du}{dx}$.",
"Product rule: $(uv)^{\\prime}=u^{\\prime}v+uv^{\\prime}$; quotient rule: $\\left(\\dfrac{u}{v}\\right)^{\\prime}=\\dfrac{u^{\\prime}v-uv^{\\prime}}{v^{2}}$.",
"$\\dfrac{dx}{dy}=\\dfrac{1}{dy/dx}$."
],
[
"A sign change of a continuous $f(x)$ over an interval shows a root lies in it.",
"Iteration $x_{n+1}=g(x_n)$: give each value to the accuracy asked; it converges when $|g^{\\prime}(x)|<1$ near the root.",
"To show a root to a given accuracy, test the interval ends, e.g. $f(2.315)$ and $f(2.325)$."
],
[
"$\\displaystyle\\int\\mathrm{e}^{kx}\\,dx=\\frac{1}{k}\\mathrm{e}^{kx}+c$ and $\\displaystyle\\int\\frac{1}{x}\\,dx=\\ln|x|+c$.",
"$\\displaystyle\\int\\cos kx\\,dx=\\frac{1}{k}\\sin kx+c$ and $\\displaystyle\\int\\sin kx\\,dx=-\\frac{1}{k}\\cos kx+c$.",
"$\\displaystyle\\int\\frac{f^{\\prime}(x)}{f(x)}\\,dx=\\ln|f(x)|+c$."
]
],
"WMA14": [
[
"$\\dfrac{px+q}{(x-a)(x-b)}\\equiv\\dfrac{A}{x-a}+\\dfrac{B}{x-b}$.",
"A repeated factor needs $\\dfrac{B}{x-a}+\\dfrac{C}{(x-a)^{2}}$.",
"Find constants by substituting convenient values of $x$, then compare coefficients for the rest."
],
[
"$(1+x)^{n}=1+nx+\\dfrac{n(n-1)}{2!}x^{2}+\\dfrac{n(n-1)(n-2)}{3!}x^{3}+\\ldots$ for $|x|<1$.",
"For $(a+bx)^{n}$, take out $a^{n}$ first: $a^{n}\\left(1+\\dfrac{b}{a}x\\right)^{n}$, valid for $|x|<\\left|\\dfrac{a}{b}\\right|$.",
"Use partial fractions first to expand harder fractions."
],
[
"$\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}$.",
"Eliminate $t$ to get the Cartesian equation, using identities for trig parameters.",
"Area $=\\displaystyle\\int y\\,\\frac{dx}{dt}\\,dt$, with $t$-limits."
],
[
"Differentiate every term with respect to $x$: $\\dfrac{d}{dx}y^{2}=2y\\dfrac{dy}{dx}$.",
"Use the product rule for terms like $xy$: $\\dfrac{d}{dx}(xy)=y+x\\dfrac{dy}{dx}$.",
"$\\dfrac{d}{dx}a^{x}=a^{x}\\ln a$."
],
[
"Substitution: change $dx$ and the limits as well as the integrand.",
"By parts: $\\displaystyle\\int u\\frac{dv}{dx}\\,dx=uv-\\int v\\frac{du}{dx}\\,dx$; choose $u$ to become simpler when differentiated.",
"Use $\\cos2x$ identities to integrate $\\sin^{2}x$ and $\\cos^{2}x$."
],
[
"Separate the variables: $\\displaystyle\\int\\frac{1}{g(y)}\\,dy=\\int f(x)\\,dx$.",
"Add $+c$ on one side straight away, then use the initial conditions.",
"\"Rate of change proportional to\" means $\\dfrac{dy}{dt}=ky$."
],
[
"$|\\mathbf{a}|=\\sqrt{x^{2}+y^{2}+z^{2}}$; a vector line is $\\mathbf{r}=\\mathbf{a}+\\lambda\\mathbf{b}$.",
"$\\mathbf{a}\\cdot\\mathbf{b}=|\\mathbf{a}||\\mathbf{b}|\\cos\\theta$; perpendicular when $\\mathbf{a}\\cdot\\mathbf{b}=0$.",
"Lines intersect if one value of $\\lambda$ and one of $\\mu$ satisfy all three components; otherwise they are skew or parallel."
]
],
"WFM01": [
[
"$\\mathrm{i}^{2}=-1$; divide by multiplying by the conjugate of the denominator.",
"$|z|=\\sqrt{x^{2}+y^{2}}$; for $\\arg z$ check the quadrant on an Argand diagram.",
"Non-real roots of real polynomials come in conjugate pairs."
],
[
"For $ax^{2}+bx+c=0$: $\\alpha+\\beta=-\\dfrac{b}{a}$ and $\\alpha\\beta=\\dfrac{c}{a}$.",
"$\\alpha^{2}+\\beta^{2}=(\\alpha+\\beta)^{2}-2\\alpha\\beta$ and $\\alpha^{3}+\\beta^{3}=(\\alpha+\\beta)^{3}-3\\alpha\\beta(\\alpha+\\beta)$.",
"A new equation with given roots is $x^{2}-(\\text{sum})x+(\\text{product})=0$."
],
[
"Interval bisection: halve the interval and keep the half with a sign change.",
"Linear interpolation: use similar triangles between the two end points.",
"Newton–Raphson: $x_{n+1}=x_n-\\dfrac{f(x_n)}{f^{\\prime}(x_n)}$; it fails if $f^{\\prime}(x_n)$ is near $0$."
],
[
"Parabola $y^{2}=4ax$: focus $(a,0)$, directrix $x=-a$, parametric point $(at^{2},2at)$.",
"Rectangular hyperbola $xy=c^{2}$: parametric point $\\left(ct,\\dfrac{c}{t}\\right)$.",
"Any point on a parabola is the same distance from the focus as from the directrix."
],
[
"Matrices multiply rows by columns; $\\mathbf{AB}\\neq\\mathbf{BA}$ in general.",
"$\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=ad-bc$ and $\\mathbf{A}^{-1}=\\dfrac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$.",
"A matrix is singular when its determinant is $0$; $(\\mathbf{AB})^{-1}=\\mathbf{B}^{-1}\\mathbf{A}^{-1}$."
],
[
"The columns are the images of $\\begin{pmatrix}1\\\\0\\end{pmatrix}$ and $\\begin{pmatrix}0\\\\1\\end{pmatrix}$.",
"\"$\\mathbf{A}$ then $\\mathbf{B}$\" is the single matrix $\\mathbf{BA}$.",
"Area scale factor $=|\\det|$; a negative determinant means the orientation is reversed."
],
[
"$\\sum r=\\dfrac{1}{2}n(n+1)$, $\\sum r^{2}=\\dfrac{1}{6}n(n+1)(2n+1)$, $\\sum r^{3}=\\dfrac{1}{4}n^{2}(n+1)^{2}$.",
"Split sums: $\\sum(ar^{2}+br)=a\\sum r^{2}+b\\sum r$; $\\sum_{r=1}^{n}1=n$.",
"$\\displaystyle\\sum_{r=k}^{n}=\\sum_{r=1}^{n}-\\sum_{r=1}^{k-1}$; factorise the final answer."
],
[
"Basis: show the result is true for $n=1$.",
"Assume it is true for $n=k$ and use that to show it is true for $n=k+1$.",
"Conclude: true for $n=1$, and true for $k$ implies true for $k+1$, so true for all positive integers $n$."
]
],
"WFM02": [
[
"Multiply by a squared denominator, e.g. $(x-1)^{2}$, so the inequality sign is unchanged.",
"Or move everything to one side, combine into one fraction and use the critical values.",
"Values that make a denominator zero are never in the solution set."
],
[
"Write each term as $f(r)-f(r+1)$, often with partial fractions.",
"Write out the first few and last few terms to see what cancels.",
"For $\\displaystyle\\sum_{r=1}^{\\infty}$, let $n\\to\\infty$ in the final expression."
],
[
"De Moivre: $(\\cos\\theta+\\mathrm{i}\\sin\\theta)^{n}=\\cos n\\theta+\\mathrm{i}\\sin n\\theta$, and $z=r\\mathrm{e}^{\\mathrm{i}\\theta}$.",
"$z+\\dfrac{1}{z}=2\\cos\\theta$ and $z^{n}-\\dfrac{1}{z^{n}}=2\\mathrm{i}\\sin n\\theta$ when $|z|=1$.",
"$|z-a|=r$ is a circle; $|z-a|=|z-b|$ is a perpendicular bisector; $\\arg(z-a)=\\theta$ is a half-line."
],
[
"For $\\dfrac{dy}{dx}+P(x)y=Q(x)$, the integrating factor is $\\mathrm{e}^{\\int P\\,dx}$.",
"Then $\\dfrac{d}{dx}(y\\times\\text{IF})=Q\\times\\text{IF}$; integrate both sides.",
"Divide through first so that $\\dfrac{dy}{dx}$ has coefficient $1$."
],
[
"Auxiliary equation $am^{2}+bm+c=0$: real roots give $A\\mathrm{e}^{m_1x}+B\\mathrm{e}^{m_2x}$; a repeated root gives $(A+Bx)\\mathrm{e}^{mx}$.",
"Complex roots $p\\pm q\\mathrm{i}$ give $\\mathrm{e}^{px}(A\\cos qx+B\\sin qx)$.",
"General solution $=$ CF $+$ PI; if the trial PI is part of the CF, multiply it by $x$."
],
[
"$f(x)=f(0)+f^{\\prime}(0)x+\\dfrac{f^{\\prime\\prime}(0)}{2!}x^{2}+\\ldots$.",
"Taylor series about $a$: replace $x$ by $(x-a)$ and differentiate at $a$.",
"Combine known series by substituting or multiplying, e.g. $\\mathrm{e}^{2x}$ or $\\mathrm{e}^{x}\\sin x$."
],
[
"$x=r\\cos\\theta$, $y=r\\sin\\theta$, $r^{2}=x^{2}+y^{2}$.",
"Area $=\\dfrac{1}{2}\\displaystyle\\int_{\\alpha}^{\\beta}r^{2}\\,d\\theta$.",
"Tangents parallel to the initial line: $\\dfrac{d}{d\\theta}(r\\sin\\theta)=0$; perpendicular to it: $\\dfrac{d}{d\\theta}(r\\cos\\theta)=0$."
]
],
"WFM03": [
[
"$\\cosh x=\\dfrac{\\mathrm{e}^{x}+\\mathrm{e}^{-x}}{2}$ and $\\sinh x=\\dfrac{\\mathrm{e}^{x}-\\mathrm{e}^{-x}}{2}$.",
"$\\cosh^{2}x-\\sinh^{2}x\\equiv1$ (Osborn’s rule: change the sign of any product of two sines).",
"$\\operatorname{arsinh}x=\\ln\\left(x+\\sqrt{x^{2}+1}\\right)$ and $\\operatorname{arcosh}x=\\ln\\left(x+\\sqrt{x^{2}-1}\\right)$ for $x\\ge1$."
],
[
"Ellipse $\\dfrac{x^{2}}{a^{2}}+\\dfrac{y^{2}}{b^{2}}=1$: $b^{2}=a^{2}(1-e^{2})$, foci $(\\pm ae,0)$, directrices $x=\\pm\\dfrac{a}{e}$.",
"Hyperbola $\\dfrac{x^{2}}{a^{2}}-\\dfrac{y^{2}}{b^{2}}=1$: $b^{2}=a^{2}(e^{2}-1)$, asymptotes $y=\\pm\\dfrac{b}{a}x$.",
"Parametric forms: ellipse $(a\\cos\\theta,b\\sin\\theta)$; hyperbola $(a\\cosh t,b\\sinh t)$ or $(a\\sec\\theta,b\\tan\\theta)$."
],
[
"$\\dfrac{d}{dx}\\arcsin x=\\dfrac{1}{\\sqrt{1-x^{2}}}$ and $\\dfrac{d}{dx}\\arctan x=\\dfrac{1}{1+x^{2}}$.",
"$\\dfrac{d}{dx}\\operatorname{arsinh}x=\\dfrac{1}{\\sqrt{1+x^{2}}}$ and $\\dfrac{d}{dx}\\operatorname{arcosh}x=\\dfrac{1}{\\sqrt{x^{2}-1}}$.",
"Use the chain rule for composite arguments such as $\\arctan(2x)$."
],
[
"$\\displaystyle\\int\\frac{1}{\\sqrt{a^{2}-x^{2}}}\\,dx=\\arcsin\\frac{x}{a}+c$ and $\\displaystyle\\int\\frac{1}{a^{2}+x^{2}}\\,dx=\\frac{1}{a}\\arctan\\frac{x}{a}+c$.",
"Complete the square to reach a standard form.",
"Reduction formulae: integrate by parts once to link $I_n$ with $I_{n-1}$ or $I_{n-2}$."
],
[
"$\\mathbf{a}\\times\\mathbf{b}$ is perpendicular to both $\\mathbf{a}$ and $\\mathbf{b}$.",
"Plane: $\\mathbf{r}\\cdot\\mathbf{n}=p$, or $ax+by+cz=d$ with normal $\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}$.",
"Distance from a point to a plane: $\\dfrac{|ax_1+by_1+cz_1-d|}{\\sqrt{a^{2}+b^{2}+c^{2}}}$."
],
[
"Eigenvalues solve $\\det(\\mathbf{A}-\\lambda\\mathbf{I})=0$; eigenvectors solve $(\\mathbf{A}-\\lambda\\mathbf{I})\\mathbf{x}=\\mathbf{0}$.",
"A $3\\times3$ inverse: matrix of minors, then cofactors (alternate signs), transpose, divide by the determinant.",
"For a symmetric matrix, $\\mathbf{P}^{\\mathrm{T}}\\mathbf{A}\\mathbf{P}=\\mathbf{D}$ with $\\mathbf{P}$ made from normalised eigenvectors."
]
],
"WME01": [
[
"Particle: no size, so no rotation. Light: no mass. Inextensible: does not stretch.",
"Smooth: no friction. Rough: friction acts. Rigid rod or plank: does not bend.",
"State the effect of an assumption, e.g. \"light string, so the tension is the same throughout\"."
],
[
"Speed $=|\\mathbf{v}|$; direction from $\\tan\\theta=\\dfrac{\\text{j-component}}{\\text{i-component}}$.",
"Constant velocity: $\\mathbf{r}=\\mathbf{r}_0+\\mathbf{v}t$.",
"$\\mathbf{F}=m\\mathbf{a}$ works with vectors; resultant force $=$ the sum of the forces."
],
[
"suvat: $v=u+at$; $s=ut+\\frac{1}{2}at^{2}$; $v^{2}=u^{2}+2as$; $s=\\frac{1}{2}(u+v)t$; $s=vt-\\frac{1}{2}at^{2}$.",
"Only for constant acceleration; choose a positive direction and stick to it.",
"Vertical motion under gravity: $a=-g$ with $g=9.8\\text{ m s}^{-2}$ when up is positive."
],
[
"Gradient of a velocity–time graph $=$ acceleration.",
"Area under it $=$ displacement.",
"Use the graph shape (trapezium, triangle) to set up equations in an unknown time or speed."
],
[
"In equilibrium the resultant force is zero: resolve in two perpendicular directions.",
"On a slope, resolve parallel and perpendicular to the plane.",
"Three forces in equilibrium can also be solved with a triangle of forces and the sine rule."
],
[
"$F=ma$ along the direction of motion for each particle separately.",
"Connected particles share the same acceleration and string tension.",
"After a string breaks, the tension is zero: find the new acceleration for the next stage."
],
[
"$F\\le\\mu R$; $F=\\mu R$ when limiting or sliding.",
"Friction opposes the motion, or the likely motion.",
"A pulling force at an angle changes $R$: resolve perpendicular to the surface first."
],
[
"Momentum $=mv$; impulse $=$ change in momentum $=Ft$.",
"Total momentum is conserved in a collision; take care with signs for opposite directions.",
"The impulse on $A$ is equal and opposite to the impulse on $B$."
],
[
"Moment $=$ force $\\times$ perpendicular distance from the pivot.",
"Equilibrium: resultant force $=0$ and total clockwise moment $=$ total anticlockwise moment.",
"\"About to tilt about $C$\" means the reaction at the other support is zero."
]
],
"WME02": [
[
"$v=\\dfrac{ds}{dt}$ and $a=\\dfrac{dv}{dt}$; integrate the other way and use initial conditions for $+c$.",
"Use calculus when the acceleration is not constant (suvat does not apply).",
"Vectors: differentiate or integrate the $\\mathbf{i}$ and $\\mathbf{j}$ components separately."
],
[
"Horizontal: constant velocity $u\\cos\\alpha$. Vertical: $a=-g$, initial velocity $u\\sin\\alpha$.",
"Time links the two directions: find $t$ from one, then use it in the other.",
"At the highest point the vertical velocity is $0$."
],
[
"Work $=$ force $\\times$ distance moved in its direction; KE $=\\dfrac{1}{2}mv^{2}$, GPE $=mgh$.",
"Work–energy: work done by driving force $-$ work against resistance $=$ change in KE $+$ change in GPE.",
"Power $=Fv$; at maximum speed the driving force equals the resistance."
],
[
"Newton’s law of restitution: speed of separation $=e\\times$ speed of approach.",
"Use conservation of momentum together with restitution; draw before and after diagrams.",
"$0\\le e\\le1$; KE lost $=$ KE before $-$ KE after."
],
[
"$\\bar{x}=\\dfrac{\\sum m_ix_i}{\\sum m_i}$ and the same for $\\bar{y}$.",
"Composite laminas: use a table of mass (or area) and centre positions; subtract any holes.",
"A suspended body hangs with its centre of mass vertically below the point of suspension."
],
[
"Rigid body in equilibrium: resolve in two directions and take moments about a point.",
"Take moments about the point where the most unknown forces act.",
"A smooth wall gives a reaction perpendicular to the wall; limiting friction $F=\\mu R$."
]
],
"WME03": [
[
"If $a$ depends on $x$, use $a=v\\dfrac{dv}{dx}$.",
"If $a$ depends on $t$, use $a=\\dfrac{dv}{dt}$.",
"Newton’s law of gravitation: force $\\propto\\dfrac{1}{x^{2}}$, with $\\dfrac{k}{R^{2}}=mg$ at the Earth’s surface."
],
[
"Hooke’s law: $T=\\dfrac{\\lambda x}{l}$.",
"Elastic potential energy $=\\dfrac{\\lambda x^{2}}{2l}$.",
"A string only acts when stretched; a spring can also be compressed."
],
[
"Acceleration towards the centre is $\\dfrac{v^{2}}{r}=r\\omega^{2}$, with $v=r\\omega$.",
"Horizontal circles: resolve vertically for equilibrium and horizontally for $F=\\dfrac{mv^{2}}{r}$.",
"Vertical circles: use energy to find the speed, then $F=\\dfrac{mv^{2}}{r}$ radially; a string stays taut while $T\\ge0$."
],
[
"SHM: $\\ddot{x}=-\\omega^{2}x$, period $\\dfrac{2\\pi}{\\omega}$, $v^{2}=\\omega^{2}(a^{2}-x^{2})$.",
"$x=a\\sin\\omega t$ or $x=a\\cos\\omega t$, depending on where timing starts.",
"Maximum speed $a\\omega$ at the centre; maximum acceleration $a\\omega^{2}$ at the ends."
],
[
"Solids of revolution: $\\bar{x}=\\dfrac{\\int\\pi y^{2}x\\,dx}{\\int\\pi y^{2}\\,dx}$.",
"Standard results: solid hemisphere $\\dfrac{3r}{8}$ and solid cone $\\dfrac{h}{4}$ from the plane face.",
"Toppling happens when the centre of mass is vertically above the edge."
]
],
"WST01": [
[
"A model simplifies a real situation so it can be analysed.",
"Cycle: make predictions, collect data, compare, then refine the model.",
"Models are quick and cheap to use, but may not fit every situation."
],
[
"$\\bar{x}=\\dfrac{\\sum x}{n}$ and $\\sigma^{2}=\\dfrac{\\sum x^{2}}{n}-\\bar{x}^{2}$; with frequencies, use $\\sum fx$ and $\\sum fx^{2}$.",
"Coding $y=\\dfrac{x-a}{b}$: $\\bar{x}=a+b\\bar{y}$ and $\\sigma_x=b\\sigma_y$.",
"Outliers: below $Q_1-1.5\\times\\text{IQR}$ or above $Q_3+1.5\\times\\text{IQR}$ (or as the question defines)."
],
[
"$\\mathrm{P}(A\\cup B)=\\mathrm{P}(A)+\\mathrm{P}(B)-\\mathrm{P}(A\\cap B)$.",
"$\\mathrm{P}(A\\mid B)=\\dfrac{\\mathrm{P}(A\\cap B)}{\\mathrm{P}(B)}$; independent when $\\mathrm{P}(A\\cap B)=\\mathrm{P}(A)\\,\\mathrm{P}(B)$.",
"Mutually exclusive: $\\mathrm{P}(A\\cap B)=0$. Use tree and Venn diagrams to organise the information."
],
[
"$r=\\dfrac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}$, between $-1$ and $1$.",
"Regression line of $y$ on $x$: $y=a+bx$ with $b=\\dfrac{S_{xy}}{S_{xx}}$ and $a=\\bar{y}-b\\bar{x}$.",
"Interpolation is reliable; extrapolation outside the data range is not."
],
[
"$\\sum\\mathrm{P}(X=x)=1$; $\\mathrm{E}(X)=\\sum x\\,\\mathrm{P}(X=x)$.",
"$\\mathrm{Var}(X)=\\mathrm{E}(X^{2})-\\left[\\mathrm{E}(X)\\right]^{2}$.",
"$\\mathrm{E}(aX+b)=a\\mathrm{E}(X)+b$ and $\\mathrm{Var}(aX+b)=a^{2}\\mathrm{Var}(X)$."
],
[
"Standardise: $Z=\\dfrac{X-\\mu}{\\sigma}$.",
"Use symmetry: $\\mathrm{P}(Z<-a)=1-\\mathrm{P}(Z<a)$.",
"To find $\\mu$ or $\\sigma$, use the percentage points table to get $z$, then form equations."
]
],
"WST02": [
[
"$\\mathrm{B}(n,p)$: fixed $n$ independent trials, two outcomes, constant $p$; mean $np$, variance $np(1-p)$.",
"$\\mathrm{Po}(\\lambda)$: events occur singly, independently, at a constant rate; mean $=$ variance $=\\lambda$.",
"Approximate $\\mathrm{B}(n,p)$ by $\\mathrm{Po}(np)$ when $n$ is large and $p$ small; by a normal when $np$ and $n(1-p)$ are both large, with a continuity correction."
],
[
"$\\displaystyle\\int f(x)\\,dx=1$ over the range; $\\mathrm{P}(a<X<b)=\\int_{a}^{b}f(x)\\,dx$.",
"$F(x)=\\displaystyle\\int_{-\\infty}^{x}f(t)\\,dt$; the median solves $F(m)=0.5$.",
"$\\mathrm{E}(X)=\\displaystyle\\int xf(x)\\,dx$; the mode is where $f(x)$ is greatest."
],
[
"$X\\sim\\mathrm{U}[a,b]$: $f(x)=\\dfrac{1}{b-a}$ for $a\\le x\\le b$.",
"$\\mathrm{E}(X)=\\dfrac{a+b}{2}$ and $\\mathrm{Var}(X)=\\dfrac{(b-a)^{2}}{12}$.",
"Probabilities are lengths of intervals divided by $b-a$."
],
[
"Census: every member, accurate but slow and costly. Sample: quicker and cheaper.",
"A sampling frame lists the sampling units; a statistic uses only the sample values.",
"The sampling distribution lists all possible values of a statistic with their probabilities."
],
[
"Write $\\mathrm{H}_0$ and $\\mathrm{H}_1$ in terms of $p$ or $\\lambda$.",
"Critical region: the values whose probability under $\\mathrm{H}_0$ is at most the significance level.",
"Two-tailed tests split the significance level between the two tails; conclude in context."
]
],
"WST03": [
[
"$\\mathrm{E}(aX\\pm bY)=a\\mathrm{E}(X)\\pm b\\mathrm{E}(Y)$.",
"For independent $X$ and $Y$: $\\mathrm{Var}(aX\\pm bY)=a^{2}\\mathrm{Var}(X)+b^{2}\\mathrm{Var}(Y)$.",
"$X_1+X_2$ is not the same as $2X$: $\\mathrm{Var}(2X)=4\\mathrm{Var}(X)$."
],
[
"Unbiased estimates: $\\bar{x}$ for $\\mu$, and $s^{2}=\\dfrac{\\sum x^{2}-n\\bar{x}^{2}}{n-1}$ for $\\sigma^{2}$.",
"$\\bar{X}\\sim\\mathrm{N}\\left(\\mu,\\dfrac{\\sigma^{2}}{n}\\right)$, approximately for large $n$ by the central limit theorem.",
"Sampling methods: simple random, systematic, stratified, quota."
],
[
"Confidence interval for $\\mu$: $\\bar{x}\\pm z\\dfrac{\\sigma}{\\sqrt{n}}$, with $z=1.96$ for $95\\%$.",
"Width $=2z\\dfrac{\\sigma}{\\sqrt{n}}$; use it to find the sample size needed.",
"Difference of means test: standard error $\\sqrt{\\dfrac{\\sigma_1^{2}}{n_1}+\\dfrac{\\sigma_2^{2}}{n_2}}$."
],
[
"$X^{2}=\\displaystyle\\sum\\frac{(O-E)^{2}}{E}$.",
"Combine classes so every expected frequency is at least $5$.",
"Degrees of freedom $=$ number of classes $-1-$ parameters estimated; for an $r\\times c$ table, $(r-1)(c-1)$."
],
[
"$r_s=1-\\dfrac{6\\sum d^{2}}{n(n^{2}-1)}$.",
"Give tied values the mean of the ranks they share.",
"Use Spearman’s for ranked or non-linear data; test with the critical values table and conclude in context."
]
],
"WDM11": [
[
"Bubble sort compares neighbours; quick sort uses a pivot; show the list after every pass.",
"Bin packing: first-fit, first-fit decreasing, full bins.",
"Lower bound $=\\dfrac{\\text{total size}}{\\text{bin capacity}}$, rounded up."
],
[
"Sum of degrees $=2\\times$ number of edges, so the number of odd vertices is even.",
"Eulerian: all vertices even. Semi-Eulerian: exactly two odd vertices.",
"A tree is connected with no cycles; a spanning tree on $n$ vertices has $n-1$ edges."
],
[
"Kruskal: add edges in order of weight, rejecting any that form a cycle.",
"Prim: start at a vertex and add the shortest edge joining a new vertex.",
"Prim works directly on a distance matrix; list the order edges were added."
],
[
"Give the start vertex the permanent label $0$, then update working values from the newest permanent vertex.",
"Make the smallest working value permanent next; record the order of labelling.",
"Trace the route back from the end vertex using the edges that fit the label differences."
],
[
"Find the odd vertices; the route must repeat the shortest paths joining them in pairs.",
"With four odd vertices, compare all three pairings and choose the smallest total.",
"Route length $=$ total edge weight $+$ the repeated paths."
],
[
"Forward pass gives earliest event times; backward pass gives latest event times.",
"Total float $=$ latest finish $-$ earliest start $-$ duration; critical activities have zero float.",
"Lower bound for workers $=\\dfrac{\\text{total activity time}}{\\text{critical path length}}$, rounded up."
],
[
"Define the variables, write the constraints and the objective function.",
"Draw the feasible region and test the vertices, or use an objective line.",
"For integer solutions, check the integer points near the optimal vertex."
]
]
};
