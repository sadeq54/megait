# MEGA IT — megait.com

Landing site for MEGA IT: an IT studio selling high-conversion landing pages
with 3D and scroll motion. Dark laser-brand design, React 19 + Vite 6, plain
CSS design tokens, Lenis smooth scroll, three.js volumetric laser hero
(ported from react-bits LaserFlow, MIT).

## Run
```
npm install
npm run dev      # http://localhost:5210
npm run build    # dist/
```

## Map
- `docs/2026-08-25-megait-site-design.md` — full design spec and decisions
- `assets-prompts/` — copy-paste prompts for GPT images, Google Flow videos,
  image-to-3D, plus the encode pipeline. Placeholder art is generative canvas
  until these assets land.
- `src/lib/` — Lenis singleton, offsetTop parallax engine, IO reveals
- `src/components/LaserFlow.jsx` — laser shader (adaptive DPR, reduced-motion
  static frame, WebGL fallback hook)

## House rules baked in
- Lenis instance lives on `window.__megaLenis` (HMR-safe); anchors route
  through it. Reduced motion disables it entirely.
- Reveals are IntersectionObserver-driven and fire before the fold.
- Parallax measures offsetTop chains, never getBoundingClientRect.
- The loader dismisses on readiness with a 1.8s hard ceiling.
- Laser pauses off-screen and when the tab is hidden; DPR self-throttles
  against real FPS.
- QA with headless Chrome (`scratchpad qa.cjs` pattern), never a minimized
  extension tab: hidden tabs freeze rAF and IntersectionObserver.

## Content status
Copy is final-draft from the `_business/` offer kit (prices, process, terms).
Case media are brand-legal generative placeholders; swap per
`assets-prompts/02-case-media.md`. Contact goes to `hello@megait.com`
(update when the mailbox exists).
