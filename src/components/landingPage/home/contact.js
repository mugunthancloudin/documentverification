import React from "react";

export default function Contact() {
  return (
    <>
      <div className="container-fluid">
        <div className="container contactBg pt-5 pb-5 mb-5">
          <div className="row contactBg">
          <div className="col-lg-1">&nbsp;</div>
            <div className="col-lg-4">
              <h1 className="mt-1">Contact Us</h1>
              <p className="mt-2">Need to get in touch with us ? </p>
              <p className="contactP">
                Our team of certificate verification experts is at your service,
                ready to assist with any questions, concerns, or requests.
                Contact us for a thorough and professional approach to
                validating your credentials
              </p>
            </div>
            <div className="col-lg-1">&nbsp;</div>
            <div className="col-lg-5">
              <div className="card">
                <div className="card-body shadow-lg p-3 bg-body rounded" >

                  <div className="row ms-2  mt-3">
                    <div className="col-lg-5">First Name</div>
                    <div className="col-lg-6">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row ms-2  mt-3">
                    <div className="col-lg-5">Last Name</div>
                    <div className="col-lg-6">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row ms-2  mt-3">
                    <div className="col-lg-5">Email</div>
                    <div className="col-lg-6">
                      <input type="email"  className="form-control" />
                    </div>
                  </div>

                  <div className="row ms-2 mt-3">
                    <div className="col-lg-5">What can we help you with?</div>
                    <div className="col-lg-6">
                      <textarea className="w-90 form-control" />
                    </div>
                  </div>

                  <div className="row text-center mb-3 mt-3">
                    <div className="col-lg-6">&nbsp;</div>
                    <div className="col-lg-6">
                      <button className="contactButton  ps-5 pe-5 pt-2 pb-2 ">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
