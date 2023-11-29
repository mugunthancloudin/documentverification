import React from "react";
import "./homePage.css";
import instagram from "../../../assets/destinationPage/contact/instagram.png";
import facebook from "../../../assets/destinationPage/contact/facebook.png";
import twitter from "../../../assets/destinationPage/contact/twitter.png";
import github from "../../../assets/destinationPage/contact/github.png";
import Scrollbar from '../../header&footer/header/scrollbar'


export default function HomePage() {
  return (
    <>
     
        <div className="container-fluid homeBg ">
          <div className="row">
            <Scrollbar/>
          </div>
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block">
              <div className=" homeIcons">
              <div className="row ">
                {" "}
                <img src={facebook} className="homeIcon-img" alt="facebook" />
              </div>
              <div className="row mt-3">
                <img src={instagram} className="homeIcon-img" alt="instagram" />
              </div>
              <div className="row mt-3">
                {" "}
                <img src={twitter} className="homeIcon-img" alt="twitter" />
              </div>
              <div className="row mt-3">
                {" "}
                <img src={github} className="homeIcon-img" alt="github" />
              </div>
            </div>
            </div>
            <div className="col-lg-6 text-end text-white pe-5">
              <h1 className="homeH1 fw-bold">DOC-VERIFY</h1>
              <p className="fw-bold">
                Tamper-proof Document Issuance & Verification System <br></br>
                for Issuing Authorities to issue Verifiable Documents to{" "}
                <br></br>Recipients, allowing them to store & share them{" "}
                <br></br> securely from their Digital Wallet.
              </p>
            </div>
          </div>
        </div>
      
    </>
  );
}