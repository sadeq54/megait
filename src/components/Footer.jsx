import { useI18n } from '../lib/i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="logo footer-logo">
            mega<span className="logo-it">it</span><span className="logo-tld">.com</span>
          </span>
          <p>{t.footer.tagline}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#work">{t.nav.work}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#process">{t.nav.process}</a>
          <a href="#pricing">{t.nav.pricing}</a>
        </nav>
        <div className="footer-contact">
          <a href="mailto:hello@megait.com">hello@megait.com</a>
          <p>{t.footer.location}</p>
        </div>
      </div>
      <div className="wrap footer-foot">
        <p>{t.footer.rights}</p>
      </div>
    </footer>
  )
}
