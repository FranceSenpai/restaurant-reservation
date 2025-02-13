import React from "react";
import "../styles.css"; // ✅ Ensure this path is correct
import steakImage from "../assets/Steak.jpg"; // ✅ Ensure image is in assets folder

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="title">Welcome to The Puerto Rico SteakHouse</h1>
            <p className="description">
                The Puerto Rico SteakHouse is a fine dining restaurant known for its exquisite steaks
                and Caribbean-inspired dishes. We pride ourselves on serving only the highest quality
                cuts of meat, cooked to perfection, and paired with fresh, locally sourced ingredients.
            </p>

            {/* ✅ Display Centered Steak Image */}
            <img src={steakImage} alt="Delicious Steak" className="steak-image" />

            <p className="description">
                Whether you're here for a family dinner, a romantic evening, or a special event, our
                dedicated staff is committed to providing an unforgettable experience.
            </p>
            <p className="description">
                Explore our menus, book a reservation, and enjoy an exceptional meal with us today!
            </p>
        </div>
    );
};

export default Home;
