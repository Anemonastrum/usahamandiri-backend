import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const database_url = process.env.DATABASE_URL;

if (!database_url) {
    console.error('Error: DATABASE_URL is not defined in the .env file');
    process.exit(1);
}

mongoose.connect(database_url);

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database connected'));
