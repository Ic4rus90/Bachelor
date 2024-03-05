"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyzedCode = void 0;
const convert_to_base64_1 = require("./convert-to-base64");
// Helper function for formatting each vulnerability
function formatVulnerability(vuln) {
    return `${vuln.cweID}
			${vuln.vulnSummary}
			Vulnerable code: ${vuln.codeExtract}

			`;
}
// Might need to change the return type of this function
async function getAnalyzedCode(code, file_extension, token) {
    const data = {
        code: (0, convert_to_base64_1.encodeToBase64)(code),
        file_extension: file_extension,
    };
    // Define the URL to send the request to
    const url = 'http://cair-gpu12.uia.no:30000/analyze-code/';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vulnerability_data = await response.json();
        const formatted = vulnerability_data.vulnerabilities.map(formatVulnerability).join('');
        return formatted;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
exports.getAnalyzedCode = getAnalyzedCode;
//# sourceMappingURL=send-request.js.map