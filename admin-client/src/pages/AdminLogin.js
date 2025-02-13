import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/admin/login", { email, password });

            localStorage.setItem("adminToken", response.data.token);
            setAuth(true);

            navigate("/dashboard");
        } catch (err) {
            console.error("Login Failed:", err.response?.data || err);
            setError(err.response?.data?.error || "Invalid email or password");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
