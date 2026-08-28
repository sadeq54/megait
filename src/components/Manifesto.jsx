import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/scrollFx.js'

/* One sentence, scrubbed word by word as it crosses the viewport, with
   a photographic pill set inside the line. The scrub sequences the
   reading; it is the section's only job. */
const BEFORE = ['We', 'design', 'the', 'page,', 'build', 'the']
const AFTER = ['motion,', 'and', 'measure', 'what', 'converts.']

export default function Manifesto() {
  const ref = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.mw'),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            end: 'top 22%',
            scrub: true,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="manifesto" ref={ref}>
      <div className="wrap">
        <p className="manifesto-line">
          {BEFORE.map((w, i) => (
            <span className="mw" key={`b${i}`}>{w} </span>
          ))}
          <span className="mw mpill" aria-hidden="true">
            <img src="https://picsum.photos/seed/megait-motion/320/128" alt="" loading="lazy" />
          </span>{' '}
          {AFTER.map((w, i) => (
            <span className="mw" key={`a${i}`}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  )
}
