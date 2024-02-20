import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import securityseal from '../pages/securityseal.png';

function AccountNavButton() {
  return (
    <Link to="/account">
      <Button variant="secondary">
        Account
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
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Link to="/dashboard">
                      <Button variant="none">
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/history">
                      <Button variant="none">
                        History
                      </Button>
                    </Link>
                  </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                      <AccountNavButton />
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
    );
  }
