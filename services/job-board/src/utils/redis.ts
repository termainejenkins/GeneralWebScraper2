import { createClient } from 'redis';
import { config } from '../config';
import logger from './logger';

const redisClient = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
});

redisClient.on('error', (err) => {
    logger.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    logger.info('Redis Client Connected');
});

// Connect to Redis
const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        logger.error('Failed to connect to Redis:', error);
        process.exit(1);
    }
};

// Publish message to a channel
const publish = async (channel: string, message: any) => {
    try {
        await redisClient.publish(channel, JSON.stringify(message));
    } catch (error) {
        logger.error(`Failed to publish message to channel ${channel}:`, error);
        throw error;
    }
};

// Subscribe to a channel
const subscribe = async (channel: string, callback: (message: any) => void) => {
    try {
        const subscriber = redisClient.duplicate();
        await subscriber.connect();
        await subscriber.subscribe(channel, (message) => {
            try {
                const parsedMessage = JSON.parse(message);
                callback(parsedMessage);
            } catch (error) {
                logger.error(`Failed to parse message from channel ${channel}:`, error);
            }
        });
        return subscriber;
    } catch (error) {
        logger.error(`Failed to subscribe to channel ${channel}:`, error);
        throw error;
    }
};

export { connectRedis, publish, subscribe, redisClient }; 