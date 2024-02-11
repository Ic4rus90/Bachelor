"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCodeChallenge = exports.generateCodeVerifier = void 0;
const crypto_1 = require("crypto");
// Encode a string to base64 encoding, replacing + with -, / with _ and = with '', following the base64url specifications
function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
function generateCodeVerifier() {
    // Generate a secure random string to be used as the code_verifier
    const verifier = base64URLEncode((0, crypto_1.randomBytes)(32));
    console.log(`The code verifier is ${verifier}`);
    return verifier;
}
exports.generateCodeVerifier = generateCodeVerifier;
function generateCodeChallenge(verifier) {
    // Generate the code challenge by hashing the code verifier with SHA256
    const sha256Hashing = (code_verifier) => {
        return (0, crypto_1.createHash)('sha256').update(code_verifier).digest();
    };
    // Encode the code challenge to base64url encoding
    const code_challenge = base64URLEncode(sha256Hashing(verifier));
    console.log(`The code challenge is ${code_challenge}`);
    return code_challenge;
}
exports.generateCodeChallenge = generateCodeChallenge;
//# sourceMappingURL=pkce.js.map