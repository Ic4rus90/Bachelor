import React from 'react';
import { Container } from 'react-bootstrap';
import HeaderAuthenticated from '../components/header-authenticated'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/logout-button'


export default function UserManagementPage() {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  //const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  
  

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div className="Dashboard">
        <HeaderAuthenticated /> 
        <header className="App-header">
          <Container fluid>
            <h1>Welcome to the Account Page</h1>
            Name: <h2>{user.name}</h2>
            Mail: <p>{user.email}</p>
            <p>You are user number {user.sub}. </p>
            <LogoutButton />
          </Container>
        </header>
      </div>
    )
  );
}