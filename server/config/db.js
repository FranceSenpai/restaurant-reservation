const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = process.env.DATABASE_URL;

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    }
    console.log("✅ Connected to Heroku Database");
});

module.exports = db;
