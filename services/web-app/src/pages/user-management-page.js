import React from 'react';
import { Container, Card, ToggleButton, Button, Row, Col } from 'react-bootstrap';
import './user-management-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAuthenticated from '../components/header-authenticated'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/logout-button'



export default function UserManagementPage() {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  //const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  
  

  if (isLoading) {
    return <div className="loading">Loading ...</div>;
  }
  
  return (
    isAuthenticated && (
      <div className="dashboard">
        <HeaderAuthenticated />
        <Container className="my-4">
        <div className="user-card">
          <div className="user-header">
            <h1>{user.name}</h1>
          </div>
          <div className="user-body">
            <Row className="user-info-row">
              <Col xs={8}>Display Name</Col>
              <Col xs={4} className="text-end">
                <Button variant="outline-primary" size="sm">Edit</Button>
              </Col>
              <Col xs={12} className="user-info">{user.name}</Col>
            </Row>
            <Row className="user-info-row">
              <Col xs={8}>Email</Col>
              <Col xs={4} className="text-end">
                <Button variant="outline-primary" size="sm">Edit</Button>
              </Col>
              <Col xs={12} className="user-info">{user.email}</Col>
            </Row>
            <Row className="user-info-row">
              <Col xs={8}>Password</Col>
              <Col xs={4} className="text-end">
                <Button variant="outline-primary" size="sm">Change</Button>
              </Col>
              <Col xs={12} className="user-info">••••••••</Col>
            </Row>
          </div>
        </div>
      <LogoutButton />
    </Container>
      </div>
    )
  );
}