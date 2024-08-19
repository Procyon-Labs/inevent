import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const OPEN_AI_KEY = process.env.OPEN_AI_KEY || 'xxxx';
