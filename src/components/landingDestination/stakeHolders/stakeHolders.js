import React from "react";
import "./stakeHolders.css";
import orgsnisation from "../../../assets/destinationPage/stackHolders/organisation.png";
import individual from "../../../assets/destinationPage/stackHolders/individual.png";
import verifier from "../../../assets/destinationPage/stackHolders/verifiers.png";
import admin from "../../../assets/destinationPage/stackHolders/admin.png";
import { Link } from "react-router-dom";

export default function StakeHolders() {
  return (
    <>
    
      <div className="container-fluid pb-5">
        <div className="container">
          <div className="row ">
            <h1 className="stakeHoldersBg text-center">Stakeholders</h1>
          </div>
          <div className="row mt-4">
            <div className="col-lg-3 text-center mt-3">
              <img src={admin} alt="admin" className="img-container" />
              <h5 className="fw-bold mt-3 ">Admin</h5>
              <Link to="/owner">
                <button className="stackButton mt-2">contact</button>
              </Link>
            </div>

            <div className="col-lg-3 text-center mt-3">
              <img src={verifier} alt="verifier" className="img-container" />
              <h5 className="fw-bold mt-3 ">Verifier</h5>
              <Link to="/verifier">
                <button className="stackButton mt-2">contact</button>
              </Link>
            </div>

            <div className="col-lg-3 text-center mt-3">
              <img
                src={orgsnisation}
                alt="organisation"
                className="img-container"
              />
              <h5 className="fw-bold mt-3 ">Organisation</h5>
              <Link to="/company">
                <button className="stackButton mt-2">contact</button>
              </Link>
            </div>

            <div className="col-lg-3 text-center mt-3">
              <img
                src={individual}
                alt="individual"
                className="img-container"
              />
              <h5 className="fw-bold mt-3 ">Individual</h5>
              <Link to="/individual">
                <button className="stackButton mt-2">contact</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
