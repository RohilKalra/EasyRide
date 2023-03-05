const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RideSchema = new Schema({
    date: {
        type: String,
        default: "03/05/2023",
    },
    time: {
        type: String,
        default: "12:00"
        // military time
    },
    username: {
        type: String,
        required: true
    },
    locationFrom: {
        type: String,
        required: true
    },
    locationTo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    num_riders: {
        type: Number,
        default: 1
    }
});

const Ride = mongoose.model("Ride", RideSchema);
module.exports = Ride;