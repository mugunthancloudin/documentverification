import React from "react";
import Scrollbar from "../components/header&footer/header/scrollbar";
import Footer from "../components/header&footer/footer/footer";
import VerifierHome from "../components/modules/verifier/verifierHome";

export default function Verifier() {
  return (
    <>
      <Scrollbar />
      <VerifierHome />
      <Footer />
    </>
  );
}
