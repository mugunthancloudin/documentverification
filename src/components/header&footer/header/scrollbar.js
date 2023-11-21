import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from 'react-scroll';
import brandLogo from "../../../assets/header/verificationLogo.jpg";
import { useAccount } from "wagmi";

import { Navbar, Nav, Button,NavLink } from "react-bootstrap";
// import { truncate, useGlobalState } from "../../../store";
// import { useAccount, useBalance, useNetwork } from "wagmi";
// import "reactjs-popup/dist/index.css";
// import * as blockchain from "../../../services/Blockchain";
// import { getGlobalState, setGlobalState } from "../../../store";
// import {
//   useConnectModal,
//   useAccountModal,
//   useChainModal,
// } from "@rainbow-me/rainbowkit";

export default function Scrollbar() {
  const { address, isConnected } = useAccount();
  // const [injectAmount, setInjectAmount] = useState(0);
  // const [balance, setBalance] = useState();
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
              <Nav.Link as={Link} to="action1" smooth={true} duration={100}>Home</Nav.Link>
              <Nav.Link as={Link} to="action2" smooth={true} duration={200}>About</Nav.Link>
              <Nav.Link as={Link} to="action3" smooth={true} duration={300}>Owner</Nav.Link>
              <Nav.Link as={Link} to="action4" smooth={true} duration={400}>Doctor</Nav.Link>
              <Nav.Link as={Link} to="action5" smooth={true} duration={500}>Patient</Nav.Link>
              <Nav.Link as={Link} to="action6" smooth={true} duration={600}>Contact us</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* <Navbar.Collapse className="justify-content-end">
            <Nav className="me-2">
              <div className="justify-content-end d-flex mt-1">
                {openAccountModal && (
                  <button
                    className=" classicButton1 mt-2"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {truncate(address, 4, 4, 10)}
                  </button>
                )}
                {openConnectModal && (
                  <button
                    className={`ms-3 mt-2  classicButton1`}
                    onClick={openAccountModal || openConnectModal}
                    type="button"
                  >
                    {openAccountModal ? "Wrong network     " : "Connect"}
                  </button>
                )}

                {isConnected && chain.unsupported && openChainModal && (
                  <button onClick={openChainModal} type="button">
                    Wrong Network
                  </button>
                )}
              </div>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
}
