import mongoose from 'mongoose';
import { logger } from '@shared/modules/logger';
import config from '@config/index';
import path from 'path';
import toJSON from '@shared/helpers/mongo.helper';

export const connectMongo = async () => {
    const isProd = config.app.env === 'prod';
    const options: mongoose.ConnectOptions = {
        dbName: config.mongo.dbName,
        authSource: config.mongo.auth,
    };

    if (isProd) {
        const caPath = path.join(__dirname, config.mongo.caPath);
        const certPath = path.join(__dirname, config.mongo.certPath);

        Object.assign(options, {
            replicaSet: config.mongo.replicaSet,
            readPreference: 'secondary',
            tls: true,
            tlsInsecure: true,
            tlsCAFile: caPath,
            tlsCertificateKeyFile: certPath,
        });
    }

    mongoose.set('debug', process.env.NODE_ENV !== 'prod');

    // Add MongoDB plugins
    mongoose.plugin(toJSON);

    try {
        await mongoose.connect(config.mongo.url, options);
        logger.info('MongoDB connected!');

        mongoose.connection.on('error', (error) => {
            logger.error('MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected. Trying to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            logger.info('MongoDB reconnected!');
        });
    } catch (error) {
        logger.error(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
        process.exit(1);
    }
};
