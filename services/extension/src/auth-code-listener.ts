import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

export function getAuthoritzationCode(): Promise<string> {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

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
            } else {
                // Reject the promise if no code is found
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('An error occured. Please try again.');
                reject(new Error('An error occured. Please try again.'));
            }
        });

        server.listen(3000, () => console.log('Listening for redirects on port 3000'));

        server.on('error', (err: Error) => {
            console.error('Server error:', err);
            reject(err);
        });
    });
}