import { encodeToBase64 } from "./convert-to-base64";

// Possibly superfluous interface
interface Vulnerability {
    vulnerability: string;
    count: number;
}

// Possibly superfluous interface
interface CleanCode {
    CleanCodeMessage: string;
}

// Might need to change the return type of this function
async function getAnalyzedCode(code: string, file_extension: string, token: string): Promise<string> {
    const data = {
        code: encodeToBase64(code),
        file_extension: file_extension,
    };

    // Define the URL to send the request to
    const url = 'http://localhost:8000/secretary/summarize';

    // Return the fetch call and its promise chain
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } 
        return response.json();
    })
    .then(data => {
        return data as string;
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

export { getAnalyzedCode };