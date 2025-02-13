const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Fetch all menu items
router.get("/", (req, res) => {
    const sql = "SELECT * FROM menus";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to fetch menus" });
        }
        res.json(results);
    });
});

// ✅ Fetch menu items for a specific restaurant
router.get("/:restaurant_id", (req, res) => {
    const { restaurant_id } = req.params;
    const sql = "SELECT * FROM menus WHERE restaurant_id = ?";
    
    db.query(sql, [restaurant_id], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to fetch restaurant menus" });
        }
        res.json(results);
    });
});

// ✅ Add a new menu item (NO AUTH)
router.post("/", (req, res) => {
    const { restaurant_id, name, description, price } = req.body;
    
    if (!restaurant_id || !name || !description || !price) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO menus (restaurant_id, name, description, price) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [restaurant_id, name, description, price], (err) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to add menu item" });
        }
        res.json({ success: "Menu item added successfully" });
    });
});

// ✅ Update a menu item (NO AUTH)
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "UPDATE menus SET name = ?, description = ?, price = ? WHERE id = ?";
    
    db.query(sql, [name, description, price, id], (err) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to update menu item" });
        }
        res.json({ success: "Menu item updated successfully" });
    });
});

// ✅ Delete a menu item (NO AUTH)
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM menus WHERE id = ?";
    
    db.query(sql, [id], (err) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Failed to delete menu item" });
        }
        res.json({ success: "Menu item deleted successfully" });
    });
});

module.exports = router;
