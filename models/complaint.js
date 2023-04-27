
const crimeSchema = {
    name: String,
    crimeDate: String,
    district: String,
    address: String,
    complaint_type: String,
    complaint: String,
    xcoord: Number,
    ycoord: Number
};

module.exports = mongoose.model("complaints", crimeSchema);