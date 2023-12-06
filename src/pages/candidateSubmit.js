import React from "react";
import Footer from "../components/header&footer/footer/footer";
import Scrollbar from "../components/header&footer/header/scrollbar";
import CandidatePrivilages from "../components/modules/candidate/candidatePrivilages";

export default function CandidateSubmit() {
  return (
    <>
      <Scrollbar />
      <CandidatePrivilages />
      <Footer />
    </>
  );
}
