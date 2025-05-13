import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';
import { chromium } from 'playwright';

interface Product {
  id: string;
  asin: string;
  title: string;
  price: string;
  rating: string;
  reviews: string;
  availability: string;
  url: string;
}

// In-memory storage for demo purposes
const products: Product[] = [];

export const amazonService = {
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(query)}`);

      const searchResults = await page.evaluate(() => {
        const items = document.querySelectorAll('[data-component-type="s-search-result"]');
        return Array.from(items).map(item => ({
          asin: item.getAttribute('data-asin') || '',
          title: item.querySelector('h2')?.textContent?.trim() || '',
          price: item.querySelector('.a-price .a-offscreen')?.textContent?.trim() || '',
          rating: item.querySelector('.a-icon-star-small')?.textContent?.trim() || '',
          reviews: item.querySelector('.a-size-small .a-link-normal')?.textContent?.trim() || '',
          availability: item.querySelector('.a-color-price')?.textContent?.trim() || '',
          url: item.querySelector('h2 a')?.getAttribute('href') || ''
        }));
      });

      await browser.close();
      return searchResults;
    } catch (error) {
      logger.error('Error searching Amazon products:', error);
      throw new AppError(500, 'Failed to search Amazon products');
    }
  },

  getProductDetails: async (asin: string): Promise<Product | null> => {
    try {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto(`https://www.amazon.com/dp/${asin}`);

      const productDetails = await page.evaluate(() => ({
        asin: document.querySelector('#ASIN')?.getAttribute('value') || '',
        title: document.querySelector('#productTitle')?.textContent?.trim() || '',
        price: document.querySelector('#priceblock_ourprice')?.textContent?.trim() || '',
        rating: document.querySelector('#acrPopover')?.getAttribute('title') || '',
        reviews: document.querySelector('#acrCustomerReviewText')?.textContent?.trim() || '',
        availability: document.querySelector('#availability')?.textContent?.trim() || '',
        url: window.location.href
      }));

      await browser.close();
      return productDetails;
    } catch (error) {
      logger.error('Error getting Amazon product details:', error);
      throw new AppError(500, 'Failed to get product details');
    }
  },

  saveProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...product
    };
    products.push(newProduct);
    return newProduct;
  },

  getSavedProducts: async (): Promise<Product[]> => {
    return products;
  },

  deleteSavedProduct: async (id: string): Promise<void> => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new AppError(404, 'Product not found');
    }
    products.splice(index, 1);
  }
}; 