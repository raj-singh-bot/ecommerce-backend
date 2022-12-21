const express = require('express')
const { addOrder, getAllOrders, getOrder } = require('../controllers/orderController')
const { requireSignin } = require('../middleware/middleware')


const orderRouter = express.Router()

orderRouter.post('/user/addOrder', requireSignin, addOrder)
orderRouter.get('/user/getOrders', requireSignin, getAllOrders)
orderRouter.post('/user/getOrder', requireSignin, getOrder)

module.exports = orderRouter