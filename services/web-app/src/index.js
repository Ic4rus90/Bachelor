import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
  domain="security-seal.eu.auth0.com"
  clientId="sl630MwBKRDU2nMatpHntgoSBnmSVAOi"
  authorizationParams={{
    redirect_uri: window.location.origin + '/profile'
  }} 
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
