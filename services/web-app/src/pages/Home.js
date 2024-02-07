import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import securityseal from './securityseal.png';
import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';


function LoginButton() {
  return (
    <Link to="/Login">
      <Button variant="secondary">
        Login
      </Button>
    </Link>
  );  
}

function RegisterButton() {
  return (
    <Link to="/register">
      <Button variant="secondary">
        Sign up
      </Button>
    </Link>
  );
}



export default function Home() {
  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <img src={securityseal} height={40}/>
        <Navbar.Brand href="#home">Security Seal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
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