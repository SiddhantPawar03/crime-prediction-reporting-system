const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = "EDI@50";


const auth = (req,res,next) => {
    try {
        let token = req.cookies['jwt'];
        if(token){
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            next();
        }
        else{
            res.status(401).json({message: "Unauthorized user"});
        }
    }
    catch(err) {
        res.status(401).json({message: "Unauthorized user"});
    }
}

module.exports = auth;