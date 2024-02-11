const vscode = require('vscode');
const axios = require('axios'); 

const { generateCodeVerifier, generateCodeChallenge } = require('./pkce');
const { startRedirectListener } = require('./development-redirect-listener');

async function authenticate() {
  // Generate a code verifier and code challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

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
    const authorizationCode = await startRedirectListener();
    console.log(`The authorization code is ${authorizationCode}`);
    exchangeCodeForTokens(authorizationCode, codeVerifier);
    // return authorizationCode;
  } catch (err) {
    console.error('Error:', err);
    vscode.window.showErrorMessage('Error during authentication');
  }

  
}

async function exchangeCodeForTokens(authorizationCode, codeVerifier) {
  console.log('Exchanging the authorization code for tokens')
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

    console.log('The access token is:', access_token);
    console.log('The ID token is:', id_token);

    // Store the tokens in the user's environment
    await storeTokens(access_token, id_token);
  }

  catch (error) {
    console.error('Error:', error);
  }
}

async function storeTokens(access_token, id_token) {
  await vscode.secrets.store('security-seal-access-token', access_token);
  await vscode.secrets.store('security-seal-id-token', id_token);
}

function userIsSignedIn() {
  const access_token = vscode.secrets.get('security-seal-access-token');
  
  if (access_token) {
    return true;
  } else {
    return false;
  }
}

module.exports = { authenticate, userIsSignedIn };
