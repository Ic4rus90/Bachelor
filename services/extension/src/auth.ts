import * as vscode from 'vscode';
import axios from 'axios'; 

import { generateCodeVerifier, generateCodeChallenge } from './pkce';
import { getAuthoritzationCode } from './development-redirect-listener';

// This function starts the authentication process
async function authenticate(context: vscode.ExtensionContext) {
  // Generate a code verifier and code challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Create the authentication URL
  const authURL = `https://security-seal.eu.auth0.com/authorize?` +
    `response_type=code&` +
    'client_id=KNXjMEAsH8bpKUnZ1FN9ZA3rw1hU6lcj&' +
    'redirect_uri=http://localhost:3000/callback&' +
    'scope=openid%20profile%20email&' +
    `code_challenge=${codeChallenge}&` +
    'code_challenge_method=S256&' + 
    'state=ASDF2F2F2';

  // Open the authentication URL in the user's default web browser
  vscode.env.openExternal(vscode.Uri.parse(authURL));

  // Start a server to listen for the authentication response
  try {
    const authorizationCode = await getAuthoritzationCode();
    await exchangeCodeForTokens(authorizationCode, codeVerifier, context);

  } catch (err) {
    console.error('Error:', err);
    vscode.window.showErrorMessage('Error during authentication');
  }  
}


async function exchangeCodeForTokens(authorizationCode: string, codeVerifier: string, context: vscode.ExtensionContext): Promise<void> {
  const tokenURL = 'https://security-seal.eu.auth0.com/oauth/token';
  const clientID = 'KNXjMEAsH8bpKUnZ1FN9ZA3rw1hU6lcj';
  const redirectURI = 'http://localhost:3000/callback';
  
  try {
    const response = await axios.post(tokenURL, {
      grant_type: 'authorization_code',
      client_id: clientID,
      code_verifier: codeVerifier,
      code: authorizationCode,
      redirect_uri: redirectURI
    });

    const access_token = response.data.access_token;
    const id_token = response.data.id_token;
    const expires_in = response.data.expires_in;

    // Store the tokens in the user's environment
    await storeTokens(access_token, id_token, expires_in, context);
  }

  catch (error) {
    console.error('Error:', error);
  }
}


async function storeTokens(access_token: string, id_token: string, expires_in: number, context: vscode.ExtensionContext): Promise<void> {
    const expiry_timestamp = new Date().getTime() + expires_in * 1000;
  
    try {
    await context.secrets.store('security-seal-access-token', access_token);
    await context.secrets.store('security-seal-id-token', id_token);
    await context.secrets.store('security-seal-access-token-expiry', expiry_timestamp.toString());
    
  } catch (error) {
    console.error('Error:', error);
  }
}


async function isAccessTokenExpired(context: vscode.ExtensionContext): Promise<boolean> {
  const expiry_timestamp = await context.secrets.get('security-seal-access-token-expiry');
  
  if (!expiry_timestamp) {
    return true;
    }

    const expiry_time = parseInt(expiry_timestamp, 10);
    const current_time = new Date().getTime();

    console.log('The expiry time is:', expiry_time);
    console.log('The current time is:', current_time);

    return current_time >= expiry_time;
}


async function showAuthenticationPrompt(context: vscode.ExtensionContext): Promise<void> {
    const action = await vscode.window.showInformationMessage('You need to authenticate to use this feature.', 'Authenticate');
    if (action === 'Authenticate') {
        authenticate(context);
    }
}


export { authenticate, showAuthenticationPrompt, isAccessTokenExpired };
