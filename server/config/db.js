const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Check if Heroku DATABASE_URL is available, otherwise fallback to localhost
const dbConfig = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : {
      host: 'localhost',
      user: 'root',
      password: 'Buhh',
      database: 'restaurant',
      port: 3306,
    };

// If the database URL is set (i.e., on Heroku), parse it to extract the correct values
let connection;
if (process.env.DATABASE_URL) {
  const dbUrl = new URL(dbConfig); // Parse the DATABASE_URL
  connection = mysql.createConnection({
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.substring(1),
    port: dbUrl.port,
  });
} else {
  connection = mysql.createConnection(dbConfig);
}

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL Database!');
});

module.exports = connection;
