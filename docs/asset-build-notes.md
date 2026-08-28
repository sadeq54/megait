# Asset build notes (internal, not for generation)

Engineering steps applied to files landing in `incoming/`. Kept out of
`assets-prompts/` on purpose: those files are copy-paste prompts only.

## glb acceptance (a1-model.glb, beetle recipe)
- watertight, 0 boundary edges; no base slab (most-planar direction < ~5% of
  surface area); letter reads front-on. Reject the mesh → regenerate a1.
- bake a2-texture by planar projection: pick u/v by silhouette IoU, dilate
  color ~28px into transparent margin, confirm visible side with a real
  three.js FrontSide render from BOTH sides.
- materials: NoToneMapping, no env map, no emissive; Ambient 2.6 + warm key
  0.5 + cool rim 0.3, roughness 0.6. Budget ≤ 1.2 MB, JPEG q88 texture.

## film encode (all f*/l* files)
```
ffmpeg -i in.mp4 -an -vf "scale=1920:-2" -crf 21 -g 8 -movflags +faststart out.mp4
ffmpeg -i in.mp4 -an -vf "scale=1024:-2" -crf 26 -g 4 -movflags +faststart out-m.mp4
ffmpeg -i out.mp4 -frames:v 1 out-poster.jpg
```
- loops (l1-l4): 640x640, crf 27, ≤ 1.5 MB each.
- delogo watermarks if present; Real-ESRGAN 2x for 540p sources.
- short GOP is mandatory: scrubbing seeks constantly.
- budgets: f1 ≤ 11 MB desktop / 4 MB mobile.

## wiring targets
- f1 → hero scrub stage (~420vh), captions at film-time 0.15 / 0.45 / 0.8,
  3D model handoff over the last frame, then companion layer.
- f2 → bridge between Services and Work, iris aperture, ~200vh.
- f3 → CTA background, muted loop, ~35% opacity.
- l1-l4 → service cards, hover/in-view only. s1-s3 → work cards.
- bg1 → Proof/Pricing depth + no-WebGL hero ground.
