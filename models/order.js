const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {type:mongoose.Types.ObjectId},
    productIds:[{productId:{type:mongoose.Types.ObjectId},
        quality:{type:Number},size:{type:String}}],
    fullname: {type:String},
    phone: {type:String},
    address: {type:mongoose.Types.ObjectId},
    status: {type:Boolean, default: false},
    totalPrice: {type:Number},
    paid:{type: Boolean, default: false},
},{timestamps: true});

const orderModel = mongoose.model('order',orderSchema);

module.exports = orderModel;