require('module-alias/register');
import 'reflect-metadata';
import app from './app';
import { logger } from './shared/modules/logger';

const server = app.listen(app.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', process.env.PORT, app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});

export default server;
