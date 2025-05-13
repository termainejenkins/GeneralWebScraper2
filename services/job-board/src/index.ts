import express from 'express';
import cors from 'cors';
import { jobBoardRouter } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/job-board', jobBoardRouter);

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Start server
app.listen(port, () => {
  logger.info(`Job Board Service running on port ${port}`);
}); 