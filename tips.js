/* Exam technique: where marks were lost, per unit.
   Written in our own words after reading the three most recent Pearson Edexcel IAL examiners' reports
   for each unit (June 2025, January 2025 and October 2024 or June 2024). Links to the reports live in reports.js. */
const UNIT_TIPS = {
 WMA11: [
  'Show every line when you rationalise a denominator or reach a printed answer. Skipped steps cost marks.',
  'In discriminant inequalities, watch for a negative k² coefficient: it flips whether you want the inside or outside region.',
  'Integration: add + c, and convert roots and fractions to index form carefully before integrating.',
  'Use the units the model is written in (e.g. 58 if values are in thousands, not 58 000).',
  'Leave answers exact (surds, fractions) unless the question asks for decimals.'
 ],
 WMA12: [
  'Show the log law step that combines logs before you remove them. Answers without it lose marks.',
  'Check solutions in the original equation and reject ones that don’t work (e.g. a negative value inside a log).',
  'Binomial: square the a in (ax)², and simplify fully: the first term is 1 and signs are combined.',
  'Read carefully whether you need the nth term or the sum of the first n terms.',
  'Trapezium rule: get the strip width h right, and interpret answers in context (money to 2 d.p.).'
 ],
 WMA13: [
  'Put your calculator in radians for calculus and trig modelling. Degree mode was a frequent cause of lost marks.',
  'gf(x) means apply f first, then g. Mixing up the order is the most common composite-function slip.',
  'Ranges of functions need both ends, with the correct strict or non-strict inequality.',
  'Don’t mix up tangent and normal gradients; keep exact values when a later part uses them.',
  'Pick the most direct log method and avoid rounding part-way through.'
 ],
 WMA14: [
  'Always state the range of x for which a binomial expansion is valid, rearranged correctly.',
  'Proofs need algebra (n = 2k, n = 2k + 1), not a few numerical examples.',
  'Watch double negatives in expansions, and remember square roots when solving for y.',
  'If the question asks for a rational or exact answer, don’t give a decimal.',
  'Combine ln terms fully into a single final answer.'
 ],
 WME01: [
  'Draw a force diagram and choose a positive direction. Keep signs consistent, e.g. when a particle lands below where it started.',
  'Convert units (tonnes, km h⁻¹) before using F = ma or suvat.',
  'When a string breaks or a particle hits the ground, work out the next stage of motion separately.',
  'With g = 9.8, give answers to 2 or 3 s.f., not 4.',
  'Velocity from position vectors = change in position ÷ time. Subtract the right way round.'
 ],
 WME02: [
  'If asked for speed, give the magnitude, not a vector.',
  'Answer exactly what is asked: the angle with the rod, or the distance d as defined.',
  '“Show that” questions need every step, set out clearly.',
  'Include g, and use zero acceleration where the motion is at constant velocity.'
 ],
 WME03: [
  'A string goes slack when T = 0, not when v = 0.',
  'Circular motion on a cone: the radius is not the string length. Include every vertical force.',
  'Convert angular speed to v = rω before using ½mv².',
  'For projectile motion after leaving a circle, use the speed at the point where it leaves.',
  'Write π and surds neatly. Messy proofs lost marks even for strong candidates.'
 ],
 WST01: [
  'Show the numbers you substitute, not just the formula.',
  'Give answers to 3 s.f. unless told otherwise. 2 s.f. lost marks.',
  'Without replacement, reduce the total after each pick.',
  'Conditional probability: check the denominator is the probability of the given event.',
  'Name distributions fully (e.g. discrete uniform), and back up skewness claims with values.'
 ],
 WST02: [
  'P(X > a) = 1 − P(X ≤ a). Be careful with ≤ and < for discrete variables.',
  'Write hypotheses in terms of the parameter (λ or p), not in words.',
  'For critical regions, check the tail probabilities on both sides of the boundary.',
  'State the distribution with its parameter values, and reject impossible roots.',
  'Conclusions must be in context and must not contradict each other.'
 ],
 WST03: [
  'Give critical z-values to 4 d.p. (1.6449, not 1.645).',
  'Hypotheses use ρ or μ, with any symbols you introduce defined.',
  'Use the correct standard error for a difference of means.',
  'Standardise when told to, give final answers to 3 s.f., and write confidence intervals as intervals.',
  'Don’t swap the null and alternative hypotheses.'
 ],
 WDM11: [
  'Algorithms: show every pass, pivot and comparison, including the final one.',
  'Sort in the order asked. An ascending sort when descending was asked is penalised.',
  'Critical path: double-check floats and that every activity is included.',
  'Dijkstra: list working values at each node in the order they were found.',
  'Answer the question as set. Many lost marks answering a different one.'
 ],
 WFM01: [
  'Induction: finish with a full conclusion: true for n = 1, and if true for n = k then true for n = k + 1, so true for all n.',
  '“Without using a calculator” means the working must be visible.',
  'Watch signs in expansions and series (Σr = ½n(n + 1)).',
  'Draw Argand diagrams accurately, with conjugate pairs mirrored in the real axis.',
  'Interval bisection and interpolation: check the sign of each f value.'
 ],
 WFM02: [
  'Area between curves: assign the correct limits to each integral.',
  'Give the general solution of a differential equation as y = …',
  'Inequalities and roots: respect restrictions (e.g. n must be positive) and give what is asked.',
  'Define f before writing f(x) = … in Maclaurin/Taylor answers.',
  'Perpendicular bisector loci need the midpoint and the negative reciprocal gradient.'
 ],
 WFM03: [
  '“Show that” results need enough working to show how you got there.',
  'Matrix of cofactors: sign errors and miscopying were the most common slips.',
  'Conics: don’t confuse a with a²; for an ellipse b² = a²(1 − e²).',
  'Bracket clearly. Ambiguous brackets were penalised.',
  'Know the r × b = a × b form of a line.'
 ],
 WPH11: [
  'Young modulus = stress ÷ strain, using the extension (not the new length) and the radius (half the diameter), squared.',
  'Momentum: objects moving in opposite directions need opposite signs.',
  'Check units: pressure/stress in Pa (N m⁻²), moments in N m.',
  'Resultant velocity combines the components. The vertical part alone is not the answer.',
  'On a velocity–time graph, displacement is the area under the line.'
 ],
 WPH12: [
  'Link photon energy to frequency with E = hf.',
  'Put units on the answer line and watch powers of ten.',
  'Standing waves: work out the wavelength from the pattern before using v = fλ.',
  'Explanations need cause → effect in full sentences, about the component in the question.'
 ],
 WPH13: [
  'Read instrument displays carefully (decimal point position, units).',
  'Find gradients from points on your best-fit line, using a large triangle.',
  'Uncertainty limits use the percentage uncertainty of the calculated value.',
  'Circuit diagrams need a power supply and a variable resistor, with the voltmeter across the component.',
  'Give processed values to sensible, consistent significant figures.'
 ],
 WPH14: [
  'Diameter vs radius, and doubling angles, were frequent slips.',
  'Convert g → kg before using SI equations.',
  'Know lepton numbers for the positron (−1) and neutrino (+1).',
  'Six-mark answers need every indicative point, including comparisons when asked.'
 ],
 WPH15: [
  'Gravitational potential: work out each mass’s contribution at its own distance. Don’t add the distances.',
  'Stefan–Boltzmann uses the surface area of a sphere, 4πr².',
  'Wien’s law uses wavelength, not frequency.',
  'Thermal energy flows from hot to cold. SHM: sin ωt = 1 at maximum displacement.',
  'Standard candles: say the candle must be in the same cluster or galaxy, and define the symbols in your equation.'
 ],
 WPH16: [
  'Name specific apparatus and specific safety (heat-resistant gloves, not just gloves).',
  'Round processed data consistently. Don’t truncate.',
  'Label log axes as ln(x / unit), with brackets and units.',
  'Say how many readings (e.g. at least 6), not “many”.',
  'Timing oscillations: say where the fiducial marker goes (at the equilibrium position).',
  'Uncertainty limits use the calculated value, not the stated value.'
 ],
 WCH11: [
  'Read the whole question. Many marks were lost on missed instructions.',
  'Gas calculations: convert cm³ → m³, and only add 273 to Celsius temperatures.',
  'Learn ionisation energy definitions precisely.',
  'In mechanisms, carbocations are intermediates, not final products.',
  'Apply electron-pair repulsion to unfamiliar ions using all the information given.'
 ],
 WCH12: [
  'Half-equations must include electrons.',
  'Calorimetry: use the mass of the solution or water being heated.',
  'Graphs need axis units and a line of best fit.',
  'London forces depend on the number of electrons, not Mr.',
  'Maxwell–Boltzmann: start at the origin, never touch the energy axis, and label it kinetic energy.'
 ],
 WCH13: [
  'Practical descriptions need detail: e.g. clean the wire with hydrochloric acid and place the sample in the flame.',
  'Acidify silver nitrate with dilute nitric acid before testing for halides.',
  'Burette titre uncertainty uses two readings.',
  'Include the sign in ΔH answers.',
  'Use precise practical language (e.g. “placed in the flame”, not “burnt”).'
 ],
 WCH14: [
  'Orders of reaction come from the species in the rate-determining step.',
  'NMR: link environments to peaks. Mass spec: link m/z to fragment formulae.',
  'Lattice energy: one mole of solid forms from gaseous ions. Don’t describe it as energy “needed”.',
  'Count water of crystallisation correctly in formula-mass work.',
  'Give answers to the significant figures requested.'
 ],
 WCH15: [
  'Cell diagrams need state symbols, including Pt(s).',
  'Complexes: describe both types of bonding. Separate chemical from physical properties.',
  'Diazotisation: sodium nitrite with HCl below 10 °C; the diazonium ion has N≡N.',
  'Final answers to sensible significant figures.'
 ],
 WCH16: [
  'There is no data booklet, so know your indicators (methyl orange, phenolphthalein).',
  'Understand what a clock reaction measures.',
  'Standard solutions: make up to the mark, then invert to mix.',
  'Use the reacting ratio from the given equation (e.g. MnO₄⁻ : C₂O₄²⁻ = 2 : 5).',
  'Be specific about hazards. Draw apparatus correctly (filter paper above the Büchner funnel’s perforated base).'
 ],
 WBI11: [
  'Use precise terms: in replication it is nucleotides (base + sugar + phosphate) that line up, not just bases.',
  'Structure-function questions: explain how each feature helps the function.',
  'Temperature and enzymes: cover kinetic energy, collisions, denaturation and active-site shape.',
  'Error bars: explain what overlap means for whether a difference is significant.',
  'Draw chemical structures carefully (e.g. the peptide bond).'
 ],
 WBI12: [
  'Magnification: convert units correctly (µm → mm or cm).',
  'Resolution is not magnification or focus.',
  'In cellulose, hydrogen bonds form between adjacent molecules.',
  'Heterozygosity index = number of heterozygotes ÷ number of individuals.',
  'Use the formula given and handle brackets carefully.'
 ],
 WBI13: [
  'Controlled variables: name the factor and say how you’d control it (don’t just add “variable”).',
  'Tables: units in the column headings, never in the cells.',
  'Gradients are a calculated number with a sign, not a fraction.',
  'Standard deviation is not the range.',
  'Recommended additional practicals are examined as often as core practicals.'
 ],
 WBI14: [
  'When asked how information would be obtained, describe the method, not just the information.',
  'Antibiotics are chemicals that don’t affect viruses. Don’t confuse them with antibodies.',
  'Don’t mix up exons and introns.',
  'Expect a percentage calculation: maths skills are about 10% of the marks.'
 ],
 WBI15: [
  'Quote data from graphs with units.',
  'Follow the command word: “describe” is not “explain”.',
  'Steroid hormones pass into the cell and act on transcription in the nucleus.',
  'Stick to the time range the question asks about.'
 ],
 WBI16: [
  'Say exactly how to control each variable in this investigation (e.g. water bath at 25 °C).',
  '“Justify” needs a reason, not a statement.',
  'Statistics: comment on means as well as standard deviations.',
  'Bar charts: y-axis from zero, labelled “mean …” with units.',
  'Treat both halves or samples the same way, as a fair comparison.'
 ]
};
const UNIT_TIPS_SRC = 'Pearson examiners’ reports, Oct 2024–June 2025';
