import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from './smoothScroll.js'

gsap.registerPlugin(ScrollTrigger)

/* One-time wiring: Lenis lerps the REAL scroll position, so
   ScrollTrigger reads true values; it only needs an update ping per
   Lenis frame, and a refresh once fonts have settled the layout. */
let wired = false
export function wireScrollTrigger() {
  if (wired) return
  wired = true
  const lenis = getLenis()
  if (lenis) lenis.on('scroll', ScrollTrigger.update)
  if (document.fonts) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }
}

export const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger }
