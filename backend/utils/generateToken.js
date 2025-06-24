import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndcookie = (userId,res) => {
    const token = jwt.sign({ id: userId }, ENV_VARS.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie('jwt-netflix', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie =>xss attacks
    sameSite: 'strict', // Helps prevent CSRF attacks => only sends the cookie in requests from the same site
    secure: process.env.NODE_ENV !== 'development', // Ensures the cookie is sent over HTTPS in production
    });

    return token;
}