import express from "express";
import { registerUser, registerAdmin, login, getProfile, logout, getAllUsersAndAdmins, updateUser } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register/user", registerUser);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.get('/profile', getProfile)
router.post('/logout', logout)
router.get("/alluseradmin", getAllUsersAndAdmins);
router.put('/update', updateUser);

export default router;
