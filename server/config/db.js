const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Buhh',
    database: 'restaurant',
    port: 3306, // Ensure MySQL is running on this port
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL Database!");
});

module.exports = db;
