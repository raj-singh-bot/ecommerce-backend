const express = require('express');
const { addItemToCart } = require('../controllers/cartController');
const { requireSignin } = require('../middleware/middleware');
const cartRoute = express.Router();

cartRoute.route('/user/addToCart').post(requireSignin, addItemToCart)

module.exports = cartRoute