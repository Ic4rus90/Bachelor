import { encodeToBase64 } from "./convert-to-base64";

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

        const vulnerability_data: Vulnerability = await response.json() as Vulnerability;

        const formatted  = vulnerability_data.vulnerabilities.map(formatVulnerability).join('');

        return formatted;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { getAnalyzedCode };