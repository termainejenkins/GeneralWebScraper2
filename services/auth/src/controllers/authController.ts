import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { AppError } from '../middleware/errorHandler';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new AppError(400, 'Email and password are required');
      }
      const user = await authService.register(email, password);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new AppError(400, 'Email and password are required');
      }
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new AppError(401, 'No token provided');
      }
      const decoded = authService.verifyToken(token);
      res.json(decoded);
    } catch (error) {
      next(error);
    }
  },

  getUserProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError(401, 'User not authenticated');
      }
      const user = await authService.getUserById(userId);
      if (!user) {
        throw new AppError(404, 'User not found');
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  updateUserProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError(401, 'User not authenticated');
      }
      const user = await authService.updateUser(userId, req.body);
      if (!user) {
        throw new AppError(404, 'User not found');
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError(401, 'User not authenticated');
      }
      await authService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}; 