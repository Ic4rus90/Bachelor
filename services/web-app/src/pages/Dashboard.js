import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Header from '../components/Header'

export default function Dashboard() {
    return (
      <div className="Dashboard">
        <Header />
        <header className="App-header">
        <Container fluid>
          <h1>Welcome to the Dashboard Page</h1>
        </Container>
      </header>
      </div>
    );
  }