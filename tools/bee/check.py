import sys, re, mpmath as mp
sys.path.insert(0,'.')
from bee import Q, LEVELS
mp.mp.dps=30
E={'pi':mp.pi,'e':mp.e,'ln':mp.log,'log':mp.log,'sqrt':mp.sqrt,'sin':mp.sin,'cos':mp.cos,'tan':mp.tan,'exp':mp.exp}
def ev(s,x=None):
    s=s.replace('^','**')
    d=dict(E); 
    if x is not None: d['x']=x
    return eval(s,{'__builtins__':{}},d)
from mpmath import *
# integrands (python) in same order
F=[
("3*x**2+2*x",0,2),("1/sqrt(x)",1,4),("cos(x)",0,pi/2),("exp(2*x)",0,1),("1/x",1,e),("sin(x)",0,pi),("x**(-mpf(2)/3)",1,8),("sec(x)**2",0,pi/4),("(x+1)**3",0,1),("6*x**5-4/x",None,None),
("x*exp(x)",0,1),("log(x)",1,e),("1/(1+x**2)",0,1),("x/(1+x**2)",0,1),("1/(x**2-1)",2,3),("sin(x)**2",0,pi/2),("sin(x)*cos(x)**2",0,pi/2),("1/sqrt(1+x**2)",0,1),("x*sin(x)",0,pi),("exp(x)/(1+exp(x))",0,log(2)),
("sin(x)/(sin(x)+cos(x))",0,pi/2),("sqrt(sin(x))/(sqrt(sin(x))+sqrt(cos(x)))",0,pi/2),("x**3*cos(x)",-1,1),("x**5+cos(x)",-pi/2,pi/2),("x*sin(x)/(1+cos(x)**2)",0,pi),("log(1+tan(x))",0,pi/4),("sqrt(log(9-x))/(sqrt(log(9-x))+sqrt(log(x+3)))",2,4),("1/(1+exp(x))",-1,1),("x/(1+sin(x))",0,pi),("x**2/(1+exp(x))",-2,2),
("(x-1)/log(x)",0,1),("(x**3-1)/log(x)",0,1),("(x**4-x)/log(x)",0,1),("exp(-x)*sin(x)/x",0,inf),("(exp(-x)-exp(-3*x))/x",0,inf),("SINC",0,inf),("x**2*exp(-2*x)",0,inf),("log(1+x)/(1+x**2)",0,1),("log(2+cos(x))",0,pi),("exp(-x**2)",0,inf),
("log(sin(x))",0,pi/2),("COSX",0,inf),("1/(x*log(x))",None,None),("asin(x)",0,1),("tan(x)**2",0,pi/4),("x*log(x)",0,1),("1/(x*(1+x))",1,inf),("sin(x)**4",0,2*pi),("exp(x)*(sin(x)+cos(x))",None,None),("1/(1+x**4)",0,inf),
("log(x)/(1+x)",0,1),("log(x)*log(1-x)",0,1),("x/tan(x)",0,pi/2),("x/(exp(x)-1)",0,inf),("1/(1+tan(x)**sqrt(2))",0,pi/2),("LOGX",0,inf),("sqrt(x/(1-x))",0,1),("SIN2",0,inf),("x**4*(1-x)**4/(1+x**2)",0,1),("x**x*(1+log(x))",None,None)]
bad=0;out=[]
assert len(F)==len(Q)==60
for i,(q,(f,a,b)) in enumerate(zip(Q,F)):
    lv,qt,ans,al,tech,sol,chk=q
    g=lambda x,f=f: eval(f,globals(),{'x':x})
    if f=='SINC': val=quadosc(lambda x:sin(x)/x,[0,inf],omega=1)
    elif f in('COSX','SIN2'):
        h=(lambda x:(1-cos(x))/x**2) if f=='COSX' else (lambda x:sin(x)**2/x**2)
        N=4000; k=2 if f=='COSX' else 1
        val=quad(h,linspace(0,N*pi*k,N+1))+mpf(1)/(N*pi*k)*(1 if f=='COSX' else mpf(1)/2)
    elif f=='LOGX': val=quad(lambda x:log(x)/(1+x**2),[0,1,inf])
    elif a is None:
        a0,b0=mpf(chk[0]),mpf(chk[1]); L=b0-a0
        P=[(a0+L*p,a0+L*q) for p,q in ((0.1,0.9),(0.23,0.61),(0.4,0.77))]
        out.append({'i':i,'ans':ans,'pts':[[float(x1),float(x2),float(quad(g,[x1,x2]))] for x1,x2 in P]})
        continue
    else: val=quad(g,[a,(a+b)/2 if b!=inf else a+1,b])
    out.append({'i':i,'ans':ans,'v':float(val)})
import json; json.dump(out,open('/tmp/beevals.json','w')); print(len(out))
