import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PartnersStrip from '../components/PartnersStrip';
import About from '../components/About';
import WhySponsor from '../components/WhySponsor';
import Packages from '../components/Packages';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { useReveal } from '../components/useReveal';

export default function LandingPage() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PartnersStrip />
        <About />
        <WhySponsor />
        <Packages />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
