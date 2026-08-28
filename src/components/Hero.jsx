import { useEffect, useRef } from 'react'
import { getLenis } from '../lib/smoothScroll.js'

/* Autoplay hero, original 1080p bits: the assembly film plays once and
   holds its final frame. The page is scroll-locked until the film ends
   (click skips to the end), with a hard 10s ceiling and every fallback
   path unlocking — the site is never held hostage. */
export default function Hero() {
  const videoRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const stage = stageRef.current
    if (!video || !stage) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    stage.classList.remove('film-done')
    let unlocked = false
    const unlock = () => {
      if (unlocked) return
      unlocked = true
      const lenis = getLenis()
      if (lenis) lenis.start()
      document.documentElement.classList.remove('scroll-hold')
      stage.classList.add('film-done')
    }

    if (reduce) {
      unlock()
      return
    }

    // hold the page while the film runs
    const lenis = getLenis()
    if (lenis) lenis.stop()
    document.documentElement.classList.add('scroll-hold')
    const ceiling = setTimeout(unlock, 10000)

    const mobile = window.matchMedia('(max-width: 860px)').matches
    video.src = mobile ? '/film/f1-assembly-m.mp4' : '/film/f1-assembly.mp4'
    const p = video.play()
    if (p && p.catch) p.catch(unlock) // autoplay blocked: poster + free scroll

    const onEnded = () => unlock()
    const onError = () => unlock()
    // click anywhere skips to the finished M
    const onSkip = () => {
      try {
        if (video.duration) video.currentTime = video.duration - 0.05
      } catch {
        /* not seekable */
      }
      unlock()
    }
    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)
    stage.addEventListener('pointerdown', onSkip)

    return () => {
      clearTimeout(ceiling)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('error', onError)
      stage.removeEventListener('pointerdown', onSkip)
      unlock()
    }
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
          <p className="eyebrow rise-load" style={{ '--l': 0 }}>
            Big tech &middot; bigger possibilities
          </p>
          <h1 className="hero-h1 rise-load" style={{ '--l': 1 }}>
            Landing pages that <em className="accent">move</em>.
            <br />
            And convert.
          </h1>
        </div>
        <div className="hero-bottom">
          <p className="hero-sub rise-load" style={{ '--l': 2 }}>
            Launch pages for apps and B2B brands. 3D heroes, scroll-driven
            motion, 95+ Lighthouse. Fixed price, live in 7 days.
          </p>
          <div className="hero-cta rise-load" style={{ '--l': 3 }}>
            <a className="btn btn-primary" href="#contact">Start a project</a>
            <a className="btn btn-ghost" href="#work">See the work</a>
          </div>
        </div>
      </div>
    </section>
  )
}
