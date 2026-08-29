import { useEffect, useRef, useState } from 'react'
import { getLenis } from '../lib/smoothScroll.js'
import { useI18n } from '../lib/i18n.jsx'

export default function Nav() {
  const { lang, t, setLang } = useI18n()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const sentinelRef = useRef(null)

  const LINKS = [
    ['#work', t.nav.work],
    ['#services', t.nav.services],
    ['#process', t.nav.process],
    ['#pricing', t.nav.pricing],
  ]

  // solid state flips via a sentinel at the top of the document, so no
  // scroll listener is ever attached
  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:72px;pointer-events:none;'
    document.body.prepend(sentinel)
    sentinelRef.current = sentinel
    const io = new IntersectionObserver((entries) => {
      setSolid(!entries[0].isIntersecting)
    })
    io.observe(sentinel)
    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [])

  // the sheet locks Lenis while open
  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return
    if (open) lenis.stop()
    else lenis.start()
    return () => lenis.start()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={`nav${solid ? ' is-solid' : ''}`}>
        <a className="logo" href="#top" aria-label="MEGA IT home">
          mega<span className="logo-it">it</span><span className="logo-tld">.com</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="nav-end">
          <button
            type="button"
            className="lang-toggle"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          <a className="btn btn-primary btn-nav" href="#contact">{t.cta}</a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </header>
      <div id="nav-sheet" className={`nav-sheet${open ? ' is-open' : ''}`} hidden={!open}>
        <ul>
          {LINKS.map(([href, label], i) => (
            <li key={href} style={{ '--i': i }}>
              <a href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
          <li style={{ '--i': LINKS.length }}>
            <a href="#contact" onClick={() => setOpen(false)}>{t.cta}</a>
          </li>
        </ul>
        <div className="nav-sheet-foot">hello@megait.com</div>
      </div>
    </>
  )
}
