import { useEffect } from 'react'
import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Proof from './components/Proof.jsx'
import BridgeFilm from './components/BridgeFilm.jsx'
import Work from './components/Work.jsx'
import Process from './components/Process.jsx'
import Pricing from './components/Pricing.jsx'
import Answers from './components/Answers.jsx'
import CallToAction from './components/CallToAction.jsx'
import Footer from './components/Footer.jsx'
import { initSmoothScroll } from './lib/smoothScroll.js'
import { initReveals } from './lib/reveal.js'
import { wireScrollTrigger } from './lib/scrollFx.js'

/* z-index scale: content 1 · film stages 2 · nav 60 · loader 100 */
export default function App() {
  // smooth scroll first: every engine below reads the position it lerps
  useEffect(() => {
    initSmoothScroll()
    wireScrollTrigger()
    const stopReveals = initReveals()
    return stopReveals
  }, [])

  return (
    <>
      <Loader />
      <Nav />
      <main className="page">
        <Hero />
        <Proof />
        <BridgeFilm />
        <Work />
        <Process />
        <Pricing />
        <Answers />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
