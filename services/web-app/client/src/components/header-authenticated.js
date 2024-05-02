import { Container, Button, Nav, Navbar } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import securityseal from '../pages/securityseal.png';
import { PersonCircle } from 'react-bootstrap-icons';

// Component for rendering the account navigation button
function AccountNavButton() {
  return (
    <Link to="/account">
      <Button variant="none" style={{ padding: 0, border: 'none', backgroundColor: 'transparent', marginRight: '8px' }}>
        <PersonCircle size={35}/>
      </Button>
    </Link>
  );
}

// Header component for authenticated users
export default function HeaderAuthenticated() {
  return (
    <div className="App">
      <Navbar expand="lg" style={{ backgroundColor: '#21212B' }}  data-bs-theme="dark">
          <Container fluid>
            <img src={securityseal} height={40} alt="Security Seal Logo"/>
            <Navbar.Brand as={Link} to="/dashboard" style={{ color: 'white' }}>Security Seal</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link to="/dashboard">
                    <Button variant="none" style={{ color: 'white' }}>
                      Dashboard
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
