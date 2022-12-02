const Product = require('../model/productModel');
const slugify = require('slugify')


const addProduct = async(req, res) => {
    const {name, price, description,quantity, category, createdBy} = req.body;

    let productImages= []

    if(req.files.length > 0){
        productImages = req.files.map((file) => {
            return {img: file.filename}
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        productImages,
        description: description,
        quantity: quantity,
        category,
        createdBy
    })
    
    product.save((error, product) => {
        if(error) return res.status(400).json({error})
        if(product) {
            res.status(201).json({product})
        }
    })
}

module.exports= {addProduct}