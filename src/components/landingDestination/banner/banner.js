import React from "react";
import "./banner.css";

export default function Banner() {
  return (
    <>
      <div className="container-fluid bannerBg ">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12 text-center text-white  mt-5">
              <p>
                “Allowing students to possess official artifacts of their
                education<br></br>
                would be a transformative accomplishment, with obvious use cases
                far beyond education.”
              </p>
              <p className="pb-3">-PC Magazine</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
