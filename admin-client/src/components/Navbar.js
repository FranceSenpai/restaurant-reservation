import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Admin Panel</h1>
            <div className="nav-links">
                <Link to="/">Dashboard</Link>

            </div>
        </nav>
    );
};

export default Navbar;
