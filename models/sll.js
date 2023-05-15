const mongoose = require('mongoose');

const sllSchema = {
    // state: {type:String,
    // required: true},
    // reports : [String]
    State: String,
    reports : [String]
};

module.exports = mongoose.model("sll", sllSchema);