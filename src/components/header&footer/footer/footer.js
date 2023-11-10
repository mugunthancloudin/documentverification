import React from "react";

export default function Footer() {
  return (
    <>
      <div className="container-fluid pb-4 bg-dark">
        <div className="container ">
          <div className="row pt-5 pb-2 text-white">
            <div className="col-lg-6">
              <div className="row">
                <h5>We also make emails</h5>
                <p>
                  Receive email updates on stuff you'll probabaly want to know
                  about,including products,launches, and events.Unsubscribe
                  anytime.
                </p>
              </div>
              <div className="row">
                <div className="col-lg-11">
                  <input
                    type="text"
                    placeholder="your email..."
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-4">
                  <h5>About Us</h5>
                  <h5>Into The Gloss</h5>
                  <h5>Return & Exchanges</h5>
                </div>

                <div className="col-lg-4">
                  <h5>Careers</h5>
                  <h5>Free Stuff</h5>
                  <h5>Help & Faq</h5>
                </div>

                <div className="col-lg-4">
                  <h5>Contact</h5>
                  <h5>Redeem Gift Carf</h5>
                </div>
              </div>
            </div>
          </div>
          <hr className="text-white"/>
          <div className="row text-white">
            <h5>2023 Doc Verifier. All Rights Reserved</h5>
          </div>
          <div className="row text-white ">
            <div className="col-lg-6 d-flex">
              <p className="col-lg-3">
                <u>Privacy Policy</u>
              </p>

              <p className="col-lg-3">
                <u>Terms Of Use</u>
              </p>

              <p className="col-lg-6">
                <u>Supply Chain Transperency</u>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
