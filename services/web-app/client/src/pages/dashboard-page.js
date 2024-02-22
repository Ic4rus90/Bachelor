import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Header from '../components/header'
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('Dashboard rendering', { isAuthenticated, isLoading });

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    // Optionally redirect to login or show a message
    return <div>Please log in to vie the dashboard.</div>;
  }
  return (
    isAuthenticated && (
      <div className="Dashboard">
        <Header /> 
        <header className="App-header">
          <Container fluid>
            <h1>Welcome to the Dashboard Page</h1>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </Container>
        </header>
      </div>
    )
  );
}