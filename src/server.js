import App from './app.js';
import dotenv from 'dotenv';
dotenv.config();

App.start(Number(process.env.PORT) || 3052);
