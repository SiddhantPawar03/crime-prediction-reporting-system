const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "NOTESAPI";

const signup = async(req,res) => {
    //Checking for existing user

    //Hashed password

    //User creation

    //Token creation

    const {username, email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email:email,
            password:hashPassword,
            username:username
        });

        const token = jwt.sign({email:result.email, id:result._id, SECRET_KEY});
        res.status(201).json({user: result, token:token});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
}

const signin = async (req,res) => {
    const {email, password} = req.body;

    try{
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        } 

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword) {
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const token = jwt.sign({email:result.email, id:existingUser._id, SECRET_KEY});
        res.status(201).json({user: existingUser, token:token});


    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
}
module.exports = {signup,signin};