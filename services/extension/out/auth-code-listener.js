"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthoritzationCode = void 0;
const http = __importStar(require("http"));
function getAuthoritzationCode() {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            // Construct the full URL from req
            if (!req.url) {
                reject(new Error("Request URL is undefined"));
                return;
            }
            const baseUrl = 'http://localhost:3000';
            const fullUrl = new URL(req.url, baseUrl);
            // Use the URL searchParams API to extract query parameters
            const authorizationCode = fullUrl.searchParams.get('code');
            // If the authorization code is found, close the server and resolve the promise
            if (authorizationCode) {
                // Close the server
                server.close();
                // Send a response to the user
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('Authentication successful! You can close this tab.');
                // Resolve the promise with the authorization code
                resolve(authorizationCode);
            }
            else {
                // Reject the promise if no code is found
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('Authorization code not found in the redirect');
                reject(new Error('Authorization code not found in the redirect'));
            }
        });
        server.listen(3000, () => console.log('Listening for redirects on port 3000'));
        server.on('error', (err) => {
            console.error('Server error:', err);
            reject(err);
        });
    });
}
exports.getAuthoritzationCode = getAuthoritzationCode;
//# sourceMappingURL=auth-code-listener.js.map