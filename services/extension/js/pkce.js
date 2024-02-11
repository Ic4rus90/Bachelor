const crypto = require('crypto');
 
// Encode a string to base64 encoding, replacing + with -, / with _ and = with '', following the base64url specifications
function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
  }
  
  function generateCodeVerifier() {
    // Generate a secure random string to be used as the code_verifier
    verifier = base64URLEncode(crypto.randomBytes(32));
    console.log(`The code verifier is ${verifier}`);
    return verifier;
  }


  function generateCodeChallenge(verifier) {
    // Generate the code challenge by hashing the code verifier with SHA256
    function sha256Hashing(code_verifier) {
      return crypto.createHash('sha256').update(code_verifier).digest();
    }
    
    // Encode the code challenge to base64url encoding
    var code_challenge = base64URLEncode(sha256Hashing(verifier));
    
    console.log(`The code challenge is ${code_challenge}`);
    return code_challenge;
  }

  module.exports = { generateCodeVerifier, generateCodeChallenge };