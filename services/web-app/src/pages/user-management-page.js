import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Header from '../components/header'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/logout-button'


export default function UserManagementPage() {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('Dashboard rendering', { isAuthenticated, isLoading });

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div className="Dashboard">
        <Header /> 
        <header className="App-header">
          <Container fluid>
            <h1>Welcome to the Account Page</h1>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>You are user number {user.sub}. </p>
            <LogoutButton />
          </Container>
        </header>
      </div>
    )
  );
}