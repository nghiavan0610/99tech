import rateLimit from 'express-rate-limit';
import { logger } from '@shared/modules/logger';
import config from '@config/index';

const secondLimiter = rateLimit({
    windowMs: config.throttler.second.ttl,
    max: config.throttler.second.limit,
    message: {
        status: 'error',
        message: 'Too many requests per second',
    },
    handler: (req, res, next, options) => {
        logger.warn(`Rate limit exceeded: ${options.message.message}`);
        res.status(429).json(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const minuteLimiter = rateLimit({
    windowMs: config.throttler.minute.ttl,
    max: config.throttler.minute.limit,
    message: {
        status: 'error',
        message: 'Too many requests per minute',
    },
    handler: (req, res, next, options) => {
        logger.warn(`Rate limit exceeded: ${options.message.message}`);
        res.status(429).json(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export { secondLimiter, minuteLimiter };
