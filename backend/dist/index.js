"use strict";
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDatabase } from './config/database';
// import authRoutes from './routes/auth';
// import formsRoutes from './routes/forms';
// import submissionsRoutes from './routes/submissions';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/forms', formsRoutes);
// app.use('/api/submissions', submissionsRoutes);
// // Health check
// app.get('/health', (req, res) => {
//   res.json({ status: 'OK' });
// });
// // Connect to database and start server
// const PORT = process.env.PORT || 5000;
// connectDatabase().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });
// src/server.ts (or index.ts)
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./routes/auth"));
const forms_1 = __importDefault(require("./routes/forms"));
const submissions_1 = __importDefault(require("./routes/submissions"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Enable CORS for frontend URL (with credentials)
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
// Parse JSON and urlencoded request bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API Routes
app.use('/api/auth', auth_1.default);
app.use('/api/forms', forms_1.default);
app.use('/api/submissions', submissions_1.default);
// Simple health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});
const PORT = process.env.PORT || 5000;
// Connect to database, then start server
(0, database_1.connectDatabase)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Failed to connect to database', err);
    process.exit(1); // Exit if DB connection fails
});
