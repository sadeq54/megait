# MEGA IT v2 — "Paper studio" redesign
2026-08-25, same day as v1. User rejected the reactbits laser-flow direction
entirely; asked for a language he has never used. All laser/three.js code
removed.

## The new read
Every prior Sadeq site is dark. v2 flips the ground: cool paper #F5F6FB, ink
#101223, and the brand blue #2E5BFF → violet #8B48FF as the single accent
family. One deliberate dark chapter (#0A0A18) closes the page: CTA + footer,
the logo's world. Display face: Outfit Variable (Space Grotesk removed).

## Signature devices
- Hero: cinematic-center type over a floating constellation of duotoned photo
  tiles at three blur depths (PRODUX-inspired, ported to light), driven by the
  existing offsetTop parallax engine. Photos are picsum seeds duotoned to the
  brand with `grayscale + mix-blend-mode: color` so they read as one series.
- GSAP ScrollTrigger (new dependency) wired to the Lenis singleton
  (`lib/scrollFx.js`): pinned split Work section (title holds left, cases
  scroll right, each case scales 0.92→1 + brightens), sticky card-stack
  Process (solid cards, scale-only recede: translucent covered cards
  double-expose text, learned the hard way), and a word-by-word scrubbed
  manifesto line with a photographic pill inline.
- Services bento: gapless areas `big big motion / big big apps / perf perf
  perf`; the big cell is the accent gradient panel, one cell photographic.

## Kept from v1
Copy (business kit), Lenis/parallax/reveal engines, loader pattern (paper
colors), pricing/answers/proof structure, asset-prompt pipeline (wiring notes
updated), QA harness. Zero em-dashes; 2 eyebrows total; one CTA intent.

## Tuning notes
- Hero tiles must keep out of the central type zone; positions in styles.css
  (.t-a … .t-g). Mobile shows only t-a + t-c.
- Process dim window: trigger next card `top 55% → top 14%`, scale only.
- ScrollTrigger pin (Work) desktop-only via matchMedia (min-width 901px).
