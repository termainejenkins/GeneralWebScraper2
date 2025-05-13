import express from 'express';
import cors from 'cors';
import proxyRouter from './routes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/proxies', proxyRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`Proxy service is running on port ${port}`);
}); 