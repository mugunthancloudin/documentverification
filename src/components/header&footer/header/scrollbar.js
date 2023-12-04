import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink as Link } from "react-router-dom";
import brandLogo from "../../../assets/header/logo.png";

export default function Scrollbar() {
  return (
    <Navbar className="navbar bg-secondary" sticky="top" expand="lg">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <div className="d-flex align-items-center">
            <img src={brandLogo} width={40} alt="Brand Logo" className="navlogo" />
            <h4 className="ms-3 mt-3">Doc  Verification</h4>
          </div>
        </Link>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example" className="justify-content-end fw-bold">
          <Nav className="justify-content-end">
            <NavLink to="/" text="Home" />
            <NavLink to="/owner" text="Owner" />
            <NavLink to="/verifier" text="Verifier" />
            <NavLink to="/company" text="Company" />
            <NavLink to="/candidate" text="Candidate" />
            <NavLink to="/contact" text="Contact us" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const NavLink = ({ to, text }) => (
  <Link to={to} className="nav-link fw-bold">
    <div className="glow-on-hover">{text}</div>
  </Link>
);
