import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import ProductImageRoute from "./routes/ProductImageRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";


dotenv.config();

const app = express();
const port = process.env.PORT;
const database_url = process.env.DATABASE_URL;

if (!database_url) {
    console.error('Error: DATABASE_URL is not defined in the .env file');
    process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(ProductRoute);
app.use(ProductImageRoute);
app.use(CategoryRoute);

mongoose.connect(database_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database connected'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
