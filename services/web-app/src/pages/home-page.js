import React from 'react';
import '../App.css';
import securityseal from './securityseal.png';
import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};


const RegisterButton = () => {
  const { loginWithRedirect } = useAuth0();

  const HandleRegistration = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: origin,
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button onClick={HandleRegistration}>Register</Button>
  );
};


export default function HomePage() {
  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <img src={securityseal} height={40}/>
        <Navbar.Brand href="/">Security Seal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">
              <Button variant="none">
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="none">
                About
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
                <LoginButton />
                <RegisterButton />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <header className="App-header">
        <Container fluid>
          <img src={securityseal} className="App-logo" />
          <h1>Welcome to Security Seals home page!</h1>
        </Container>
      </header>
    </div>
  );
}