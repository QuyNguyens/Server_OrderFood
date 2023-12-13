const express = require('express');
const route = express.Router();
const {veryfyToken} = require('../utils/verifyToken');
const {register,login,profile} = require('../controllers/auth');

route.post('/register',register);
route.post('/login',login);
route.get('/profile',veryfyToken,profile);
module.exports = route;