import dotenv from "dotenv";

dotenv.config();

export const DB_HOST = process.env.DATABASE_HOST;
export const DB_USER = process.env.DATABASE_USER;
export const DB_KEY = process.env.DATASASE_KEY;
export const DB_COL = process.env.DATABASE_COL;
export const SECRET_KEY = process.env.SECRET_KEY;
export const JWT_SECRET = process.env.JWT_SECRET;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const SESS_SECRET = process.env.SESS_SECRET;
export const COOKIE_NAME = process.env.COOKIE_NAME;
export const NODE_ENV = process.env.NODE_ENV;
