const express = require('express');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid')
const { addProduct } = require('../controllers/productController');
const { requireSignin } = require('../middleware');
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

module.exports = productRoute