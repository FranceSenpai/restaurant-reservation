import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#222", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h1 style={{ color: "#fff", margin: "0" }}>The Puerto Rico SteakHouse</h1>
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", margin: "0 15px" }}>Home</Link>
        <Link to="/menus" style={{ color: "#fff", textDecoration: "none", margin: "0 15px" }}>Menus</Link>
        <Link to="/reservations" style={{ color: "#fff", textDecoration: "none", margin: "0 15px" }}>My Reservations</Link>
        <Link to="/reviews" style={{ color: "#fff", textDecoration: "none", margin: "0 15px" }}>Reviews</Link>
      </div>
    </nav>
  );
};

export default Navbar;
