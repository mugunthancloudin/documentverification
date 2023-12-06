import React from "react";
import "./navbar.css";
import { Container, Nav, Navbar, NavLink, NavbarToggle } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import brandLogo from "../../../assets/header/logo.png";

export default function Headerbar() {
  return (
    <>
      <Navbar className="navbar" sticky="top" expand="lg">
        <Container>
          <NavLink href="/">
            <div className="d-flex">
              <img src={brandLogo} width={40} className="navlogo" />
              <h4 className="ms-3 mt-3 ">Document Verification</h4>
            </div>
          </NavLink>

          <NavbarToggle aria-controls="navbar-dark-example" />

          <NavbarCollapse
            id="navbar-dark-example"
            className="justify-content-end fw-bold   "
          >
            <Nav>
              <NavLink href="/">
                <div className="glow-on-hover">Home</div>
              </NavLink>

              <NavLink href="/owner">
                <div className="glow-on-hover">Owner</div>
              </NavLink>

              <NavLink href="/verifier">
                <div className="glow-on-hover">Verifier</div>
              </NavLink>

              <NavLink href="/company">
                <div className="glow-on-hover">Company</div>
              </NavLink>

              <NavLink href="/candidate">
                <div className="glow-on-hover">Candidate</div>
              </NavLink>

              <NavLink href="/contact">
                <div className="glow-on-hover">Contact US</div>
              </NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
