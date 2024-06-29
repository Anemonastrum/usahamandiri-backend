import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import ProductImageRoute from "./routes/ProductImageRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

if (!process.env.PORT) {
    console.error('Error: PORT is not defined in the .env file');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(ProductRoute);
app.use(ProductImageRoute);
app.use(CategoryRoute);
app.use(AuthRoute);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
