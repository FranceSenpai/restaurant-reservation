import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageMenus from "./pages/ManageMenus";
import ManageReservations from "./pages/ManageReservations";
import ManageReviews from "./pages/ManageReviews";
import Navbar from "./components/Navbar";

const App = () => {
    const [auth, setAuth] = useState(localStorage.getItem("adminToken") ? true : false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        setAuth(!!token); 
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setAuth(false);
    };

    return (
        <Router>
            {auth && <Navbar onLogout={handleLogout} />}
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<AdminLogin setAuth={setAuth} />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={auth ? <AdminDashboard /> : <Navigate to="/login" />} />
                <Route path="/manage-menus" element={auth ? <ManageMenus /> : <Navigate to="/login" />} />
                <Route path="/manage-reservations" element={auth ? <ManageReservations /> : <Navigate to="/login" />} />
                <Route path="/manage-reviews" element={auth ? <ManageReviews /> : <Navigate to="/login" />} />

                {/* Default Route */}
                <Route path="*" element={<Navigate to={auth ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
