const Pool = require('pg').Pool;

// Postgres database connection
const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "webapp_db"
});

module.exports = pool;