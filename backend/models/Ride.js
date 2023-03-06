const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RideSchema = new Schema({
    date: {
        type: Date,
        default: new Date("2023-03-10"),
    },
    dateString: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: "12:00"
    },
    username: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        default: 1111111111,
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