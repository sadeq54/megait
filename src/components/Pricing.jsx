const TIERS = [
  {
    name: 'Launch',
    price: '$1,200',
    for: 'A single product or app launch page.',
    items: [
      '1 page, up to 6 sections',
      'Custom scroll motion',
      'Responsive + reduced-motion support',
      '95+ Lighthouse performance',
      'Contact form to your inbox',
      'SEO and Open Graph set up',
      'Deployed to your domain',
    ],
    meta: '7 business days · 2 revision rounds',
  },
  {
    name: 'Signature',
    price: '$2,450',
    flag: 'Most popular',
    for: 'Brands that need to look expensive.',
    items: [
      'Everything in Launch',
      '3D hero scene or scroll-scrub sequence',
      'Up to 10 sections + one sub-page',
      'Page transitions and micro-interactions',
      'Bilingual EN + AR with RTL',
      'Analytics and conversion events',
      'CMS hookup for one content section',
    ],
    meta: '10 business days · 3 revision rounds',
  },
  {
    name: 'Flagship',
    price: '$4,900+',
    for: 'Funded startups and end-clients.',
    items: [
      'Everything in Signature',
      'Up to 5 pages or a 3D configurator',
      'Custom illustration and motion direction',
      'A/B test variant of the hero',
      'Performance and accessibility report',
      '30 days post-launch support',
    ],
    meta: '3 weeks · unlimited revisions in scope',
  },
]

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="wrap">
        <p className="eyebrow rise">Fixed price, stated first</p>
        <h2 className="sec-h rise">Three ways in</h2>
        <div className="tiers">
          {TIERS.map((t) => (
            <article key={t.name} className={`tier rise${t.flag ? ' tier-hot' : ''}`}>
              {t.flag && <span className="tier-flag">{t.flag}</span>}
              <h3>{t.name}</h3>
              <p className="tier-price">{t.price}</p>
              <p className="tier-for">{t.for}</p>
              <ul>
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="tier-meta">{t.meta}</p>
              <a className="btn btn-primary tier-btn" href="#contact">Start your project</a>
            </article>
          ))}
        </div>
        <aside className="partner rise">
          <div>
            <h3>Growth partner</h3>
            <p>
              Unlimited requests, one active at a time. Two to three pages a month,
              48-hour turnaround on small changes. Pause or cancel anytime.
            </p>
          </div>
          <p className="partner-price">
            $2,200<span>/month</span>
          </p>
        </aside>
        <p className="terms rise">
          50% up front. You send content by day 2 or the timeline pauses. Extra
          revision rounds are $150. Full IP transfer on final payment.
        </p>
      </div>
    </section>
  )
}
