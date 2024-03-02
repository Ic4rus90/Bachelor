"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyzedCode = void 0;
const convert_to_base64_1 = require("./convert-to-base64");
// Might need to change the return type of this function
async function getAnalyzedCode(code, file_extension, token) {
    const data = {
        code: (0, convert_to_base64_1.encodeToBase64)(code),
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
        return data;
    })
        .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}
exports.getAnalyzedCode = getAnalyzedCode;
//# sourceMappingURL=sendRequest.js.map