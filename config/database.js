const mysql = require('mysql2');

// Create a connection pool to the database using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Export the promise-based pool for use in your models or routes
module.exports = pool.promise();
