import * as vscode from 'vscode';
import axios from 'axios'; 

import { generateCodeVerifier, generateCodeChallenge } from './pkce';
import { getAuthoritzationCode } from './auth-code-listener';



// This interface defines the shape of the tokens returned by the authentication server
interface AuthTokens {
  access_token: string;
  id_token: string;
  expires_in: number;
}


// This function authenticates the user and stores the tokens in the context.secrets
async function authenticate(context: vscode.ExtensionContext) {

  // Generate a code verifier and a code challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Create the authentication URL
  // TODO: Remove the hardcoded client_id and redirect_uri, and place them in a configuration file
  const authURL = `https://security-seal.eu.auth0.com/authorize?` + 
    `response_type=code&` + 
    'client_id=KNXjMEAsH8bpKUnZ1FN9ZA3rw1hU6lcj&' + 
    'redirect_uri=http://localhost:3000/callback&' + 
    'scope=openid%20profile%20email&' + 
    `code_challenge=${codeChallenge}&` + 
    'audience=https://the-seal-of-approval-API.com/v1/reports&' +
    'code_challenge_method=S256&' + 
    'state=ASDF2F2F2';
    // Possibly change state

  // Open the authentication URL in the user's default web browser
  vscode.env.openExternal(vscode.Uri.parse(authURL));

  try {
    // Start a server to listen for and get the authorization code. 
    const authorizationCode = await getAuthoritzationCode();

    // Exchange the authorization code for tokens
    const tokens = await exchangeCodeForTokens(authorizationCode, codeVerifier, context);
    
    // Store the tokens in context.secret
    await storeTokens(tokens, context);

  } catch (err) {
    console.error('Error:', err);
    vscode.window.showErrorMessage('Error during authentication');
  }  
}


// Exchanges the authorization code for tokens
async function exchangeCodeForTokens(authorizationCode: string, codeVerifier: string, context: vscode.ExtensionContext): Promise<AuthTokens> {
  const tokenURL = `${process.env.TOKEN_URL}`; // 'https://security-seal.eu.auth0.com/oauth/token';
  const clientID = `${process.env.CLIENT_ID}`; //'KNXjMEAsH8bpKUnZ1FN9ZA3rw1hU6lcj';
  const redirectURI = `${process.env.REDIRECT_URI}`; //'http://localhost:3000/callback';

  try {
    // Send a POST request to the token endpoint
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


    return {access_token, id_token, expires_in};
  }

  catch (error) {
    console.error('Error:', error);
    throw new Error(`Failed to exchange code for tokens: ${error}`);
  }
}


async function storeTokens(tokens: AuthTokens, context: vscode.ExtensionContext): Promise<void> {
    const access_token = tokens.access_token;
    const id_token = tokens.id_token;
    const expires_in = tokens.expires_in;
    
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

    // Delete token if expired
    if (current_time >= expiry_time){
      context.secrets.delete('security-seal-access-token-expiry');
      context.secrets.delete('security-seal-access-token');
      context.secrets.delete('security-seal-id-token');
      return true;
    } else {
      return false;
    }
}


async function showAuthenticationPrompt(context: vscode.ExtensionContext): Promise<void> {
    const action = await vscode.window.showInformationMessage('You need to authenticate to use this feature.', 'Authenticate');
    if (action === 'Authenticate') {
        authenticate(context);
    }
}


export { authenticate, showAuthenticationPrompt, isAccessTokenExpired };
