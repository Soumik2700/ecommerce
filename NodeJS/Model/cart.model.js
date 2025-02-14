import mongoose from "mongoose";

//Schema declaration for cart
const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

//Make collection
export default mongoose.model("Cart", cartSchema);