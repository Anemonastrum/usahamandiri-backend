import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Admin from "../models/AdminModel.js";
import { hashPassword, comparePassword } from "../middleware/AuthMiddleware.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, address, phoneNumber } = req.body;
        const userUsernameExist = await User.findOne({ username });
        const adminUsernameExist = await Admin.findOne({ username });
        if(userUsernameExist || adminUsernameExist){
            return res.json({
                error: 'Username is already registered'
            })
        };
        if(!username) {
            return res.json({
                error: 'Username is required'
            })
        };
        if(!password || password.length < 8) {
            return res.json({
                error: 'Please input minimum 8 character for Password'
            })
        };
        if(!email) {
            return res.json({
                error: 'Email is required'
            })
        };
        if(!address) {
            return res.json({
                error: 'Address is required'
            })
        };
        if(!phoneNumber) {
            return res.json({
                error: 'Number is required'
            })
        };
        const userEmailExist = await User.findOne({ email });
        const adminEmailExist = await Admin.findOne({ email });
        if(userEmailExist || adminEmailExist){
            return res.json({
                error: 'Email is already registered'
            })
        };
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ username, email, password: hashedPassword, address, phoneNumber });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.log(error)
    }
};

export const registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userUsernameExist = await User.findOne({ username });
        const adminUsernameExist = await Admin.findOne({ username });
        if(userUsernameExist || adminUsernameExist){
            return res.json({
                error: 'Username is already registered'
            })
        };
        if(!username) {
            return res.json({
                error: 'Username is required'
            })
        };
        if(!password || password.length < 8) {
            return res.json({
                error: 'Please input minimum 8 character for Password'
            })
        };
        const userEmailExist = await User.findOne({ email });
        const adminEmailExist = await Admin.findOne({ email });
        if(userEmailExist || adminEmailExist){
            return res.json({
                error: 'Email is already registered'
            })
        };
        const hashedPassword = await hashPassword(password);
        const newAdmin = new Admin({ username, email, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        console.log(error)
    }
};

export const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({ $or: [{ email: login }, { username: login }] });
        const admin = await Admin.findOne({ $or: [{ email: login }, { username: login }] });

        if (!user && !admin) {
            return res.status(404).json({ message: "User or Admin not found!" });
        }

        const account = user || admin;
        const isMatch = await comparePassword(password, account.password);

        if (isMatch) {
            const role = user ? 'user' : 'admin';
            jwt.sign(
                { id: account._id, role: role },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({ role });
                }
            );
        } else {
            return res.status(400).json({ error: "Invalid credentials!" });
        }
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getProfile = (req, res) => {
    const { token } = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}
