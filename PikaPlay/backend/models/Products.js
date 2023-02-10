const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImages:{
        type: [String]
    },
    productPrice: {
        type: Number,
        required: true
    }
}, 
{
    timestamps: true
})

const ProductModel = mongoose.model("Products", ProductSchema)
module.exports = ProductModel