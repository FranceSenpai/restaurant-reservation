import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const loginUser = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const fetchReservations = () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const fetchReviews = async () => {
    try {
        const response = await axios.get(`${API_URL}/reviews`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
};
export const fetchRestaurants = () => {
    return axios.get(`${API_URL}/restaurants`);
};
