import Hero from "../components/landing/Hero"
import UpcomingEvents from "../components/landing/Event"
import Footer from "../components/landing/Footer"
import AboutEvent from "../components/landing/AboutEvent"
import TicketsPartners from "../components/landing/TicketsPartners"
import Schedule from "../components/landing/Schedule"
const LandingPage = () => {
  return (
    <div>
        <Hero />
        <UpcomingEvents />
          <AboutEvent />

      <TicketsPartners />
      <Schedule />
        <Footer />
    </div>
  )
}

export default LandingPage