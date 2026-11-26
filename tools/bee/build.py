import json, sys
sys.path.insert(0, '/home/claude/build/bee')
from bee import Q, LEVELS
V = json.load(open('/tmp/beevals.json'))
TH = [
 {"nt": "อุ่นเครื่อง", "dt": "เลขยกกำลัง $e^{x}$, $\\dfrac{1}{x}$, $\\sin x$ และ $\\cos x$: พื้นฐานแบบเร็ว",
  "ct": ["กลับกฎเลขยกกำลัง: $\\displaystyle\\int x^{n}dx=\\frac{x^{n+1}}{n+1}+C$ เมื่อ $n\\neq-1$ และ $\\displaystyle\\int\\frac{1}{x}dx=\\ln|x|+C$",
         "สำหรับ $(ax+b)^{n}$, $e^{ax}$, $\\sin(ax)$: อินทิเกรตตามปกติแล้วหารด้วย $a$",
         "อินทิกรัลจำกัดเขต: หา $F$ แล้วคำนวณ $F(b)-F(a)$ ไม่ต้องมี $+C$"]},
 {"nt": "ข้อสอบ", "dt": "วิธีใน IAL P4 และ FP3: by parts, การแทนค่า, เศษส่วนย่อย, ฟังก์ชันตรีโกณผกผัน",
  "ct": ["By parts: $\\displaystyle\\int u\\,v'\\,dx=uv-\\int u'\\,v\\,dx$ เลือก $u$ ที่ดิฟแล้วง่ายลง ($x$, $\\ln x$)",
         "สังเกตรูป $\\dfrac{f'(x)}{f(x)}$: คำตอบคือ $\\ln|f(x)|$",
         "รูปมาตรฐาน: $\\displaystyle\\int\\frac{dx}{1+x^{2}}=\\arctan x$, $\\displaystyle\\int\\frac{dx}{\\sqrt{1+x^{2}}}=\\operatorname{arsinh}x$"]},
 {"nt": "ทริค", "dt": "King's rule และความสมมาตร: ทางลัดที่แชมป์ Bee มองออกในไม่กี่วินาที",
  "ct": ["<b>King's rule:</b> $\\displaystyle\\int_{a}^{b}f(x)\\,dx=\\int_{a}^{b}f(a+b-x)\\,dx$ แทน $x$ ด้วย $a+b-x$ แล้วบวก $I$ ทั้งสองแบบ บ่อยครั้งจะตัดกันเหลือ $2I=\\int_{a}^{b}1\\,dx$",
         "ตัวอย่าง: $I=\\displaystyle\\int_{0}^{\\pi/2}\\frac{\\sin x}{\\sin x+\\cos x}dx$ King's rule สลับ $\\sin$ กับ $\\cos$ จึงได้ $2I=\\displaystyle\\int_{0}^{\\pi/2}1\\,dx=\\frac{\\pi}{2}$ และ $I=\\dfrac{\\pi}{4}$",
         "<b>ฟังก์ชันคี่</b> บน $[-a,a]$ อินทิเกรตได้ $0$ สำหรับ $\\dfrac{f(x)}{1+e^{x}}$ เมื่อ $f$ เป็นฟังก์ชันคู่ $\\displaystyle\\int_{-a}^{a}\\frac{f(x)}{1+e^{x}}dx=\\int_{0}^{a}f(x)\\,dx$"]},
 {"nt": "Feynman", "dt": "Feynman's trick: ดิฟเฟอเรนชิเอตภายใต้เครื่องหมายอินทิกรัลด้วยพารามิเตอร์",
  "ct": ["<b>Feynman's trick:</b> ใส่พารามิเตอร์ $t$ ลงในอินทิกรัล $I(t)=\\displaystyle\\int f(x,t)\\,dx$ แล้ว $I'(t)=\\displaystyle\\int\\frac{\\partial f}{\\partial t}dx$ ซึ่งมักง่ายกว่ามาก",
         "ตัวอย่าง: $I(t)=\\displaystyle\\int_{0}^{1}\\frac{x^{t}-1}{\\ln x}dx$ ดิฟได้ $I'(t)=\\displaystyle\\int_{0}^{1}x^{t}dx=\\frac{1}{t+1}$ ดังนั้น $I(t)=\\ln(t+1)$ (เพราะ $I(0)=0$) จึงได้ $\\displaystyle\\int_{0}^{1}\\frac{x-1}{\\ln x}dx=\\ln2$",
         "หาค่าคงที่จากค่า $t$ ที่ง่าย (มักเป็น $I(0)=0$ หรือ $t\\to\\infty$)"]},
 {"nt": "รอบคัดเลือก", "dt": "โจทย์ผสมแบบรอบคัดเลือกของ Bee: ข้อละ 2 นาที",
  "ct": ["อ่านอินทิกรัลทั้งหมดก่อน: มีความสมมาตร มี $f'/f$ ซ่อนอยู่ หรือมีการแทนค่าที่ทำให้เป็นรูปมาตรฐานไหม",
         "สำหรับ $\\displaystyle\\int_{0}^{\\infty}$ ตรวจว่าคำตอบมีค่าจำกัด แล้วลอง $x\\to\\dfrac{1}{x}$",
         "คำตอบมักมี $\\pi$, $\\ln2$ หรือ $\\sqrt{2}$: พิมพ์เป็น pi, ln(2), sqrt(2)"]},
 {"nt": "รอบชิง", "dt": "ยากที่สุด: อินทิกรัลชื่อดังที่คำตอบสวยงาม ข้อละ 5 นาทีแบบรอบชิง Bee",
  "ct": ["อนุกรม: กระจาย เช่น $\\dfrac{1}{1+x}=\\displaystyle\\sum(-1)^{n}x^{n}$ อินทิเกรตทีละพจน์ แล้วจำ $\\displaystyle\\sum\\frac{1}{n^{2}}=\\frac{\\pi^{2}}{6}$",
         "ผสมทริค: King's rule กับความสมมาตร หรือแทนค่าแล้วตามด้วย Feynman",
         "ถ้าติด ลอง $x\\to\\dfrac{1}{x}$, $x\\to\\tan\\theta$ หรือ $x\\to1-x$"]},
]
lv = [dict(l, **TH[i]) for i, l in enumerate(LEVELS)]
qs = []
for q, v in zip(Q, V):
    l, qt, ans, al, tech, sol, chk = q
    d = {"l": l, "q": qt, "al": al, "h": tech, "s": sol}
    if chk is None: d["v"] = v["v"]
    else: d["c"] = 1; d["p"] = v["pts"]
    qs.append(d)
data = "var BEE_LV = " + json.dumps(lv, ensure_ascii=False) + ";\nvar BEE_Q = " + json.dumps(qs, ensure_ascii=False) + ";\n"
open('/home/claude/ial-study-hub/bee.js', 'w').write("/* Integration Bee: integrals and solutions written for IAL Revise. Answers checked with mpmath (build/bee/check.py). */\n" + data + open('/home/claude/build/bee/engine.js').read())
print(len(qs), 'questions')
