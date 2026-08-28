/* Reveal-on-scroll driven by IntersectionObserver, never by measured
   positions: observer geometry is always live, so late layout shifts
   (font swaps, lazy media) cannot strand elements hidden. Fires BEFORE
   the fold (rootMargin) so fast scrolling never outruns the fade. */
export function initReveals(root = document) {
  const els = Array.from(root.querySelectorAll('.rise'))
  if (!els.length) return () => {}

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('in'))
    return () => {}
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.01, rootMargin: '0px 0px 18% 0px' },
  )
  els.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 55 + 'ms'
    io.observe(el)
  })
  return () => io.disconnect()
}

/* Run a callback once when the element first enters the viewport. */
export function onceInView(el, callback, rootMargin = '0px 0px -8% 0px') {
  if (!el) return () => {}
  if (typeof IntersectionObserver === 'undefined') {
    callback()
    return () => {}
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect()
        callback()
      }
    },
    { rootMargin, threshold: 0.12 },
  )
  io.observe(el)
  return () => io.disconnect()
}
