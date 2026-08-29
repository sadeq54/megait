import { useEffect, useRef } from 'react'
import { useI18n } from '../lib/i18n.jsx'

/* The beacon loop breathes behind the closing type. Muted, looped,
   poster first, paused off-screen, skipped under reduced motion. */
export default function CallToAction() {
  const { t } = useI18n()
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
          {t.contact.h1} <em className="accent">{t.contact.h2}</em>
        </h2>
        <p className="cta-sub rise">{t.contact.sub}</p>
        <div className="cta-actions rise">
          <a className="btn btn-primary btn-big" href="mailto:hello@megait.com?subject=Landing%20page%20project">
            {t.cta}
          </a>
          <p className="cta-alt">
            {t.contact.alt} <a href="mailto:hello@megait.com">hello@megait.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}
