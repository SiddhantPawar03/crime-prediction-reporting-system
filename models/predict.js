const mongoose = require('mongoose');

const predictSchema = {
    // state: {type:String,
    // required: true},
    // reports : [String]
    State: String,
    reports : [String]
};

module.exports = mongoose.model("predict", predictSchema);