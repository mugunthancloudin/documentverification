import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DestinationPage from "./pages/destinationPage";
import Owner from "./pages/owner";
import Verifier from "./pages/verifier";
import Company from "./pages/company";
import Candidate from "./pages/candidate";
import ContactPage from "./pages/contactPage";
import CandidateSubmit from "./pages/candidateSubmit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DestinationPage />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/verifier" element={<Verifier />} />
          <Route path="/company" element={<Company />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/candidateSubmit" element={<CandidateSubmit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
