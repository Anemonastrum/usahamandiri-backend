import express from "express";
import { 
    getProductImages,
    getProductImagesById,
    getProductImagesByProductId, 
    saveProductImage,
    updateProductImage,
    deleteProductImage
} from "../controllers/ProductImageController.js";
import { verifyAdmin } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/productImages', getProductImages);
router.get('/productImages/:id', getProductImagesById);
router.get('/productImages/product/:productId', getProductImagesByProductId); 
router.post('/productImages', verifyAdmin, saveProductImage);
router.patch('/productImages/:id', verifyAdmin, updateProductImage);
router.delete('/productImages/:id', verifyAdmin, deleteProductImage);

export default router;