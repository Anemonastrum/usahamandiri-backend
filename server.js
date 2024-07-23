import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import ProductImageRoute from "./routes/ProductImageRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import InformationRoute from "./routes/InformationRoute.js";
import "./config/db.js";
import { HOST, PORT } from './config/config.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/', ProductRoute);
app.use('/api/', ProductImageRoute);
app.use('/api/', CategoryRoute);
app.use('/api/', AuthRoute);
app.use('/api/', InformationRoute);

// Server
app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`));