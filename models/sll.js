const mongoose = require('mongoose');

const sllSchema = {
    State: String,
    reports : [String]
};

module.exports = mongoose.model("sll", sllSchema);