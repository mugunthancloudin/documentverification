import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/pages/landingPage";
import VerificationHome from "./components/verification/verificationHome";
import Footer from "./components/header&footer/footer";
import VerificationSubmit from "./components/verification/verificationSubmit";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import VerificationHomePage from "./components/pages/verificationHomePage";
import VerificationSubmitPage from "./components/pages/verificationSubmitPage";

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

// import React from "react";
// import Blockchain from "./blockchain"; // Import the Blockchain component
// import UploadToIpfs from "./uploadFile";

// export default function ConnectButton() {
  
//   return (
//     <div>
//       <w3m-button/>
//       <h1>Blockchain Functions</h1>
//       <Blockchain />
//       <UploadToIpfs/>
//     </div>
//   );
// }
