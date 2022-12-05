const Cart = require('../model/cartModel')

const addItemToCart = async(req, res) => {
    Cart.findOne({user: req.user.id})
    .exec((error, cart) => {
        if(error) return res.status(400).json({error})
        if(cart){
            const item = cart.cartItems.find(c => c.product == req.body.cartItems.product)

            if(item){
                Cart.findOneAndUpdate({ "user": req.user.id , "cartItems.product": req.body.cartItems.product}, {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                })
                .exec((error, _cart) => {
                    if(error) return res.status(400).json({error})
                    if(_cart){
                        return res.status(200).json({_cart})
                    }
                })

            }else{
                Cart.findOneAndUpdate({ user: req.user.id }, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                })
                .exec((error, _cart) => {
                    if(error) return res.status(400).json({error})
                    if(_cart){
                        return res.status(200).json({_cart})
                    }
                })
            }
        }else{
            const cart = new Cart({
                user: req.user.id,
                cartItems: [req.body.cartItems]
            })

            cart.save((error, cart) => {
                if(error) return res.status(400).json({error})
                if(cart){
                    return res.status(200).json({cart})
                }
            })
        }
    })
}

module.exports = {addItemToCart}