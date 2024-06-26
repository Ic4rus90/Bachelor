import { encodeToBase64 } from "./convert-to-base64";
import * as vscode from 'vscode';
import { decodeFromBase64 } from "./convert-to-base64";



// Helper function for formatting each vulnerability
function formatVulnerability(vuln: { cweID: string; codeExtract: string; vulnSummary: string }): string {
    const decoded_code = vuln.codeExtract;
    const decoded_cweID = vuln.cweID;
    const decoded_summary = vuln.vulnSummary; 
	return `${decoded_cweID}: ${decoded_summary}\n${decoded_code}\n\n`;
}

// Might need to change the return type of this function
async function getAnalyzedCode(code: string, file_extension: string, line_number: number, token: string): Promise<string> {
    const data = {
        code: encodeToBase64(code),
        file_extension: file_extension,
        line_number: line_number
    };

    // This allows self-signed https certificated. Required since our application is self-hosted on UiA's domain.
    // We do not have access to retrieve an officially signed certificate.
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


    // Define the URL to send the request to
    const url = 'https://cair-gpu12.uia.no:8500/analyze-code/';

    // Abort controller instance for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        // Abort the fetch request if it takes too long (5 minutes)
        controller.abort();
    }, 300000); // 300 seconds

    // Set up a timer to display a message after 120 seconds
    const heavyLoadTimeout = setTimeout(() => {
        vscode.window.showInformationMessage('The server is experiencing heavy loads. Your request is still being processed.');
    }, 120000); // 120 seconds

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal: controller.signal, // Passing the AbortController signal
        });

        // Clear the timeouts when request is complete
        clearTimeout(timeout); 
        clearTimeout(heavyLoadTimeout);

        if (!response.ok) {
            switch (response.status) {
                case 401: 
                    throw new Error('Invalid token received');
                case 400: 
                    throw new Error('Invalid code received');
                case 422:
                    throw new Error('Invalid file extension received');
                case 418:
                    throw new Error('The code sent for analysis is too long. Please try again with a smaller code snippet.');
                case 429:
                    throw new Error('You have exceeded the rate limit. Please try again in a few minutes.');
                default:
                    throw new Error('Server error occured. Please contact us for assistance');
            }
        } 

        // Read response body as text
        const responseBody = await response.text();
        
        // Decode from base64 to utf-8
        const decodedReport = Buffer.from(responseBody, 'base64').toString('utf-8');
        //Buffer.from(responseBody, 'base64').toString('utf-8');
        
        // Convert JSON to vulnerability format
        const reportJson: {
            vulnerabilities: Array<{ 
                cweID: string;
                codeExtract: string;
                vulnSummary: string; 
            }> } = JSON.parse(decodedReport);

        if (reportJson.vulnerabilities.length === 0) {
            return 'Congratulations, your code looks squeaky clean.\nYou get a seal of approval.';
        }
        
        // Format output
        const vulnerabilityMessage = 'Security Seal found vulnerabilities in your code:\n\n';
        const formattedVulnerabilities  = reportJson.vulnerabilities.map(formatVulnerability).join('');

        return vulnerabilityMessage + formattedVulnerabilities;

    } catch (error: unknown) {
        // Clear the timeouts when request fails
        clearTimeout(timeout);
        clearTimeout(heavyLoadTimeout);
        
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                // Handle the timeout
                console.error('Request timed out');
                //vscode.window.showErrorMessage('Request timed out. Please try again.');
                throw new Error('Request timed out');
            } else {
                console.error('Error:', error);
                //vscode.window.showErrorMessage(`Error: ${error}`);
                throw error;
            }
        } else {
            console.error('Unknown error:', error);
            throw error;
        }
    }
}

export { getAnalyzedCode };
