import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-scroll";
import brandLogo from "../../../assets/header/verificationLogo.jpg";

import { Navbar, Nav, Button, NavLink } from "react-bootstrap";
// import * as blockchain from "../../../blockchain";


export default function Scrollbar() {
  // const { address, isConnected } = useAccount();
  // const [ownerAddress, setOwnerAddress] = useState("");
  // const { chain } = useNetwork();

  // useState(() => {
  //   if (isConnected) {
  //     setGlobalState("connectedAccount", isConnected);
  //   }
  // }, [isConnected]);

  // const { data } = useBalance({
  //   address: address,
  // });

  // const { openAccountModal } = useAccountModal();

  // const { openConnectModal } = useConnectModal();

  // const { openChainModal } = useChainModal();

  // const [connectedAccount] = useGlobalState("connectedAccount");

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const checkConnectionState = getGlobalState("connectedAccount");
  //       if (isConnected) {
  //         await blockchain.isWallectConnected();
  //         const ownerAddress = await blockchain.getContractOwner();
  //         setOwnerAddress(ownerAddress.toLowerCase());
  //       }
  //     } catch (error) {}
  //   }
  //   fetchData();
  // }, [isConnected]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
        <Container fluid>
          <NavLink href="/">
            <div className="d-flex">
              <img src={brandLogo} width={40} className="navlogo" />
              <h4 className="ms-3 mt-3 ">Document Verification</h4>
            </div>
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav className="justify-content-end" navbarScroll>
              <Nav.Link as={Link} to="action1" smooth={true} duration={100}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="action2" smooth={true} duration={200}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="action3" smooth={true} duration={300}>
                Owner
              </Nav.Link>
              <Nav.Link as={Link} to="action4" smooth={true} duration={400}>
                Doctor
              </Nav.Link>
              <Nav.Link as={Link} to="action5" smooth={true} duration={500}>
                Patient
              </Nav.Link>
              <Nav.Link as={Link} to="action6" smooth={true} duration={600}>
                Contact us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-2">
              <w3m-button />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
