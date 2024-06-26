import express from "express";
import { 
    getProductImages,
    getProductImagesById,
    saveProductImage,
    updateProductImage,
    deleteProductImage
} from "../controllers/ProductImageController.js";

const router = express.Router();

router.get('/productImages', getProductImages);
router.get('/productImages/:id', getProductImagesById);
router.post('/productImages', saveProductImage);
router.patch('/productImages/:id', updateProductImage);
router.delete('/productImages/:id', deleteProductImage);

export default router;