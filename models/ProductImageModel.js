import mongoose from "mongoose";

const ProductImage = mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

export default mongoose.model('ProductImages', ProductImage);