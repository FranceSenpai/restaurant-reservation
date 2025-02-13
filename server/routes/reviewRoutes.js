const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ GET all reviews
router.get("/", (req, res) => {
    const sql = "SELECT * FROM reviews";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch reviews" });
        res.json(results);
    });
});

// ✅ POST a new review
router.post("/", (req, res) => {
    const { customer_name, restaurant_id, rating, comment } = req.body;

    if (!customer_name || !restaurant_id || !rating || !comment) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO reviews (user_id, restaurant_id, rating, comment) VALUES (?, ?, ?, ?)";
    db.query(sql, [1, restaurant_id, rating, comment], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Failed to submit review" });
        }
        res.json({ success: "Review submitted successfully" });
    });
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.promise().query("DELETE FROM reviews WHERE id = ?", [id]);

        if (result[0].affectedRows > 0) {
            res.json({ message: "Review deleted successfully" });
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;
