require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Buhh',  // Update with your actual database password
  database: process.env.DB_NAME || 'restaurant',  // Your database name
  port: process.env.DB_PORT || 3306,  // Default MySQL port
});

// Make sure the database connection works
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Exit the application if DB connection fails
  }
  console.log("✅ Connected to MySQL Database!");
});

const app = express();
const corsOptions = {
  origin: 'https://puertoricosteakhouse.netlify.app',  
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());

// Routes
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const menuRoutes = require("./routes/menuRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/admin", adminAuthRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Admin API Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = db; // Export the db connection for use in routes
