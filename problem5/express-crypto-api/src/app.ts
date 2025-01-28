import apiRouter from './controllers/api';
import express from 'express';
import { errorHandler } from './shared/middlewares/error-handler.middleware';
import { secondLimiter, minuteLimiter } from '@shared/modules/throttler';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import config from './config';
import { globalSerializer } from '@shared/middlewares/global-serializer.middleware';
import { connectMongo } from '@shared/modules/mongo';

const app = express();

// Initialize MongoDB connection
connectMongo();

app.use(helmet());
if (process.env.NODE_ENV !== 'prod') {
    app.use(morgan('combined'));
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: config.app.allowedOrigin,
        credentials: true,
    }),
);

// Add serializer before routes
app.use(globalSerializer());

// Rate limiting
app.use(secondLimiter);
app.use(minuteLimiter);

// Routes
const version = process.env.APP_VERSION;
app.use(`/api/${version}`, apiRouter);

// Error handling middleware
app.use(errorHandler);

const httpServer = createServer(app);
httpServer.listen(process.env.PORT || 3000);

export default app;
