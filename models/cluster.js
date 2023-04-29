const mongoose = require('mongoose');

const clusterSchema = {
    state: String,
    murder: String,
    dowry : String,
    suicide: String,
    humantrafficiking: String,
    blackmailing: String,
    robbery: String,
    coordinates: String,
    latitude: String,
    longitude: String
};

module.exports = mongoose.model("cluster", clusterSchema);

