import Category from "../models/CategoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getCategoriesById = async (req, res) => {
    try {
        const categories = await Category.findById(req.params.id);
        res.json(categories);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const saveCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Erm What the Sigma, Category name already exists" });
        }
        const category = new Category(req.body);
        const insertedCategory = await category.save();
        res.status(201).json(insertedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCategory= async (req, res) => {
    try {
        const updatedcategory = await Category.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(201).json(updatedcategory);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const deleteCategory= async (req, res) => {
    try {
        const deletedcategory = await Category.deleteOne({_id:req.params.id}, {$set: req.body});
        res.status(201).json(deletedcategory);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};