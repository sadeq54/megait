import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/scrollFx.js'

/* Pinned split: the title holds the left column while the cases travel
   up the right, each growing and brightening as it arrives. Case faces
   are the generated stills (s1-s3). */
const CASES = [
  {
    id: 'affiliate',
    img: '/s1-affiliate.png',
    title: 'Performance affiliate network',
    body: 'Full site for a MENA and APAC affiliate network: 3D hero, pinned case stack, smooth scroll, logo pipeline.',
    facts: ['React + GSAP + Three.js', '95+ Lighthouse'],
  },
  {
    id: 'qps',
    img: '/s2-qps.png',
    title: 'QPS Audit',
    body: 'Hospitality audit platform built end to end: product, front end, deployment. One developer, production traffic.',
    facts: ['qpsaudit.com', 'Sole developer'],
  },
  {
    id: 'gold',
    img: '/s3-gold.png',
    title: 'Gold Prices Arabia',
    body: 'Bilingual market tracker on Next.js: live charts, i18n routing, SEO built for two languages at once.',
    facts: ['goldpricesarabia.com', 'EN / AR RTL'],
  },
]

export default function Work() {
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
  }, [])

  return (
    <section className="work" id="work" ref={rootRef}>
      <div className="wrap work-split">
        <div className="work-pin">
          <h2 className="sec-h">Built, shipped, measured</h2>
          <p className="sec-sub">
            Three shipped products, three different jobs. The pattern is the
            same: one clear offer, motion with a purpose, numbers at the end.
          </p>
        </div>
        <div className="work-list">
          {CASES.map((c) => (
            <article key={c.id} className="case">
              <div className="case-media">
                <img src={c.img} alt={`${c.title} artwork`} loading="lazy" decoding="async" />
              </div>
              <div className="case-body">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <ul className="case-facts">
                  {c.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
