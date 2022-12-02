const Product = require('../model/productModel');
const slugify = require('slugify');
const Category = require('../model/categoryModel');


const addProduct = async(req, res) => {
    const {name, price, description,quantity, category, size, color} = req.body;

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
        color,
        size,
        category,
        createdBy: req.user._id
    })
    
    product.save((error, product) => {
        if(error) return res.status(400).json({error})
        if(product) {
            res.status(201).json({product})
        }
    })
}

const getProductByslug = async(req,res) => {
    const {slug} = req.params;
    console.log('slug', slug)
    Category.findOne({slug: slug})
    .select('_id')
    .exec((error, category) => {
        if(error){
            return res.status(400).json({error})
        }
        if(category){
            console.log('category', category)
            Product.find({category: category._id})
            .exec((error, products) => {
                res.status(200).json({products})
            })
        }
    })
}

const getProduct = async(req, res) => {
    const data = await Product.find({})
    if(data){
        res.status(200).json({data})
    }
}

module.exports= {addProduct, getProduct, getProductByslug}