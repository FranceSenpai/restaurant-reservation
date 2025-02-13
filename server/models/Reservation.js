const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    date: String,
    time: String,
    guests: Number
});

module.exports = mongoose.model("Reservation", ReservationSchema);
