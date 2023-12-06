import React from "react";
import HomePage from "../components/landingDestination/homePage/homePage";
import StakeHolders from "../components/landingDestination/stakeHolders/stakeHolders";
import Banner from "../components/landingDestination/banner/banner";
import Contact from "../components/landingDestination/contact/contact";
import Footer from "../components/header&footer/footer/footer";
import Scrollbar from "../components/header&footer/header/scrollbar";
// import Headerbar from "../components/header&footer/header/navbar";

export default function DestinationPage() {
  return (
    <>
      <Scrollbar/>
      {/* <Headerbar/> */}
      <HomePage />
      <StakeHolders />
      <Banner />
      <Contact />
      <Footer />
    </>
  );
}
