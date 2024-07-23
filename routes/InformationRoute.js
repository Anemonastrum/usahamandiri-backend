import express from 'express';
import { addInformation, updateInformation, getInformation, getInformationById } from './InformationController.js';

const router = express.Router();

router.post('/information', addInformation);
router.put('/information/:id', updateInformation);
router.get('/information', getInformation);
router.get('/information/:id', getInformationById);

export default router;