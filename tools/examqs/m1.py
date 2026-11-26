# Exam-style questions for Mechanics 1 (WME01), written for IAL Revise (not Pearson questions). Take g = 9.8 m s^-2.
# Every answer was checked (see check_m1s1.py). Row: (topic index, question, [mark points])
U = 'WME01'
G = r" Take $g=9.8\text{ m s}^{-2}$."
Q = [
 (0, r"A box of mass $5\text{ kg}$ is pulled along a horizontal floor by a light inextensible string. The string is horizontal and the tension in it is $20\text{ N}$." + G + "\n"
     r"(a) State what is meant by the string being (i) light and (ii) inextensible, in this model. [2]" "\n"
     r"(b) Modelling the floor as smooth, find the acceleration of the box. [2]" "\n"
     r"(c) The acceleration is actually $2.04\text{ m s}^{-2}$. Modelling the floor as rough, find the coefficient of friction. [3]" "\n"
     r"(d) Suggest one further refinement to the model. [1] [8 marks]",
  [r"(a)(i) The string has no mass, so the tension is the same throughout", r"(a)(ii) The string does not stretch, so the box and the end of the string move together",
   r"(b) $20=5a$", r"(b) $a=4\text{ m s}^{-2}$",
   r"(c) $20-F=5\times2.04$", r"(c) $F=\mu R$ with $R=5g=49$", r"(c) $\mu=\dfrac{9.8}{49}=0.2$",
   r"(d) E.g. include air resistance, or model the box as a body with size rather than a particle"]),
 (0, r"A stone is dropped from rest from the top of a cliff $44.1\text{ m}$ above the sea. It is modelled as a particle moving freely under gravity." + G + "\n"
     r"(a) Find the time it takes to reach the sea. [3]" "\n"
     r"(b) Find its speed as it reaches the sea. [2]" "\n"
     r"(c) The actual time is $3.2\text{ s}$. State two assumptions of the model and which one is most likely to explain the difference. [2] [7 marks]",
  [r"(a) Uses $s=ut+\dfrac{1}{2}at^{2}$ with $u=0$", r"(a) $44.1=4.9t^{2}$", r"(a) $t=3\text{ s}$",
   r"(b) $v=u+at=9.8\times3$", r"(b) $29.4\text{ m s}^{-1}$",
   r"(c) Two of: no air resistance; the stone is a particle (no size or spin); $g$ is constant", r"(c) Air resistance is ignored, and it slows the stone, so the real time is longer"]),
 (1, r"A particle of mass $2\text{ kg}$ is acted on by three forces $(3\mathbf{i}+4\mathbf{j})\text{ N}$, $(p\mathbf{i}-2\mathbf{j})\text{ N}$ and $(-5\mathbf{i}+q\mathbf{j})\text{ N}$. Its acceleration is $(2\mathbf{i}+3\mathbf{j})\text{ m s}^{-2}$." "\n"
     r"(a) Find the values of $p$ and $q$. [4]" "\n"
     r"(b) Find the magnitude of the acceleration, and the angle it makes with $\mathbf{i}$. [3]" "\n"
     r"(c) The particle starts from rest at the origin. Find its position vector after $4\text{ s}$. [2] [9 marks]",
  [r"(a) Resultant $=(p-2)\mathbf{i}+(2+q)\mathbf{j}$", r"(a) $\mathbf{F}=m\mathbf{a}=4\mathbf{i}+6\mathbf{j}$", r"(a) $p=6$", r"(a) $q=4$",
   r"(b) $|\mathbf{a}|=\sqrt{13}=3.61\text{ m s}^{-2}$", r"(b) $\tan\theta=\dfrac{3}{2}$", r"(b) $56.3^{\circ}$",
   r"(c) $\mathbf{r}=\dfrac{1}{2}\mathbf{a}t^{2}=8(2\mathbf{i}+3\mathbf{j})$", r"(c) $(16\mathbf{i}+24\mathbf{j})\text{ m}$"]),
 (1, r"At noon, ship $A$ is at $(2\mathbf{i}+3\mathbf{j})\text{ km}$ moving with velocity $(4\mathbf{i}-\mathbf{j})\text{ km h}^{-1}$, and ship $B$ is at $(-6\mathbf{i}+7\mathbf{j})\text{ km}$ moving with velocity $(6\mathbf{i}-2\mathbf{j})\text{ km h}^{-1}$." "\n"
     r"(a) Write down the position vectors of $A$ and $B$ at time $t$ hours after noon. [2]" "\n"
     r"(b) Show that $\overrightarrow{BA}=(8-2t)\mathbf{i}+(t-4)\mathbf{j}$. [2]" "\n"
     r"(c) Show that the ships would collide if they kept these velocities, and find when and where. [3] [7 marks]",
  [r"(a) $\mathbf{r}_{A}=(2+4t)\mathbf{i}+(3-t)\mathbf{j}$", r"(a) $\mathbf{r}_{B}=(-6+6t)\mathbf{i}+(7-2t)\mathbf{j}$",
   r"(b) $\overrightarrow{BA}=\mathbf{r}_{A}-\mathbf{r}_{B}$", r"(b) $=(8-2t)\mathbf{i}+(t-4)\mathbf{j}$",
   r"(c) Both components are $0$ when $t=4$", r"(c) So they collide at $4\text{ pm}$", r"(c) At $(18\mathbf{i}-\mathbf{j})\text{ km}$"]),
 (2, r"A car accelerates uniformly from $5\text{ m s}^{-1}$ to $25\text{ m s}^{-1}$ in $8\text{ s}$." "\n"
     r"(a) Find its acceleration. [2]" "\n"
     r"(b) Find the distance it travels in this time. [2]" "\n"
     r"(c) It then decelerates uniformly from $25\text{ m s}^{-1}$ to rest in a distance of $50\text{ m}$. Find the deceleration and the time taken. [4] [8 marks]",
  [r"(a) $25=5+8a$", r"(a) $a=2.5\text{ m s}^{-2}$",
   r"(b) $s=\dfrac{(5+25)}{2}\times8$", r"(b) $120\text{ m}$",
   r"(c) $0=25^{2}-2a\times50$", r"(c) Deceleration $6.25\text{ m s}^{-2}$", r"(c) $0=25-6.25t$", r"(c) $t=4\text{ s}$"]),
 (2, r"A ball is projected vertically upwards at $14.7\text{ m s}^{-1}$ from a point $2\text{ m}$ above the ground." + G + "\n"
     r"(a) Find the greatest height of the ball above the ground. [3]" "\n"
     r"(b) Find the time taken for the ball to hit the ground, to 3 significant figures. [4]" "\n"
     r"(c) Find, to 3 significant figures, how long the ball is more than $10\text{ m}$ above the ground. [3] [10 marks]",
  [r"(a) $0=14.7^{2}-2\times9.8\times s$", r"(a) $s=11.025\text{ m}$", r"(a) Height $=13.0\text{ m}$",
   r"(b) $-2=14.7t-4.9t^{2}$", r"(b) $4.9t^{2}-14.7t-2=0$", r"(b) Uses the quadratic formula", r"(b) $t=3.13\text{ s}$",
   r"(c) $8=14.7t-4.9t^{2}$", r"(c) $t=0.714$ or $t=2.29$", r"(c) Time $=1.57\text{ s}$"]),
 (3, r"A train starts from rest and accelerates uniformly for $20\text{ s}$ to $15\text{ m s}^{-1}$. It travels at $15\text{ m s}^{-1}$ for $T$ seconds, then decelerates uniformly to rest in $30\text{ s}$. The total distance is $3\text{ km}$." "\n"
     r"(a) Sketch a speed–time graph for the journey. [2]" "\n"
     r"(b) Find $T$. [3]" "\n"
     r"(c) Find the acceleration and the deceleration. [2] [7 marks]",
  [r"(a) Correct shape (trapezium) starting and ending at $0$", r"(a) $15$, $20$, $T$ and $30$ marked",
   r"(b) Area $=\dfrac{1}{2}\times20\times15+15T+\dfrac{1}{2}\times30\times15$", r"(b) $375+15T=3000$", r"(b) $T=175$",
   r"(c) Acceleration $0.75\text{ m s}^{-2}$", r"(c) Deceleration $0.5\text{ m s}^{-2}$"]),
 (3, r"At time $t=0$ car $P$ passes point $O$ moving at a constant $20\text{ m s}^{-1}$. At the same moment car $Q$ starts from rest at $O$ and accelerates uniformly at $2.5\text{ m s}^{-2}$ until its speed is $30\text{ m s}^{-1}$, then keeps this speed. Both move along the same straight road." "\n"
     r"(a) Find the time when $Q$ reaches $30\text{ m s}^{-1}$. [1]" "\n"
     r"(b) Sketch both speed–time graphs on one diagram. [2]" "\n"
     r"(c) Find the time when $Q$ overtakes $P$. [4] [7 marks]",
  [r"(a) $t=12\text{ s}$",
   r"(b) Horizontal line at $20$ for $P$", r"(b) Line from $(0,0)$ to $(12,30)$ then horizontal for $Q$",
   r"(c) At $t=12$: $Q$ has gone $180\text{ m}$, $P$ has gone $240\text{ m}$ (so not yet overtaken)",
   r"(c) For $t>12$: $180+30(t-12)$", r"(c) $=20t$", r"(c) $t=18\text{ s}$"]),
 (4, r"A particle of mass $4\text{ kg}$ hangs in equilibrium from two light strings. One string makes an angle of $30^{\circ}$ with the vertical and the other makes $45^{\circ}$ with the vertical, on opposite sides." + G + "\n"
     r"(a) Find the tension in each string, to 3 significant figures. [6]" "\n"
     r"(b) State how you have used the fact that the strings are light. [1] [7 marks]",
  [r"(a) Resolves horizontally: $T_{1}\sin30^{\circ}=T_{2}\sin45^{\circ}$", r"(a) Resolves vertically: $T_{1}\cos30^{\circ}+T_{2}\cos45^{\circ}=4g$",
   r"(a) Eliminates one tension", r"(a) Solves", r"(a) $T_{1}=28.7\text{ N}$ (the $30^{\circ}$ string)", r"(a) $T_{2}=20.3\text{ N}$",
   r"(b) The tension is the same all along each string (and the strings' weight is ignored)"]),
 (4, r"Three forces $\mathbf{F}_{1}=(3\mathbf{i}-2\mathbf{j})\text{ N}$, $\mathbf{F}_{2}=(p\mathbf{i}+5\mathbf{j})\text{ N}$ and $\mathbf{F}_{3}=(-4\mathbf{i}+q\mathbf{j})\text{ N}$ act on a particle of mass $2\text{ kg}$, which is in equilibrium." "\n"
     r"(a) Find $p$ and $q$. [3]" "\n"
     r"(b) $\mathbf{F}_{3}$ is removed. Find the magnitude of the resultant force and the acceleration of the particle. [3]" "\n"
     r"(c) Find the angle between the resultant force and $\mathbf{i}$. [2] [8 marks]",
  [r"(a) Resultant is zero: $3+p-4=0$ and $-2+5+q=0$", r"(a) $p=1$", r"(a) $q=-3$",
   r"(b) Resultant $=\mathbf{F}_{1}+\mathbf{F}_{2}=4\mathbf{i}+3\mathbf{j}$", r"(b) Magnitude $5\text{ N}$", r"(b) $a=\dfrac{5}{2}=2.5\text{ m s}^{-2}$",
   r"(c) $\tan\theta=\dfrac{3}{4}$", r"(c) $36.9^{\circ}$"]),
 (6, r"A particle of mass $3\text{ kg}$ rests on a rough plane inclined at $30^{\circ}$ to the horizontal. It is held at rest by a horizontal force of magnitude $P\text{ N}$ acting towards the plane, in the vertical plane containing a line of greatest slope. The coefficient of friction is $0.25$, and the particle is on the point of slipping down the plane." + G + "\n"
     r"(a) Explain why friction acts up the plane. [1]" "\n"
     r"(b) Find $P$, to 3 significant figures. [7] [8 marks]",
  [r"(a) The particle is about to move down the plane, and friction opposes this motion",
   r"(b) Resolves perpendicular to the plane: $R=3g\cos30^{\circ}+P\sin30^{\circ}$", r"(b) Correct components",
   r"(b) Resolves along the plane: $P\cos30^{\circ}+F=3g\sin30^{\circ}$", r"(b) Correct components",
   r"(b) Uses $F=0.25R$", r"(b) Solves for $P$", r"(b) $P=8.41$"]),
 (5, r"Particle $A$ of mass $3\text{ kg}$ lies on a smooth horizontal table. It is attached by a light inextensible string, passing over a smooth pulley at the edge of the table, to particle $B$ of mass $2\text{ kg}$ hanging freely. The system is released from rest with $B$ $0.8\text{ m}$ above the floor." + G + "\n"
     r"(a) Find the acceleration of the system and the tension in the string. [4]" "\n"
     r"(b) Find the speed of $B$ just before it hits the floor, to 3 significant figures. [2]" "\n"
     r"(c) State where in your working you used the fact that the pulley is smooth. [1] [7 marks]",
  [r"(a) For $A$: $T=3a$", r"(a) For $B$: $2g-T=2a$", r"(a) $a=\dfrac{2g}{5}=3.92\text{ m s}^{-2}$", r"(a) $T=11.76\text{ N}$ ($11.8\text{ N}$)",
   r"(b) $v^{2}=2\times3.92\times0.8$", r"(b) $v=2.50\text{ m s}^{-1}$",
   r"(c) The tension is the same on both sides of the pulley"]),
 (5, r"A car of mass $1200\text{ kg}$ tows a trailer of mass $800\text{ kg}$ along a level road by a light rigid towbar. The resistances are $400\text{ N}$ on the car and $200\text{ N}$ on the trailer, and the driving force is $2600\text{ N}$." "\n"
     r"(a) Find the acceleration. [3]" "\n"
     r"(b) Find the tension in the towbar. [2]" "\n"
     r"(c) When the speed is $15\text{ m s}^{-1}$ the towbar breaks. Find the distance the trailer travels before stopping, assuming the resistance on it stays $200\text{ N}$. [3] [8 marks]",
  [r"(a) Whole system: $2600-400-200=2000a$", r"(a) Correct equation", r"(a) $a=1\text{ m s}^{-2}$",
   r"(b) Trailer: $T-200=800\times1$", r"(b) $T=1000\text{ N}$",
   r"(c) Deceleration $=\dfrac{200}{800}=0.25\text{ m s}^{-2}$", r"(c) $0=15^{2}-2\times0.25\times s$", r"(c) $s=450\text{ m}$"]),
 (6, r"A box of mass $10\text{ kg}$ is pulled across a rough horizontal floor by a force of $50\text{ N}$ at $20^{\circ}$ above the horizontal. The coefficient of friction is $0.3$." + G + "\n"
     r"(a) Find the normal reaction and the friction force. [3]" "\n"
     r"(b) Find the acceleration of the box, to 3 significant figures. [3]" "\n"
     r"(c) The box starts from rest. After $3\text{ s}$ the force is removed. Find how much further the box slides. [3] [9 marks]",
  [r"(a) $R+50\sin20^{\circ}=10g$", r"(a) $R=80.9\text{ N}$", r"(a) $F=0.3R=24.3\text{ N}$",
   r"(b) $50\cos20^{\circ}-F=10a$", r"(b) Correct values", r"(b) $a=2.27\text{ m s}^{-2}$",
   r"(c) Speed after $3\text{ s}$: $6.81\text{ m s}^{-1}$", r"(c) New deceleration $\mu g=2.94\text{ m s}^{-2}$ (now $R=10g$)", r"(c) $s=\dfrac{6.81^{2}}{2\times2.94}=7.90\text{ m}$"]),
 (7, r"Particle $P$ of mass $2\text{ kg}$, moving at $6\text{ m s}^{-1}$, collides directly with particle $Q$ of mass $3\text{ kg}$ moving towards it at $2\text{ m s}^{-1}$. After the collision $P$ moves back the way it came at $1.5\text{ m s}^{-1}$." "\n"
     r"(a) Find the speed and direction of $Q$ after the collision. [4]" "\n"
     r"(b) Find the magnitude of the impulse on $P$. [2]" "\n"
     r"(c) $Q$ then hits a wall at right angles and rebounds at $1\text{ m s}^{-1}$. Find the impulse the wall exerts on $Q$. [2] [8 marks]",
  [r"(a) Conservation of momentum, with directions: $2(6)+3(-2)$", r"(a) $=2(-1.5)+3v$", r"(a) $v=3$", r"(a) $Q$ moves at $3\text{ m s}^{-1}$ in $P$'s original direction (reversed)",
   r"(b) $I=2(-1.5-6)$", r"(b) $15\text{ N s}$",
   r"(c) $I=3(1-(-3))$", r"(c) $12\text{ N s}$"]),
 (7, r"A railway truck $A$ of mass $4000\text{ kg}$, moving at $3\text{ m s}^{-1}$, collides with a stationary truck $B$ of mass $2000\text{ kg}$. They couple together." "\n"
     r"(a) Find their common speed after the collision. [3]" "\n"
     r"(b) Find the impulse exerted on $B$. [2]" "\n"
     r"(c) The collision lasts $0.4\text{ s}$. Find the average force on $B$. [2] [7 marks]",
  [r"(a) $4000\times3=6000v$", r"(a) Correct equation", r"(a) $v=2\text{ m s}^{-1}$",
   r"(b) $I=2000\times2$", r"(b) $4000\text{ N s}$",
   r"(c) $F=\dfrac{I}{t}$", r"(c) $10\,000\text{ N}$"]),
 (8, r"A uniform rod $AB$ of length $4\text{ m}$ and mass $20\text{ kg}$ rests horizontally on two supports at $C$ and $D$, where $AC=0.5\text{ m}$ and $DB=1\text{ m}$." + G + "\n"
     r"(a) Find the reactions at $C$ and $D$. [4]" "\n"
     r"(b) A child of mass $m\text{ kg}$ stands at $B$, and the rod is on the point of tilting about $D$. Find $m$. [3] [7 marks]",
  [r"(a) Moments about $C$: $R_{D}\times2.5=20g\times1.5$", r"(a) $R_{D}=12g=117.6\text{ N}$", r"(a) Resolves vertically: $R_{C}+R_{D}=20g$", r"(a) $R_{C}=8g=78.4\text{ N}$",
   r"(b) About to tilt, so $R_{C}=0$", r"(b) Moments about $D$: $20g\times1=mg\times1$", r"(b) $m=20$"]),
 (8, r"A non-uniform plank $AB$ of length $6\text{ m}$ and mass $30\text{ kg}$ hangs horizontally from two vertical ropes at $A$ and $B$. The tension at $B$ is twice the tension at $A$." "\n"
     r"(a) Find the distance of the centre of mass from $A$. [4]" "\n"
     r"(b) A $15\text{ kg}$ load is placed on the plank so that the two tensions become equal. Find the distance of the load from $A$. [4] [8 marks]",
  [r"(a) $T_{A}+T_{B}=30g$ with $T_{B}=2T_{A}$", r"(a) $T_{A}=10g$, $T_{B}=20g$", r"(a) Moments about $A$: $20g\times6=30g\times x$", r"(a) $x=4\text{ m}$",
   r"(b) Each tension $=\dfrac{45g}{2}=22.5g$", r"(b) Moments about $A$: $22.5g\times6=30g\times4+15g\times d$", r"(b) $135=120+15d$", r"(b) $d=1\text{ m}$"]),
]
