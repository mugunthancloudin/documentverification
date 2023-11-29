import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-scroll";
import brandLogo from "../../../assets/header/verificationLogo.jpg";
import { Navbar, Nav, Button, NavLink } from "react-bootstrap";
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
      <Navbar expand="lg" className="text-white " sticky="top">
        <Container fluid>
          <NavLink href="/">
            <div className="d-flex">
              <img src={brandLogo} width={40} className="navlogo" />
              <h4 className="ms-3 mt-3 ">Document Verification</h4>
            </div>
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav className="justify-content-end " navbarScroll>
              <Nav.Link as={Link} className="text-white fw-bold" to="action1" smooth={true} duration={100}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} className="text-white fw-bold" to="action2" smooth={true} duration={200}>
                Owner
              </Nav.Link>
              <Nav.Link as={Link} className="text-white fw-bold" to="action3" smooth={true} duration={300}>
                Verifier
              </Nav.Link>
              <Nav.Link as={Link} className="text-white fw-bold" to="action4" smooth={true} duration={400}>
                Company
              </Nav.Link>
              <Nav.Link as={Link} className="text-white fw-bold" to="action5" smooth={true} duration={500}>
                Candidate
              </Nav.Link>
              <Nav.Link as={Link} className="text-white fw-bold" to="action6" smooth={true} duration={600}>
                Contact us
              </Nav.Link>
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
