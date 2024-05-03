import React from 'react';
import { Container } from 'react-bootstrap';
import HeaderAuthenticated from '../components/header-authenticated'
import { useAuth0 } from "@auth0/auth0-react";
import DashboardTabs from '../components/dashboard-tabs'
import './dashboard-page.css'

// Component for displaying the Dashboard page for authenticated users
export default function Dashboard() {
  
  // Fetches user's authentication status
  const { isAuthenticated, isLoading } = useAuth0();
  console.log('Dashboard rendering', { isAuthenticated, isLoading });
  
  // Display loading message during authentication process
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // Show login prompt if user is not authenticated
  if (!isAuthenticated) {
    return <div>Please log in to view the dashboard.</div>;
  }

  // Render the dashboard page if the user is authenticated
  return (
    isAuthenticated && (
      <div className="Dashboard">
        <HeaderAuthenticated /> 
        <header className="App-header">
          <Container fluid>
            <Container>
              <DashboardTabs />
            </Container>
          </Container>
        </header>
      </div>
    )
  );
}