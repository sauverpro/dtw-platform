import Hero from "../components/landing/Hero"
import UpcomingEvents from "../components/landing/Event"
import Footer from "../components/landing/Footer"
import AboutEvent from "../components/landing/AboutEvent"
import TicketsPartners from "../components/landing/TicketsPartners"
import Navbar from "../components/landing/Navbar"
import Faq from "../components/landing/Faq"
import ScheduleSpeakers from "../components/landing/Schedulespeakers"
const LandingPage = () => {
  return (
    <div>
      <Navbar />
        <Hero />
        <UpcomingEvents />
          <AboutEvent />

      <TicketsPartners />
        <ScheduleSpeakers />
      <Faq />
        <Footer />
    </div>
  )
}

export default LandingPage