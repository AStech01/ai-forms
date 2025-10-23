// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDatabase } from './config/database';
// import authRoutes from './routes/auth';
// import formsRoutes from './routes/forms';
// import submissionsRoutes from './routes/submissions';

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
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDatabase } from './config/database';
import authRoutes from './routes/auth';
import formsRoutes from './routes/forms';
import submissionsRoutes from './routes/submissions';

dotenv.config();

const app = express();

// Enable CORS for frontend URL (with credentials)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formsRoutes);
app.use('/api/submissions', submissionsRoutes);

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;

// Connect to database, then start server
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to database', err);
    process.exit(1);  // Exit if DB connection fails
  });
