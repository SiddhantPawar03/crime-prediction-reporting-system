const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = "EDI@50";


const auth = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        console.log(token);
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        }
        else{
            res.status(401).json({message: "Unauthorized user"});
        }
        next();
    }
    catch(err) {
        console.log(err);
        res.status(401).json({message: "Unauthorized user"});
    }
}

module.exports = auth;