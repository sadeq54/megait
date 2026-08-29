import { useEffect, useRef } from 'react'
import { useI18n } from '../lib/i18n.jsx'

/* Autoplay hero, original 1080p bits: the assembly film plays once and
   holds its final frame. Scroll is NEVER blocked: the film is ambient,
   not a gate. (A scroll lock was tried and removed: Chrome defers
   video loading in busy or background tabs, so any time-based lock
   turns into seconds of frozen poster.) Clicking the stage skips to
   the finished M. */
export default function Hero() {
  const { t } = useI18n()
  const videoRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const stage = stageRef.current
    if (!video || !stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mobile = window.matchMedia('(max-width: 860px)').matches
    video.src = mobile ? '/film/f1-assembly-m.mp4' : '/film/f1-assembly.mp4'
    video.playbackRate = 1.6 // 8s film plays in 5s; assembly reads snappier
    const p = video.play()
    if (p && p.catch) p.catch(() => {}) // autoplay blocked: poster stands

    // click anywhere on the film skips to the finished M
    const onSkip = (e) => {
      if (e.target.closest('a, button')) return
      try {
        if (video.duration) video.currentTime = video.duration - 0.05
      } catch {
        /* not seekable */
      }
    }
    stage.addEventListener('pointerdown', onSkip)
    return () => stage.removeEventListener('pointerdown', onSkip)
  }, [])

  return (
    <section className="stage hero-stage" id="top" ref={stageRef}>
      <div className="stage-media">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/film/f1-assembly-poster.jpg"
        />
      </div>
      <div className="hero-content">
        <div className="hero-top">
          <h1 className="hero-h1 rise-load" style={{ '--l': 0 }}>
            {t.hero.h1a}
            <br />
            <em className="accent">{t.hero.h1b}</em>
          </h1>
        </div>
        <div className="hero-bottom">
          <p className="hero-sub rise-load" style={{ '--l': 1 }}>
            {t.hero.sub}
          </p>
          <div className="hero-cta rise-load" style={{ '--l': 2 }}>
            <a className="btn btn-primary" href="#contact">{t.cta}</a>
            <a className="btn btn-ghost" href="#work">{t.seeWork}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
