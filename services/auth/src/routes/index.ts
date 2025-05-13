import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', authController.verifyToken);

// Protected routes
router.get('/profile', authenticate, authController.getUserProfile);
router.put('/profile', authenticate, authController.updateUserProfile);
router.delete('/profile', authenticate, authController.deleteUser);

// Admin routes
router.get('/users', authenticate, authorize(['admin']), authController.getUserProfile);
router.put('/users/:id', authenticate, authorize(['admin']), authController.updateUserProfile);
router.delete('/users/:id', authenticate, authorize(['admin']), authController.deleteUser);

export default router; 