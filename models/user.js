const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String},
    phone: {type:String},
    role:Boolean,
    delete:Boolean,
},{timestamps: true});

const userModle = mongoose.model('user',userSchema);

module.exports = userModle;