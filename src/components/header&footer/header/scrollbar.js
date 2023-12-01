import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-scroll";
import brandLogo from "../../../assets/header/logo.png";
import { Navbar, Nav, Button, NavLink, NavbarToggle } from "react-bootstrap";
import { useAccount } from "wagmi";

// import * as blockchain from "../../../blockchain";

export default function Scrollbar() {
  const { address, isConnected } = useAccount();
  // console.log(address);
  // console.log(isConnected);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const checkConnectionState = getGlobalState("connectedAccount");
  //     if (isConnected) {
  //       await blockchain.isWallectConnected();
  //       const patientState = await blockchain.isPatient(address);
  //       setIspatient(patientState);

  //       if (ispatient === true) {
  //         try {
  //           let personal = await blockchain.getPatientPersonaldata(address);
  //           setPatientPersonal(personal);
  //           let medical = await blockchain.getPatientMedicaldata(address);
  //           setPatientMedical(medical);
  //           let healthDataCid = await blockchain.getPatientStoredData(address);
  //           setPatientHealthData(healthDataCid);
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       } else {
  //         console.log("Not a patient");
  //       }
  //     } else {
  //       setIspatient(false);
  //     }
  //   };

  //   fetchData();
  // }, [isConnected,address,ispatient]);

  return (
    <>
      <Navbar className="navbar bg-secondary" sticky="top" expand="lg">
        <Container >
          <NavLink href="/">
            <div className="d-flex">
              <img src={brandLogo} width={40} className="navlogo" />
              <h4 className="ms-3 mt-3 ">Document Verification</h4>
            </div>
          </NavLink>
          <NavbarToggle aria-controls="navbar-dark-example" />

          <Navbar.Collapse  id="navbar-dark-example"
            className="justify-content-end fw-bold   ">
            <Nav className="justify-content-end" navbarScroll>
              <NavLink href="/" className="fw-bold" duration={100}>
                <div className="glow-on-hover">Home</div>
              </NavLink>

              <NavLink href="/owner" className="fw-bold" duration={200}>
                <div className="glow-on-hover">Owner</div>
              </NavLink>

              <NavLink href="/verifier" className="fw-bold" duration={300}>
                <div className="glow-on-hover">Verifier</div>
              </NavLink>

              <NavLink href="/company" className="fw-bold" duration={400}>
                <div className="glow-on-hover">Company</div>
              </NavLink>

              <NavLink href="/candidate" className="fw-bold" duration={500}>
                <div className="glow-on-hover">Candidate</div>
              </NavLink>

              <NavLink href="/contact" className="fw-bold" duration={600}>
                <div className="glow-on-hover">Contact us</div>
              </NavLink>
            </Nav>
          </Navbar.Collapse>

          {/* <Navbar.Collapse className="justify-content-end">
            <Nav className="me-2">
              <w3m-button />
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
}
