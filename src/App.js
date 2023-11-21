import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/landingPage";
// import { BrowserRouter, Routes,Route } from "react-router-dom";
// import VerificationHomePage from "./components/pages/verificationHomePage";
// import VerificationSubmitPage from "./components/pages/verificationSubmitPage";


function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<VerificationHomePage/>} />
          <Route
            path="/documentVerification"
            element={<VerificationSubmitPage />}
          />
        </Routes>
      </BrowserRouter> */}
      <LandingPage/>
    </>
  );
}

export default App;
