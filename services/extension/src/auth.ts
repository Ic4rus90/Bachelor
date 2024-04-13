import * as vscode from 'vscode';
import axios from 'axios'; 
import { randomBytes } from 'crypto';
import * as dotenv from 'dotenv';

import { generateCodeVerifier, generateCodeChallenge } from './pkce';
import { getAuthoritzationCode } from './auth-code-listener';


dotenv.config({ path: '../.env' });


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
  const state = generateState(); 

  // Create the authentication URL
  // TODO: Remove the hardcoded client_id and redirect_uri, and place them in a configuration file
  const authURL = `https://security-seal.eu.auth0.com/authorize?` + 
    `response_type=code&` + 
    `client_id=${process.env.CLIENT_ID}&` + 
    `redirect_uri=${process.env.REDIRECT_URI}&` + 
    'scope=openid%20profile%20email&' + 
    `code_challenge=${codeChallenge}&` + 
    `audience=${process.env.AUDIENCE}&` +
    'code_challenge_method=S256&' + 
    `state=${state}`;

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

function generateState(): string {
  return randomBytes(16).toString('hex');
}


// Exchanges the authorization code for tokens
async function exchangeCodeForTokens(authorizationCode: string, codeVerifier: string, context: vscode.ExtensionContext): Promise<AuthTokens> {
  const tokenURL = 'https://security-seal.eu.auth0.com/oauth/token';
  const clientID = `${process.env.CLIENT_ID}`;
  const redirectURI = `${process.env.REDIRECT_URI}`;

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
    throw new Error(`Authentication failed: ${error}`);
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
