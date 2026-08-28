import { useRef } from 'react'
import useScrollFilm from '../lib/useScrollFilm.js'

/* The corridor: scroll-scrubbed camera flight. Irises open over the
   services chapter, then every scroll step drives the camera. */
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
    scrubStart: 0.24,
    scrubEnd: 1,
  })

  return (
    <section className="scrub-stage bridge-stage overlap" ref={stageRef} aria-hidden="true">
      <div className="scrub-sticky" ref={stickyRef} style={{ '--poster': 'url(/film/f2-corridor-poster.jpg)' }}>
        <div className="scrub-media">
          <video ref={videoRef} muted playsInline preload="none" />
        </div>
        <div className="iris-ring" />
      </div>
    </section>
  )
}
