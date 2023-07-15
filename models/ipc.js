const mongoose = require('mongoose');

const ipcSchema = {
    State: String,
    reports : [String]
};

module.exports = mongoose.model("ipc", ipcSchema);