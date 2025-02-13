import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    // Fetch Reservations with Customer & Restaurant Info
    const fetchReservations = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/reservations");
            setReservations(response.data);
        } catch (error) {
            console.error("❌ Error fetching reservations:", error);
        }
    };

    // Handle Delete Reservation
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reservations/${id}`);
            setReservations((prevReservations) => prevReservations.filter((res) => res.id !== id));
        } catch (error) {
            console.error("❌ Error deleting reservation:", error);
        }
    };

    return (
        <div>
            <h2>Manage Reservations</h2>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        <strong>{reservation.customer_name}</strong> reserved at{" "}
                        <strong>{reservation.restaurant_name}</strong>
                        <br />
                        {reservation.date} - {reservation.time} - {reservation.guests} guests
                        <button onClick={() => handleDelete(reservation.id)}>Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageReservations;
