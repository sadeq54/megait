/* Name the buyer's fear, answer it plainly. */
const QA = [
  {
    q: 'Will it be slow?',
    a: '95+ Lighthouse on launch, or we fix it free. Heavy 3D ships with an automatic fallback for phones without WebGL.',
  },
  {
    q: 'Will it look like a template?',
    a: 'Every build is custom, written from a blank file. Scroll the work above and find the template.',
  },
  {
    q: 'What if I do not like it?',
    a: 'You approve the design direction before any animation is coded. Two revision rounds are inside every price.',
  },
]

export default function Answers() {
  return (
    <section className="answers">
      <div className="wrap">
        <h2 className="sec-h rise">Asked before every deal</h2>
        <dl className="qa-grid">
          {QA.map((item) => (
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
