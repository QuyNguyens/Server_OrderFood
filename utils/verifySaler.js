const createErr = require('./createErr');
const verifySaler = (req,res,next) =>{
    if(req.params.role === true){
        next();
    }else{
        res.json(createErr(401,"you are not Unauthorized!!!"));
    }
}

module.exports = verifySaler;
