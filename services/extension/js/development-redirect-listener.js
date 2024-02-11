const http = require ('http');
const url = require ('url');

function startRedirectListener() {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true); // Parse the request URL
            const { query } = parsedUrl;

            // Check for the authorization code in the query parameters
            if (query.code) {
                const authorizationCode = query.code;

                // Close the server
                server.close();

                // Send a response to the user
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('Authentication successful! You can close this tab.');

                // Resolve the promise with the authorization code
                resolve(authorizationCode);
            } else {
                // Reject the promise if no code is found
                reject(new Error('Authorization code not found in the redirect'));
            }
        });

        // Start listening on a port
        server.listen(3000, () => console.log('Listening for redirects on port 3000'));

        server.on('error', (err) => {
            console.error('Server error:', err);
            reject(err);
        });
    });
}

module.exports = { startRedirectListener };