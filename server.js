import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import ProductImageRoute from "./routes/ProductImageRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import "./database/mongodb.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(ProductRoute);
app.use(ProductImageRoute);
app.use(CategoryRoute);
app.use(AuthRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
