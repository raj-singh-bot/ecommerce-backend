const Cart = require('../model/cartModel')

const addItemToCart = async(req, res) => {
    console.log(req.body.cartItems)
    Cart.findOne({user: req.user.id})
    .exec((error, cart) => {
        if(error) return res.status(400).json({error})
        if(cart){
            const item = cart.cartItems.find(c => c.product == req.body.cartItems.product)
            console.log(item.quantity, 'item')
            console.log(req.body.cartItems.quantity, 'newitem')
            if(item){
                Cart.findOneAndUpdate({ "user": req.user.id , "cartItems.product": req.body.cartItems.product}, {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: req.body.cartItems.quantity >1 ? req.body.cartItems.quantity : (item.quantity + req.body.cartItems.quantity)
                        }
                    }
                },{
                    new: true
                })
                .exec((error, _cart) => {
                    if(error) return res.status(400).json({error})
                    console.log(_cart)
                    if(_cart){
                        return res.status(200).json({cart: _cart.cartItems})
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
                    // console.log(_cart)
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

const removeCartItems = (req, res) => {
    // console.log(req.body)
    const {productId} = req.body;
    console.log(req.body)
    if(productId){
        Cart.updateOne(
            {user: req.user.id},
            {
                $pull: {
                    cartItems: {
                        product: productId
                    }
                }    
            }
        ).exec((error, result) => {
            if(error) return res.status(400).json({error: error.message});
            if(result){
                return res.status(202).json({result})
            }
        })
    }
}

const getCartItems = (req,res) => {
    Cart.findOne({user: req.user.id})
    .populate('cartItems.product', '_id name price productImages')
    .exec((error, cart) => {
        if(error) return res.status(400).json({error});
        // console.log(cart,'cart')
        if(!cart) return res.status(400).json({msg: 'Your Cart is Empty'})
        if(cart){
            let cartItems = {}
            cart.cartItems.forEach((item, index) => {
                cartItems[item.product._id.toString()] = {
                    _id: item.product._id.toString(),
                    name: item.product.name,
                    img: item.product.productImages[0].img,
                    price: item.product.price,
                    qty: item.quantity,
                }
            })
            res.status(200).json({ cartItems });
        }
    })
}

module.exports = {addItemToCart, removeCartItems, getCartItems}