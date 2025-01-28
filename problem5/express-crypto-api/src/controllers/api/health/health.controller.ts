import httpStatus from 'http-status';
import config from '@config/index';
import { Request, Response } from 'express';

class HealthController {
    healthCheck(req: Request, res: Response) {
        res.status(httpStatus.OK).json({
            status: 'OK',
            service: config.app.name,
            version: config.app.version,
            timestamp: new Date().toISOString(),
        });
    }
}

export const healthController = new HealthController();
