const { Pool } = require('pg');

// Create a new Pool instance to connect to the PostgreSQL database
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'DBMS',
    password: 'password',
    port: 5432, // default PostgreSQL port
});

module.exports = pool