import { Container, Button, Nav, Navbar } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import securityseal from '../pages/securityseal.png';


function AccountNavButton() {
  return (
    <Link to="/account">
      <Button variant="outline-light">
        Account
      </Button>
    </Link>
  );
}

export default function HeaderAuthenticated() {
    return (
      <div className="App">
        <Navbar expand="lg" style={{ backgroundColor: '#21212B' }}  data-bs-theme="dark">
            <Container fluid>
              <img src={securityseal} height={40} alt="Security Seal Logo"/>
              <Navbar.Brand as={Link} to="/dashboard">Security Seal</Navbar.Brand>
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
