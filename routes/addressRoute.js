const express = require('express')
const { addAddress, getAddress } = require('../controllers/addressController')
const { requireSignin } = require('../middleware/middleware')

const addressRoute = express.Router()

addressRoute.post('/address/create', requireSignin, addAddress)
addressRoute.get('/address/getAddress', requireSignin, getAddress)

module.exports = addressRoute