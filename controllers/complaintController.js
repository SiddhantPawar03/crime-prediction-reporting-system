const complaintModel = require('../models/complaint');

const createComplaint = async (req,res) => {
    const newComplaint = new complaintModel({
        fullName: req.body.fullName,
        email: req.body.email,
        crimeDate: req.body.crimeDate,
        district: req.body.district,
        address: req.body.address,
        complaintType: req.body.complaintType,
        complaint: req.body.complaint
    });

    try{
        await newComplaint.save();
        return res.redirect('/');
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
}

const updateComplaint = async(req,res) => {
    const id = req.params.id;
    const {fullName, crimeDate, district, address, complaintType, complaint} = req.body;
    const newComplaint = {
        fullName: fullName,
        email: email,
        crimeDate: crimeDate,
        district: district,
        address: address,
        complaintType: complaintType,
        complaint: complaint
    }
    try{
        await complaintModel.findByIdAndUpdate(id, newComplaint, {new:true});
        // res.status(200).json(newComplaint);
        return res.redirect('/');
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});

    }
}

const deleteComplaint = async(req,res) => {
    const id = req.params.id;
    try{
        const complaint = await complaintModel.findByIdAndRemove(id);
        res.status(202).json(complaint);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
}

const getComplaint = async(req,res) => {
    try{
        const complaint = await complaintModel.find({userId: req.userId});
        res.json(500).json(complaint);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {
    createComplaint,
    updateComplaint,
    deleteComplaint,
    getComplaint
};