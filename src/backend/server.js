import express from 'express';
import cors from 'cors';
import jobBoardRoutes from './routes/jobBoardRoutes.js';
import amazonRoutes from './routes/amazonRoutes.js';
import proxyRoutes from './routes/proxyRoutes.js';

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/jobBoard', jobBoardRoutes);
app.use('/api/amazon', amazonRoutes);
app.use('/api/proxy', proxyRoutes);

// Start the server
app.listen(port, () => {
  console.log(`SERVER: API server is running on http://localhost:${port}`);
});