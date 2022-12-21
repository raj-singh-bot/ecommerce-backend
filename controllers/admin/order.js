const Order = require('../../model/orderModel')

const getCustomerOrder = async(req, res) => {
    const order = await Order.find({})
    .populate("items.productId", "name")
    .exec()
    res.status(200).json({order});
}

const updateOrder = (req, res) => {
    try {
        Order.updateOne({_id: req.body.orderId, "orderStatus.type": req.body.type},
        {
            $set: {
                "orderStatus.$": [
                    {type: req.body.type, date: new Date(), isCompleted: true},
                ]
            }
        }
        ).exec((error, order) => {
            if(error) return res.status(400).json({error})
            if(order){
                res.status(200).json({order})
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getCustomerOrder, updateOrder}