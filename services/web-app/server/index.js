const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { auth } = require('express-oauth2-jwt-bearer')
require("dotenv").config({ path: '/../.env' });
const jwt = require('jsonwebtoken');

// Create a new express application
const app = express(); 
const port = 3000; 

// Middleware
app.use(cors({
    origin: 'http://localhost:8500', 
}));

// Connection string for the database
const connection = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

// Create a new pool with the connection string
const pool = new Pool({
    connectionString: connection
})


const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE
};

// Provides access to the request body
app.use(express.json());

// Define the JWT validation middleware
const checkJWT = auth({
    audience: `${authConfig.audience}`,
    issuerBaseURL: `${authConfig.domain}`
});


// For testing purposes
app.get('/', async(req, res) => {
    return res.send('Hello World!')
});


// Get reports
// checkJWT verifies that the token is valid before passing the 
app.get('/getreports', checkJWT, async function(req, res) {
    try {
        // Extract token from the request header
        const token = req.headers.authorization.split(' ')[1];

        // Decode the token to get the user ID
        const decoded = jwt.decode(token);
        const userID = decoded.sub; 

        // Fetch the most recent report and related data for the user
        const query = `
            WITH recent_report AS (
                SELECT report_id, user_id, report_date
                FROM report
                WHERE user_id = $1
                ORDER BY report_date DESC
                LIMIT 1
            )
            SELECT 
                r.report_id, r.user_id, r.report_date,
                v.vuln_id, v.code_extract, v.vuln_summary,
                c.cwe_id, c.cwe_name, c.cwe_description,
                a.analyzed_code_id, a.code, a.code_language, a.starting_line_number
            FROM 
                recent_report r
            LEFT JOIN vulnerability v ON r.report_id = v.report_id
            LEFT JOIN cwe c ON v.cwe_id = c.cwe_id
            LEFT JOIN analyzed_code a ON r.report_id = a.report_id;
        `;

        const { rows } = await pool.query(query, [userID]);

        // If no report is found, return a 404 status
        if (rows.length === 0) {
            return res.status(404).send('No reports found');
        }

        // Process the rows to group vulnerabilities and analyzed code under the same report
        const reportData = rows.reduce((acc, row) => {
            // If the accumulator is empty, initialize it with the report details
            if (!acc.report) {
                acc = { 
                    report: {
                        report_id: row.report_id,
                        user_id: row.user_id,
                        report_date: row.report_date,
                    },
                    vulnerabilities: [],
                    analyzed_code: null
                };
            }

            // If the row has vulnerability data, add it to the vulnerabilities array
            if (row.vuln_id && !acc.vulnerabilities.some(v => v.vuln_id === row.vuln_id)) {
                acc.vulnerabilities.push({
                    vuln_id: row.vuln_id,
                    code_extract: row.code_extract,
                    vuln_summary: row.vuln_summary,
                    cwe: {
                        cwe_id: row.cwe_id,
                        cwe_name: row.cwe_name,
                        cwe_description: row.cwe_description
                    }
                });
            }
        
            // Add analyzed code data to the analyzed_code object
            if (row.analyzed_code_id && !acc.analyzed_code) {
                acc.analyzed_code = {
                    analyzed_code_id: row.analyzed_code_id,
                    code: row.code,
                    code_language: row.code_language,
                    starting_line_number: row.starting_line_number
                };
            }
        
        
            return acc;
        }, {});
        
        res.json(reportData);
        
    } catch(error) {
        console.log("Server error: ", error.message);
        return res.status(500).send(error.message);
    }
});



// Add reports
app.post('/addreports', async(req,res) => {
    try {
        const { code } = req.body;
        const { report } = req.body;
        const { vulnerabilities } = req.body;
        console.log(req.body);
        newReport = await pool.query("INSERT INTO reports (code, report, vulnerabilities) VALUES($1, $2, $3)", [code, report, vulnerabilities])
        res.json(newReport.rows) 
    } catch(error) {
        console.log(error.message)
    }
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

