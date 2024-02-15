import { randomBytes, createHash } from 'crypto';
 
// Encode a string to base64 encoding, replacing + with -, / with _ and = with '', following the base64url specifications
function base64URLEncode(str: Buffer): string {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
  }
  
  function generateCodeVerifier() {
    // Generate a secure random string to be used as the code_verifier
    const verifier: string = base64URLEncode(randomBytes(32));
    return verifier;
  }


  function generateCodeChallenge(verifier: string): string {
    // Generate the code challenge by hashing the code verifier with SHA256
    const sha256Hashing = (code_verifier: string) => {
      return createHash('sha256').update(code_verifier).digest();
    };
    
    // Encode the code challenge to base64url encoding
    const code_challenge = base64URLEncode(sha256Hashing(verifier));
    
    return code_challenge;
  }

  export { generateCodeVerifier, generateCodeChallenge };