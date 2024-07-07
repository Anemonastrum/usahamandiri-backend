import express from "express";
import { registerUser, registerAdmin, login, getProfile } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register/user", registerUser);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.get('/profile', getProfile)

export default router;
