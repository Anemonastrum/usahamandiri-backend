import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import ProductImageRoute from "./routes/ProductImageRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import InformationRoute from "./routes/InformationRoute.js";
import TestRoute from "./routes/TestRoute.js";
import "./config/db.js";
import { HOST, PORT } from './config/config.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://usahamandirimagelang.com', 'http://10.10.10.121:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Token'],
    credentials: true 
}));
app.use(cookieParser());
app.use(express.json());


// Routes
app.use('/api/', ProductRoute);
app.use('/api/', ProductImageRoute);
app.use('/api/', CategoryRoute);
app.use('/api/', AuthRoute);
app.use('/api/', InformationRoute);
app.use('/', TestRoute);

// Server
app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`));