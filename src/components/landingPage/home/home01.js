import React from "react";
import "./home.css";

export default function Home01() {
  return (
    <>
      <div className="container-fluid homeBg" id="action1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="homeH1">
                "<spam className="text-danger">Trust</spam>, but verify."
              </h1>
              <div className="row text-light homeComponent ">
                <div className="homeBox">&nbsp;</div>
                <h1 className="ps-5 mt-5 fw-bold">Document Verification</h1>
                <h2 className="ps-5 mt-2 fw-bold mb-5">
                  Confirm The Documents <br></br> Supplied By Your Candidates
                </h2>
              </div>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}
