# Restaurant Reservation System

## Project Overview
This Restaurant Reservation System is designed to manage restaurant reservations efficiently. The system allows customers to make reservations, browse restaurant menus, and leave reviews. Additionally, restaurant owners can manage reservations, update menus, and communicate with customers.

## Features

**Customer Features:**
- Browse restaurant menus
- Make reservations
- Leave reviews for restaurants

**Restaurant Features:**
- Manage reservations
- Update restaurant menus
- Communicate with customers ( theoretically through using their phone number)

## Tech Stack

**Frontend**: React (or Vue.js)  
**Backend**: Node.js, Express  
**Database**: Local Sql  
**Authentication**: JWT-based Authentication  
**Deployment**: Netlify

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/FranceSenpai/restaurant-reservation.git
    ```

2. Install dependencies:
    ```bash
    cd restaurant-reservation
    npm install
    ```

3. Create a SQL database schema
    -- Create the database schema (if not already created)
CREATE DATABASE IF NOT EXISTS restaurant;

-- Use the created schema
USE restaurant;

-- Create 'menus' table
CREATE TABLE menus (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);


-- Create 'reservations' table
CREATE TABLE reservations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_id INT,
    restaurant_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (customer_id) REFERENCES users(id)  -- Assuming you have a users table
);



-- Create 'restaurants' table
CREATE TABLE restaurants (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)  
);


-- Create 'reviews' table
CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    rating INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),  -- Assuming you have a users table for users who give reviews
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)  -- Assuming you have a restaurants table
);


-- Create 'users' table
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'owner') DEFAULT 'customer',  -- Enum type for role (either customer or owner)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



4. Run the application:
   
   on the server file run npm start 
    

Once the backend is running locally 
this 2 websites become active 
Make sure the connections to the database are matching for it to work  

https://puertoricosteakhouse.netlify.app/
https://puertoricosteakhousemng.netlify.app/
