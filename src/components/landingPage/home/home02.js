import React from "react";
import identity from "../../../assets/landingPage/identity.jpg";
import "./home.css";

export default function Home02() {
  return (
    <>
      <div className="container-fluid">
        <div className="container mb-5">
          <div className="row">
            <h5 className="home02_h5">
              Document  fraud and identity theft are on the rise, safeguard your
              hiring process by contacting us for a free quote for Document
              Verification services or a Holistic Employment screening package
            </h5>
          </div>
          <div className="row">
            <div className="col-lg-6 home02Bg">
            <div className="homespace mt-4">&nbsp;</div>
              <h1 className="mt-3">What is Document Verification?</h1>
              <p className="homeh2P">
                Document verification is the process of verifying the employment
                documents and education documents supplied by your candidates.
                Verification of the candidate’s documents helps to confirm the
                claims of the candidate are correct, e.g. verification of the
                candidate’s prior employment, educational qualifications,
                certifications, and any other documents provided to assert a
                candidate’s abilities.
              </p>
            </div>

            <div className="col-lg-6">
                <img src={identity} alt="identity" className=" home02Image "/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
