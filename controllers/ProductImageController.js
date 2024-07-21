import ProductImage from "../models/ProductImageModel.js";
import Product from "../models/ProductModel.js";
import mongoose from 'mongoose';

export const getProductImages= async (req, res) => {
    try {
        const productImages = await ProductImage.find();
        res.json(productImages);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getProductImagesById = async (req, res) => {
    try {
        const productImages = await ProductImage.findById(req.params.id);
        res.json(productImages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const saveProductImage = async (req, res) => {
    const { url, product_id } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return res.status(400).send({ message: 'Invalid product_id format' });
    }

    try {
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(400).send({ message: 'Product not found' });
        }

        // Check if an image already exists for this product
        const existingProductImage = await ProductImage.findOne({ product_id });
        if (existingProductImage) {
            return res.status(400).send({ message: 'An image already exists for this product' });
        }

        const productImage = new ProductImage({
            url,
            product_id: product._id
        });

        const insertedProductImage = await productImage.save();
        res.status(201).json(insertedProductImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProductImage = async (req, res) => {
    const { url } = req.body;
    const { id } = req.params;

    try {
        const updatedProductImage = await ProductImage.findByIdAndUpdate(id, { url }, { new: true });
        if (!updatedProductImage) {
            return res.status(404).json({ message: 'Product image not found' });
        }
        res.json(updatedProductImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProductImage = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProductImage = await ProductImage.findByIdAndDelete(id);
        if (!deletedProductImage) {
            return res.status(404).json({ message: 'Product image not found' });
        }
        res.json({ message: 'Product image deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

