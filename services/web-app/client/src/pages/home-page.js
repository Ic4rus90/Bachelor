import React from 'react';
import '../App.css';
import securityseal from './securityseal.png';
import { Container } from 'react-bootstrap';
import HeaderNotAuthenticated from '../components/header-not-authenticated'





export default function HomePage() {
  return (
    <div className="App">
      <HeaderNotAuthenticated />
      <header className="App-header">
        <Container fluid style={{ marginTop: '40px' }}>
          <img src={securityseal} className="App-logo" alt="Security Seal Logo"/>
          <h1 style={{ marginBottom: '30px' }} >Welcome to Security Seal</h1>
          <h5>Will your code get our Seal of Approval?</h5>
        </Container>
      </header>
    </div>
  );
}