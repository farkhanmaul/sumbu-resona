import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './theme.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Vision from './components/Vision.jsx'
import Roadmap from './components/Roadmap.jsx'
import Links from './components/Links.jsx'
import SiteFooter from './components/Footer.jsx'
import Cards from './pages/Cards.jsx'

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash)
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export default function App() {
  const hash = useHashRoute()
  const showCards = hash.startsWith('#/cards') || hash.startsWith('#/card/')

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {showCards ? (
        <Cards />
      ) : (
        <main>
          <Hero />
          <About />
          <Vision />
          <Roadmap />
          <Links />
        </main>
      )}
      <SiteFooter />
    </ThemeProvider>
  )
}
