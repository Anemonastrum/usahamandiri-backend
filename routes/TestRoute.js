import express from 'express';
import { testAPI } from '../controllers/TestController.js';

const router = express.Router();

router.get('/', testAPI);

export default router;