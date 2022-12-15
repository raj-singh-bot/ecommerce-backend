const express = require('express');
const { addItemToCart, removeCartItems, getCartItems } = require('../controllers/cartController');
const { requireSignin } = require('../middleware/middleware');
const cartRoute = express.Router();

cartRoute.route('/user/addToCart').post(requireSignin, addItemToCart)

cartRoute.post('/user/removeItem', requireSignin, removeCartItems)

cartRoute.post('/user/getCartItems', requireSignin, getCartItems)

module.exports = cartRoute