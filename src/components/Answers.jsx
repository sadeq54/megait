import { useI18n } from '../lib/i18n.jsx'

/* Name the buyer's fear, answer it plainly. */
export default function Answers() {
  const { t } = useI18n()
  return (
    <section className="answers">
      <div className="wrap">
        <h2 className="sec-h rise">{t.answers.title}</h2>
        <dl className="qa-grid">
          {t.answers.qa.map((item) => (
            <div className="qa rise" key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
