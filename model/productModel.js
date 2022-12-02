const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    quantity: {type: Number, required: true},
    reviews: [
        {
        userId: {type: mongoose.Schema.Types.ObjectId , ref: 'User' },
        review: String
        }
    ],
    productImages: [
        { img: {type: String} }
    ],
    createdBy: {type: mongoose.Schema.Types.ObjectId , ref: 'User'}
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product