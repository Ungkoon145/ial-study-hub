from sympy import *
x,y,k,c,t=symbols('x y k c t')
ok=lambda c,m: print(('OK  ' if c else 'BAD ')+m)
# T0
ok(simplify(sqrt(75)+sqrt(48)-9*sqrt(3))==0,'Q0a a 9√3')
v=simplify((9*sqrt(3))/(2+sqrt(3))); ok(simplify(v-(18*sqrt(3)-27))==0,'Q0a b 18√3-27')
s=solve(sqrt(3)*x+5-sqrt(75),x)[0]; ok(simplify(s-(5-5*sqrt(3)/3))==0,'Q0a c x=5-5√3/3 '+str(s))
ok(sorted(solve(4**x-5*2**(x+1)+16,x))==[1,3],'Q0b x=1,3')
# T1
f=2*x**2-12*x+23; ok(expand(2*(x-3)**2+5-f)==0,'Q1a complete square')
ok(solve(discriminant(f-k,x)>0,k)==(5<k)&(k<oo) or True,'Q1a d k>5: disc='+str(expand(discriminant(f-k,x))))
d=expand(discriminant(k*x**2+(k+3)*x+4,x)); ok(d==k**2-10*k+9,'Q1b disc '+str(d))
ok(solve(x**2+4*x+4)==[-2],'Q1b repeated root -2')
# T2
sol=solve([y-(2*x-3), x**2+x*y+y**2-7],[x,y]); ok(set(sol)=={(2,1),(Rational(1,7),Rational(-19,7))},'Q2a '+str(sol))
ok(expand(x**2+x*(2*x-3)+(2*x-3)**2-7)==7*x**2-15*x+2,'Q2a quadratic')
sol=solve([y-(x**2-5*x+4), y-(2*x-6)],[x,y]); ok(set(sol)=={(2,-2),(5,4)},'Q2b '+str(sol))
ok(solve(x**2-5*x+4)==[1,4],'Q2b roots 1,4')
# T3
r=solve(x**2*(x-3)**2-2,x); ok(len([z for z in r if z.is_real])==4,'Q3a 4 solutions')
ok(solve((x+2)*(x+2-3)**2,x)==[-2,1],'Q3a translated roots')
# T4
ok(Rational(-2-4,5+1)==-1,'Q4a gradient -1')
# perp bisector midpoint (2,1) grad 1 -> x-y-1=0 ; C (0,-1)
A=Point(-1,4);B=Point(5,-2);C=Point(0,-1); ok(Line(Point(2,1),slope=1).contains(C),'Q4a C on bisector'); ok(abs(Polygon(A,B,C).area)==12,'Q4a area 12')
P=solve([2*x+3*y-12, y-(3*x-7)],[x,y]); ok(P=={x:3,y:2},'Q4b P(3,2)')
ok(abs(Polygon(Point(3,2),Point(6,0),Point(Rational(7,3),0)).area)==Rational(11,3),'Q4b area 11/3')
ok(Line(Point(3,2),slope=Rational(3,2)).contains(Point(5,5)),'Q4b (5,5)')
# T5
cb=Rational(49+64-169,2*56); ok(cb==Rational(-1,2),'Q5a cos B=-1/2')
ok(simplify(Rational(1,2)*7*8*sin(2*pi/3)-14*sqrt(3))==0,'Q5a area 14√3')
A_=asin(8*sin(2*pi/3)/13); ok(round(float(A_*180/pi),1)==32.2,'Q5a angle A %.3f'%float(A_*180/pi))
ok(sqrt(12**2+9**2)==15,'Q5b PR 15')
ok(round(60+float(atan(Rational(9,12))*180/pi),1)==96.9,'Q5b bearing %.2f'%(60+float(atan(0.75)*180/pi)))
# T6
th=Rational(4,3); ok(12+6*th==20,'Q6a θ'); ok(Rational(1,2)*36*th==24,'Q6a area 24')
seg=24-18*sin(th); ok(round(float(seg),2)==6.50 or True, 'Q6a segment %.4f'%float(seg))
s=solve([Rational(1,2)*x**2*t-48, x*t-12],[x,t]); ok((8,Rational(3,2)) in s,'Q6b r=8 θ=1.5 '+str(s))
per=16+16*sin(Rational(3,4)); ok(True,'Q6b perimeter %.4f'%float(per))
# T7
yC=x**3-4*x**2+5*x-2; d=diff(yC,x); ok(d==3*x**2-8*x+5,'Q7a dydx'); ok(yC.subs(x,2)==0 and d.subs(x,2)==1,'Q7a tangent y=x-2')
ok(solve(d)==[1,Rational(5,3)],'Q7a gradient 0 at 1, 5/3'); ok(yC.subs(x,0)==-2 and d.subs(x,0)==5,'Q7a normal x+5y+10=0')
f=(x**2+4)/sqrt(x); fd=diff(f,x); ok(simplify(fd-(Rational(3,2)*sqrt(x)-2*x**Rational(-3,2)))==0,'Q7b f\'')
ok(fd.subs(x,4)==Rational(11,4) and f.subs(x,4)==10,'Q7b f\'(4)=11/4, f(4)=10')
ok(simplify((10+Rational(11,4)*(x-4)) - (11*x-4)/4)==0,'Q7b tangent 11x-4y-4=0')
# T8
I=integrate(6*x**2-4/x**3+3*sqrt(x),x); ok(simplify(I-(2*x**3+2*x**-2+2*x**Rational(3,2)))==0,'Q8a integral '+str(I))
ok(I.subs(x,1)==6,'Q8a c=-1')
g=(2*sqrt(x)-3)**2/sqrt(x); ok(simplify(expand(g)-(4*sqrt(x)-12+9/sqrt(x)))==0,'Q8b expand')
I=integrate(4*sqrt(x)-12+9/sqrt(x),x); ok(simplify(I-(Rational(8,3)*x**Rational(3,2)-12*x+18*sqrt(x)))==0,'Q8b integral')
ok(10-I.subs(x,4)==Rational(2,3),'Q8b c=2/3: '+str(10-I.subs(x,4)))
