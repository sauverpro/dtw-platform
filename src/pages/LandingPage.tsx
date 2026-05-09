import Hero from "../components/landing/Hero"
import UpcomingEvents from "../components/landing/Event"
import Footer from "../components/landing/Footer"
import AboutEvent from "../components/landing/AboutEvent"
import TicketsPartners from "../components/landing/TicketsPartners"
import Schedule from "../components/landing/Schedule"
import Speakers from "../components/landing/Speakers"
import Navbar from "../components/landing/Navbar"
import Faq from "../components/landing/Faq"
const LandingPage = () => {
  return (
    <div>
      <Navbar />
        <Hero />
        <UpcomingEvents />
          <AboutEvent />

      <TicketsPartners />
      <Schedule />
      <Speakers />
      <Faq />
        <Footer />
    </div>
  )
}

export default LandingPage