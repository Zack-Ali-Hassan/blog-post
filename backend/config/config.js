import dotenv from 'dotenv';
dotenv.config();

export const port =process.env.PORT;
export const url =process.env.DATABASE_URL;
export const jwt_secret =process.env.JWT_SECRET;