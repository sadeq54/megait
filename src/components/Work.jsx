import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/scrollFx.js'
import { useI18n } from '../lib/i18n.jsx'

/* Pinned split: the title holds the left column while the cases travel
   up the right, each growing and brightening as it arrives. Case faces
   are live screenshots of the shipped sites; every card opens the real
   product. */
const CASES = [
  { id: 'kormzi', url: 'https://kormzi.com/', img: '/work/kormzi.jpg' },
  { id: 'gold', url: 'https://goldpricesarabia.com/', img: '/work/gold.jpg' },
  { id: 'blk', url: 'https://blk-db6.pages.dev/', img: '/work/blk.jpg' },
]

export default function Work() {
  const { t, lang } = useI18n()
  const rootRef = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const root = rootRef.current
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 901px)': () => {
          ScrollTrigger.create({
            trigger: root.querySelector('.work-split'),
            start: 'top top',
            end: 'bottom bottom',
            pin: root.querySelector('.work-pin'),
            pinSpacing: false,
          })
        },
      })
      root.querySelectorAll('.case').forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.93, opacity: 0.35 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 45%',
              scrub: true,
            },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  return (
    <section className="work" id="work" ref={rootRef}>
      <div className="wrap work-split">
        <div className="work-pin">
          <h2 className="sec-h">{t.work.title}</h2>
          <p className="sec-sub">{t.work.sub}</p>
        </div>
        <div className="work-list">
          {CASES.map((c, i) => (
            <a
              key={c.id}
              className="case"
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="case-media">
                <img src={c.img} alt={`${t.work.cases[i].title} website`} loading="lazy" decoding="async" />
              </div>
              <div className="case-body">
                <h3>{t.work.cases[i].title}</h3>
                <p>{t.work.cases[i].body}</p>
                <ul className="case-facts">
                  {t.work.cases[i].facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
