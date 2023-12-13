const express = require("express");
const route = express.Router();

const {createProduct,getOne,getAll,getCatalogy,updateProduct} = require('../controllers/product');

route.get('/get/:id', getOne);
route.get('/gets', getAll);
route.get('/catalogy', getCatalogy);
route.post('/create',createProduct);
route.post('/update/:id',updateProduct);
module.exports = route;