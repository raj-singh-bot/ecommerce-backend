const express = require('express');
const { addCategory, getCategory } = require('../controllers/categoryController');
const categoryRoute = express.Router();

categoryRoute.route('/create').post(addCategory);
categoryRoute.route('/getcategory').get(getCategory);


module.exports = categoryRoute