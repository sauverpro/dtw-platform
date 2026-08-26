import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import DBSPage from "./pages/DBSPage";
import PartnersPage from "./pages/PartnersPage";
import PreviousDTWs from "./pages/PreviousDTWs";
import EventGalleryPage from "./pages/EventGalleryPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import SponsorLayout from "./sponsor/SponsorLayout";
import SponsorLandingPage from "./sponsor/pages/LandingPage";
import AdminLayout from "./sponsor/pages/admin/AdminLayout";
import AdminDashboard from "./sponsor/pages/admin/AdminDashboard";
import AdminHero from "./sponsor/pages/admin/AdminHero";
import AdminPartners from "./sponsor/pages/admin/AdminPartners";
import AdminAbout from "./sponsor/pages/admin/AdminAbout";
import AdminWhy from "./sponsor/pages/admin/AdminWhy";
import AdminPackages from "./sponsor/pages/admin/AdminPackages";
import AdminCta from "./sponsor/pages/admin/AdminCta";
import AdminFooter from "./sponsor/pages/admin/AdminFooter";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/dbs" element={<DBSPage />} />
        <Route path="/previous-dtws" element={<PreviousDTWs />} />
        <Route path="/gallery/:year" element={<EventGalleryPage />} />

        <Route path="/sponsor" element={<SponsorLayout />}>
          <Route index element={<SponsorLandingPage />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="why" element={<AdminWhy />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="cta" element={<AdminCta />} />
            <Route path="footer" element={<AdminFooter />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
