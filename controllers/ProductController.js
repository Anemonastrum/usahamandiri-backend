import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getProductsById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.json(products);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const saveProduct = async (req, res) => {
    const { name, description, price, stock, category_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return res.status(400).send({ message: 'Invalid category_id format' });
    }
    try {
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(400).send({ message: 'Category not found' });
        }

        const product = new Product({
            name,
            description,
            price,
            stock,
            category_id: category._id
        });

        const insertedProduct = await product.save();
        res.status(201).json(insertedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.deleteOne({ _id: req.params.id });
        if (deletedProduct.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { name, description, price, stock, category_id } = req.body;

    try {
        // If a new category ID is provided, validate it
        if (category_id && !mongoose.Types.ObjectId.isValid(category_id)) {
            return res.status(400).send({ message: 'Invalid category_id format' });
        }

        let category = null;
        if (category_id) {
            category = await Category.findById(category_id);
            if (!category) {
                return res.status(400).send({ message: 'Category not found' });
            }
        }

        const updatedData = {
            name,
            description,
            price,
            stock,
        };

        if (category) {
            updatedData.category_id = category._id;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};