import express from "express";
import { registerUser, registerAdmin, login, getProfile } from "../controllers/AuthController.js";
import cors from "cors";

const router = express.Router();

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.post("/register/user", registerUser);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.get('/profile', getProfile)

export default router;
