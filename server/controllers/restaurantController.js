const db = require("../config/db");

// Create a new restaurant (only owners can create)
exports.createRestaurant = (req, res) => {
    const { name, location, description } = req.body;
    const owner_id = req.user.id; // Get user ID from JWT token

    if (req.user.role !== "owner") {
        return res.status(403).json({ error: "Only restaurant owners can create restaurants" });
    }

    const sql = "INSERT INTO restaurants (owner_id, name, location, description) VALUES (?, ?, ?, ?)";
    db.query(sql, [owner_id, name, location, description], (err, result) => {
        if (err) return res.status(500).json({ error: "Error creating restaurant" });
        res.status(201).json({ message: "Restaurant created successfully", restaurantId: result.insertId });
    });
};

// Get all restaurants
exports.getAllRestaurants = (req, res) => {
    db.query("SELECT * FROM restaurants", (err, results) => {
        if (err) return res.status(500).json({ error: "Error retrieving restaurants" });
        res.json(results);
    });
};

// Get a specific restaurant by ID
exports.getRestaurantById = (req, res) => {
    const restaurantId = req.params.id;

    db.query("SELECT * FROM restaurants WHERE id = ?", [restaurantId], (err, results) => {
        if (err) return res.status(500).json({ error: "Error retrieving restaurant" });
        if (results.length === 0) return res.status(404).json({ error: "Restaurant not found" });

        res.json(results[0]);
    });
};

// Update a restaurant (only the owner can update)
exports.updateRestaurant = (req, res) => {
    const restaurantId = req.params.id;
    const { name, location, description } = req.body;
    const owner_id = req.user.id; // Get user ID from JWT token

    const sql = "UPDATE restaurants SET name = ?, location = ?, description = ? WHERE id = ? AND owner_id = ?";
    db.query(sql, [name, location, description, restaurantId, owner_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error updating restaurant" });
        if (result.affectedRows === 0) return res.status(403).json({ error: "Unauthorized or restaurant not found" });

        res.json({ message: "Restaurant updated successfully" });
    });
};

// Delete a restaurant (only the owner can delete)
exports.deleteRestaurant = (req, res) => {
    const restaurantId = req.params.id;
    const owner_id = req.user.id; // Get user ID from JWT token

    const sql = "DELETE FROM restaurants WHERE id = ? AND owner_id = ?";
    db.query(sql, [restaurantId, owner_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error deleting restaurant" });
        if (result.affectedRows === 0) return res.status(403).json({ error: "Unauthorized or restaurant not found" });

        res.json({ message: "Restaurant deleted successfully" });
    });
};
