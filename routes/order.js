const express = require('express');
const route = express.Router();
const {createOrder,getOrders} = require('../controllers/order');
route.post('/payment',createOrder);
route.get('/list-order/:id',getOrders);

module.exports = route;