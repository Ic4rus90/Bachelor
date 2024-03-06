import { encodeToBase64 } from "./convert-to-base64";
import * as vscode from 'vscode';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

declare const __dirname: string;

dotenv.config({
    path: resolve(__dirname, '/../.env')
});

interface Vulnerability {
	vulnerabilities: Array <{
		cweID: string;
		codeExtract: string;
		vulnSummary: string
	}>;
}

// Helper function for formatting each vulnerability
function formatVulnerability(vuln: { cweID: string; codeExtract: string; vulnSummary: string }): string {
	return `${vuln.cweID}
			${vuln.vulnSummary}
			Vulnerable code: ${vuln.codeExtract}

			`;
}

// Might need to change the return type of this function
async function getAnalyzedCode(code: string, file_extension: string, token: string): Promise<string> {
    const data = {
        code: encodeToBase64(code),
        file_extension: file_extension,
    };

    // Define the URL to send the request to
    const url = 'http://cair-gpu12.uia.no:30000/analyze-code/';

    // Abort controller instance for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        // Abort the fetch request if it takes too long
        controller.abort();
    }, 210000);

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

        clearTimeout(timeout); // Clear the timeout when the response is received

        if (!response.ok) {
            switch (response.status) {
                case 401: 
                    throw new Error('Invalid token received');
                case 400: 
                    throw new Error('Invalid code received');
                case 422:
                    throw new Error('Invalid file extension received');
                default:
                    throw new Error('Server error occured. Please contact us for assistance');
            }
        } 

        const vulnerability_data: Vulnerability = await response.json() as Vulnerability;

        const formatted  = vulnerability_data.vulnerabilities.map(formatVulnerability).join('');

        return formatted;

    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                // Handle the timeout
                console.error('Request timed out');
                vscode.window.showErrorMessage('Request timed out. Please try again.');
                throw new Error('Request timed out');
            } else {
                console.error('Error:', error);
                vscode.window.showErrorMessage(`Error: ${error}`);
                throw error;
            }
        } else {
            console.error('Unknown error:', error);
            throw error;
        }
    }
}

export { getAnalyzedCode };