import { useEffect, useRef } from 'react'
import { onceInView } from '../lib/reveal.js'

/* Numbers that are true. No invented clients, no fake logo wall. */
const STATS = [
  { n: 2, suffix: '×', label: 'international 1st place' },
  { n: 5, suffix: '', label: 'products shipped to production' },
  { n: 95, suffix: '+', label: 'Lighthouse performance score' },
  { n: 2, suffix: '', label: 'languages built in: EN and AR, RTL native' },
]

function Counter({ n, suffix }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = n + suffix
      return
    }
    return onceInView(el, () => {
      const t0 = performance.now()
      const dur = 900
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(eased * n) + suffix
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
  }, [n, suffix])
  return <span ref={ref} className="stat-n">0{suffix}</span>
}

export default function Proof() {
  return (
    <section className="proof">
      <div className="wrap proof-grid">
        {STATS.map((s) => (
          <div className="stat rise" key={s.label}>
            <Counter n={s.n} suffix={s.suffix} />
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
