# Exam-style questions for Statistics 1 (WST01), written for IAL Revise (not Pearson questions).
# Every answer was checked (see check_m1s1.py). Row: (topic index, question, [mark points])
U = 'WST01'
Q = [
 (0, r"A spinner is modelled by $P(X=x)=kx$ for $x=1,2,3,4$." "\n"
     r"(a) Give two reasons why statisticians use models like this. [2]" "\n"
     r"(b) Find $k$. [2]" "\n"
     r"(c) The spinner is spun $50$ times. Find the expected number of 4s. [2]" "\n"
     r"(d) There were actually $12$ fours. Comment on the model. [1]" "\n"
     r"(e) State one limitation of using a model. [1] [8 marks]",
  [r"(a) A model is quicker and cheaper than collecting lots of data", r"(a) It can be used to make predictions (and can be refined)",
   r"(b) $k(1+2+3+4)=1$", r"(b) $k=0.1$",
   r"(c) $P(X=4)=0.4$", r"(c) Expected $=50\times0.4=20$",
   r"(d) $12$ is well below $20$, so the model may not be a good fit (the spinner may not be as modelled)",
   r"(e) E.g. a model simplifies reality, so its predictions may not be accurate"]),
 (0, r"The heights of adult men in a town are modelled by a normal distribution with mean $170\text{ cm}$ and standard deviation $8\text{ cm}$." "\n"
     r"(a) Give one reason why a normal model is suitable and one reason why it cannot be exactly right. [2]" "\n"
     r"(b) Use the model to estimate the proportion of men taller than $186\text{ cm}$. [3]" "\n"
     r"(c) In a sample of $200$ men, $11$ were taller than $186\text{ cm}$. Comment on the model. [2] [7 marks]",
  [r"(a) Heights are continuous and roughly symmetrical about the mean", r"(a) The normal model allows negative or impossibly large heights",
   r"(b) $z=\dfrac{186-170}{8}=2$", r"(b) $1-\Phi(2)$", r"(b) $=0.0228$",
   r"(c) Expected about $200\times0.0228\approx5$", r"(c) $11$ is more than twice that, so the model may underestimate tall men"]),
 (1, r"For $20$ values, $\sum x=860$ and $\sum x^{2}=37\,400$." "\n"
     r"(a) Find the mean and the standard deviation. [4]" "\n"
     r"(b) Each value is increased by $5$ and then doubled. Find the new mean and standard deviation. [2]" "\n"
     r"(c) A $21$st value of $43$ is added to the original data. State the effect on the mean and find the new standard deviation. [2] [8 marks]",
  [r"(a) Mean $=\dfrac{860}{20}=43$", r"(a) Variance $=\dfrac{37\,400}{20}-43^{2}$", r"(a) $=21$", r"(a) Standard deviation $=4.58$",
   r"(b) New mean $=2(43+5)=96$", r"(b) New standard deviation $=2\times4.58=9.17$",
   r"(c) Mean unchanged ($43$)", r"(c) $\sqrt{\dfrac{39\,249}{21}-43^{2}}=\sqrt{20}=4.47$"]),
 (1, r"The times, in minutes, that $50$ students spent on homework are grouped: $0\text{–}10$: $5$; $10\text{–}20$: $12$; $20\text{–}30$: $18$; $30\text{–}50$: $10$; $50\text{–}80$: $5$." "\n"
     r"(a) Use interpolation to estimate the median. [3]" "\n"
     r"(b) Estimate the mean. [2]" "\n"
     r"(c) On a histogram the $20\text{–}30$ bar is $9\text{ cm}$ tall. Find the height of the $50\text{–}80$ bar. [2]" "\n"
     r"(d) Describe the skewness of the data, giving a reason. [1] [8 marks]",
  [r"(a) The median is the $25$th value, in the $20\text{–}30$ class", r"(a) $20+\dfrac{25-17}{18}\times10$", r"(a) $=24.4$",
   r"(b) Uses midpoints $5,15,25,40,65$: $\sum fx=1380$", r"(b) Mean $=27.6$",
   r"(c) Frequency densities $1.8$ and $\dfrac{5}{30}$", r"(c) $\dfrac{5/30}{1.8}\times9=0.833\text{ cm}$",
   r"(d) Positive skew, because the mean is greater than the median"]),
 (2, r"For events $A$ and $B$, $P(A)=0.4$, $P(B)=0.5$ and $P(A\cup B)=0.7$." "\n"
     r"(a) Find $P(A\cap B)$. [2]" "\n"
     r"(b) Show that $A$ and $B$ are independent. [2]" "\n"
     r"(c) Find $P(A\mid B')$. [2]" "\n"
     r"(d) Find $P(A'\cap B')$. [1] [7 marks]",
  [r"(a) $P(A\cup B)=P(A)+P(B)-P(A\cap B)$", r"(a) $P(A\cap B)=0.2$",
   r"(b) $P(A)P(B)=0.4\times0.5=0.2$", r"(b) $=P(A\cap B)$, so independent",
   r"(c) $\dfrac{P(A\cap B')}{P(B')}=\dfrac{0.2}{0.5}$", r"(c) $=0.4$",
   r"(d) $1-0.7=0.3$"]),
 (2, r"$30\%$ of students walk to school. Of those who walk, $10\%$ are late; of those who don't, $25\%$ are late." "\n"
     r"(a) Find the probability that a randomly chosen student is late. [3]" "\n"
     r"(b) Given that a student is late, find the probability that they walked. [3]" "\n"
     r"(c) Two students are chosen independently. Find the probability that exactly one of them is late. [2] [8 marks]",
  [r"(a) Tree diagram or $0.3\times0.1$", r"(a) $+0.7\times0.25$", r"(a) $=0.205$",
   r"(b) $\dfrac{P(\text{walk and late})}{P(\text{late})}$", r"(b) $\dfrac{0.03}{0.205}$", r"(b) $=0.146$",
   r"(c) $2\times0.205\times0.795$", r"(c) $=0.326$"]),
 (3, r"For $10$ pairs of data: $S_{xx}=120$, $S_{yy}=450$, $S_{xy}=216$, $\bar{x}=6$, $\bar{y}=30$." "\n"
     r"(a) Find the product moment correlation coefficient. [2]" "\n"
     r"(b) Find the equation of the regression line of $y$ on $x$. [4]" "\n"
     r"(c) Estimate $y$ when $x=8$, and comment on the reliability of your estimate. [2] [8 marks]",
  [r"(a) $r=\dfrac{216}{\sqrt{120\times450}}$", r"(a) $r=0.930$",
   r"(b) $b=\dfrac{S_{xy}}{S_{xx}}=\dfrac{216}{120}$", r"(b) $b=1.8$", r"(b) $a=\bar{y}-b\bar{x}=30-1.8\times6=19.2$", r"(b) $y=19.2+1.8x$",
   r"(c) $y=33.6$", r"(c) Reliable: $r$ is close to $1$ and $x=8$ is likely within the data (interpolation)"]),
 (3, r"Data are coded using $u=\dfrac{x-100}{5}$ and $v=\dfrac{y}{2}$. The regression line of $v$ on $u$ is $v=3+0.4u$, and the correlation between $u$ and $v$ is $0.82$." "\n"
     r"(a) Find the regression line of $y$ on $x$, in the form $y=a+bx$. [4]" "\n"
     r"(b) State the correlation between $x$ and $y$. [1]" "\n"
     r"(c) Interpret the gradient of your line. [1] [6 marks]",
  [r"(a) Substitutes: $\dfrac{y}{2}=3+0.4\times\dfrac{x-100}{5}$", r"(a) $y=6+0.16(x-100)$", r"(a) Expands", r"(a) $y=0.16x-10$",
   r"(b) $0.82$ (coding does not change correlation)",
   r"(c) Each increase of $1$ in $x$ increases $y$ by $0.16$ on average"]),
 (4, r"The random variable $X$ has $P(X=x)=k(x+1)$ for $x=0,1,2,3$." "\n"
     r"(a) Find $k$. [2]" "\n"
     r"(b) Find $E(X)$. [2]" "\n"
     r"(c) Find $\operatorname{Var}(X)$. [3]" "\n"
     r"(d) Find $E(3X-2)$ and $\operatorname{Var}(3X-2)$. [2] [9 marks]",
  [r"(a) $k(1+2+3+4)=1$", r"(a) $k=0.1$",
   r"(b) $0.1(0+2+6+12)$", r"(b) $E(X)=2$",
   r"(c) $E(X^{2})=0.1(0+2+12+36)=5$", r"(c) $\operatorname{Var}(X)=5-2^{2}$", r"(c) $=1$",
   r"(d) $E(3X-2)=4$", r"(d) $\operatorname{Var}(3X-2)=9$"]),
 (4, r"A spinner's score $S$ has $P(S=1)=0.2$, $P(S=2)=0.3$, $P(S=3)=a$, $P(S=4)=b$, and $E(S)=2.7$." "\n"
     r"(a) Find $a$ and $b$. [4]" "\n"
     r"(b) Find $P(S>E(S))$. [1]" "\n"
     r"(c) Write down $F(2)$. [1]" "\n"
     r"(d) The spinner is spun twice. Find the probability that the total is $5$. [2] [8 marks]",
  [r"(a) $a+b=0.5$", r"(a) $0.2+0.6+3a+4b=2.7$", r"(a) Solves", r"(a) $a=0.1$, $b=0.4$",
   r"(b) $P(S=3)+P(S=4)=0.5$",
   r"(c) $F(2)=0.5$",
   r"(d) Pairs $(1,4),(4,1),(2,3),(3,2)$: $2(0.2)(0.4)+2(0.3)(0.1)$", r"(d) $=0.22$"]),
 (5, r"$X\sim N(50,\,4^{2})$" "\n"
     r"(a) Find $P(X>56)$. [2]" "\n"
     r"(b) Find $P(45<X<55)$. [3]" "\n"
     r"(c) Find the value of $a$ such that $P(X<a)=0.9$. [2] [7 marks]",
  [r"(a) $z=1.5$", r"(a) $1-0.9332=0.0668$",
   r"(b) $z=\pm1.25$", r"(b) $\Phi(1.25)-\Phi(-1.25)$", r"(b) $=0.7887$",
   r"(c) $\dfrac{a-50}{4}=1.2816$", r"(c) $a=55.1$"]),
 (5, r"The masses $W$ of loaves are normally distributed. $10\%$ weigh less than $480\text{ g}$ and $5\%$ weigh more than $530\text{ g}$." "\n"
     r"(a) Find the mean $\mu$ and standard deviation $\sigma$ of $W$. [6]" "\n"
     r"(b) Find the proportion of loaves that weigh more than $520\text{ g}$. [2] [8 marks]",
  [r"(a) $\dfrac{480-\mu}{\sigma}=-1.2816$", r"(a) $\dfrac{530-\mu}{\sigma}=1.6449$", r"(a) Correct $z$-values from tables",
   r"(a) Solves simultaneously", r"(a) $\sigma=17.1$", r"(a) $\mu=502$ (501.9)",
   r"(b) $z=\dfrac{520-501.9}{17.09}=1.06$", r"(b) $0.145$"]),
]
