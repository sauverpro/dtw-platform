import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import DBSPage from "./pages/DBSPage";
import PartnersPage from "./pages/PartnersPage";
import PreviousDTWs from "./pages/PreviousDTWs";
import EventGalleryPage from "./pages/EventGalleryPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/dbs" element={<DBSPage />} />
        <Route path="/previous-dtws" element={<PreviousDTWs />} />
        <Route path="/gallery/:year" element={<EventGalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
