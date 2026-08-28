# MEGA IT v3 — "Dark Cinema" concept
2026-08-25. v1 (laser) and v2 (light paper) rejected. v3 is asset-driven:
dark theme, one hero 3D object (image to 3D), scroll-scrubbed films, GSAP.
Assets are generated FIRST from `assets-prompts/`, then the site is wired
around them. Every engine below is already proven in Sadeq's own repos.

## The idea in one line
The ribbon M is a machine being assembled: the page opens on a film of pixel
squares building it, the film hands over to the REAL interactive 3D model at
the exact matching frame, and that object then travels the page as a
companion while films bridge the chapters.

## Ground rules
- Dark locked: #06060F ground, ink #F2F2FA, ONE accent family blue #3E6BFF
  to violet #9B5CFF. No other hue in any asset.
- Motion: GSAP ScrollTrigger (pin, stack, scrub) + Lenis. Films are scrubbed
  by scroll (BLK `useScrollFilm` engine: blob fetch, seek epsilon, poster =
  frame 0, loader never waits on video).
- 3D: one glb from the image-to-3D pipeline (beetle recipe: watertight check,
  planar texture bake, NoToneMapping, measured lighting, drag-spin with
  ease-back, never a full 360 idle).

## Page map (chapters) and the asset each one needs
1. LOADER · pixel M + %. No asset.
2. HERO FILM · full-bleed scrub film F1 "Assembly": pixel storm builds the
   3D M (620vh stage, captions in film-time windows: H1 "Landing pages that
   move. And convert." + sub + CTAs). At film end the real 3D M (A1) fades in
   over the last frame, matched in size and angle: the handoff IS the wow.
   The model becomes drag-to-spin, then shrinks into a fixed COMPANION layer
   (kormzi BeetleCompanion pattern: z-0 behind content, waypoints down the
   page, lifts to z-3 while hero visible).
3. PROOF · stats band, counters. No asset.
4. SERVICES · pinned split, each of 4 services gets micro-loop video chip
   (L1-L4) playing on hover/in-view.
5. BRIDGE FILM · F2 "Corridor": camera flight through a dark data-city,
   scrubbed 400vh, irises over the services chapter (BLK aperture pattern).
6. WORK · GSAP pinned title left, 3 case cards right; each card face is a
   still (S1-S3) with a 4s ambience loop on hover.
7. PROCESS · sticky card stack Day 0-2-5-7 (already built, dark restyle).
8. PRICING + ANSWERS · content chapters, no assets.
9. CTA · F3 "Beacon" loop behind "Tell us about your launch." + mailto.
   FOOTER · wordmark, links.

## Asset manifest (generate in this order)
| ID | Asset | Source | File |
|---|---|---|---|
| A1 | ribbon M master render → glb | GPT image → image-to-3D | 01-hero-3d-m.md |
| A2 | vivid texture art for planar bake | GPT image | 01-hero-3d-m.md |
| F1 | Assembly scrub film 8s | Google Flow | 02-films.md |
| F2 | Corridor scrub film 8s | Google Flow | 02-films.md |
| F3 | Beacon loop 6-8s | Google Flow | 02-films.md |
| L1-L4 | service micro-loops 3-4s | Google Flow | 02-films.md |
| S1-S3 | case stills | GPT image | 03-stills.md |
| BG1 | hero/CTA nebula backdrop | GPT image | 03-stills.md |
| OG | social card 1200x630 | GPT image | 04-og-social.md |

Minimum viable first batch: A1 + F1 + S1-S3. Everything else can land later;
the build starts when the first batch exists.

## Build plan (after assets land)
1. Port `useScrollFilm.js` from blk-site (scrubStart/End, iris, captions).
2. Encode films per recipe (desktop + `-m` mobile variants), posters = frame 0.
3. Run the single-file 3D pipeline (new_pipeline.py pattern) on A1+A2, wire
   `HeroModel` + `Companion` components (three.js lazy chunk returns).
4. Restyle v2 components to the dark tokens (structure of Process/Pricing/
   Answers/Proof survives as is).
5. Headless QA both viewports, realistic wheel deltas, upward pass, network
   throttle pass (film must never block the page).

## Failure paths (locked in from day one)
- No WebGL → hero keeps the film's last frame as a poster; companion hidden.
- Reduced motion → films show poster frame only, no scrub, no companion.
- Slow network → poster paints first, film streams behind it, loader ignores it.
