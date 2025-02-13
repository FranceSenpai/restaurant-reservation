import axios from "axios";
import { useEffect, useState } from "react";

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/restaurants");
            setRestaurants(response.data);
        } catch (error) {
            console.error("Error fetching restaurants:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container">
            <h2>Restaurants</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>{restaurant.name} - {restaurant.location}</li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;
