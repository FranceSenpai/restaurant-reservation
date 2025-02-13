import axios from "axios";
import { useEffect, useState } from "react";

const ReviewList = ({ restaurantId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${restaurantId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // ✅ Send token
        });

        setReviews(response.data);
    } catch (error) {
        console.error("Error fetching reviews:", error.response?.data || error.message);
    }
};


    return (
        <div className="container">
            <h2>Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id}>
                        <p>⭐⭐⭐⭐⭐ {review.rating}/5</p>
                        <p>{review.comment}</p>
                        <p>- {review.reviewer}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewList;
