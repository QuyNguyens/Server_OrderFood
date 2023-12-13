const orderModel = require('../models/order');
const addressModel = require('../models/address');
const productModel = require('../models/product');
const createErr = require('../utils/createErr');
const createOrder = async (req,res) =>{
    const addressOb = await addressModel.create(req.body.address);
    const orderCreate = {
        ...req.body,
        address: addressOb._id
    }
    const order = await orderModel.create(orderCreate);
    if(order){
        const productIds = order.productIds.map(item => item.productId);
        const productsDetail = await productModel.find({ _id: { $in: productIds } });
        const listDetailPro = [];
        for(var i=0;i<order.productIds.length;i++){
            let price= 0;
            let image= "";
            let name= "";
            let priceSize = null;
            let desc = "";
            for(var j=0; j<productsDetail.length;j++){
                if(productsDetail[j].id == order.productIds[i].productId){
                    price = productsDetail[j].price;
                    image = productsDetail[j].image;
                    name = productsDetail[j].name;
                    priceSize = productsDetail[j].sizeAll
                    desc = productsDetail[j].desc
                    break;
                }
            }
            listDetailPro.push({
                productId:order.productIds[i].productId,
                name:name,
                price: price,
                image: image,
                size:order.productIds[i].size,
                priceSize:priceSize.find(item => item.size ===order.productIds[i].size)?.price,
                quality:order.productIds[i].quality,
                desc: desc
            })
        }
        res.json({listDetailPro,order,addressOb});
    }else{
        res.json('failed to create Order!!!!');
    }
}
const getOrders = async (req,res) =>{
    const order = await orderModel.find({userId: req.params.id});
    const listDetailPro = []
    const addressOb = []
    if(order){
        for (var k=0;k<order.length;k++){
            const addressOrder = await addressModel.findById(order[k].address);
            addressOb.push(addressOrder);
            const productIds = order[k].productIds.map(item => item.productId);
            const productsDetail = await productModel.find({ _id: { $in: productIds } });
            const listDetailPro1 = [];
            for(var i=0;i<order[k].productIds.length;i++){
                let price= 0;
                let image= "";
                let name= "";
                let priceSize = null;
                let desc = "";
                for(var j=0; j<productsDetail.length;j++){
                    if(productsDetail[j].id == order[k].productIds[i].productId){
                        price = productsDetail[j].price;
                        image = productsDetail[j].image;
                        name = productsDetail[j].name;
                        priceSize = productsDetail[j].sizeAll
                        desc = productsDetail[j].desc
                        break;
                    }
                }
                listDetailPro1.push({
                    productId:order[k].productIds[i].productId,
                    name:name,
                    price: price,
                    image: image,
                    size:order[k].productIds[i].size,
                    priceSize:priceSize.find(item => item.size ===order[k].productIds[i].size)?.price,
                    quality:order[k].productIds[i].quality,
                    desc: desc
                })
            }
            listDetailPro.push(listDetailPro1);
        }
        res.json({listDetailPro,order,addressOb}) 
    }else{
        res.json({status:400,mesg:'You need to buy something!!!'})
    }
}

module.exports = {createOrder,getOrders};