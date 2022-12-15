const express = require('express');
const { addCategory, getCategory, deleteCategory } = require('../controllers/categoryController');
const { requireSignin, adminMiddleware } = require('../middleware/middleware');
const categoryRoute = express.Router();

categoryRoute.route('/create').post(requireSignin,adminMiddleware,addCategory);
categoryRoute.route('/getcategory').get(getCategory);
categoryRoute.route('/deleteCategory').post(requireSignin,adminMiddleware,deleteCategory)


module.exports = categoryRoute