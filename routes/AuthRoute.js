import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Admin from "../models/AdminModel.js";

const router = express.Router();

// Register User
router.post("/register/user", async (req, res) => {
    try {
        const { username, email, password, address, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, address, phoneNumber });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register Admin
router.post("/register/admin", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, email, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { login, password } = req.body;
        // Check if login exists as user or admin
        const user = await User.findOne({ $or: [{ email: login }, { username: login }] });
        const admin = await Admin.findOne({ $or: [{ email: login }, { username: login }] });

        // If neither user nor admin found
        if (!user && !admin) {
            return res.status(404).json({ message: "User or Admin not found!" });
        }

        // Validate password
        const account = user || admin;
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Generate token
        const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
