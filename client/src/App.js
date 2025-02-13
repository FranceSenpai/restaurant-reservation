import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menus from "./pages/Menus";
import Reservations from "./pages/Reservations";
import Reviews from "./pages/Reviews";


function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menus" element={<Menus />} />
                        <Route path="/reservations" element={<Reservations />} />
                        <Route path="/reviews" element={<Reviews />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
