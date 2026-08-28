import { useEffect, useRef, useState } from 'react'

/* The pixel M assembles while the fonts arrive. The loader never owns
   the page: it dismisses on document readiness with a hard 1.8s
   ceiling and an error path, because a loader that waits on anything
   slow shows a black screen with a stuck counter. */
const PIXELS = [
  [0, 0], [4, 0],
  [0, 1], [1, 1], [3, 1], [4, 1],
  [0, 2], [2, 2], [4, 2],
  [0, 3], [4, 3],
  [0, 4], [4, 4],
]

export default function Loader() {
  const [gone, setGone] = useState(false)
  const [done, setDone] = useState(false)
  const [pct, setPct] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      setGone(true)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      cancelAnimationFrame(raf)
      setPct(100)
      setDone(true)
      setTimeout(() => setGone(true), 750)
    }
    // counter eases toward 90 on its own; real readiness snaps it to 100
    const tick = (now) => {
      const p = Math.min(90, ((now - t0) / 1100) * 90)
      setPct(Math.round(p))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const ready = Promise.race([
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        new Promise((res) => {
          if (document.readyState === 'complete') res()
          else window.addEventListener('load', res, { once: true })
        }),
      ]),
      new Promise((res) => setTimeout(res, 1800)),
    ])
    ready.then(finish).catch(finish)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (gone) return null
  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden="true">
      <div className="loader-m">
        {PIXELS.map(([x, y], i) => (
          <span
            key={i}
            style={{
              '--x': x,
              '--y': y,
              '--d': `${(i * 47) % 400}ms`,
            }}
          />
        ))}
      </div>
      <div className="loader-pct">{pct}%</div>
    </div>
  )
}
