/* Exam technique: where marks were lost, per unit.
   Written in our own words after reading the three most recent Pearson Edexcel IAL examiners' reports
   for each unit (June 2025, January 2025 and October 2024 or June 2024). Links to the reports live in reports.js. */
const UNIT_TIPS = {
 WMA11: [
  'Show every line when you rationalise a denominator or reach a printed answer. Skipped steps cost marks.',
  'In discriminant inequalities, watch for a negative $k^{2}$ coefficient: it flips whether you want the inside or outside region.',
  'Integration: add $+\\,c$, and convert roots and fractions to index form carefully before integrating.',
  'Use the units the model is written in (e.g. 58 if values are in thousands, not 58 000).',
  'Leave answers exact (surds, fractions) unless the question asks for decimals.'
 ],
 WMA12: [
  'Show the log law step that combines logs before you remove them. Answers without it lose marks.',
  'Check solutions in the original equation and reject ones that don’t work (e.g. a negative value inside a log).',
  'Binomial: square the a in $(ax)^{2}$, and simplify fully: the first term is 1 and signs are combined.',
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
  'Proofs need algebra ($n = 2k$, $n = 2k + 1$), not a few numerical examples.',
  'Watch double negatives in expansions, and remember square roots when solving for y.',
  'If the question asks for a rational or exact answer, don’t give a decimal.',
  'Combine ln terms fully into a single final answer.'
 ],
 WME01: [
  'Draw a force diagram and choose a positive direction. Keep signs consistent, e.g. when a particle lands below where it started.',
  'Convert units (tonnes, km h⁻¹) before using $F = ma$ or suvat.',
  'When a string breaks or a particle hits the ground, work out the next stage of motion separately.',
  'With $g = 9.8$, give answers to 2 or 3 s.f., not 4.',
  'Velocity from position vectors = change in position ÷ time. Subtract the right way round.'
 ],
 WME02: [
  'If asked for speed, give the magnitude, not a vector.',
  'Answer exactly what is asked: the angle with the rod, or the distance d as defined.',
  '“Show that” questions need every step, set out clearly.',
  'Include g, and use zero acceleration where the motion is at constant velocity.'
 ],
 WME03: [
  'A string goes slack when $T = 0$, not when $v = 0$.',
  'Circular motion on a cone: the radius is not the string length. Include every vertical force.',
  'Convert angular speed to $v = r\\omega$ before using $\\tfrac{1}{2}mv^{2}$.',
  'For projectile motion after leaving a circle, use the speed at the point where it leaves.',
  'Write $\\pi$ and surds neatly. Messy proofs lost marks even for strong candidates.'
 ],
 WST01: [
  'Show the numbers you substitute, not just the formula.',
  'Give answers to 3 s.f. unless told otherwise. 2 s.f. lost marks.',
  'Without replacement, reduce the total after each pick.',
  'Conditional probability: check the denominator is the probability of the given event.',
  'Name distributions fully (e.g. discrete uniform), and back up skewness claims with values.'
 ],
 WST02: [
  '$P(X > a) = 1 - P(X \\le a)$. Be careful with ≤ and < for discrete variables.',
  'Write hypotheses in terms of the parameter ($\\lambda$ or p), not in words.',
  'For critical regions, check the tail probabilities on both sides of the boundary.',
  'State the distribution with its parameter values, and reject impossible roots.',
  'Conclusions must be in context and must not contradict each other.'
 ],
 WST03: [
  'Give critical z-values to 4 d.p. (1.6449, not 1.645).',
  'Hypotheses use $\\rho$ or $\\mu$, with any symbols you introduce defined.',
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
  'Induction: finish with a full conclusion: true for $n = 1$, and if true for $n = k$ then true for $n = k + 1$, so true for all n.',
  '“Without using a calculator” means the working must be visible.',
  'Watch signs in expansions and series ($\\Sigma r = \\tfrac{1}{2}n(n + 1)$).',
  'Draw Argand diagrams accurately, with conjugate pairs mirrored in the real axis.',
  'Interval bisection and interpolation: check the sign of each f value.'
 ],
 WFM02: [
  'Area between curves: assign the correct limits to each integral.',
  'Give the general solution of a differential equation as y = …',
  'Inequalities and roots: respect restrictions (e.g. n must be positive) and give what is asked.',
  'Define f before writing $f(x)$ = … in Maclaurin/Taylor answers.',
  'Perpendicular bisector loci need the midpoint and the negative reciprocal gradient.'
 ],
 WFM03: [
  '“Show that” results need enough working to show how you got there.',
  'Matrix of cofactors: sign errors and miscopying were the most common slips.',
  'Conics: don’t confuse a with $a^{2}$; for an ellipse $b^{2} = a^{2}(1 - e^{2})$.',
  'Bracket clearly. Ambiguous brackets were penalised.',
  'Know the $r \\times b = a \\times b$ form of a line.'
 ],
 WPH11: [
  'Young modulus = stress ÷ strain, using the extension (not the new length) and the radius (half the diameter), squared.',
  'Momentum: objects moving in opposite directions need opposite signs.',
  'Check units: pressure/stress in Pa (N m⁻²), moments in N m.',
  'Resultant velocity combines the components. The vertical part alone is not the answer.',
  'On a velocity–time graph, displacement is the area under the line.'
 ],
 WPH12: [
  'Link photon energy to frequency with $E = hf$.',
  'Put units on the answer line and watch powers of ten.',
  'Standing waves: work out the wavelength from the pattern before using $v = f\\lambda$.',
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
  'Stefan–Boltzmann uses the surface area of a sphere, $4\\pi r^{2}$.',
  'Wien’s law uses wavelength, not frequency.',
  'Thermal energy flows from hot to cold. SHM: $\\sin \\omega t = 1$ at maximum displacement.',
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
  'NMR: link environments to peaks. Mass spec: link $m/z$ to fragment formulae.',
  'Lattice energy: one mole of solid forms from gaseous ions. Don’t describe it as energy “needed”.',
  'Count water of crystallisation correctly in formula-mass work.',
  'Give answers to the significant figures requested.'
 ],
 WCH15: [
  'Cell diagrams need state symbols, including Pt(s).',
  'Complexes: describe both types of bonding. Separate chemical from physical properties.',
  'Diazotisation: sodium nitrite with $\\ce{HCl}$ below 10 °C; the diazonium ion has $\\ce{N#N}$.',
  'Final answers to sensible significant figures.'
 ],
 WCH16: [
  'There is no data booklet, so know your indicators (methyl orange, phenolphthalein).',
  'Understand what a clock reaction measures.',
  'Standard solutions: make up to the mark, then invert to mix.',
  'Use the reacting ratio from the given equation (e.g. $\\ce{MnO4-} : \\ce{C2O4^{2-}} = 2 : 5$).',
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
 ,WEC11: [
  'If a question only asks for a diagram, the diagram earns all the marks: draw it big, fully labelled, and don’t waste time writing.',
  'Indirect tax diagrams: a fixed amount per unit (specific tax) shifts supply in parallel; a percentage (ad valorem) tax makes it pivot.',
  'Define the key term first (e.g. producer surplus, opportunity cost). The definition is usually a free knowledge mark.',
  'In data questions, quote and use the actual numbers from the tables, not just “it increased”.',
  'Mixed economy vs free market: a big private sector alone doesn’t make a free market. Sketch the diagram for tricky multiple choice.'
 ],
 WEC12: [
  'Read every part of the question: missing the depth or the second half of a question was the main reason for low marks.',
  'Diagram and calculation questions earn their marks from the diagram or the answer alone; keep the writing for questions that need it.',
  'Draw accurate, labelled AD/AS diagrams even when not required. They add depth to analysis.',
  'In longer questions and essays, evaluation must be a developed chain of reasoning linked to the context, not a one-line “however”.',
  'Practise the quantitative skills (index numbers, multiplier, percentage change) so they are quick marks.'
 ],
 WEC13: [
  'Read the whole extract before answering so your points use its context and numbers.',
  'Know the difference between competition (how many firms) and contestability (how easy it is to enter or leave).',
  '8- and 14-mark questions need evaluation of the specific point you made, not a generic list of “depends on” factors.',
  'If costs rise, think about which curves move: a rise in ingredient costs shifts both AC and MC.',
  'In essays, go deeper on fewer points, add a relevant diagram when asked, and use specific real examples (e.g. bulk-buying discounts as an economy of scale).'
 ],
 WEC14: [
  'Use the extracts, but don’t copy them: a short quotation is fine, copied sentences don’t reach the higher levels.',
  '4- and 6-mark questions don’t need evaluation. Spend that time on the bigger questions.',
  'For 8 marks and above, evaluation is essential: develop it and tie it to the country or context in the question.',
  'Check calculations such as index numbers and inflation rates carefully; many lost easy marks here.',
  'Give essays a clear structure (define, analyse with a diagram, evaluate, judge) and answer every part of the question.'
 ],
 WGE01: [
  'Keep short-answer questions short: they are low-tariff, so a few precise sentences beat a mini essay.',
  'Every essay must be supported by evidence: named places, data and case-study facts.',
  '“Compare” means similarities and differences side by side, not two separate descriptions.',
  'Be specific: name countries, gases, processes and dates rather than writing in general terms.',
  'Cover every part of a multi-part question; the marks are split across the parts.'
 ],
 WGE02: [
  'Be clear about physical processes (e.g. mass movement such as cliff falls and landslides) and how geology shapes coasts.',
  '“Identify” only needs the idea named: don’t explain it, just give the required number of clear points.',
  'Know the difference between primary and secondary data, and refer to the right type when asked.',
  'Fieldwork questions: describe your own investigation’s route to enquiry, methods and data accurately.',
  'In essays on coasts or cities, include management and people, not just processes.'
 ],
 WGE03: [
  'There are no marks for just describing a Figure: explain the reasons behind what it shows.',
  'Be selective with case studies in 15- and 20-mark essays: only use the facts that answer the question.',
  'The 5-mark data questions fit in the space given, but you must refer to data from the Figure.',
  'Start essays by defining the key terms, then keep checking you are still answering the question.',
  'Support every argument with evidence: examples, case-study facts and data, especially in the long essays.'
 ],
 WGE04: [
  'Open with a clear focus on the question’s key contention in your introduction.',
  'Write in report form: introduction, research methods, analysis, conclusion and evaluation.',
  'Reference and source your own research consistently; it boosts both credibility and marks.',
  'Keep research (what you found) separate from analysis (what it means for the question).',
  'Plan your time so the conclusion and evaluation are fully developed, not rushed.'
 ],
 WPS01: [
  'Use the scenario: link every point to the details given in the question.',
  'Learn the classic and contemporary studies in detail (e.g. Moscovici’s sample and procedure).',
  'Match your depth to the marks available, and know what each command word asks for.',
  'For your practical investigations, give specific details, not generic answers.',
  'Strengths, weaknesses and improvements need a justification of why, not just a statement. Distinguish clearly between memory models.'
 ],
 WPS02: [
  'In scenario questions, quote details from the scenario to earn the application (AO2) marks.',
  'Strengths and weaknesses of a named study must be about that study, not generic points.',
  'An improvement must explain how it makes the study better, not restate the weakness.',
  'Know which assessment objectives each type of extended question rewards.',
  'Learn the biological and learning-theory studies in detail so you can use accurate evidence.'
 ],
 WPS03: [
  'Generic answers score zero in scenario questions: always link concepts and studies to the context.',
  'If a question asks you to compare, make a two-sided comparison to access all the marks.',
  '“Describe” questions need a full description for each point; naming a feature alone isn’t enough.',
  'An improvement changes the existing study; suggesting a completely different method doesn’t count.',
  'Revisit inferential statistics and the named studies in each topic.'
 ],
 WPS04: [
  'Know the difference between “describe” and “explain” in short questions.',
  'Extended answers need balance, examples and a judgement or conclusion where appropriate.',
  'Evaluation (AO3) is still the weakest part: practise it on past papers.',
  'In the key-question essay, apply psychology to the scenario rather than repeating the scenario.',
  'Write in full sentences; bullet points rarely reach the top levels. Avoid generic answers.'
 ],
 WHI01: [
  'Focus on the exact issue in the question (e.g. a specific consequence or time period), not the whole topic.',
  'Back every judgement with criteria: say why one factor matters more than another.',
  'Stick to the dates in the question; don’t assume earlier events or methods still apply.',
  'In Section B, explain how the two historians’ interpretations differ and use your own knowledge to test them.',
  'Write analysis, not narrative: every paragraph should argue towards your answer.'
 ],
 WHI02: [
  'Source value: make inferences from the source, don’t paraphrase it.',
  'Keep inferences and context focused on the enquiry in the question, and add knowledge from beyond the source.',
  'Look at the specific purpose, audience and stance of the author, not stock comments about the type of source.',
  'For value questions, don’t write about the source’s limitations.',
  'For weight, think about who the author was writing for, and use your own knowledge to test the source’s claims.'
 ],
 WHI03: [
  'Use the two sources together, not one after the other.',
  'Learn key dates: Section B questions can cover the same period from different angles.',
  'Avoid narrative and generalisation. Analyse, with a wide range of precise supporting detail.',
  'Make clear judgements throughout and in your conclusion.',
  'Keep your introduction short and focused on the question.'
 ],
 WHI04: [
  'Interpret both extracts: analyse the arguments each historian makes, and refer to them by name.',
  'Extracts are judged on their views, not as sources; don’t discuss provenance or that they are secondary sources.',
  'Use your own knowledge of the specification content to test the interpretations.',
  'Reach an overall judgement on the view in the question; summarising the extracts isn’t enough.',
  'In Section B essays, stay analytical and support each point with precise evidence.'
 ]
};
const UNIT_TIPS_SRC = 'Pearson examiners’ reports, Oct 2024–June 2025';
