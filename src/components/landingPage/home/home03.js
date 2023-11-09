import React from "react";
import verification from "../../../assets/landingPage/whyVerification.jpg";
import "./home.css";

export default function Home03() {
  return (
    <>
      <div className="container-fluid">
        <div className="container mb-5">
          <div className="row">
            <div className="col-lg-6">
              <img src={verification} alt="identity" className="home03image" />
            </div>

            <div className="col-lg-6 home02Bg">
              <div className="homespace mt-4">&nbsp;</div>
              <h1 className="mt-3">Why conduct Document Verification?</h1>
              <div>
                <h5 className="mt-3 home03h6">
                  <u> Benefits of conducting document verification:</u>
                </h5>
                <ul className="mt-3">
                  <li className="home03li">
                    Protect your business from liability and risk of hiring
                    unqualified or under-qualified candidates. Ensure you are
                    hiring candidates who can complete the job responsibilities
                    assigned to the role.
                  </li>
                  <li className="home03li">
                    Screening your prospective candidates will save you time and
                    money in the long run by understanding from the outset
                    whether the candidate is qualified and matches the
                    requirements of the role.
                  </li>
                  <li className="home03li">
                    Candidates and employees who are not upfront about their
                    qualifications may indicate a lack of integrity in their
                    working behaviour.
                  </li>
                </ul>

                <button className="mt-5 ms-3 p-3 text-white bg-danger border-0">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
