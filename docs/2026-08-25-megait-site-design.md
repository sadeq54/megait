# MEGA IT — Site Design Spec
2026-08-25 · status: approved-by-brief (autonomous session; user said "impress me" and delegated). Review welcome.

## Brand input
- Identity: `ChatGPT Image Aug 25, 2026, 03_47_48 PM.png` — MEGA IT / megait.com, "BIG TECH • BIGGER POSSIBILITIES".
- Dark ground, electric blue → violet gradient ribbon M, pixel-dissolve motif, line icons (cloud, code, shield, server, bulb).
- Business core from `_business/` kit: offer = high-conversion landing pages with 3D + scroll motion (React, GSAP-class motion, Three.js), fixed price, live in 7 days. Pricing ladder LAUNCH $1,200 / SIGNATURE $2,450 / FLAGSHIP $4,900+ / GROWTH PARTNER $2,200/mo. Moats: 95+ Lighthouse claim, reduced-motion + WebGL fallback, EN/AR RTL.

## Design read
Agency landing for businesses buying landing pages. Dark-tech premium, brand violet-blue, laser-light signature. Native CSS + Lenis + three.js. Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 7, VISUAL_DENSITY 3.

## Inspiration synthesis (researched this session)
- reactbits laser-flow: vertical volumetric beam striking a bordered frame; fog + wisps. Ported component (MIT), re-tinted.
- threeui.com/browse: dark canvas + violet shader fields, glass cards over 3D, huge type, mono labels.
- awwwards Aug-2026 SOTD run: one signature interaction per site, oversized restrained type, editorial spacing.
- landingfolio: single-message hero, one CTA intent, proof under hero, 3-step how-it-works spine.

## Locked system
- Palette: bg #06060F / #0B0B1C, ink #F2F2FA, dim 60%, accent family ONLY blue #3E6BFF → violet #9B5CFF (laser #8F6FFF). One accent, whole page. Dark theme locked (`color-scheme: dark`).
- Type: Space Grotesk Variable (display), Geist Variable (body), Geist Mono Variable (numbers/labels). Emphasis = weight/italic of same face.
- Radius system: cards 18px, buttons pill, inputs 10px (documented rule, applied everywhere).
- Zero em-dashes anywhere. Middle dot only in the brand tagline.
- Eyebrows: max 2 on the page (hero tagline, pricing).

## Page (9 sections, ≥5 layout families)
1. Loader: 5×5 pixel M assembles + % (blob-free, ceiling 1.8s, never blocks; reduced-motion instant).
2. Nav: 68px, wordmark megait(.com dim), Work / Services / Process / Pricing, one CTA "Start a project" (single contact intent page-wide).
3. Hero (asymmetric split): left H1 "Landing pages that move. And convert." + 20-word sub + CTAs; right/center laser beam striking a framed showcase panel (dotted grid, live mini-scene). Pixel drift particles. Fallbacks: no-WebGL → CSS beam; reduced-motion → static frame.
4. Proof band: 4 mono-numeric stats (2× international 1st place · 5 products shipped · 95+ Lighthouse · EN/AR RTL). Counters on enter.
5. Services bento (asymmetric 2fr/1fr, 4 cells, ≥2 cells with generative art fields): Launch pages / 3D & motion / Web apps / Performance & SEO.
6. Work: 3 case rows, offset alternating (cap 2 same splits), generative canvas art per case (no fake screenshots): Affiliate network (anonymized) / QPS Audit / Gold Prices Arabia. Parallax drift.
7. Process rail: sticky progress line, Day 0 → 2 → 5 → 7. Objection killers inline.
8. Pricing: 3 tiers, middle elevated (gradient ring), then Growth Partner strip. Terms line: 50% upfront, content by day 2, 2 revision rounds.
9. Answers: 3 buyer questions, plain grid. 10. CTA: "Tell us about your launch." mailto + call link. 11. Footer: mark, links, hello@megait.com, Amman · GMT+3.

## Motion map (each motivated)
- Laser hero: brand signature, hierarchy (draws eye to showcase panel). Self-throttling DPR, pauses off-screen/hidden.
- IO reveals (.rise): storytelling sequence, fires before fold, ≤0.6s, unobserve after.
- Parallax data-par engine (offsetTop-based, from blk-site): depth on work art only.
- Process line: scroll-fraction fill, state feedback. Sticky, no scroll hijack.
- Counters: rAF once on enter.
- All gated by prefers-reduced-motion; Lenis singleton on window (`__megaLenis`), skipped for reduced motion.

## Engineering (house lessons applied)
- Vite 6 + React 19, plain CSS tokens (no Tailwind), Lenis 1.3.26, three ^0.174 (LaserFlow only, lazy-mounted). No GSAP: rAF engines are enough here.
- Lenis on window not module scope (HMR rAF stacking); anchors via lenis.scrollTo; scrollbar replaced by side rail? NO rail this time (keep native scrollbar, less chrome).
- Reveals default-hidden only via .rise class added by JS presence (no-JS safe: CSS `.rise` hidden only when `html.js`).
- Sticky stages: every following section positioned z-1.
- Loader dismiss: fonts.ready + hero mount race with 1.8s ceiling, error path included.
- Fixed chrome outside any transformed ancestor. No `window.scrollTo` after Lenis (use lenis).
- getBoundingClientRect never fed back into parallax (offsetTop chain).
- QA: headless puppeteer/Chrome (extension tab freezes when hidden), realistic wheel deltas, upward scroll pass.

## Assets pipeline (user generates later; prompts in /assets-prompts)
- Images: GPT image gen → optional image-to-3D (proven pipeline: single-file script, planar bake, NoToneMapping, measured Lab calibration).
- Video: Google Flow → delogo/upscale → ffmpeg `-an -movflags +faststart`, desktop crf 19-23 g 8, mobile 1024w crf 26 g 4 (blk recipe).
- Until then: generative canvas/CSS art (brand-legal placeholders), labeled TODO slots.

## Excluded (scope discipline)
Arabic page (sellable add-on, tokens RTL-ready), CMS, blog, real form backend (mailto + booking link placeholders), analytics wiring, favicon set beyond SVG.
