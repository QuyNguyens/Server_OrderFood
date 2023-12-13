const express = require('express');
const cors = require('cors');
const db = require('./configs/db');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/uploadImg');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
require('dotenv').config();
const app = express();

app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/upload',uploadRoute);
app.use('/api/product',productRoute);
app.use('/api/order',orderRoute);
app.use('/api/cart',cartRoute);

app.listen(process.env.PORT || 3000, () =>{
    db();
    console.log('server is running');
})