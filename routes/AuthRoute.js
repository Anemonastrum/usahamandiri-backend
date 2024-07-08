import express from "express";
import { registerUser, registerAdmin, login, getProfile, logout } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register/user", registerUser);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.get('/profile', getProfile)
router.post('/logout', logout)

export default router;
