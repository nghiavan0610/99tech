import { Router } from 'express';
import healthRouter from './health';
import productRouter from './product';
import uploadRouter from './upload';

const apiRouter: Router = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/uploads', uploadRouter);

export default apiRouter;
