import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import securityseal from '../pages/securityseal.png';

function UserButton() {
  return (
    <Link to="/usermanagement">
      <Button variant="secondary">
        Account management
      </Button>
    </Link>
  );
}

export default function Header() {
    return (
      <div className="App">
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container fluid>
              <img src={securityseal} height={40}/>
              <Navbar.Brand href="#home">Security Seal</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                  <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                      <UserButton />
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
    );
  }
