import mongoose from "mongoose";


const prodoctSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true
    },
    // image: {
    //     type: String,
    //     required: true,
    // },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Product = mongoose.model("Product", prodoctSchema) || mongoose.model.Product;

export default Product;