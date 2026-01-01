import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }

})

const Product = mongoose.model("Product", productSchema);
export default Product