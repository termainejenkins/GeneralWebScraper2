import { Router } from 'express';
import { proxyController } from '../controllers/proxyController';

const router = Router();

// Get all proxies
router.get('/', proxyController.getAllProxies);

// Get proxy by ID
router.get('/:id', proxyController.getProxyById);

// Add new proxy
router.post('/', proxyController.addProxy);

// Update proxy
router.put('/:id', proxyController.updateProxy);

// Delete proxy
router.delete('/:id', proxyController.deleteProxy);

// Test proxy
router.post('/:id/test', proxyController.testProxy);

// Get next available proxy
router.get('/next/available', proxyController.getNextProxy);

export default router; 