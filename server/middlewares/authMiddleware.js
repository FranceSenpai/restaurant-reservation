const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return res.status(403).json({ error: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
        if (decoded.role !== "owner") {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token. Please log in again." });
    }
};

module.exports = verifyAdmin;
