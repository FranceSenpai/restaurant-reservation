import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    // Fetch Reviews with Reviewer & Restaurant Info
    const fetchReviews = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/reviews");
            setReviews(response.data);
        } catch (error) {
            console.error("❌ Error fetching reviews:", error);
        }
    };

    // Handle Delete Review
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reviews/${id}`);
            setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
        } catch (error) {
            console.error("❌ Error deleting review:", error);
        }
    };

    return (
        <div>
            <h2>Manage Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <strong>{review.reviewer_name}</strong> reviewed <strong>{review.restaurant_name}</strong>
                        <br />
                        {review.comment} - Rating: <strong>{review.rating}</strong>
                        <button onClick={() => handleDelete(review.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageReviews;
