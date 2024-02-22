import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/header'
import { useAuth0 } from "@auth0/auth0-react";
import DashboardTabs from '../components/dashboard-tabs'


export default function Dashboard() {
  
  const { isAuthenticated, isLoading } = useAuth0();
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
            <h1>Your latest vulnerability report</h1>
            <Container>
            <DashboardTabs />
            </Container>
          </Container>
        </header>
      </div>
    )
  );
}