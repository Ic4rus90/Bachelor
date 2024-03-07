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
exports.getAnalyzedCode = void 0;
const convert_to_base64_1 = require("./convert-to-base64");
const vscode = __importStar(require("vscode"));
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
const convert_to_base64_2 = require("./convert-to-base64");
dotenv.config({
    path: (0, path_1.resolve)(__dirname, '/../.env')
});
// Helper function for formatting each vulnerability
function formatVulnerability(vuln) {
    const decoded_code = (0, convert_to_base64_2.decodeFromBase64)(vuln.codeExtract);
    const decoded_cweID = (0, convert_to_base64_2.decodeFromBase64)(vuln.cweID);
    const decoded_summary = (0, convert_to_base64_2.decodeFromBase64)(vuln.vulnSummary);
    return `${decoded_cweID}
			${decoded_summary}
			Vulnerable code: ${decoded_code}

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
        const vulnerability_data = await response.json();
        const formatted = vulnerability_data.vulnerabilities.map(formatVulnerability).join('');
        return formatted;
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                // Handle the timeout
                console.error('Request timed out');
                vscode.window.showErrorMessage('Request timed out. Please try again.');
                throw new Error('Request timed out');
            }
            else {
                console.error('Error:', error);
                vscode.window.showErrorMessage(`Error: ${error}`);
                throw error;
            }
        }
        else {
            console.error('Unknown error:', error);
            throw error;
        }
    }
}
exports.getAnalyzedCode = getAnalyzedCode;
//# sourceMappingURL=send-request.js.map