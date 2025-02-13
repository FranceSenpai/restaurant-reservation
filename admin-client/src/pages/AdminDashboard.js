import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Admin Panel.</p>
            <nav>
                <Link to="/manage-menus">Manage Menus</Link> |
                <Link to="/manage-reservations">Manage Reservations</Link> |
                <Link to="/manage-reviews">Manage Reviews</Link>
            </nav>
        </div>
    );
};

export default AdminDashboard;
