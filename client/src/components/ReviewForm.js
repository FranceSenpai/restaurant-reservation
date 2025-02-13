import React, { useState } from "react";
import axios from "axios";

const ReviewForm = () => {
    const [customerName, setCustomerName] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/reviews", {
                customer_name: customerName,
                restaurant_id: 1, // Default restaurant ID
                rating,
                comment,
            });
            alert(response.data.success);
            setCustomerName("");
            setComment("");
            setRating(5); // Reset rating after submission
        } catch (error) {
            alert("Failed to submit review");
        }
    };

    return (
        <div>
            <h2>Leave a Review</h2>
            <form onSubmit={handleSubmit}>
                <label>Your Name:</label>
                <input 
                    type="text" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    required 
                />

                <label>Rating:</label>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span 
                            key={num} 
                            onClick={() => setRating(num)}
                            style={{ cursor: "pointer", fontSize: "24px", color: num <= rating ? "gold" : "gray" }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <label>Comment:</label>
                <textarea 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    required 
                />

                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewForm;
