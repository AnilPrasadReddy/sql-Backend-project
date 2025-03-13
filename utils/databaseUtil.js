const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "localhost", // Use "host.docker.internal" if connecting from another container
  user: "root",
  password: "root",
  database: "airbnb",
  port: 3306, // Ensure this matches the exposed port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
