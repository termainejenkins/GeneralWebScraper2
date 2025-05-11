import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: { '^/api': '/api' },
  onError: (err, req, res) => {
    console.error('PROXY SERVER: Proxy Error:', err);
    res.status(500).send('Proxy Error');
  },
});

router.use('/api', proxyMiddleware);
router.use('/', proxyMiddleware);

const app = express();
app.use('/proxy', router);

export default router;