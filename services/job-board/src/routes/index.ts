import { Router } from 'express';
import { jobBoardController } from '../controllers/jobBoardController';

const router = Router();

// Get all job boards
router.get('/', jobBoardController.getAllJobBoards);

// Get job board by ID
router.get('/:id', jobBoardController.getJobBoardById);

// Create new job board
router.post('/', jobBoardController.createJobBoard);

// Update job board
router.put('/:id', jobBoardController.updateJobBoard);

// Delete job board
router.delete('/:id', jobBoardController.deleteJobBoard);

// Scrape job board
router.post('/:id/scrape', jobBoardController.scrapeJobBoard);

export const jobBoardRouter = router; 