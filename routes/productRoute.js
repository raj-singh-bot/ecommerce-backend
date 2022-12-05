const express = require('express');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid')
const { addProduct, getProduct, getProductByslug, getProductDetailsById } = require('../controllers/productController');
const { requireSignin, adminMiddleware } = require('../middleware/middleware');
const productRoute = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });

const upload = multer({ storage });

productRoute.route('/create').post(requireSignin, upload.array('productImages'), addProduct);

productRoute.route('/getProducts').get(requireSignin, getProduct)

productRoute.route('/products/:slug').get(getProductByslug)

productRoute.route('/product/:productId').get(getProductDetailsById)

module.exports = productRoute