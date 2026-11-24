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
  'Binomial: square the $a$ in $(ax)^{2}$, and simplify fully: the first term is 1 and signs are combined.',
  'Read carefully whether you need the $n$th term or the sum of the first $n$ terms.',
  'Trapezium rule: get the strip width $h$ right, and interpret answers in context (money to 2 d.p.).'
 ],
 WMA13: [
  'Put your calculator in radians for calculus and trig modelling. Degree mode was a frequent cause of lost marks.',
  '$gf(x)$ means apply $f$ first, then $g$. Mixing up the order is the most common composite-function slip.',
  'Ranges of functions need both ends, with the correct strict or non-strict inequality.',
  'Don’t mix up tangent and normal gradients; keep exact values when a later part uses them.',
  'Pick the most direct log method and avoid rounding part-way through.'
 ],
 WMA14: [
  'Always state the range of $x$ for which a binomial expansion is valid, rearranged correctly.',
  'Proofs need algebra ($n = 2k$, $n = 2k + 1$), not a few numerical examples.',
  'Watch double negatives in expansions, and remember square roots when solving for $y$.',
  'If the question asks for a rational or exact answer, don’t give a decimal.',
  'Combine ln terms fully into a single final answer.'
 ],
 WME01: [
  'Draw a force diagram and choose a positive direction. Keep signs consistent, e.g. when a particle lands below where it started.',
  'Convert units (tonnes, $\\text{km h}^{-1}$) before using $F = ma$ or suvat.',
  'When a string breaks or a particle hits the ground, work out the next stage of motion separately.',
  'With $g = 9.8$, give answers to 2 or 3 s.f., not 4.',
  'Velocity from position vectors = change in position ÷ time. Subtract the right way round.'
 ],
 WME02: [
  'If asked for speed, give the magnitude, not a vector.',
  'Answer exactly what is asked: the angle with the rod, or the distance $d$ as defined.',
  '“Show that” questions need every step, set out clearly.',
  'Include $g$, and use zero acceleration where the motion is at constant velocity.'
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
  '$\\mathrm{P}(X>a)=1-\\mathrm{P}(X\\le a)$. Be careful with $\\le$ and $<$ for discrete variables.',
  'Write hypotheses in terms of the parameter ($\\lambda$ or $p$), not in words.',
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
  'Answer exactly what the question asks; answering a similar-looking question earns nothing.'
 ],
 WFM01: [
  'Induction: finish with a full conclusion: true for $n = 1$, and if true for $n = k$ then true for $n = k + 1$, so true for all $n$.',
  '“Without using a calculator” means the working must be visible.',
  'Watch signs in expansions and series ($\\Sigma r = \\tfrac{1}{2}n(n + 1)$).',
  'Draw Argand diagrams accurately, with conjugate pairs mirrored in the real axis.',
  'Interval bisection and interpolation: check the sign of each $f$ value.'
 ],
 WFM02: [
  'Area between curves: assign the correct limits to each integral.',
  'Give the general solution of a differential equation as $y=\\ldots$.',
  'Inequalities and roots: respect restrictions (e.g. $n$ must be positive) and give what is asked.',
  'Define $f$ before writing $f(x)=\\ldots$ in Maclaurin/Taylor answers.',
  'Perpendicular bisector loci need the midpoint and the negative reciprocal gradient.'
 ],
 WFM03: [
  '“Show that” results need enough working to show how you got there.',
  'Matrix of cofactors: sign errors and miscopying were the most common slips.',
  'Conics: don’t confuse $a$ with $a^{2}$; for an ellipse $b^{2} = a^{2}(1 - e^{2})$.',
  'Bracket clearly. Ambiguous brackets were penalised.',
  'Know the $\\mathbf{r}\\times\\mathbf{b}=\\mathbf{a}\\times\\mathbf{b}$ form of a line.'
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
  'Read every part of the question. Answers that skipped the second half, or stayed too shallow, lost the most marks.',
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
  'Test each interpretation against what you know from the course, not just the extracts.',
  'Reach an overall judgement on the view in the question; summarising the extracts isn’t enough.',
  'In Section B essays, stay analytical and support each point with precise evidence.'
 ],
 WAC11: [
  'Read each question twice: a missed instruction, such as writing “No effect” for an adjustment, costs easy marks.',
  'Journal entries need dates and full narratives, with no abbreviations. Owner’s withdrawals go to Drawings.',
  'Make every adjustment in the financial statements; don’t copy the original trial balance figures across.',
  'Lay out Trading and Income and Expenditure accounts as financial statements, not as ledger accounts.',
  'In “evaluate” questions give both sides, then a clear conclusion.'
 ],
 WAC12: [
  'Give units with every answer: £, £ million, %, times or days for ratios.',
  'Split semi-variable costs into their fixed and variable parts; don’t put them all on one side.',
  'Don’t leave out basic lines such as Total costs in budgets and statements.',
  'In evaluations, don’t just restate your figures in words: say what they mean for the business.',
  'When asked to choose between options, finish with a decision, e.g. “should invest” or “should not invest”.'
 ],
 WBS11: [
  'Definitions only need to be short and accurate.',
  'Answer the exact topic asked about; generic business answers score little.',
  'Use the extract as evidence for your points, but don’t copy long sections of it.',
  'Develop your counterbalance as fully as your main analysis, in context.',
  'Always add the currency or units to calculated answers.'
 ],
 WBS12: [
  'Learn the command words: each one tells you how much to write and which skills earn marks.',
  'In calculations, show the formula, substitute the case data and complete the final step (e.g. margin of safety from break-even).',
  'Answer every part of the question, including any “other ways” you are asked to evaluate.',
  'Give causes and consequences in the context of the case to reach the top marks.'
 ],
 WBS13: [
  'Learn formulae exactly (e.g. YED, not PED) and show full workings.',
  'Round as instructed: answers not given to two decimal places when asked lose the mark.',
  'Build chains of reasoning from the evidence rather than listing short statements.',
  'Apply the case context in every answer, not just in the conclusion.'
 ],
 WBS14: [
  'Write out the formula, show workings and check which currency or unit the answer needs.',
  'Develop a few points into logical chains rather than listing many reasons.',
  'Check who the question is about: a country, the economy or one business.',
  'Use extract material to build an argument; copied text earns nothing.',
  'No marks for definitions here, and an 8-mark question doesn’t need a conclusion.'
 ],
 WEN01: [
  'Only use language frameworks that fit the task and that you can show in the source texts.',
  'Comment on language choices all the way through your comparison, not in a separate section.',
  'Read both texts carefully before writing; misreading details costs marks.',
  'In the writing task, adapt material from the sources into your new text, and plan your time so neither task is rushed.'
 ],
 WEN02: [
  'Read both questions and all the extracts before you start writing.',
  'Quote from the sources, but don’t copy out large chunks.',
  'Describe language variation neutrally; avoid calling features “wrong”, “incorrect” or “lazy”.',
  'Explain why a feature matters (context, function, register), rather than just “feature → standard form”.'
 ],
 WEN03: [
  'Section A: create a completely original text from the sources, not a summary of them.',
  'Edit and select: writing too much in Section A leaves too little time for Section B.',
  'In the commentary, analyse discourse, grammar and lexis linked to audience, purpose and context.',
  'Use a range of rhetorical and linguistic devices suited to the form, e.g. a speech.'
 ],
 WEN04: [
  'Spend longer on Section B: it carries more marks and must include your own research.',
  'Analyse features with terminology and link them to theory; don’t just spot and describe them.',
  'Support theory with specific language features from the data.',
  'For questions on technology, keep the focus on how language and communication change.'
 ],
 WET01: [
  'Choose poems that best fit the task, not just ones you feel comfortable with, and only from the set list.',
  'Analyse how methods shape meaning; naming techniques alone isn’t enough.',
  'Make connections between the poems throughout.',
  'Weave context into your argument rather than adding it as background.',
  'Plan so your answer responds directly to the question’s terms.'
 ],
 WET02: [
  'Plan a line of argument that engages with the critical view in the question, even if you disagree.',
  'Use context to illuminate the text, without turning the essay into a history essay.',
  'Link critical views to specific moments in the text.',
  'Discuss a range of techniques (structure, form, dramatic methods), not only single words.'
 ],
 WET03: [
  'Spend time reading, annotating and planning before writing: it shows in the results.',
  'Analyse what is actually in the unseen poem; don’t hunt for forms or techniques that aren’t there.',
  'Support analysis with close reference to the writer’s methods and their nuances.',
  'Compare the texts with each other and show how context shapes how they are written and read.'
 ],
 WET04: [
  'Balance your time: don’t over-write on Shakespeare at the expense of the poetry.',
  'Section A: weigh the view in quotation marks and answer the task that follows it; use it to build a thesis.',
  'Section B: choose a second poem that really fits the argument, not just the one you know best.',
  'Use precise literary terminology for both drama and poetry.'
 ],
 WIT11: [
  'Use precise technical terms; vague phrases (“makes sure there is enough memory”) score little.',
  'Use the words in the question to work out what kind of answer is needed.',
  'Draw flowcharts with standard symbols, and join loop-back arrows to a line, not to a symbol.',
  'Keep extended answers technically accurate as well as well argued.'
 ],
 WIT12: [
  'Use a plain text editor only, as required: no WYSIWYG or code-completing tools.',
  'Check details in CSS and HTML, e.g. full border declarations and table backgrounds.',
  'Test your JavaScript logic for every case, including the first item.',
  'Save files in the original folder and submit the whole zipped folder structure.'
 ],
 WIT13: [
  'Know when to use flowchart, data-flow and entity-relationship symbols, and use them correctly.',
  'Universal usability means different groups of users, including accessibility needs.',
  'Use technical terms with their exact meaning, e.g. integration.',
  'Use the words in each question to judge the kind and depth of answer needed.'
 ],
 WIT14: [
  'Choose the right data type for every field, e.g. Date/Time for dates.',
  'Rename calculated fields in queries.',
  'Don’t store data that can be calculated and will go out of date, such as years of service.',
  'When normalising, spot every table needed (e.g. sale details, performance) and its fields.',
  'Follow each validation or format rule fully, e.g. forcing uppercase.'
 ],
 WFR01: [
  'Answer the four stimulus questions fully: detailed answers earn the top understanding marks.',
  'Bring facts, figures and evidence of research on your topic area to the discussion.',
  'Develop your points with concrete examples rather than general opinions.'
 ],
 WFR02: [
  'Answer in your own words; copied chunks of the text are not credited.',
  'Read for both the overall gist and specific details: small words can change the answer.',
  'In gap-fill tasks, choose the word form that fits the grammar of the sentence.',
  'Look out for linking words and markers that signal the answer.'
 ],
 WFR03: [
  'Research your chosen issue and refer to at least two named written French sources.',
  'Use facts and statistics; general knowledge alone won’t reach high marks.',
  'Show a range of complex structures: pronouns, subordination, varied tenses, the subjunctive and idioms.',
  'Engage in a real discussion: react to what the examiner says rather than giving learnt speeches.'
 ],
 WFR04: [
  'Listen for the gist of the whole passage: a word you hear isn’t necessarily the answer.',
  'Process the information and use your own words; don’t copy whole passages.',
  'Manipulated sentences must make sense and be grammatically correct in their original context.',
  'Check where each question puts its weight, often in its second part.'
 ],
 WGN01: [
  'Answer each stimulus question with as many relevant elements as you can, giving reasons and examples.',
  'Consider more than one implication when asked about consequences.',
  'Let the discussion build naturally on your earlier answers.'
 ],
 WGN02: [
  'Work at sentence level: clues to tense or number may not be next to the gap.',
  'Check verb endings to tell singular from plural.',
  'Use nouns or names instead of unclear pronouns in your answers.',
  'Essays don’t need to be long; around 240 well-organised words can earn full marks.'
 ],
 WGN03: [
  'Pick a debate issue where you can refer to at least two written German sources.',
  'Link your topic to the German-speaking world with specific examples.',
  'Engage with the examiner in a real discussion, not question and answer.'
 ],
 WGN04: [
  'Infer carefully: answer exactly what the question asks, not what it seems to suggest.',
  'Rephrase ideas from the text in clear German, without making it convoluted.',
  'Give the specific detail asked for, e.g. what the mistakes were, not what should be done.'
 ],
 WSP01: [
  'Show research on your topic area: facts, figures and examples raise your knowledge mark.',
  'Give full, developed answers to the set questions in Section A.',
  'Keep the discussion going in Spanish with opinions you can justify.'
 ],
 WSP02: [
  'Give all the relevant information from the text, not just part of it.',
  'Read figures and details carefully: one wrong detail loses the mark.',
  'Don’t repeat the same idea twice when two separate points are needed.'
 ],
 WSP03: [
  'Research your issue thoroughly so you can justify your opinion with examples.',
  'Show A level depth: develop AS topics further rather than repeating them.',
  'Expect challenging questions and respond to them in a genuine debate.'
 ],
 WSP04: [
  'Make sure each answer responds to the exact question asked.',
  'Check accents carefully: accent errors lose marks.',
  'In essays, avoid vague references; give specific examples from the book or film.',
  'Finish with a conclusion that sums up your argument and gives a personal response.'
 ],
 WAA01: [
  'Add the correct vowel marking, only one per letter.',
  'Revise how verbs change after particles and in different contexts.',
  'Use context to choose words that fit both the grammar and the meaning.'
 ],
 WAA02: [
  'Plan essays before writing and practise different essay types.',
  'Know the difference between a story and an article, and use the right features for each.',
  'In stories, include the time, place, problem, events, climax and resolution.'
 ],
 WGK01: [
  'Find the key word in each question and infer the answer from the source text.',
  'Present people’s views accurately, as the text gives them.',
  'In written responses, develop and justify your opinion fully.'
 ],
 WGK02: [
  'Keep a sharp focus on the question; use quotations only to support your argument.',
  'Use examples from the right list of set works for each question.',
  'Avoid summarising the plot or the writer’s life; analyse instead.'
 ]
};
const UNIT_TIPS_SRC = 'Pearson examiners’ reports, 2023–2025';
