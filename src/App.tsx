import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DBSPage from "./pages/DBSPage";
import PartnersPage from "./pages/PartnersPage";
import PreviousDTWs from "./pages/PreviousDTWs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/dbs" element={<DBSPage />} />
        <Route path="/previous-dtws" element={<PreviousDTWs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
