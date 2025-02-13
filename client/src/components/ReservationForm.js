import React, { useState } from "react";
import axios from "axios";

const ReservationForm = () => {
    const [customerName, setCustomerName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);

    // 🔹 Hardcoded restaurant ID (Since it's a single restaurant system)
    const restaurantId = 1;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/reservations",
                { customer_name: customerName, restaurant_id: restaurantId, date, time, guests }
            );

            alert("✅ Reservation successful!");
            window.location.reload();
        } catch (error) {
            console.error("❌ Error making reservation:", error.response ? error.response.data : error);
            alert(`Failed to make reservation: ${error.response?.data?.error || "Unknown error"}`);
        }
    };

    return (
        <div>
            <h3>Make a Reservation</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Your Name and Phone Number:
                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Time:
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>
                <br />
                <label>
                    Guests:
                    <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" required />
                </label>
                <br />
                <button type="submit">Reserve</button>
            </form>
        </div>
    );
};

export default ReservationForm;
