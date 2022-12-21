const express = require('express')
const { getCustomerOrder, updateOrder } = require('../../controllers/admin/order')
const {requireSignin, adminMiddleware } = require('../../middleware/middleware')

const adminOrder = express.Router()

adminOrder.post('/order/getCustomerOrders', requireSignin, adminMiddleware, getCustomerOrder)
adminOrder.post('/order/update', requireSignin, adminMiddleware, updateOrder)

module.exports = adminOrder