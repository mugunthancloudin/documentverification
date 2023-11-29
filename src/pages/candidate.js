import React from "react";
import Scrollbar from "../components/header&footer/header/scrollbar";
import Footer from "../components/header&footer/footer/footer";
import CandidateHome from "../components/modules/candidate/candidateHome";

export default function Candidate() {
  return (
    <>
      <Scrollbar />
      <CandidateHome />
      <Footer />
    </>
  );
}
