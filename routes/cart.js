const express = require('express');
const route = express.Router();
const {getListCart,updateCart,deleteItemFromCart,addCart} = require('../controllers/cart');
route.get('/list-item/:id',getListCart);
route.post('/update/:id',updateCart);
route.post('/delete/:id',deleteItemFromCart);
route.post('/add-cart',addCart);
module.exports = route