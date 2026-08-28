import { useEffect, useRef } from 'react'
import useScrollFilm from '../lib/useScrollFilm.js'

/* The corridor IS the services chapter: as scroll flies the camera
   down the server hall, the four service cards pass the viewer like
   glowing wall panels, each in its own film-time window, scaling
   toward the camera on the caption engine's --p progress. */
const CARDS = [
  {
    key: 'pages',
    side: 'left',
    loop: 'l1-pages',
    title: 'Launch pages',
    body: 'One page with one job: convert. Structured around your offer, written to be scanned, built to be felt.',
    win: [0.14, 0.34],
  },
  {
    key: 'motion',
    side: 'right',
    loop: 'l2-motion',
    title: '3D and motion',
    body: 'WebGL scenes and scroll choreography that earn their frame budget.',
    win: [0.34, 0.54],
  },
  {
    key: 'apps',
    side: 'left',
    loop: 'l3-apps',
    title: 'Web apps',
    body: 'Dashboards, portals and tools when the page needs a product behind it.',
    win: [0.54, 0.74],
  },
  {
    key: 'perf',
    side: 'right',
    loop: 'l4-speed',
    title: 'Performance and SEO',
    body: 'Core Web Vitals, schema, open graph. Speed is part of the design.',
    win: [0.74, 0.94],
  },
]

function HallCard({ c }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 860px)').matches) return // poster only on phones
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '10% 0px' },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`caption hall-slot hall-${c.side}`}
      data-in={c.win[0]}
      data-out={c.win[1]}
    >
      <article className="hall-card">
        <div className="hall-media" aria-hidden="true">
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
    </div>
  )
}

export default function BridgeFilm() {
  const stageRef = useRef(null)
  const stickyRef = useRef(null)
  const videoRef = useRef(null)

  useScrollFilm({
    stageRef,
    stickyRef,
    videoRef,
    src: '/film/f2-corridor.mp4',
    srcMobile: '/film/f2-corridor-m.mp4',
    lazy: true,
    iris: true,
    scrubStart: 0.16,
    scrubEnd: 1,
  })

  return (
    <section className="scrub-stage bridge-stage overlap" id="services" ref={stageRef}>
      <div className="scrub-sticky" ref={stickyRef} style={{ '--poster': 'url(/film/f2-corridor-poster.jpg)' }}>
        <div className="scrub-media">
          <video ref={videoRef} muted playsInline preload="none" />
        </div>
        <div className="iris-ring" aria-hidden="true" />
        <div className="caption hall-title" data-in="0.015" data-out="0.13">
          <h2 className="sec-h">What we build</h2>
        </div>
        {CARDS.map((c) => (
          <HallCard key={c.key} c={c} />
        ))}
      </div>
    </section>
  )
}
