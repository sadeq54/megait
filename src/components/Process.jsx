import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/scrollFx.js'
import { useI18n } from '../lib/i18n.jsx'

/* Seven days as a horizontal timeline: the section pins and vertical
   scroll pans the track sideways, station by station, while the rail
   draws itself across. Canonical horizontal-pan skeleton: pin at
   top top, end = horizontal distance, scrub. Mobile and reduced
   motion fall back to a plain vertical list. */
export default function Process() {
  const { t, lang } = useI18n()
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
          // RTL lays the track right-to-left, so the pan flips sign
          const rtl = document.documentElement.dir === 'rtl'
          const pan = gsap.to(track, {
            x: () => (rtl ? distance() : -distance()),
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
  }, [lang])

  return (
    <section className="process" id="process" ref={wrapRef}>
      <div className="wrap process-head">
        <h2 className="sec-h rise">{t.process.title}</h2>
        <p className="sec-sub rise">{t.process.sub}</p>
      </div>
      <div className="process-rail" aria-hidden="true">
        <span ref={fillRef} />
      </div>
      <div className="ptrack" ref={trackRef}>
        {t.process.steps.map((s) => (
          <article key={s.day} className="station">
            <span className="station-day" aria-label={`${t.process.day} ${Number(s.day)}`}>
              <em>{t.process.day}</em>
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
