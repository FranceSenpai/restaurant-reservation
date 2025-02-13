const db = require("../config/db");

// 🔹 Create a Reservation
exports.createReservation = (req, res) => {
    const { restaurant_id, date, time, guests } = req.body;
    const customer_id = req.user.id;

    if (!restaurant_id || !date || !time || !guests) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO reservations (customer_id, restaurant_id, date, time, guests) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [customer_id, restaurant_id, date, time, guests], (err, result) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "Database error while creating reservation" });
        }
        res.status(201).json({ message: "Reservation created successfully" });
    });
};

// 🔹 Get Reservations with Customer Names
exports.getReservationsByUser = (req, res) => {
    const userId = req.user?.id;
    console.log("🔹 Fetching reservations for user ID:", userId);

    if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    db.query(
        `SELECT reservations.*, 
                restaurants.name AS restaurant_name, 
                users.name AS customer_name 
         FROM reservations 
         JOIN restaurants ON reservations.restaurant_id = restaurants.id
         JOIN users ON reservations.customer_id = users.id
         WHERE reservations.customer_id = ?`,
        [userId],
        (err, results) => {
            if (err) {
                console.error("❌ Database Error:", err);
                return res.status(500).json({ error: "Database error while fetching reservations" });
            }
            console.log("🔹 Reservations found:", results);
            res.json(results);
        }
    );
};
