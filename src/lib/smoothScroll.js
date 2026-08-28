import Lenis from 'lenis'

/* Lenis lerps the real scroll position, so position:sticky and every
   rAF engine on the page keep reading true values. The instance parks
   on `window`, not module scope: a module singleton is re-created on
   every hot reload and the orphaned rAF loops stack until the
   compositor starves. */
const KEY = '__megaLenis'

/* Film scrub inertia. Lenis already lerps the scroll position, so the
   film engine's own lerp must stay loose or the two stack into mush. */
export const SCRUB_LERP = 0.24

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  if (window[KEY]) return window[KEY]

  const lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    smoothWheel: true,
    // touch keeps the platform's own scrolling; smoothing fights the finger
    syncTouch: false,
  })

  let raf = 0
  const loop = (time) => {
    lenis.raf(time)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  // in-page links go through Lenis or they hard-jump out of the easing
  const onClick = (e) => {
    const a = e.target.closest?.('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    if (!id || id === '#') return
    const el = document.querySelector(id)
    if (!el) return
    e.preventDefault()
    // force: the mobile nav sheet stops Lenis and is still stopped at the
    // moment its own link is clicked
    lenis.scrollTo(el, { offset: 0, force: true })
  }
  document.addEventListener('click', onClick)

  window[KEY] = lenis
  lenis.destroyAll = () => {
    cancelAnimationFrame(raf)
    document.removeEventListener('click', onClick)
    lenis.destroy()
    delete window[KEY]
  }
  return lenis
}

export function getLenis() {
  return typeof window === 'undefined' ? null : window[KEY] || null
}
