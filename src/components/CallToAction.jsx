import { useEffect, useRef } from 'react'

/* The beacon loop breathes behind the closing type. Muted, looped,
   poster first, paused off-screen, skipped under reduced motion. */
export default function CallToAction() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver((entries) => {
      const on = entries[0]?.isIntersecting
      if (on) video.play().catch(() => {})
      else video.pause()
    })
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <section className="cta" id="contact">
      <div className="cta-film" aria-hidden="true">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/film/f3-beacon-poster.jpg"
          src="/film/f3-beacon.mp4"
        />
      </div>
      <div className="wrap cta-inner">
        <h2 className="cta-h rise">
          Tell us about <em className="accent">your launch.</em>
        </h2>
        <p className="cta-sub rise">
          If we are not the right fit, we will say so in the first five minutes.
        </p>
        <div className="cta-actions rise">
          <a className="btn btn-primary btn-big" href="mailto:hello@megait.com?subject=Landing%20page%20project">
            Start a project
          </a>
          <p className="cta-alt">
            or write to <a href="mailto:hello@megait.com">hello@megait.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}
