import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';
import { chromium } from 'playwright';

interface JobBoard {
  id: string;
  name: string;
  url: string;
  selectors: {
    jobTitle: string;
    company: string;
    location: string;
    description: string;
  };
}

// In-memory storage for demo purposes
// In production, this would be replaced with a database
const jobBoards: JobBoard[] = [];

export const jobBoardService = {
  getAllJobBoards: async (): Promise<JobBoard[]> => {
    return jobBoards;
  },

  getJobBoardById: async (id: string): Promise<JobBoard | null> => {
    return jobBoards.find(board => board.id === id) || null;
  },

  createJobBoard: async (data: Omit<JobBoard, 'id'>): Promise<JobBoard> => {
    const newJobBoard: JobBoard = {
      id: Date.now().toString(),
      ...data
    };
    jobBoards.push(newJobBoard);
    return newJobBoard;
  },

  updateJobBoard: async (id: string, data: Partial<JobBoard>): Promise<JobBoard | null> => {
    const index = jobBoards.findIndex(board => board.id === id);
    if (index === -1) return null;

    jobBoards[index] = { ...jobBoards[index], ...data };
    return jobBoards[index];
  },

  deleteJobBoard: async (id: string): Promise<void> => {
    const index = jobBoards.findIndex(board => board.id === id);
    if (index === -1) {
      throw new AppError(404, 'Job board not found');
    }
    jobBoards.splice(index, 1);
  },

  scrapeJobBoard: async (id: string): Promise<any> => {
    const jobBoard = await jobBoardService.getJobBoardById(id);
    if (!jobBoard) {
      throw new AppError(404, 'Job board not found');
    }

    try {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto(jobBoard.url);

      // Extract job listings using the configured selectors
      const jobs = await page.evaluate((selectors) => {
        const jobElements = document.querySelectorAll(selectors.jobTitle);
        return Array.from(jobElements).map(element => ({
          title: element.textContent,
          company: element.closest(selectors.company)?.textContent,
          location: element.closest(selectors.location)?.textContent,
          description: element.closest(selectors.description)?.textContent
        }));
      }, jobBoard.selectors);

      await browser.close();
      return jobs;
    } catch (error) {
      logger.error('Error scraping job board:', error);
      throw new AppError(500, 'Failed to scrape job board');
    }
  }
}; 