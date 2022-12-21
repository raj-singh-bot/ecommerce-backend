const Order = require('../model/orderModel')
const Cart = require('../model/cartModel')
const UserAddress = require('../model/addressModel')
const Product = require('../model/productModel')

const addOrder = async(req, res) => {
    Cart.deleteOne({user: req.user.id}).exec((error, result) => {
        if(error) return res.status(400).json({error})
        if(result){
            req.body.user = req.user.id;
            req.body.orderStatus = [
                {
                    type: "ordered",
                    date: new Date(),
                    isCompleted: true,
                },
                {
                    type: "packed",
                    isCompleted: false,
                },
                {
                    type: "shipped",
                    isCompleted: false,
                },
                {
                    type: "delivered",
                    isCompleted: false,
                },
            ];
            const order = new Order(req.body);
            order.save((error, order) => {
                if(error) return res.status(400).json({error});
                if(order){
                    req.body.items.forEach((item) => {
                        Product.updateOne(
                            {_id: item.productId},
                            { $inc: {"quantity": -item.purchasedQty},}
                        )
                        .exec((error, qty) => {
                            if(error) return res.status(400).json({error})
                            if(qty){
                                console.log(qty)
                                res.status(201).json({ order });
                            }
                        })
                    })
                }
            })
        }
    })
}

const getAllOrders = async(req, res) => {
    Order.find({user: req.user.id})
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.productId", "_id name productImages")
    .exec((error, orders) => {
        if(error) return res.status(400).json({error})
        if(orders){
            res.status(200).json({ orders });
        }
    })
}

const getOrder = async(req, res) => {
    console.log(req.body)
    try {
        if(!req.body.orderId){
            return res.status(400).json({msg: 'please provide orderId'})
        }
        Order.findOne({_id: req.body.orderId})
        .populate("items.productId", "_id name productImages")
        .lean()
        .exec((error, order) => {
            if(error) return res.status(400).json({error})
            if(order){
                UserAddress.findOne({user: req.user.id})
                .exec((error, address) => {
                    if(error) return res.status(400).json({error})
                    order.address = address.address.find((adr) => adr._id.toString() == order.addressId.toString())
                    res.status(200).json({order})
                })
            }
        })
    } catch (error) {
        return res.status(400).json({error})
    }
}

module.exports = {addOrder, getAllOrders, getOrder}