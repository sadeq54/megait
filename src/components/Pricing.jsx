import { useI18n } from '../lib/i18n.jsx'

export default function Pricing() {
  const { t } = useI18n()
  const p = t.pricing
  return (
    <section className="pricing" id="pricing">
      <div className="wrap">
        <p className="eyebrow rise">{p.eyebrow}</p>
        <h2 className="sec-h rise">{p.title}</h2>
        <div className="tiers">
          {p.tiers.map((tier) => (
            <article key={tier.name} className={`tier rise${tier.flag ? ' tier-hot' : ''}`}>
              {tier.flag && <span className="tier-flag">{tier.flag}</span>}
              <h3>{tier.name}</h3>
              <p className="tier-price">{tier.price}</p>
              <p className="tier-for">{tier.for}</p>
              <ul>
                {tier.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="tier-meta">{tier.meta}</p>
              <a className="btn btn-primary tier-btn" href="#contact">{t.cta}</a>
            </article>
          ))}
        </div>
        <aside className="partner rise">
          <div>
            <h3>{p.partner.title}</h3>
            <p>{p.partner.body}</p>
          </div>
          <p className="partner-price">
            {p.partner.price}<span>{p.partner.per}</span>
          </p>
        </aside>
        <p className="terms rise">{p.terms}</p>
      </div>
    </section>
  )
}
