import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/landingPage";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import DestinationPage from "./pages/destinationPage";
import Owner from "./pages/owner";
import Verifier from "./pages/verifier";
import Company from "./pages/company";
import Candidate from "./pages/candidate";
// import VerificationHomePage from "./components/pages/verificationHomePage";
// import VerificationSubmitPage from "./components/pages/verificationSubmitPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DestinationPage/>} />
          <Route path="/owner" element={<Owner />}/>
          <Route path="/verifier" element={<Verifier />}/>
          <Route path="/company" element={<Company />}/>
          <Route path="/individual" element={<Candidate/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;