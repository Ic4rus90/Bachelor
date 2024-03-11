import React from 'react';
import { Container } from 'react-bootstrap';
import HeaderAuthenticated from '../components/header-authenticated'
import { useAuth0 } from "@auth0/auth0-react";
import DashboardTabs from '../components/dashboard-tabs'
import './dashboard-page.css'


export default function Dashboard() {
  
  const { isAuthenticated, isLoading } = useAuth0();
  console.log('Dashboard rendering', { isAuthenticated, isLoading });
  

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    // Optionally redirect to login or show a message
    return <div>Please log in to view the dashboard.</div>;
  }

  
  return (
    isAuthenticated && (
      <div className="Dashboard">
        <HeaderAuthenticated /> 
        <header className="App-header">
          <Container fluid>
            <Container>
              {/*<h1 className="dashboard-title">Latest security scan results</h1>*/}
              <DashboardTabs />
            </Container>
          </Container>
        </header>
      </div>
    )
  );
}