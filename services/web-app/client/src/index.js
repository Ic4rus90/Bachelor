import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a root container where app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app component within the Auth0Provider
root.render(
  <Auth0Provider
    domain="security-seal.eu.auth0.com" // Auth0 domain
    clientId="VuzDCxivmpVSsXZC7VZSWZslwFzf0zXB" // Auth0 client ID
    authorizationParams={{
      redirect_uri: window.location.origin + '/dashboard', // Redirect URI after login
      audience: "https://the-seal-of-approval-API.com/v1/reports", // API identifier for permissions
      scope: "openid email profile"
    }}
    >
      <App /> {/*Main App component that contains the router and pages*/}
  </Auth0Provider>
);


reportWebVitals();
