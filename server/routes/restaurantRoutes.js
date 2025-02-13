const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Fetch all restaurants
router.get("/", (req, res) => {
    const sql = "SELECT * FROM restaurants";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to fetch restaurants" });
        }
        res.json(results);
    });
});

// ✅ Fetch a single restaurant by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM restaurants WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to fetch restaurant" });
        }
        res.json(result[0]); // Return the single restaurant
    });
});

// ✅ Add a new restaurant (NO AUTH)
router.post("/", (req, res) => {
    const { name, address, phone, description } = req.body;

    if (!name || !address || !phone || !description) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO restaurants (name, address, phone, description) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, address, phone, description], (err) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to add restaurant" });
        }
        res.json({ success: "Restaurant added successfully" });
    });
});

// ✅ Update a restaurant (NO AUTH)
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, address, phone, description } = req.body;

    if (!name || !address || !phone || !description) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "UPDATE restaurants SET name = ?, address = ?, phone = ?, description = ? WHERE id = ?";

    db.query(sql, [name, address, phone, description, id], (err) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to update restaurant" });
        }
        res.json({ success: "Restaurant updated successfully" });
    });
});

// ✅ Delete a restaurant (NO AUTH)
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM restaurants WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to delete restaurant" });
        }
        res.json({ success: "Restaurant deleted successfully" });
    });
});

module.exports = router;
