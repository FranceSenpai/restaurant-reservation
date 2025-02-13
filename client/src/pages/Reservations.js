import React, { useEffect, useState } from "react";
import axios from "axios";
import ReservationForm from "../components/ReservationForm";

const Reservations = ({ userId }) => {
    const [reservations, setReservations] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // ✅ Fetch reservations for the logged-in user
        axios.get(`http://localhost:5000/api/reservations`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setReservations(response.data))
        .catch((error) => console.error("Error fetching reservations:", error));
    }, [userId, token]);

    return (
        <div>
            <h2>My Reservations</h2>
            
            {/* ✅ Include Reservation Form */}
            <ReservationForm userId={userId} />

            <h3>Upcoming Reservations</h3>
            {reservations.length > 0 ? (
                <ul>
                    {reservations.map((res) => (
                        <li key={res.id}>
                            <p><strong>Restaurant:</strong> {res.restaurant_name}</p>
                            <p><strong>Date:</strong> {res.date}</p>
                            <p><strong>Time:</strong> {res.time}</p>
                            <p><strong>Guests:</strong> {res.guests}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
};

export default Reservations;
