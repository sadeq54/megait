import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/scrollFx.js'

/* Pinned split: the title holds the left column while the cases travel
   up the right, each growing and brightening as it arrives. Case faces
   are live screenshots of the shipped sites; every card opens the real
   product. */
const CASES = [
  {
    id: 'kormzi',
    url: 'https://kormzi.com/',
    img: '/work/kormzi.jpg',
    title: 'Kormzi',
    body: 'Full brand site for a performance affiliate network serving MENA and APAC: 3D hero, pinned case studies, smooth scroll choreography.',
    facts: ['kormzi.com', 'React + GSAP + Three.js'],
  },
  {
    id: 'gold',
    url: 'https://goldpricesarabia.com/',
    img: '/work/gold.jpg',
    title: 'Gold Prices Arabia',
    body: 'Bilingual gold-market platform on Next.js: live pricing, i18n routing, SEO engineered for English and Arabic in parallel.',
    facts: ['goldpricesarabia.com', 'Arabic RTL native'],
  },
  {
    id: 'blk',
    url: 'https://caffeshop-sadeq.netlify.app/',
    img: '/work/blk.jpg',
    title: 'BLK Coffee',
    body: 'Cinematic scroll-film landing page for a specialty coffee brand: scroll-driven film scrubbing, pinned menu rail, editorial pacing.',
    facts: ['Live preview', 'React + Lenis'],
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
            Live products, not mockups. Every case below opens the real site.
          </p>
        </div>
        <div className="work-list">
          {CASES.map((c) => (
            <a
              key={c.id}
              className="case"
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="case-media">
                <img src={c.img} alt={`${c.title} website`} loading="lazy" decoding="async" />
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
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
