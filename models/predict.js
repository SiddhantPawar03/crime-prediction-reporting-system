const mongoose = require('mongoose');

const predictSchema = {
    State: String,
    reports : [String]
};

module.exports = mongoose.model("predict", predictSchema);