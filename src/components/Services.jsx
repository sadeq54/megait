import { useEffect, useRef } from 'react'

/* Gapless bento; every cell carries its own generated micro-loop.
   Loops only decode while on screen (IO gates play/pause). */
const CARDS = [
  {
    key: 'pages',
    cls: 'cell-big',
    loop: 'l1-pages',
    title: 'Launch pages',
    body: 'One page with one job: convert. Structured around your offer, written to be scanned, built to be felt.',
  },
  {
    key: 'motion',
    cls: '',
    loop: 'l2-motion',
    title: '3D and motion',
    body: 'WebGL scenes and scroll choreography that earn their frame budget.',
  },
  {
    key: 'apps',
    cls: '',
    loop: 'l3-apps',
    title: 'Web apps',
    body: 'Dashboards, portals and tools when the page needs a product behind it.',
  },
  {
    key: 'perf',
    cls: 'cell-wide',
    loop: 'l4-speed',
    title: 'Performance and SEO',
    body: 'Core Web Vitals, schema, open graph. Speed is part of the design.',
  },
]

function LoopCell({ c }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0]?.isIntersecting
        if (on) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '10% 0px' },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <article className={`cell rise ${c.cls}`}>
      <div className="cell-media" aria-hidden="true">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={`/film/${c.loop}-poster.jpg`}
          src={`/film/${c.loop}.mp4`}
        />
      </div>
      <h3>{c.title}</h3>
      <p>{c.body}</p>
    </article>
  )
}

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <h2 className="sec-h rise">What we build</h2>
        <div className="bento">
          {CARDS.map((c) => (
            <LoopCell key={c.key} c={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
