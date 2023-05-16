const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;



module.exports.auth = (req,res,next) => {
    try {
        let token = req.cookies['jwt'];
        if(token){
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            next();
        }
        else{
            req.flash('error','Please Login')
            return res.redirect(`/login`)
        }
    }
    catch(err) {
        req.flash('error','Server Error')
        return res.redirect(`/login`)
    }
}


module.exports.isLogedIn = (req) => {
    try{
        let token = req.cookies['jwt'];
        if(token){
            let user = jwt.verify(token, SECRET_KEY);
            if (user) 
            {return true}
        }
        return false
    }catch(err){
        return false
    }
}