import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/scrollFx.js'

/* Seven days as a horizontal timeline: the section pins and vertical
   scroll pans the track sideways, station by station, while the rail
   draws itself across. Canonical horizontal-pan skeleton: pin at
   top top, end = horizontal distance, scrub. Mobile and reduced
   motion fall back to a plain vertical list. */
const STEPS = [
  {
    day: '00',
    title: 'Brief and direction',
    body: 'One call. Your offer, your buyer, your deadline. We reply with a fixed quote the same day.',
  },
  {
    day: '02',
    title: 'Design approved',
    body: 'You approve the design direction before a line of animation code is written.',
  },
  {
    day: '05',
    title: 'Build and motion',
    body: 'Sections land in order of importance. Motion goes in last, where it earns attention.',
  },
  {
    day: '07',
    title: 'Live on your domain',
    body: 'Deployed, measured, handed over. Source code and commercial rights included.',
  },
]

export default function Process() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const wrap = wrapRef.current
    const track = trackRef.current
    const fill = fillRef.current
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 901px)': () => {
          const distance = () => track.scrollWidth - window.innerWidth
          const pan = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          gsap.to(fill, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top top',
              end: () => `+=${distance()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          // each station wakes as it crosses into the pinned viewport
          gsap.utils.toArray(track.querySelectorAll('.station')).forEach((st) => {
            gsap.from(st, {
              opacity: 0.2,
              y: 60,
              scale: 0.94,
              ease: 'none',
              scrollTrigger: {
                trigger: st,
                containerAnimation: pan,
                start: 'left 88%',
                end: 'left 45%',
                scrub: true,
              },
            })
          })
        },
      })
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <section className="process" id="process" ref={wrapRef}>
      <div className="wrap process-head">
        <h2 className="sec-h rise">Seven days, start to live</h2>
        <p className="sec-sub rise">
          Fixed scope, fixed price, fixed date. The schedule holds because the
          scope does.
        </p>
      </div>
      <div className="process-rail" aria-hidden="true">
        <span ref={fillRef} />
      </div>
      <div className="ptrack" ref={trackRef}>
        {STEPS.map((s) => (
          <article key={s.day} className="station">
            <span className="station-day" aria-label={`Day ${Number(s.day)}`}>
              <em>Day</em>
              {s.day}
            </span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
