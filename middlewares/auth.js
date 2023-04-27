const jwt = require('jwt');
const SECRET_KEY = "NOTESAPI";


const auth = (req,res,next) => {
    try {
        let token = req.headers.authorization;
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