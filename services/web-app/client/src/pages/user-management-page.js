import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './user-management-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAuthenticated from '../components/header-authenticated'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/logout-button'
import { PersonCircle } from 'react-bootstrap-icons';


// Component for displaying the user management (account) page
export default function UserManagementPage() {
  
  // Fetches user data and authentication status from Auth0
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Display loading message during authentication process
  if (isLoading) {
    return <div className="loading">Loading ...</div>;
  }

  // Render the user management page if the user is authenticated
  return (
    isAuthenticated && (
      <div className="dashboard" style={{ height: '100vh', overflow: 'hidden' }}>
      <HeaderAuthenticated />
      <header className="App-header">
        <Container fluid className="my-4">
          <div style={{maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ color: '#fff', marginBottom: '2rem', marginLeft: '0.3rem', textAlign: 'left', fontSize:30 }}> 
          <PersonCircle size={60} style={{marginRight: '1rem'}}/>
          Your Account
          </h1>
            <Card style={{backgroundColor: '#21212B', color: '#FFFFFF', padding: '20px', borderRadius: '8px'}}>
              <Card.Body>
                <Row className="align-items-center" style={{marginBottom: '2rem'}}>
                  <Col style={{textAlign: 'left', paddingRight: '0',}}>
                    <div style={{fontSize: '0.9rem', color: '#ADB5BD', marginBottom: '0.5rem'}}>Email</div>
                    <div>{user.email}</div> {/*Displays user's email*/}
                  </Col>
                  <Col xs="auto" style={{textAlign: 'right', paddingLeft: '0', }}>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col style={{textAlign: 'left', paddingRight: '0',}}>
                    <div style={{fontSize: '0.9rem', color: '#ADB5BD', marginBottom: '0.5rem'}}>Password</div>
                    <div>••••••••</div>
                  </Col>
                  <Col xs="auto" style={{textAlign: 'right', paddingLeft: '0', }}>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem', 
            display: 'flex', 
            justifyContent: 'center',
            gap: '40px' 
          }}>
            <LogoutButton />  
            <a href="mailto:thomasnw@uia.no?subject=Request%20Account%20Deletion" class="delete-account-button">Request Account Deletion</a> {/*Opens an email draft to request account deletion*/}
          </div>
        </Container>
      </header>
    </div>
    )
  );
}