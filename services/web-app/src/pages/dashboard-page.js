import React from 'react';
import { Container } from 'react-bootstrap';
import HeaderAuthenticated from '../components/header-authenticated'
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('Dashboard rendering', { isAuthenticated, isLoading });

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div className="Dashboard">
        <HeaderAuthenticated /> 
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