const Pool = require('pg').Pool;

// Postgres database connection
const pool = new Pool({
    user: "USER",
    password: "PASSWORD",
    host: "db",
    port: 5432,
    database: "webapp_db"
});

module.exports = pool;