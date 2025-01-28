import { Router } from 'express';
import { healthController } from './health.controller';

const healthRouter: Router = Router();

healthRouter.get('/', healthController.healthCheck);

export default healthRouter;
