const cartModel = require('../models/cart');
const productModel = require('../models/product');
const createErr = require('../utils/createErr');
const getListCart = async(req,res) =>{
    const cart = await cartModel.findOne({ userId:req.params.id });
    if(cart){
        const productIds = cart.productIds.map(item => item.productId);
        const productsDetail = await productModel.find({ _id: { $in: productIds } });
        const listDetailPro = [];
        for(var i=0;i<cart.productIds.length;i++){
            let price= 0;
            let image= "";
            let name= "";
            let priceSize = null;
            let desc = "";
            for(var j=0; j<productsDetail.length;j++){
                if(productsDetail[j].id == cart.productIds[i].productId){
                    price = productsDetail[j].price;
                    image = productsDetail[j].image;
                    name = productsDetail[j].name;
                    priceSize = productsDetail[j].sizeAll
                    desc = productsDetail[j].desc
                    break;
                }
            }
            listDetailPro.push({
                productId:cart.productIds[i].productId,
                userId:req.params.id,
                name:name,
                price: price,
                image: image,
                size:cart.productIds[i].size,
                priceSize:priceSize.find(item => item.size ===cart.productIds[i].size)?.price,
                quality:cart.productIds[i].quality,
                check:false,
                desc: desc
            })
        }
        res.json({listDetailPro});
    }else{
        res.json('!ok');
    }
}
const addCart = async (req,res) =>{
    const idUser = req.body.userId;
    const idProduct = req.body.productId;
    const sizeProduct = req.body.size;
    const qualityProduct = req.body.quality;
    const addPro = {
        productId:idProduct,
        size:sizeProduct,
        quality:qualityProduct
    }
    const cart = await cartModel.findOne({userId:idUser});
    if (cart){
        const productIndex = cart.productIds.findIndex(item => 
            item.productId==idProduct && item.size == sizeProduct
          );
        // Nếu sản phẩm đã tồn tại trong giỏ hàng
        if (productIndex !== -1) {
            const existingProduct = cart.productIds[productIndex];
            // Kiểm tra xem size có khớp không
            if (existingProduct.size == sizeProduct) {
                // Nếu size khớp, tăng số lượng
                existingProduct.quality += qualityProduct;
            } else {
              // Nếu size không khớp, thêm sản phẩm mới vào giỏ hàng
              cart.productIds.push(addPro);
            }
          } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
            cart.productIds.push(addPro);
          }
          const newCart = await cart.save();
          res.status(200).json(newCart);
    }else{
        const newCart = {
            userId:req.body.userId,
            productIds:[addPro]
        }
        const newcart1 = await cartModel.create(newCart);
        res.status(200).json(newcart1);
    }
}
const updateCart = async (req,res) =>{
    const cart = await cartModel.findOne({userId:req.params.id});
    try {
        const indexToUpdate = cart.productIds.findIndex(item =>
            item.productId == req.body.productId && item.size == req.body.size
        )
        const existingProduct = cart.productIds[indexToUpdate];
        existingProduct.quality = req.body.quality;
        await cart.save();
        res.status(200).json("ok");
    }catch (error){
        res.json(createErr(400,"update cart failed!!!"));
    }
}
const deleteItemFromCart = async (req,res) =>{
    try {
        const cart = await cartModel.findOne({ userId:req.params.id });
        if (cart) {
            const indexToRemove = cart.productIds.findIndex(item => 
                item.productId==req.body.productId && item.size === req.body.size
            );
            cart.productIds.splice(indexToRemove, 1);
            await cart.save();
            res.status(200).json("ok");
        }
      } catch (error) {
        res.json(createErr(400,"something wrong with your cart!!!"));
      }
}
module.exports = {getListCart,updateCart,deleteItemFromCart,addCart};