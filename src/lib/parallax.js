/* Depth from one rAF loop, not one listener per element.
   Mark elements with `data-par="0.18"`:
     positive  travels further than the page (sits in front)
     negative  travels less than the page (sits behind)
   `data-par-scale` over-scales media drifting inside a clipped frame.

   Progress is distance from the middle of the viewport in
   viewport-heights, so drift is zero as the element crosses centre;
   nothing jumps on entry. Layout position is measured through the
   offsetParent chain because getBoundingClientRect includes the
   transform written last frame, which turns the loop into an
   equilibrium instead of motion. */
export function initParallax(root = document) {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const docTop = (el) => {
    let y = 0
    let n = el
    while (n) {
      y += n.offsetTop
      n = n.offsetParent
    }
    return y
  }

  const items = Array.from(root.querySelectorAll('[data-par]')).map((el) => ({
    el,
    y: parseFloat(el.dataset.par) || 0,
    scale: parseFloat(el.dataset.parScale) || 0,
    top: 0,
    h: 0,
    live: false,
  }))
  if (!items.length) return () => {}

  const measure = () => {
    for (const item of items) {
      item.top = docTop(item.el)
      item.h = item.el.offsetHeight
    }
  }
  measure()
  window.addEventListener('resize', measure)
  window.addEventListener('load', measure)

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const item = items.find((i) => i.el === e.target)
        if (!item) continue
        item.live = e.isIntersecting
        if (!e.isIntersecting) item.el.style.transform = ''
      }
    },
    { rootMargin: '15% 0px' },
  )
  items.forEach((i) => io.observe(i.el))

  let raf = 0
  function frame() {
    const vh = window.innerHeight
    const scrolled = window.scrollY || window.pageYOffset
    for (const item of items) {
      if (!item.live) continue
      const q = (item.top + item.h / 2 - scrolled - vh / 2) / vh
      const ty = q * item.y * 100
      const sc = item.scale ? ` scale(${item.scale})` : ''
      item.el.style.transform = `translate3d(0,${ty.toFixed(2)}px,0)${sc}`
    }
    raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    window.removeEventListener('resize', measure)
    window.removeEventListener('load', measure)
    items.forEach((i) => {
      i.el.style.transform = ''
    })
  }
}
