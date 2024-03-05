const insertReport = async(client, userID) => {
    const query = 'INSERT INTO report (user_id) VALUES ($1) RETURNING report_id;';
    try {
        const res = await client.query(query, [userID]);
        
        if (res.rows.length > 0) {
            return res.rows[0].report_id; // returning report id for use in other queries.
        } else {
            throw new Error('Report ID was not returned');
        } 
        
    } catch (error) {
        console.error(error.stack);
        // Re-throwing error to propagate to caller
        throw error;
    }
}

const insertVulnerability = async (client, reportID, cweID, codeExtract, vulnSummary ) => {
    const query = 'INSERT INTO vulnerability (report_id, cwe_id, code_extract, vuln_summary) VALUES ($1, $2, $3, $4);';
    try {
        await client.query(query, [reportID, cweID, codeExtract, vulnSummary]);
    } catch(error) {
        console.error(error.stack);
        throw error;
    }
}

const insertAnalyzedCode = async(client, reportID, code, codeLanguage) => {
    const query = 'INSERT INTO analyzed_Code (report_id, code, code_language) VALUES($1, $2, $3);';
    try {
        await client.query(query, [reportID, code, codeLanguage]);
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}

module.exports = { insertReport, insertVulnerability, insertAnalyzedCode };