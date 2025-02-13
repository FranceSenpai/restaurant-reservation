import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "../components/ReviewForm"; 

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/reviews")
            .then((response) => setReviews(response.data))
            .catch((error) => console.error("Error fetching reviews:", error));
    }, []);

    return (
        <div>
            <h1>Customer Reviews</h1>
            <ReviewForm />
            <ul>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.id}>
                            <strong>{review.customer_name}</strong> - 
                            <span style={{ color: "gold", fontSize: "18px", marginLeft: "5px" }}>
                                {"★".repeat(review.rating)}
                            </span>
                            <p>{review.comment}</p>
                        </li>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </ul>
        </div>
    );
};

export default Reviews;
