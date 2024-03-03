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

        // Fetch reports from the database using the user ID
        const { rows } = await pool.query('SELECT * FROM report WHERE user_id = $1', [userID]);
        
        // If no reports are found, return something? 
        /*
        if (rows.length === 0) {
            return res.status(404).send('No reports found');
        }
        */
        
        res.json(rows);

    } catch(error) {
        console.log("Server error: ", error.message);
        return res.status(500).send(error.message);
    }
})



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

