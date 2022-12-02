const express = require('express')
const {registerUser, loginUser} = require('../controllers/authController')

const authRoute = express.Router();

authRoute.route('/register').post(registerUser)

authRoute.route('/login').post(loginUser)

module.exports = authRoute