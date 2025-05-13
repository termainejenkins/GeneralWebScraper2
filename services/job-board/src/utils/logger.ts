import winston from 'winston';
import { config } from '../config';

const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
    ],
});

// Create a stream object for Morgan
export const stream = {
    write: (message: string) => {
        logger.info(message.trim());
    },
};

export default logger; 