import express from 'express';
import playwright from 'playwright';

const router = express.Router();

router.post('/scrape/amazon', async (req, res) => {
  console.log('SERVER: Received Amazon scraping request');
  const { headless } = req.body;
  res.json({ success: true, message: 'Amazon scraping logic not implemented yet' });
});

router.post('/scrape/amazon2', async (req, res) => {
  console.log('SERVER: Received Amazon scraping request');
  const { headless } = req.body;

  try {
    const browser = await playwright.chromium.launch({ headless });
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com');
    await page.fill('input[name="field-keywords"]', 'Product Name');
    await page.press('input[name="field-keywords"]', 'Enter');
    await page.click('a.a-link-normal');

    const title = await page.title();
    const price = await page.textContent('span[class="a-price-whole"]');
    const rating = await page.textContent('span[class="a-icon-alt a-star-small"]');

    await browser.close();

    res.json({ title, price, rating });
  } catch (error) {
    console.error('SERVER: Error during Amazon scraping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;