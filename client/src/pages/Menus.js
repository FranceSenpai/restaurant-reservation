import React, { useEffect, useState } from "react";
import axios from "axios";

const Menus = () => {
    const [menus, setMenus] = useState([]);
    const restaurantId = 1; // Replace with dynamic restaurant selection

    useEffect(() => {
        axios.get(`http://localhost:5000/api/menus/${restaurantId}`)
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error("Error fetching menus:", error);
            });
    }, []);

    return (
        <div>
            <h2>Restaurant Menu</h2>
            {menus.length > 0 ? (
                <ul>
                    {menus.map(item => (
                        <li key={item.id}>
                            <h3>{item.item_name} - ${item.price}</h3>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No menu items available.</p>
            )}
        </div>
    );
};

export default Menus;
