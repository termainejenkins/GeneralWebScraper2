import dotenv from 'dotenv';
import Joi from 'joi';

// Load environment variables
dotenv.config();

// Define the schema for environment variables
const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(3000),
    REDIS_HOST: Joi.string().default('localhost'),
    REDIS_PORT: Joi.number().default(6379),
    LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
}).unknown();

// Validate environment variables
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// Export configuration
export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    redis: {
        host: envVars.REDIS_HOST,
        port: envVars.REDIS_PORT,
    },
    logLevel: envVars.LOG_LEVEL,
} as const; 