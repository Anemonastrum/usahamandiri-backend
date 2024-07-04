import mongoose from "mongoose";
import { DB_USER, DB_KEY, DB_HOST, DB_COL } from './config.js';

const database_url = `mongodb://${DB_USER}:${DB_KEY}@${DB_HOST}:27017/${DB_COL}`

if (!DB_HOST) {
    console.error('Error: Database is not defined properly in the .env file');
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
