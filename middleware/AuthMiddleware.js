import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Admin from "../models/AdminModel.js";
import bcrypt from "bcryptjs";

export const verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ message: "No token, authorization denied!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token is not valid!" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ message: "No token, authorization denied!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const admin = await Admin.findById(req.user.id);
        if (!admin) return res.status(403).json({ message: "Access denied, not an admin!" });

        next();
    } catch (error) {
        res.status(400).json({ message: "Token is not valid!" });
    }
};

export const verifyUserOrAdmin = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ message: "No token, authorization denied!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const admin = await Admin.findById(req.user.id);
        if (admin) {
            req.isAdmin = true;
            return next();
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(403).json({ message: "Access denied, not a valid user or admin!" });

        next();
    } catch (error) {
        res.status(400).json({ message: "Token is not valid!" });
    }
};

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(8, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};
