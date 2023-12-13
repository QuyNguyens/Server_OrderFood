const creatErr = require('../utils/createErr');
const jwt = require('jsonwebtoken');
const veryfyToken = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token){
        res.json(null);
    }else{
        jwt.verify(token,process.env.JWT_SECRECT, (err,user) =>{
            if(err) return next(creatErr(401,"Token is not valid!"));
            req.user = user;
            next();
        })
    }
}
module.exports = {veryfyToken};