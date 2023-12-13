const productModel = require('../models/product');
const catalogyModel = require('../models/catalogy');
const cartModel = require('../models/cart');
const createErr = require('../utils/createErr');
const createProduct = async (req,res) =>{
    const catalogy = await catalogyModel.findOne({name:req.body.catalogy});
    const newProduct = {
        ...req.body,
        image:req.body.imgUpload,
        catalogyId: catalogy._id,
        desc: req.body.description,
        sizeAll:[
            {size:"small",price:req.body.smallSize},
            {size:"medium",price:req.body.mediumSize},
            {size:"large",price:req.body.largeSize}
        ]
    }
    const product = await productModel.create(newProduct);
    res.status(200).json(product);
}
const getOne = async (req,res) =>{
    const product = await productModel.findById(req.params.id);
    if(product){
        res.status(200).json(product);
    }else{
        res.json(createErr(401,"not found product!!!"));
    }
}
const getAll = async (req,res) =>{
    const product = await productModel.find({});
    if(product){
        res.status(200).json(product);
    }else{
        res.json(createErr(401,"not found product!!!"));
    }
}
const getCatalogy = async (req,res) =>{
    const catalogy = await catalogyModel.find({});
    if(catalogy){
        res.status(200).json(catalogy);
    }else{
        res.json(createErr(400,"not founded catalogy!!!"));
    }
}
const updateProduct = async (req,res) =>{
    const product = await productModel.findById(req.params.id);
    if(product){
        const updatePro = await productModel.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        if(updatePro){
            res.status(200).json(updatePro);
        }else{
            res.json(createErr(400,"update failed!!!"));
        }   
    }else{
        res.json(createErr(400,"not founded product!!!"));
    }
}
module.exports = {createProduct,getOne,getAll,getCatalogy,updateProduct}