import React from "react";
import Scrollbar from "../components/header&footer/header/scrollbar";
import Footer from "../components/header&footer/footer/footer";
import VerifierHome from "../components/modules/verifier/verifierHome";
import VerificationDashboard from "../components/modules/verifier/verificationDashboard";

export default function Verifier() {
  return (
    <>
      <Scrollbar />
      <VerifierHome />
      {/* <VerificationDashboard/> */}
      <Footer />
    </>
  );
}
