import React from "react";
import "./home.css";

export default function Home05() {
  return (
    <>
      <div className="container-fluid">
        <div className="container ">
          <div className="row bg-secondary text-white text-center mb-5">
            <h1 className="pt-5 home05Text">Learn more about how</h1>
            <h1 className="pb-5 home05Text">we uncover risk.</h1>
          </div>

          <div className="row home05Bg">
            <h1 className="fw-bold">Got A Question?</h1>
            <h1 className="fw-bold">Talk To Us!</h1>
          </div>

          <div className="row mt-5 mb-5 home05Bg">
            <div className="col-lg-6">
              <h3 className="fw-bold">Business Enquiries</h3>
              <p className="home05P mt-4">
                Want to talk about background checks or brainstorm about hiring
                solutions?
              </p>
              <p className="home05P">
                Need us to just listen? Whatever the reason, we are here to
                help.
              </p>
              {/* <p className="home05P">
                Please use the form below to connect with us or drop us a call
                at the following numbers:
              </p>
              <ul className="home05P">
                <li>Australia +61 27208 5044 </li>
                <li>Singapore +65 3157 3074</li>
                <li>Hong Kong SAR +85 23002 2820</li>
              </ul> */}
            </div>

            <div className="col-lg-6">
                <h3 className="fw-bold">Job Applicant Enquires</h3>
                <p className="home05P mt-4">Need help with your screening profile or additional questions about your screening request?</p>
                <p className="home05P">Email us at <spam className="text-success">apac_help@sterlingcheck.com</spam>, and we will help you with that!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
