import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './user-management-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAuthenticated from '../components/header-authenticated'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/logout-button'
import { PersonCircle } from 'react-bootstrap-icons';



export default function UserManagementPage() {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  //const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  
  

  if (isLoading) {
    return <div className="loading">Loading ...</div>;
  }

  const cardStyle = {
    backgroundColor: '#21212B',
    color: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px'
  };

  const labelStyle = {
    fontSize: '0.9rem',
    color: '#ADB5BD',
    marginBottom: '0.5rem'
  };

  const contentStyle = {
    marginBottom: '2rem'
  };

  const cardContainerStyle = {
    maxWidth: '600px', // Adjust the max-width as needed
    margin: '0 auto' // This centers the card in the middle of the page
  };

  const contentColumnStyle = {
    textAlign: 'left', // This ensures that the text aligns to the left
    paddingRight: '0', // This removes padding to the right of the column, if desired
  };

  const buttonColumnStyle = {
    textAlign: 'right', // This ensures that the buttons align to the right
    paddingLeft: '0', // This removes padding to the left of the button column, if desired
  };

  
  
  return (
    isAuthenticated && (
      <div className="dashboard" style={{ height: '100vh', overflow: 'hidden' }}>
      <HeaderAuthenticated />
      <header className="App-header">
        <Container fluid className="my-4">
          <div style={cardContainerStyle}>
          <h1 style={{ color: '#fff', marginBottom: '2rem', marginLeft: '0.3rem', textAlign: 'left', fontSize:30 }}> 
          <PersonCircle size={60} style={{marginRight: '1rem'}}/>
          Your Account
          </h1>
            <Card style={cardStyle}>
              <Card.Body>
              <Row className="align-items-center" style={contentStyle}>
                <Col style={contentColumnStyle}>
                  <div style={labelStyle}>Email</div>
                  <div>{user.email}</div>
                </Col>
                <Col xs="auto" style={buttonColumnStyle}>
                  {/*<Button className="custom-button" size="sm" style={buttonStyle}>Edit</Button>*/}
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col style={contentColumnStyle}>
                  <div style={labelStyle}>Password</div>
                  <div>••••••••</div>
                </Col>
                <Col xs="auto" style={buttonColumnStyle}>
                  {/*<Button className="custom-button" size="sm" style={buttonStyle}>Change</Button>*/}
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
            gap: '40px' /* This adds 20px of space between any flex items */
          }}>
            <LogoutButton />  
            <a href="mailto:thomasnw@uia.no?subject=Request%20Account%20Deletion" class="delete-account-button">Request Account Deletion</a>
          </div>
        </Container>
      </header>
    </div>
    )
  );
}