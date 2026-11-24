/* Stretch: beyond-the-syllabus practice for strong students (olympiads, admissions tests, university courses, essay competitions).
   Links only: everything opens on its owner's site, and each item names who made it. All are free to use; any entry fee is noted.
   Checked November 2026. */
const STRETCH_POSN = {
  math: 'https://www.posn.or.th/en/projects/academic-olympiad/mo/about/',
  phys: 'https://www.posn.or.th/en/projects/academic-olympiad/pho/about/',
  chem: 'https://www.posn.or.th/en/projects/academic-olympiad/cho/about/',
  bio:  'https://www.posn.or.th/en/projects/academic-olympiad/bo/about/',
  cs:   'https://www.posn.or.th/en/projects/academic-olympiad/oi/about/',
  geog: 'https://www.posn.or.th/en/projects/academic-olympiad/geo/about/'
};
const STRETCH_LOCKE = { k: 'essay', n: 'John Locke Institute Essay Competition', by: 'John Locke Institute', url: 'https://www.johnlockeinstitute.com/essay-competition',
  d: 'Free to enter, open to students from any country. Categories include Economics, History, Law, Psychology, Politics and Philosophy.' };
const STRETCH = {
  math: [
    { k: 'comp', n: 'Senior Mathematical Challenge and British Mathematical Olympiad', by: 'UK Mathematics Trust', url: 'https://ukmt.org.uk/current-past-papers', d: 'Recent papers and solutions are free to download; older papers are sold.' },
    { k: 'comp', n: 'AMC 10, AMC 12 and AIME problems with solutions', by: 'Art of Problem Solving wiki', url: 'https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions', d: 'The US competitions that lead to the USA Mathematical Olympiad.' },
    { k: 'test', n: 'STEP past papers', by: 'Physics & Maths Tutor', url: 'https://www.physicsandmathstutor.com/admissions/step/', d: 'Cambridge’s maths exam: long, multi-step problems built on A level content.' },
    { k: 'test', n: 'MAT past papers and solutions, 2007–2025', by: 'University of Oxford', url: 'https://www.maths.ox.ac.uk/study-here/undergraduate-study/maths-admissions-test', d: 'Oxford now uses the TMUA instead of the MAT, but these remain excellent problem sets.' },
    { k: 'course', n: 'Single Variable Calculus (18.01SC)', by: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', d: 'MIT’s first-year calculus: lectures, problem sets and exams with solutions.' }
  ],
  phys: [
    { k: 'comp', n: 'British Physics Olympiad and Physics Challenge papers', by: 'British Physics Olympiad', url: 'https://www.bpho.org.uk/', d: 'University-style problems; past papers with solutions are on the BPhO site.' },
    { k: 'comp', n: 'F = ma and USAPhO past exams with solutions', by: 'American Association of Physics Teachers', url: 'https://www.aapt.org/physicsteam/PT-exams.cfm', d: 'The US Physics Olympiad route: F = ma is mechanics only; USAPhO covers everything.' },
    { k: 'test', n: 'PAT past papers', by: 'Physics & Maths Tutor', url: 'https://www.physicsandmathstutor.com/admissions/pat/', d: 'Oxford’s Physics Aptitude Test: maths and physics problem solving.' },
    { k: 'course', n: 'Classical Mechanics (8.01SC)', by: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/', d: 'MIT’s first-year mechanics with calculus.' }
  ],
  chem: [
    { k: 'comp', n: 'UK Chemistry Olympiad past papers, 2003 onwards', by: 'Royal Society of Chemistry', url: 'https://edu.rsc.org/enrichment/uk-chemistry-olympiad', d: 'Each paper has a mark scheme with answers; there are also worked answers and explainers on harder topics.' },
    { k: 'comp', n: 'US National Chemistry Olympiad past exams', by: 'American Chemical Society', url: 'https://www.acs.org/education/olympiad/prepare-for-exams.html', d: 'Local and national exams, with detailed solutions for the national exam’s written parts.' },
    { k: 'course', n: 'Principles of Chemical Science (5.111SC)', by: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/5-111sc-principles-of-chemical-science-fall-2014/', d: 'MIT’s first-year chemistry.' }
  ],
  bio: [
    { k: 'comp', n: 'British Biology Olympiad past papers', by: 'UK Biology Competitions', url: 'https://ukbiologycompetitions.org/british-biology-olympiad/', d: 'Papers from 2019 on, without answers. International schools can enter students; schools outside the UK pay £50 per school.' },
    { k: 'course', n: 'Fundamentals of Biology (7.01SC)', by: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/7-01sc-fundamentals-of-biology-fall-2011/', d: 'MIT’s introductory biology: biochemistry, genetics, molecular biology.' }
  ],
  cs: [
    { k: 'comp', n: 'British Informatics Olympiad problems', by: 'British Informatics Olympiad', url: 'https://olympiad.org.uk/problems.html', d: 'Programming problems from 1995 on, with mark schemes for Round One.' },
    { k: 'course', n: 'Introduction to CS and Programming using Python (6.100L)', by: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/', d: 'MIT’s first programming course.' }
  ],
  econ: [
    { k: 'comp', n: 'International Economics Olympiad', by: 'International Economics Olympiad', url: 'https://ecolymp.org/', d: 'Economics and finance, free to take part. Entry is through national teams: ask your school or the IEO about your country.' },
    STRETCH_LOCKE,
    { k: 'course', n: 'Principles of Microeconomics (14.01)', by: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/', d: 'MIT’s first-year microeconomics.' }
  ],
  psych: [
    STRETCH_LOCKE,
    { k: 'course', n: 'Introduction to Psychology (9.00SC)', by: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/9-00sc-introduction-to-psychology-fall-2011/', d: 'MIT’s introductory psychology course.' }
  ],
  hist: [STRETCH_LOCKE],
  law: [STRETCH_LOCKE],
  geog: []
};
STRETCH.fm = STRETCH.math;
const STRETCH_K = { comp: 'Competition', test: 'Admissions test', course: 'University course', essay: 'Essay competition', posn: 'Thailand' };
