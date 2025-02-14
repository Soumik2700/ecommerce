import mongoose from "mongoose";

// Schema declaration for products
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    }
})

//Making collection
const Product = new mongoose.model("Product", productSchema);

export default Product;