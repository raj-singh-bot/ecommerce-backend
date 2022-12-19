const Order = require('../../model/orderModel')

const getCustomerOrder = async(req, res) => {
    const order = await Order.find({})
    .populate("items.productId", "name")
    .exec()
    res.status(200).json({order});
}

module.exports = {getCustomerOrder}