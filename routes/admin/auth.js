const express = require('express');
const { adminRegister, adminLogin } = require('../../controllers/admin/auth');
const adminRoute = express.Router();

adminRoute.post('/admin/signup', adminRegister)
adminRoute.post('/admin/signin', adminLogin)


module.exports = adminRoute