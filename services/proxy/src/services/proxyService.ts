import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';
import axios from 'axios';

interface Proxy {
  id: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
  isActive: boolean;
  lastUsed: Date;
  successRate: number;
}

// In-memory storage for demo purposes
const proxies: Proxy[] = [];

export const proxyService = {
  getAllProxies: async (): Promise<Proxy[]> => {
    return proxies;
  },

  getProxyById: async (id: string): Promise<Proxy | null> => {
    return proxies.find(proxy => proxy.id === id) || null;
  },

  addProxy: async (proxy: Omit<Proxy, 'id' | 'lastUsed' | 'successRate'>): Promise<Proxy> => {
    const newProxy: Proxy = {
      id: Date.now().toString(),
      lastUsed: new Date(),
      successRate: 100,
      ...proxy
    };
    proxies.push(newProxy);
    return newProxy;
  },

  updateProxy: async (id: string, data: Partial<Proxy>): Promise<Proxy | null> => {
    const index = proxies.findIndex(proxy => proxy.id === id);
    if (index === -1) return null;

    proxies[index] = { ...proxies[index], ...data };
    return proxies[index];
  },

  deleteProxy: async (id: string): Promise<void> => {
    const index = proxies.findIndex(proxy => proxy.id === id);
    if (index === -1) {
      throw new AppError(404, 'Proxy not found');
    }
    proxies.splice(index, 1);
  },

  testProxy: async (id: string): Promise<boolean> => {
    const proxy = await proxyService.getProxyById(id);
    if (!proxy) {
      throw new AppError(404, 'Proxy not found');
    }

    try {
      const proxyConfig = {
        host: proxy.host,
        port: proxy.port,
        auth: proxy.username && proxy.password
          ? {
              username: proxy.username,
              password: proxy.password
            }
          : undefined
      };

      const response = await axios.get('https://api.ipify.org?format=json', {
        proxy: proxyConfig,
        timeout: 5000
      });

      // Update proxy stats
      proxy.lastUsed = new Date();
      proxy.successRate = (proxy.successRate * 0.9) + (response.status === 200 ? 10 : 0);

      return response.status === 200;
    } catch (error) {
      logger.error('Error testing proxy:', error);
      proxy.successRate = proxy.successRate * 0.9;
      return false;
    }
  },

  getNextProxy: async (): Promise<Proxy | null> => {
    // Get the least recently used active proxy
    const availableProxies = proxies
      .filter(proxy => proxy.isActive)
      .sort((a, b) => a.lastUsed.getTime() - b.lastUsed.getTime());

    return availableProxies[0] || null;
  }
}; 