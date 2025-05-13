import { Request, Response, NextFunction } from 'express';
import { proxyService } from '../services/proxyService';
import { AppError } from '../middleware/errorHandler';

export const proxyController = {
  getAllProxies: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proxies = await proxyService.getAllProxies();
      res.json(proxies);
    } catch (error) {
      next(error);
    }
  },

  getProxyById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proxy = await proxyService.getProxyById(req.params.id);
      if (!proxy) {
        throw new AppError(404, 'Proxy not found');
      }
      res.json(proxy);
    } catch (error) {
      next(error);
    }
  },

  addProxy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proxy = await proxyService.addProxy(req.body);
      res.status(201).json(proxy);
    } catch (error) {
      next(error);
    }
  },

  updateProxy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proxy = await proxyService.updateProxy(req.params.id, req.body);
      if (!proxy) {
        throw new AppError(404, 'Proxy not found');
      }
      res.json(proxy);
    } catch (error) {
      next(error);
    }
  },

  deleteProxy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await proxyService.deleteProxy(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  testProxy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isWorking = await proxyService.testProxy(req.params.id);
      res.json({ isWorking });
    } catch (error) {
      next(error);
    }
  },

  getNextProxy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proxy = await proxyService.getNextProxy();
      if (!proxy) {
        throw new AppError(404, 'No available proxies found');
      }
      res.json(proxy);
    } catch (error) {
      next(error);
    }
  }
}; 