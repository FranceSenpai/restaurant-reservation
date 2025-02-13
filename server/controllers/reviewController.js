const db = require("../config/db");

// 🔹 Get All Reviews for a Restaurant (Now Includes Restaurant Name)
exports.getReviewsByRestaurant = (req, res) => {
    const restaurantId = req.params.restaurantId;

    db.query(
        `SELECT reviews.*, 
                users.name AS reviewer_name, 
                restaurants.name AS restaurant_name 
         FROM reviews 
         JOIN users ON reviews.user_id = users.id 
         JOIN restaurants ON reviews.restaurant_id = restaurants.id
         WHERE reviews.restaurant_id = ?`,
        [restaurantId],
        (err, results) => {
            if (err) {
                console.error("❌ Database Error:", err);
                return res.status(500).json({ error: "Database error while fetching reviews" });
            }
            res.json(results);
        }
    );
};

// 🔹 Post a New Review
exports.createReview = (req, res) => {
    const { restaurant_id, rating, comment } = req.body;
    const user_id = req.user.id; // User from JWT token

    if (!restaurant_id || !rating) {
        return res.status(400).json({ error: "Restaurant ID and rating are required" });
    }

    const sql = "INSERT INTO reviews (user_id, restaurant_id, rating, comment) VALUES (?, ?, ?, ?)";
    db.query(sql, [user_id, restaurant_id, rating, comment], (err, result) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "Database error while creating review" });
        }
        res.status(201).json({ message: "Review added successfully" });
    });
};

// 🔹 Get All Reviews (for Admin Panel)
exports.getAllReviews = (req, res) => {
    db.query(
        `SELECT reviews.*, 
                users.name AS reviewer_name, 
                restaurants.name AS restaurant_name 
         FROM reviews 
         JOIN users ON reviews.user_id = users.id 
         JOIN restaurants ON reviews.restaurant_id = restaurants.id`,
        (err, results) => {
            if (err) {
                console.error("❌ Database Error:", err);
                return res.status(500).json({ error: "Database error while fetching all reviews" });
            }
            res.json(results);
        }
    );
};
