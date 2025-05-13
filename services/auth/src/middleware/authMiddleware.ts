import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { AppError } from './errorHandler';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(401, 'No token provided');
    }

    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError(401, 'User not authenticated');
      }

      if (!roles.includes(req.user.role)) {
        throw new AppError(403, 'Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}; 