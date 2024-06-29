import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const database_url = process.env.DATABASE_URL;

if (!database_url) {
    console.error('Error: DATABASE_URL is not defined in the .env file');
    process.exit(1);
}

const connectWithRetry = () => {
    console.log('Attempting to connect to the database...');
    mongoose.connect(database_url)
        .then(() => {
            console.log('Database connected');
        })
        .catch((err) => {
            console.error('Database connection error:', err);
            console.log('Retrying in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
};

const db = mongoose.connection;
db.on('error', (error) => console.log('Connection error:', error));

connectWithRetry();
