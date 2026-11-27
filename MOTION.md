# MOTION.md: living illustrations in this project

> Part 1 is the method from the [rossark-motion-skill](https://github.com/rossark0/rossark-motion-skill) (MIT licence, © 2026 rossark0), copied as it is. Part 2 is this site's own notes, and it overrides Part 1.

---

## Part 1. The method

**The goal:** anything drawn (a character, a plant, a flame, a street, a logo, a chart) feels alive and calm. Nothing teleports, nothing bounces, nothing shouts.

### Principles
1. **Never teleport:** interpolate everything; never swap drawings.
2. **Calm by default:** strong curves, no bouncy overshoot.
3. **Small amplitudes:** when unsure, halve it.
4. **Arcs and pivots:** each moving part is a layer rotating around its joint (stem base, hinge, neck, hook).
5. **Overlap and follow-through:** tips and trailing parts move later and further; give each part the same wave with a growing phase delay.
6. **Variety without chaos:**
   - repeated items get a seeded phase, speed and size;
   - nothing moves in sync, and there's no random value per frame.
7. **One main action per scene, plus two or three idle loops.** Side things stay quiet.
8. **Opacity only to appear or disappear.**
9. **The layout never moves:** motion lives inside the drawing.
10. **Reduced motion:** loops freeze on a good frame 0, and one-shots show their final frame.
11. **Nothing runs unseen:** pause off screen, when hidden and in the background.
12. **Enough frames:** anything under ~100 ms flickers at 30 fps; render and export at 60 when you can. Blinks close in ~110 ms and reopen in ~190 ms.
13. **Interface rules:**
    - frequency decides how much (often seen = barely moves; rare moments get the delight);
    - every motion has a purpose;
    - shared elements travel, never teleport;
    - interface moves stay under 300 ms;
    - exits are faster than entrances;
    - nothing appears from scale 0;
    - interruptions continue from the current value.

### The engine
- **Clocks:** a loop clock for idle life, a one-shot clock for a scene that tells an action. One per character, group or scene.
- **Tracks:** keyframes `[ms, value, 'out'?]` read with `track(t, keys)`. The last key equals the first. `track` stops at every key, so use it for one move (a blink, a lid). For acting (a chain of poses), use `flow(t, keys)`, which passes through the keys without stopping and never overshoots.
- **Helpers:**
  - `wave` (−1 to 1), for sway and breathing;
  - `loop` (0 to 1), for drift and falling;
  - `bell`, to fade in and out;
  - `seg`, for one beat of a one-shot;
  - `seeded(i)`, for per-item variety.
- **Curves:**
  - travel uses ease-in-out `(0.77, 0, 0.175, 1)`;
  - open and arrive use ease-out `(0.23, 1, 0.32, 1)`;
  - leaving uses ease-in;
  - endless loops are linear.

### Quick recipes
| Subject | Recipe |
|---|---|
| Character | breathing 1–2 units over 3–5 s; a blink every 3–4 s; pupils glide; head tilt 3–6° |
| Waiting to be tapped | a jiggle every ~270 ms: squash 2%, widen 2%, the bulge trading sides |
| Floating figure | rises in from 30% of its height below, drifts 5% down and up, leaves rising |
| Tail, hair, ears | rotation around the root, phase delayed along the chain, 4–10° |
| Plant | sway 1.5–4° around the base over 3–6 s; leaves on seeded phases |
| Cloth, flag | a wave that travels along the length, growing away from the fixed edge |
| Fire | a lean of 2–4° and a 3–6% stretch on two waves of different periods |
| Smoke, steam | rises 8–14 units and fades in and out with `bell` |
| Water | ripples grow and fade; floating things bob 1–2 units and rock 2° |
| Rain, snow | seeded `loop`s; snow sways sideways |
| Sky | clouds drift over 20–60 s with parallax; sun rays take 30–60 s per turn |
| Lights | a glow of 2–5% over 2–4 s; stars twinkle at seeded times |
| Machines | gears turn linearly by ratio; a clock hand steps with ease-out |
| Phone | ±3° bursts, then a pause |
| Icon, logo | plays once on appear, then rests |
| Chart | a one-shot draw-on, with bars staggered 40–80 ms |

### Acting (a whole character)
- **Every channel:** key pose (`flow`) + idle (`wave`s, never off while on stage) + follow-through (the parent read 90–140 ms earlier) + accents (a `wave` inside a `seg` window).
- **Arms:** an upper arm and a forearm share a round elbow; the forearm points at shoulder angle + elbow bend.
- **Head turns:** slide the face toward the turn (eyes 10, nose 13 in a 100-wide head) and the ears the other way. Blink on the turn.
- **Weight:** the hips shift and carry the upper body, and the legs angle to keep the feet under it.
- **Landing:** hover, then fall with gravity and stretch; squash hard (0.8) on contact and keep the volume (`width = 1 / height^0.6`).
- **In the air:** limp feet (toes down, one knee folded, trading slowly). The shadow stays on the floor and scales with the height.
- **Props:** enter from off screen already moving and roll by distance / radius. The eyes follow them. A kick hits at the middle of the swing; the prop leaves as a throw, spinning, with a short squash.
- **Asymmetry:** the arms never mirror each other.
- **Camera:** a view from a little above is a whole build, not a tweak: the head is 40–50% of the height, the torso is short and narrower than the head, the legs are short, the feet are round from above, and the shadow is a wide oval with the feet in its lower half. Keep it in one `build` object. A flat view keeps a thin pill shadow.
- **Framing:** on a phone, as big as the screen allows, with the feet low.

### From a reference video
- Contact sheets at the full frame rate (`tools/sheet.sh`).
- Measure motion with numbers (`tools/track_edges.py`): a 2% jiggle or a 5% float doesn't show to the eye.
- Sample colors from pixels (`tools/sample_colors.py`).
- Go part by part: feet, shadow, hands, head.
- Compare proportions as ratios of one unit (head widths). "Stretched" means a ratio is far off.
- Compare your render with the reference at the same moments.
- Don't publish a copy of someone else's art.

### Performance
- Everything is a function of one clock's time.
- Draw many items in one SVG or `Canvas`.
- Reset repeating animations to 0 before starting, and cancel them on cleanup.
- Declare curves at the top of the module.

### Workflow
1. Read Part 2 and the art file's header comments.
2. List what could live in the drawing.
3. Pick one main action and two or three idle loops.
4. Split the art into layers at their pivots.
5. Put the numbers in tokens.
6. Check frame 0, the final frames and the loop seams. For a character, look at a contact sheet of every 4th frame of your own render.
7. Run the checks.
8. Hand off: what moves, and what hasn't been seen on a real device.

---

## Part 2. This project

### Where the code is
- **Platform:** web, plain HTML, CSS and JavaScript (no framework). The site is `index.html` plus data files; the GitHub copy is built by `make_standalone.py`.
- **Motion engine:** CSS keyframes, one "clock" per scene. Every looping item's `animation-delay` is `calc(var(--rmt) - offset)`, and `rmvMount()` in `rooms.js` sets `--rmt` to the time since the page opened, so a scene that is re-attached after a redraw carries on where it was instead of restarting.
- **Art:** the study-room views in `roomfx.js` (`rmvScene()`): Midnight, Library, Rainy window, Night sky, Sunrise, Café. Each is a 400 × 240 SVG drawn with `preserveAspectRatio="xMidYMid slice"`, so on a tall phone screen only the middle third or so shows: keep anything important between x = 130 and x = 270.
- **Tokens:** `RMV_T` at the top of the scene code holds every number (glow size and periods, star, rain, dust, cloud and steam timings).
- **Variety:** `rmvRng(seed)` gives each scene the same seeded layout and per-item speeds every time.

### What lives in each view
| View | Main action (once, when it appears) | Idle loops |
|---|---|---|
| Midnight | none | none (deliberately still) |
| Library | the lamp warms on (ease-out, 1.6 s) | lamp glow breathes 3.5% on two periods; dust motes drift up through the light |
| Rainy window | none | rain falls (linear, seeded speeds, slight slant); a few drops trickle down the glass; some city lights breathe |
| Night sky | none | about a third of the stars dip and shrink at their own times; the moon's halo breathes; a shooting star every ~42 s |
| Sunrise | the sun eases up 14 units (ease-out, 2.4 s) | sun halo breathes; clouds drift in two layers (far ones slower) |
| Café | none | three steam wisps rise and fade, each 1.5 s behind the last; some window lights breathe |

### The owner's rules
- The site must stay free, with no outside media links (it links only to Physics & Maths Tutor and Pearson). All art and sound is made by the site itself.
- Animations must respect reduced motion: every view's frame 0 is a complete picture.
- Each student picks their own view; nobody else sees it.

### Rig limits
- The views are single SVGs with CSS animation on groups and shapes; there are no characters or faces.
- View thumbnails (the picker) are always still.
- Scenes pause when scrolled off screen (IntersectionObserver) or when the page is hidden.

### How changes are checked
- Playwright screenshots of every view at 390 px (phone) and 1280 px, in English and Thai, light and dark.
- The two-tab room test (`rmtest.py`) after any change to the room page.
- Not yet seen on a real phone at 60 fps: check the rain and the lamp on an iPhone and an Android phone.

### Interface motion (added November 2026)
All of it is under `prefers-reduced-motion: no-preference`, and the Settings switch "Reduce motion" (`prefs().motion`, the `.rm` class) stops it, including the count-ups driven by script (`reduceMotion()`).
| Where | What | Timing |
|---|---|---|
| Buttons, chips, icon buttons | press in to 97% | 90 ms |
| A tapped chip, toggle or topic status | settles from 93% to full size after the redraw (`MO.pop`) | 240 ms |
| Bottom bar | the brass marker grows in on the new tab, its icon settles | 280 ms, on page change only |
| Bars (`.meter i`) | grow from the left when a page opens (`.v-fresh`) | 700 ms ease-out |
| Right answer (Bee, Learn) | a tick draws in; points count up | 300 ms + 600 ms |
| Wrong answer | the answer box shakes | 320 ms |
| Bee timer | soft pulse in the last 10 seconds | 1 s loop |
| Lesson passed, new best Bee round, streak of 3, 7, 14, 30… days | one confetti burst, behind the text, once | 1.6 s |
| Welcome screen | the blocks ease up in turn, first visit only | 450 ms, staggered |
| Loading | a soft shimmer on placeholder blocks | 1.3 s loop |

---

### Licence for Part 1

```
MIT License

Copyright (c) 2026 rossark0

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
