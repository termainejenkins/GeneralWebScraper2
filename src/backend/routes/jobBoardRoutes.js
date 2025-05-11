import express from 'express';
import { runMonsterWorker } from '../workers/monsterWorker.js';

const router = express.Router();

router.post('/scrape/jobBoard', async (req, res) => {
  console.log('SERVER: Received Job Board scraping request');
  const { websites, jobTitles, locations, headless } = req.body;

  if (!websites || !jobTitles || !locations) {
    return res.status(400).json({ error: 'Websites, job titles, and locations are required' });
  }

  try {
    const jobBoardData = await runMonsterWorker(websites, jobTitles, locations, headless);
    console.log('SERVER: Job Board Data:', jobBoardData);
    res.json({ success: true, data: jobBoardData });
  } catch (error) {
    console.error('SERVER: Error during Job Board scraping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;