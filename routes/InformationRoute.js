import express from 'express';
import { addInformation, updateInformation, getInformation, getInformationById } from '../controllers/InformationController.js';
import { verifyAdmin } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/information',verifyAdmin, addInformation);
router.put('/information/:id',verifyAdmin, updateInformation);
router.get('/information', getInformation);
router.get('/information/:id', getInformationById);

export default router;