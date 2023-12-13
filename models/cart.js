const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId},
    productIds:[{productId:{type:mongoose.Types.ObjectId},
                quality:{type:Number},
                size:{type:String}}],
},{timestamps: true});

const cartModel = mongoose.model('cart',cartSchema);

module.exports = cartModel;