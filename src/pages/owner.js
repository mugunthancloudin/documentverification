import React from "react";
import Scrollbar from "../components/header&footer/header/scrollbar";
import OwnerHome from "../components/modules/owner/ownerHome";
import Footer from "../components/header&footer/footer/footer";

export default function Owner() {
  return (
    <>
      <Scrollbar />
      <OwnerHome />
      <Footer />
    </>
  );
}
