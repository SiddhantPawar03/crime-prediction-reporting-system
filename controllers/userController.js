const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async(req,res) => {
    //Checking for existing user

    //Hashed password

    //User creation

    //Token creation

    try {
        const {userName, email, password} = req.body;
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            // res.status(400).json({message: "User already exists"});
            return res.redirect('/signup');
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email:email,
            password:hashPassword,
            userName:userName
        });
        req.flash('success','Registered Successfully!')
        res.redirect('/login');

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server error"});
        
    }
}

const login = async (req,res) => {
    const {email, password} = req.body;

    try{
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
            req.flash('error','User Not Found')
            return res.redirect('/login')

        } 

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword) {
            req.flash('error','Invalid Credentials')
            return res.redirect('/login')
        }
        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, SECRET_KEY);
        // res.status(201).json({user: existingUser, token:token});
        res.cookie('jwt',token, { maxAge: 864000000 });
        req.flash('success','Welcome Back!')
        res.redirect('/');

    }
    catch(err){
        console.log(err);
        req.flash('error','Server Error')
        return res.redirect('/login')
    }
}

const logout = (req,res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    req.flash('warning','Sayonara!')
    res.redirect('/login')
}

module.exports = {signup,login,logout};