import { Request, Response, NextFunction } from 'express';
import { jobBoardService } from '../services/jobBoardService';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const jobBoardController = {
  getAllJobBoards: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobBoards = await jobBoardService.getAllJobBoards();
      res.json(jobBoards);
    } catch (error) {
      next(error);
    }
  },

  getJobBoardById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const jobBoard = await jobBoardService.getJobBoardById(id);
      if (!jobBoard) {
        throw new AppError(404, 'Job board not found');
      }
      res.json(jobBoard);
    } catch (error) {
      next(error);
    }
  },

  createJobBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobBoard = await jobBoardService.createJobBoard(req.body);
      res.status(201).json(jobBoard);
    } catch (error) {
      next(error);
    }
  },

  updateJobBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const jobBoard = await jobBoardService.updateJobBoard(id, req.body);
      if (!jobBoard) {
        throw new AppError(404, 'Job board not found');
      }
      res.json(jobBoard);
    } catch (error) {
      next(error);
    }
  },

  deleteJobBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await jobBoardService.deleteJobBoard(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  scrapeJobBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const results = await jobBoardService.scrapeJobBoard(id);
      res.json(results);
    } catch (error) {
      next(error);
    }
  }
}; 