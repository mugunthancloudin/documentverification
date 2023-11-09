import React from "react";

export default function VerificationSubmit() {
  return (
    <>
      <div className="container-fluid verifyBg">
        <div className="container pt-5 pb-5">
          <div className="row text-center">
            <h1>Enter the Roll Number or the Certificate ID</h1>
            <div className="row mt-3">
              <div className="col-lg-4">&nbsp;</div>
              <div className="col-lg-4 d-flex">
                <div className="col-lg-4">
                  <h4>Roll No:</h4>
                </div>
                <div className="col-lg-">
                  <input type="number" className="form-control" />
                </div>
              </div>
              <div className="col-lg-4">&nbsp;</div>
            </div>
            <button className="btn btn-primary verifySubmitButton mt-3 pt-2 pb-2">
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
