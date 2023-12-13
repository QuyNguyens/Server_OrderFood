const userModel = require('../models/user');
const { use } = require('../routes/auth');
const createErr = require('../utils/createErr');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async (req,res) =>{
    const user = await userModel.findOne({email:req.body.email});
    if(user){
        res.json(createErr(400,"User had existing!!!"));
    }else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password:hash,
        }
        const resUser = await userModel.create(newUser);
        res.status(200).json(resUser);
    }
}

const login = async (req,res) =>{
    const user = await userModel.findOne({email:req.body.email});
    if(user){
        const password = await bcrypt.compare(req.body.password,user.password);
        if(password){
            const token = jwt.sign({id:user._id,name:user.name,role:user.role},process.env.JWT_SECRECT);
            const {password, ...otherDetail} = user._doc;
            res.cookie('access_token',token).status(200).json({otherDetail});
        }else{
            res.json(createErr(401,"password is wrong!!!"));
        }
    }else{
        res.json(createErr(404,"not founded user!!!!"));
    }
}
const profile = (req,res) =>{
    res.status(200).json(req.user);
}
module.exports = {register,login,profile};