import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function VerifierHome() {


  
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="container">
          <div className="row text-white">
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3 "
              justify
            >
              <Tab eventKey="home" title="Not Verified">
                <div className="container">
                  <div className="row">
              <h1>mugunthan</h1>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile" title="Verified">
              <div className="container">
                  <div className="row">
              <h1>Subramani</h1>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="longer-tab" title="Canceled">
              <div className="container">
                  <div className="row">
              <h1>Rathna</h1>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
