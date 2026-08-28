import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/scrollFx.js'

/* Card stack: each day arrives over the last, the covered card eases
   back and dims, so the schedule reads as four decisive beats. Sticky
   does the pinning (no scroll hijack); GSAP only drives the recede. */
const STEPS = [
  {
    day: 'Day 0',
    title: 'Brief and direction',
    body: 'One call. Your offer, your buyer, your deadline. We reply with a fixed quote the same day.',
  },
  {
    day: 'Day 2',
    title: 'Design approved',
    body: 'You approve the design direction before a line of animation code is written.',
  },
  {
    day: 'Day 5',
    title: 'Build and motion',
    body: 'Sections land in order of importance. Motion goes in last, where it earns attention.',
  },
  {
    day: 'Day 7',
    title: 'Live on your domain',
    body: 'Deployed, measured, handed over. Source code and commercial rights included.',
  },
]

export default function Process() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const root = rootRef.current
    const cards = gsap.utils.toArray(root.querySelectorAll('.pstep'))
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        // cards stay OPAQUE: a translucent covered card double-exposes
        // its text through the one sliding over it. Recede by scale
        // only, timed to when the next card actually covers.
        gsap.to(card, {
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 55%',
            end: 'top 14%',
            scrub: true,
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="process" id="process" ref={rootRef}>
      <div className="wrap">
        <h2 className="sec-h rise">Seven days, start to live</h2>
        <p className="sec-sub rise">
          Fixed scope, fixed price, fixed date. The schedule holds because the
          scope does.
        </p>
        <ol className="pstack">
          {STEPS.map((s, i) => (
            <li key={s.day} className="pstep" style={{ '--i': i }}>
              <span className="pstep-day">{s.day}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
