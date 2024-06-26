import express from "express";
import { 
    getProducts,
    getProductsById,
    saveProduct,
    deleteProduct,
    updateProduct
} from "../controllers/ProductController.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductsById);
router.post('/products', saveProduct);
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id', updateProduct);

export default router;