const express = require('express');
const cors = require('cors');
const pool = require('./db');

// Run the express library
const app = express();
const port = 3000;

// Middleware
app.use(cors());

// Gives us access to the request body
app.use(express.json());


app.get('/:id', async(req, res) => {
    res.send('Hello World!')
    });


// Add reports
app.post('/reports', async(req,res) => {
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


// Get reports
app.get('/reports/:id', async(req,res) => {
    try {
        // Need logic to make this safe.
        const {id} = req.params 
        const getReports = await pool.query("SELECT * FROM vulnerabilities WHERE user_id = $1", [id])
        res.json(getReports.rows)

    } catch(error) {
        console.error(error.message)
    }

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });

