const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    userID:{type:mongoose.Types.ObjectId},
    province:{type:String},
    district:{type:String},
    houseNumber:{type:String},
    phone: {type: String}
},{timestamps: true});
const addressModel = mongoose.model('address',addressSchema);
module.exports = addressModel;