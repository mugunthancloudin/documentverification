import React from "react";
import docVerification from "../../../assets/landingPage/docVerification.png";
import "./home.css";

export default function Home04() {
  return (
    <>
      <div className="container-fluid" id="action4">
        <div className="container  mb-5">
          <div className="row">
            <div className="col-lg-6 home02Bg">
              <div className="homespace mt-4">&nbsp;</div>
              <h1 className="mt-3">
                Who should conduct Document Verification?
              </h1>
              <p className="homeh2P">
                We believe all businesses should conduct document verification
                checks as part of a comprehensive employment screening process.
                Ensure your business is protected by conducting the necessary
                document verification checks on your candidates.
              </p>

              <h1 className="mt-5">
                When should you conduct Document Verification?
              </h1>
              <p className="homeh2P">
                We highly recommend conducting document verification when
                screening new candidates. This means that only the correct
                candidates progress to becoming employees, and you have full
                confidence in their ability to perform the job responsibilities
              </p>
            </div>

            <div className="col-lg-6">
              <img src={docVerification} alt="identity" className=" home02Image " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
