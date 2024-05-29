import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="danger" variant="danger" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="text-white">FCHIP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-white">Home</Nav.Link>
            <Nav.Link href="#pharmacy-search" className="text-white">Pharmacy Search</Nav.Link>
            <Nav.Link href="#provider-search" className="text-white">Provider Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;


