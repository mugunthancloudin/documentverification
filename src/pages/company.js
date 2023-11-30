import React from "react";
import Scrollbar from "../components/header&footer/header/scrollbar";
import CompanyHome from "../components/modules/company/companyHome";
import Footer from "../components/header&footer/footer/footer";
import CompanyData from "../components/modules/company/companyData";

export default function Company() {
  return (
    <>
      <Scrollbar />
      <CompanyHome />
      <CompanyData/>
      <Footer />
    </>
  );
}
