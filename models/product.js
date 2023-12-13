const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    catalogyId: mongoose.Types.ObjectId,
    name:{type:String},
    discount:{type:Number},
    price:{type:Number},
    desc:{type:String},
    image:{type:String},
    sizeAll:[
        {size:String,price:Number}
    ]
},{timestamps: true});

const productModel = mongoose.model('product',productSchema);

module.exports = productModel;