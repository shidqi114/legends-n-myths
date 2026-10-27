---
version: alpha
name: Legends-n-Myths-shadow-theatre
description: A lamplit shadow-theatre site for a kids' channel of Asian and Southeast-Asian legends. Parchment pages by day, deep lamp-black at night, and in the middle a living wayang screen. Display type is IM Fell English (an old-style face with ink spread), body is Libre Baskerville. The single accent is the lamp: burnt orange on parchment, warm amber on dark.

colors:
  paper: "#e9dcc6"
  paper-deep: "#dccab0"
  paper-card: "#f1e6d2"
  ink: "#2a120a"
  ink-soft: "#6a4632"
  lamp: "#b2501c"
  lamp-glow: "#f0a050"
  rule: "#cdb594"
  night: "#140804"
  night-deep: "#0c0402"
  night-ink: "#f1dfc2"
  night-soft: "#c9a886"
  puppet-ink: "rgb(20,8,4)"
  gel-batik: "rgb(214,118,58)"
  gel-cream: "rgb(252,224,176)"
  gel-teal: "rgb(76,172,160)"
  gel-gold: "rgb(255,206,92)"
  gel-red: "rgb(214,64,48)"
  gel-indigo: "rgb(84,96,196)"
  gel-green: "rgb(110,170,84)"

typography:
  display: "IM Fell English, Iowan Old Style, Georgia, serif"
  text: "Libre Baskerville, Georgia, Times New Roman, serif"
---

## Overview

The page shows the channel's look rather than describing it. The hero is a shadow-puppet screen built
from the same parts as the video engine in the `shadow-puppet-video` skill: lamp gradient, ink
silhouettes in profile, coloured gels glowing through punched holes, a grass strip and valances. The
visitor holds the lamp. The screen plays the first legend, Sangkuriang, in six captioned scenes.

Below the theatre the page is set like a printed performance bill (a wayang *lakon* list), then the
workshop's four acts, the explorer mascot, notes for grown-ups, and a closing gunungan.

**The idea:** the wayang lamp (*blencong*) becomes the page's one live thing: move it and every shadow
swings, grows and softens by how close its puppet is held to the light.

## Colors

### Brand & Accent
- **Lamp** `#b2501c` on parchment and **Lamp glow** `#f0a050` on dark: the only accent. Roman numerals,
  the "Out now" stamp, the active scene marker, focus rings, primary buttons.

### Surface
- **Paper** `#e9dcc6`: page ground in light mode. **Paper card** `#f1e6d2`: the grown-ups band.
- **Night** `#140804` / **Night deep** `#0c0402`: header, theatre, finale and footer in both themes.
  The theatre stays dark in light mode too: the lights go down for the show.

### Text
- **Ink** `#2a120a` for headings and body; **Ink soft** `#6a4632` for secondary copy.
- On night surfaces: **Night ink** `#f1dfc2` and **Night soft** `#c9a886`.

### Puppet palette
- Silhouettes are always **puppet ink** `rgb(20,8,4)`. Colour appears only as gels in the holes. Each
  character keeps one gel identity (Dayang Sumbi indigo + gold, Sangkuriang red, the explorer teal).

## Typography

### Font Family
- **IM Fell English** for display, captions and stamps. Its rough ink edge matches cut hide.
- **Libre Baskerville** for running text, 1.0625rem / 1.65.

### Hierarchy
| Role | Size | Notes |
|---|---|---|
| Hero h1 | clamp(3rem, 8.4vw, 7.4rem) | two lines, never wraps further |
| Section h2 | clamp(2.5rem, 6vw, 4.8rem) | |
| Bill title | clamp(2rem, 4.6vw, 3.6rem) | italic subtitle at 0.5em |
| Act numeral | clamp(4rem, 8vw, 6.5rem) | Roman, lamp colour |
| Caption | clamp(1.2rem, 2.3vw, 1.75rem) | display italic, live region |

### Principles
- Big type does the work that cards and icons would do elsewhere. No eyebrow labels above headings.
- Numbers in copy are written out for narration ("twelve to eighteen beats"), except specs (1080 × 1920).

## Layout

### Spacing System
- Side gutter `clamp(16px, 4vw, 56px)`; section padding `clamp(64px, 10vw, 136px)`.

### Grid & Container
- Content max width 1280px. Section heads are a two-column grid (title / short claim) that stacks at 820px.

### Whitespace Philosophy
- Generous vertical space between acts of the page, tight inside each act, like a theatre programme.

## Elevation & Depth
- Depth belongs to the screen only: each puppet has a `depth` (0 flat on the cloth, 1 at the lamp)
  that drives shadow offset, scale and blur. The page itself is flat: no drop shadows on text blocks.
- Puppet tiles get a solid night-coloured frame (4–6px), like the black border of a shadow screen.

## Shapes

### Border Radius Scale
- 4–6px on screens and tiles; 999px on buttons (the rounded end of a puppeteer's rod); stamps 4px, rotated −2°.

### Photography & Illustrations
- No photographs and no stock art. Every picture is a puppet drawn in SVG (`src/components/puppets.tsx`)
  on lamp-lit cloth. New legends add puppets there, following the engine's style rules: profile view,
  readable as a black silhouette, detail punched through, colour only in gels.

## Components

### Top Navigation
- Sticky night bar: wordmark ("Legends *n* Myths", the *n* in lamp glow) and three anchors. On phones only "Programme" stays.

### Buttons
- **Rod button**: night-ink pill on dark, 46px min touch target, turns lamp glow on hover.
- **Primary**: lamp-glow pill, display font. **Ghost** (link not set yet): outlined, `aria-disabled`.

### Cards & Containers
- The programme is a ruled list, not cards: double rule on top, hairline between rows, Roman numeral, title, hook, meta line with a stamp, puppet tile.

### Tags / Badges
- **Stamp**: bordered display-type label, slightly rotated. "Out now" in lamp colour; others in ink soft.

### CTA / Footer
- Finale: gunungan tile + "Which legend should the lamp light next?" + channel buttons. Kids' CTA wording: "Ask a grown-up to follow us."

## Do's and Don'ts

### Do
- Keep all puppet colour inside gels; keep silhouettes ink.
- Test each scene at 16:9 (desktop) and the 4:5 phone crop; give phone positions (`mx`, `ms`) when the squeeze makes puppets touch.
- Keep violence off-screen or symbolic, as the videos do.

### Don't
- Don't add gradients, glows or colour outside the lamp light.
- Don't invent numbers (views, subscribers, ratings).
- Don't link buttons to `#`; leave the channel URL empty and the button says "opening soon".

## Responsive Behavior

### Breakpoints
- 960px: acts go to two columns. 820px: section heads stack. 760px: explorer and finale stack.
  700px: the screen crops to 4:5 and scenes squeeze toward the centre. 640px: programme tiles drop under the text; nav trims.

### Touch Targets
- All controls are at least 46px tall. On touch, the lamp follows the finger; the screen still scrolls vertically (`touch-action: pan-y`).

### Collapsing Strategy
- Content order never changes; columns stack.

### Image Behavior
- The screen uses `preserveAspectRatio="xMidYMid slice"`, so the centre of the stage is always visible.

## Iteration Guide
1. New legend: add its puppets to `puppets.tsx`, its row to `EPISODES` in `src/content.ts`.
2. New hero story: replace `SANGKURIANG` with another `Beat[]` (caption, glow, cast with x / depth / face).
3. Check both widths with Playwright screenshots before committing.

## Known Gaps
- Channel URLs are not set yet (`CHANNEL` in `src/content.ts`).
- No embedded video yet; when the first Short is public, add it to the "Out now" row.
