import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const { t } = useTranslation(); // Hook to access translation function
  return (
    <Navbar bg="danger" variant="danger" expand="lg">
      <Container>
        <Navbar.Brand href="https://fchip.org" target="_blank" rel="noopener noreferrer" className="text-white">FCHIP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/' className="text-white">{t('nav_bar.home')}</Nav.Link>
            <Nav.Link href="#pharmacy-search" className="text-white">{t('nav_bar.pharmacy')}</Nav.Link>
            <Nav.Link className="text-white">{t('nav_bar.provider')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;


