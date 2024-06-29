import express from "express";
import { 
    getProducts,
    getProductsById,
    saveProduct,
    deleteProduct,
    updateProduct
} from "../controllers/ProductController.js";
import { verifyAdmin } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductsById);
router.post('/products', verifyAdmin, saveProduct);
router.delete('/products/:id', verifyAdmin, deleteProduct);
router.patch('/products/:id', verifyAdmin, updateProduct);

export default router;