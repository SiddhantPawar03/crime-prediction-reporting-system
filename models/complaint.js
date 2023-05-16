const mongoose = require('mongoose');

const crimeSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    crimeDate: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    complaintType: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("complaint", crimeSchema);