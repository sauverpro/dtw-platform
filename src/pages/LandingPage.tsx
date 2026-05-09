import Hero from "../components/landing/Hero"
import UpcomingEvents from "../components/landing/Event"
import Footer from "../components/landing/Footer"
import AboutEvent from "../components/landing/AboutEvent"
import TicketsPartners from "../components/landing/TicketsPartners"
const LandingPage = () => {
  return (
    <div>
        <Hero />
        <UpcomingEvents />
          <AboutEvent />

      <TicketsPartners />
        <Footer />
    </div>
  )
}

export default LandingPage