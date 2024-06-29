import express from "express";
import { 
    getCategories,
    getCategoriesById,
    saveCategory,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController.js";
import { verifyAdmin } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoriesById);
router.post('/categories', verifyAdmin, saveCategory);
router.patch('/categories/:id', verifyAdmin, updateCategory);
router.delete('/categories/:id', verifyAdmin, deleteCategory);

export default router;
