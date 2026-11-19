/* Maths and chemistry formulas: text in the site's own content is written as LaTeX between $…$
   (chemistry with \ce{…}, the mhchem extension) and drawn with KaTeX, which is stored with the site so it works offline.
   texPlain() turns the same text back into plain Unicode for answer marking, search and copied text. */
(function(){
  const SUP = {'−':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻','+':'⁺','=':'⁼','(':'⁽',')':'⁾','n':'ⁿ','k':'ᵏ','x':'ˣ','y':'ʸ','i':'ⁱ','t':'ᵗ','a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','j':'ʲ','l':'ˡ','m':'ᵐ','o':'ᵒ','p':'ᵖ','r':'ʳ','s':'ˢ','u':'ᵘ','v':'ᵛ','w':'ʷ','z':'ᶻ'};
  const SUB = {'−':'₋','0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉','-':'₋','+':'₊','=':'₌','(':'₍',')':'₎','n':'ₙ','x':'ₓ','a':'ₐ','e':'ₑ','o':'ₒ','k':'ₖ','m':'ₘ','p':'ₚ','t':'ₜ','i':'ᵢ','r':'ᵣ'};
  const SYM = {times:'×',div:'÷',le:'≤',ge:'≥',leq:'≤',geq:'≥',pm:'±',mp:'∓',ne:'≠',neq:'≠',approx:'≈',propto:'∝',to:'→',rightarrow:'→',Rightarrow:'⇒',Leftrightarrow:'⇔',cdot:'·',equiv:'≡',in:'∈',infty:'∞',therefore:'∴',sim:'∼',int:'∫',sum:'Σ',circ:'°',
    alpha:'α',beta:'β',gamma:'γ',delta:'δ',varepsilon:'ε',epsilon:'ε',theta:'θ',lambda:'λ',mu:'μ',pi:'π',rho:'ρ',sigma:'σ',tau:'τ',phi:'φ',omega:'ω',eta:'η',chi:'χ',psi:'ψ',nu:'ν',kappa:'κ',xi:'ξ',zeta:'ζ',Delta:'Δ',Sigma:'Σ',Omega:'Ω',Phi:'Φ',Gamma:'Γ',Lambda:'Λ',cup:'∪',cap:'∩',subseteq:'⊆',notin:'∉',lvert:'|',rvert:'|',vert:'|',mid:'|',perp:'⊥',parallel:'∥',degree:'°',ldots:'…',dots:'…',quad:' ',qquad:' '};
  /* $…$ counts as maths only when it hugs the dollar signs (TeX's rule), so “$5 and $10” stays text. */
  const MATH = /\$([^\s$](?:[^$]*[^\s$])?)\$/g, MATH1 = /\$[^\s$](?:[^$]*[^\s$])?\$/, SPLIT = /(\$[^\s$](?:[^$]*[^\s$])?\$)/, WHOLE = /^\$[^\s$](?:[^$]*[^\s$])?\$$/;
  const FR = {'1/2':'½','1/4':'¼','3/4':'¾','1/3':'⅓','2/3':'⅔','1/8':'⅛'};
  function arg(s, i){ // read {…} or a single char starting at i; returns [content, next]
    while (s[i] === ' ') i++;
    if (s[i] !== '{') return [s[i] || '', i + 1];
    let d = 0;
    for (let j = i; j < s.length; j++){ if (s[j] === '{') d++; else if (s[j] === '}'){ d--; if (!d) return [s.slice(i + 1, j), j + 1]; } }
    return [s.slice(i + 1), s.length];
  }
  const simple = x => /^[A-Za-z0-9.α-ωΑ-Ω]+$|^[A-Za-z0-9.]+[⁰-⁹⁻⁺ⁿᵏ]*$/.test(x);
  const script = (x, map, mark) => { const t = plain(x); return [...t].every(c => map[c]) ? [...t].map(c => map[c]).join('') : mark + (simple(t) ? t : '(' + t + ')'); };
  function ce(x){ // mhchem input → Unicode formula
    return x.replace(/#/g, '≡').replace(/\^\{\.\}|\^\./g, '•').replace(/\s*<=>\s*/g, ' ⇌ ').replace(/\s*->\s*/g, ' → ')
      .replace(/\^\{([^}]*)\}|\^(\d*[+-])/g, (m, a, b) => [...(a != null ? a : b)].map(c => SUP[c] || c).join(''))
      .replace(/_\{([^}]*)\}/g, (m, a) => [...a].map(c => SUB[c] || c).join(''))
      .replace(/([A-Za-z)\]])(\d+)/g, (m, a, d) => a + [...d].map(c => SUB[c]).join(''))
      .replace(/([A-Za-z₀-₉)\]])([+-])(?=$|[\s)\]])/g, (m, a, s) => a + SUP[s]);
  }
  function plain(s){
    let out = '', i = 0;
    while (i < s.length){
      const c = s[i];
      if (c === '\\'){
        const m = /^\\([A-Za-z]+|.)/.exec(s.slice(i)); const name = m[1]; i += m[0].length;
        if (name === 'frac' || name === 'tfrac' || name === 'dfrac'){
          const [a, i2] = arg(s, i), [b, i3] = arg(s, i2); i = i3;
          const A = plain(a), B = plain(b);
          let f = FR[A + '/' + B] || ((simple(A) ? A : '(' + A + ')') + '/' + (simple(B) ? B : '(' + B + ')'));
          if (!FR[A + '/' + B] && /^[\s]*[A-Za-z0-9(\\]/.test(s.slice(i)) && !/^\s*\\(times|div|le|ge|to|cdot|pm|approx)/.test(s.slice(i))) f = '(' + f + ')';
          out += f;
        } else if (name === 'sqrt'){ let idx = ''; if (s[i] === '['){ const e = s.indexOf(']', i); idx = s.slice(i + 1, e); i = e + 1; } const [a, i2] = arg(s, i); i = i2; const A = plain(a); out += (idx ? [...plain(idx)].map(c => SUP[c] || c).join('') : '') + '√' + (simple(A) ? A : '(' + A + ')'); }
        else if (name === 'begin'){ const [env, i2] = arg(s, i); const end = s.indexOf('\\end{' + env + '}', i2); const body = s.slice(i2, end < 0 ? s.length : end); i = end < 0 ? s.length : end + 6 + env.length;
          const rows = body.split('\\\\').map(r => r.split('&').map(c => plain(c.trim())).join(' ')); const br = env === 'vmatrix' ? ['|', '|'] : env === 'bmatrix' ? ['[', ']'] : ['(', ')']; out += br[0] + rows.join('; ') + br[1]; }
        else if (name === 'ce'){ const [a, i2] = arg(s, i); i = i2; out += ce(a); }
        else if (name === 'mathrm' || name === 'text' || name === 'operatorname' || name === 'textrm' || name === 'mathit'){ const [a, i2] = arg(s, i); i = i2; out += plain(a); }
        else if (name === 'bar' || name === 'dot' || name === 'ddot' || name === 'hat'){ const [a, i2] = arg(s, i); i = i2; out += plain(a) + ({bar:'\u0304', dot:'\u0307', ddot:'\u0308', hat:'\u0302'})[name]; }
        else if (name === 'mathbf' || name === 'boldsymbol'){ const [a, i2] = arg(s, i); i = i2; out += plain(a); }
        else if (name === 'mathbb'){ const [a, i2] = arg(s, i); i = i2; out += ({Z:'ℤ', R:'ℝ', N:'ℕ', Q:'ℚ', C:'ℂ'})[a] || a; }
        else if (name === 'binom'){ const [a, i2] = arg(s, i), [b, i3] = arg(s, i2); i = i3; out += '(' + plain(a) + ' C ' + plain(b) + ')'; }
        else if (name === 'left' || name === 'right'){ }
        else if (name === ',' || name === ';' || name === '!' || name === ' '){ if (name === ' ') out += ' '; }
        else if (SYM[name]) out += SYM[name];
        else if (name.length === 1) out += name;
        else out += name; // \sin, \ln, \log …
      } else if (c === '^' || c === '_'){
        const [a, i2] = arg(s, i + 1); i = i2;
        out += a === '\\circ' ? '°' : script(a, c === '^' ? SUP : SUB, c);
      } else if (c === '{' || c === '}'){ i++; }
      else if (c === '-'){ out += '−'; i++; }
      else if (c === "'"){ out += '′'; i++; }
      else { out += c; i++; }
    }
    return out.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
  }
  function texPlain(s){
    s = String(s == null ? '' : s);
    return s.indexOf('$') < 0 ? s : s.replace(MATH, (m, x) => plain(x));
  }
  /* Draw $…$ in text nodes under root. Leaves the plain Unicode form until KaTeX has loaded. */
  function texify(root){
    if (!root || typeof document === 'undefined') return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), todo = []; let n;
    while ((n = w.nextNode())){ if (n.nodeValue.indexOf('$') >= 0 && MATH1.test(n.nodeValue)){ const p = n.parentElement; if (p && !p.closest('script,style,textarea,.katex,.notex')) todo.push(n); } }
    todo.forEach(n => {
      const frag = document.createDocumentFragment(), parts = n.nodeValue.split(SPLIT);
      parts.forEach(x => {
        if (WHOLE.test(x)){
          const src = x.slice(1, -1);
          if (window.katex){
            const sp = document.createElement('span'); sp.className = 'tex';
            try { window.katex.render(src, sp, { throwOnError: false, output: 'htmlAndMathml', strict: 'ignore' }); } catch(e){ sp.textContent = plain(src); }
            frag.appendChild(sp);
          } else frag.appendChild(document.createTextNode(plain(src)));
        } else if (x) frag.appendChild(document.createTextNode(x));
      });
      n.parentNode.replaceChild(frag, n);
    });
  }
  const g = typeof window !== 'undefined' ? window : globalThis;
  g.texPlain = texPlain; g.texify = texify;
  if (typeof module !== 'undefined') module.exports = { texPlain, plain };
})();
