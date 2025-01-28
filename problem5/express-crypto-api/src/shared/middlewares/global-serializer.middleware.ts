import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { logger } from '@shared/modules/logger';

export const globalSerializer = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const originalJson = res.json;
        res.json = function (body: any) {
            try {
                if (body && body.constructor && typeof body === 'object' && body.success === true) {
                    const serialized = plainToInstance(body.constructor, body, {
                        strategy: 'excludeAll',
                        enableImplicitConversion: true,
                    });

                    return originalJson.call(this, serialized);
                }
                return originalJson.call(this, body);
            } catch (error) {
                logger.error('Serialization error:', error);
                return originalJson.call(this, body);
            }
        };
        next();
    };
};
