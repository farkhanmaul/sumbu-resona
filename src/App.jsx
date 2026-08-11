import { ThemeProvider } from 'styled-components'
import theme from './theme.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Vision from './components/Vision.jsx'
import Roadmap from './components/Roadmap.jsx'
import Links from './components/Links.jsx'
import SiteFooter from './components/Footer.jsx'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Vision />
        <Roadmap />
        <Links />
      </main>
      <SiteFooter />
    </ThemeProvider>
  )
}
