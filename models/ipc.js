const mongoose = require('mongoose');

const ipcSchema = {
    // state: {type:String,
    // required: true},
    // reports : [String]
    State: String,
    reports : [String]
};

module.exports = mongoose.model("ipc", ipcSchema);