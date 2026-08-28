export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="logo footer-logo">
            mega<span className="logo-it">it</span><span className="logo-tld">.com</span>
          </span>
          <p>Big tech &middot; bigger possibilities</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="footer-contact">
          <a href="mailto:hello@megait.com">hello@megait.com</a>
          <p>Amman, Jordan (GMT+3)</p>
        </div>
      </div>
      <div className="wrap footer-foot">
        <p>&copy; 2026 MEGA IT. All rights reserved.</p>
      </div>
    </footer>
  )
}
