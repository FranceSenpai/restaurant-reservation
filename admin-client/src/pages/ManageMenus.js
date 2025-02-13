import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageMenus = () => {
    const [menus, setMenus] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", description: "", price: "" });

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/menus");
            setMenus(response.data);
        } catch (error) {
            console.error("Error fetching menus:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/menus/${id}`);
            fetchMenus();
        } catch (error) {
            console.error("Error deleting menu item:", error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/menus", newItem);
            setNewItem({ name: "", description: "", price: "" });
            fetchMenus();
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };

    return (
        <div>
            <h1>Manage Menus</h1>
            <form onSubmit={handleAdd}>
                <input type="text" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
                <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
                <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} required />
                <button type="submit">Add Menu Item</button>
            </form>

            <ul>
                {menus.map((menu) => (
                    <li key={menu.id}>
                        {menu.name} - {menu.description} - ${menu.price}
                        <button onClick={() => handleDelete(menu.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageMenus;
