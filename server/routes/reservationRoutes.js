const express = require("express");
const db = require("../config/db");

const router = express.Router();

// ✅ Create a Reservation 
router.post("/", (req, res) => {
    const { customer_name, restaurant_id, date, time, guests } = req.body;

    if (!customer_name || !restaurant_id || !date || !time || !guests) {
        return res.status(400).json({ error: "All fields are required." });
    }

    db.query(
        "INSERT INTO reservations (customer_name, restaurant_id, date, time, guests) VALUES (?, ?, ?, ?, ?)",
        [customer_name, restaurant_id, date, time, guests],
        (err, result) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: "Failed to create reservation" });
            }
            console.log("✅ Reservation created successfully!");
            res.status(201).json({ message: "Reservation created successfully!" });
        }
    );
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.promise().query("DELETE FROM reservations WHERE id = ?", [id]);

        if (result[0].affectedRows > 0) {
            res.json({ message: "Reservation deleted successfully" });
        } else {
            res.status(404).json({ error: "Reservation not found" });
        }
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Fetch All Reservations 
router.get("/", (req, res) => {
    db.query("SELECT * FROM reservations", (err, results) => {
        if (err) {
            console.error("❌ Error fetching reservations:", err);
            return res.status(500).json({ error: "Failed to retrieve reservations" });
        }
        res.json(results);
    });
});

module.exports = router;
