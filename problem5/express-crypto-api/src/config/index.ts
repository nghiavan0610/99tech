import httpStatus from 'http-status';
import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

// dotenv.config();
dotenv.config({ path: path.join(__dirname, '../../.env') });

export interface IEnvVarSchema {
    NODE_ENV: string;
    HOST: string;
    PORT: number;
    SERVICE_NAME: string;
    LOGGER_LEVELS: string;
    ALLOWED_ORIGIN: string;
    SERVER_TIMEZONE: string;
    APP_VERSION: string;

    // MongoDB
    MONGODB_URL: string;
    MONGODB_NAME: string;
    MONGODB_AUTH: string;
    MONGODB_REPLICA_SET: string;
    MONGODB_CA_PATH: string;
    MONGODB_CERT_PATH: string;

    // Rate Limiting
    GLOBAL_THROTTLER_TTL_SECOND: number;
    GLOBAL_THROTTLER_LIMIT_SECOND: number;
    GLOBAL_THROTTLER_TTL_MINUTE: number;
    GLOBAL_THROTTLER_LIMIT_MINUTE: number;

    // MinIO
    MIN_IO_ACCESS_KEY: string;
    MIN_IO_SECRET_KEY: string;
    MIN_IO_REGION: string;
    MIN_IO_ENDPOINT: string;
    MIN_IO_BUCKET: string;
    MIN_IO_CDN: string;
}

const envVarSchema: Joi.ObjectSchema<IEnvVarSchema> = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('local', 'dev', 'test', 'uat', 'prod').required(),
        HOST: Joi.string().default('localhost'),
        PORT: Joi.number().default(5001),
        SERVICE_NAME: Joi.string().default('express-crypto-api'),
        LOGGER_LEVELS: Joi.string().default('error,warn,log'),
        ALLOWED_ORIGIN: Joi.string().default('*'),
        SERVER_TIMEZONE: Joi.string().default('Asia/Saigon'),
        APP_VERSION: Joi.string().default('v1'),
        MONGODB_URL: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        MONGODB_AUTH: Joi.string().required(),
        MONGODB_REPLICA_SET: Joi.string().required(),
        MONGODB_CA_PATH: Joi.string().required(),
        MONGODB_CERT_PATH: Joi.string().required(),
        GLOBAL_THROTTLER_TTL_SECOND: Joi.number().default(1000),
        GLOBAL_THROTTLER_LIMIT_SECOND: Joi.number().default(20),
        GLOBAL_THROTTLER_TTL_MINUTE: Joi.number().default(60000),
        GLOBAL_THROTTLER_LIMIT_MINUTE: Joi.number().default(1000),
        MIN_IO_ACCESS_KEY: Joi.string().required(),
        MIN_IO_SECRET_KEY: Joi.string().required(),
        MIN_IO_REGION: Joi.string().required(),
        MIN_IO_ENDPOINT: Joi.string().required(),
        MIN_IO_BUCKET: Joi.string().required(),
        MIN_IO_CDN: Joi.optional(),
    })
    .unknown();

const { value, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
const envVars: IEnvVarSchema = value;

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    app: {
        env: envVars.NODE_ENV,
        host: envVars.HOST,
        port: envVars.PORT,
        name: envVars.SERVICE_NAME,
        allowedOrigin: envVars.ALLOWED_ORIGIN.split(','),
        timezone: envVars.SERVER_TIMEZONE,
        version: envVars.APP_VERSION,
    },
    logger: {
        levels: envVars.LOGGER_LEVELS,
    },
    throttler: {
        second: {
            ttl: envVars.GLOBAL_THROTTLER_TTL_SECOND,
            limit: envVars.GLOBAL_THROTTLER_LIMIT_SECOND,
        },
        minute: {
            ttl: envVars.GLOBAL_THROTTLER_TTL_MINUTE,
            limit: envVars.GLOBAL_THROTTLER_LIMIT_MINUTE,
        },
    },
    mongo: {
        url: envVars.MONGODB_URL,
        dbName: envVars.MONGODB_NAME,
        auth: envVars.MONGODB_AUTH,
        replicaSet: envVars.MONGODB_REPLICA_SET,
        caPath: envVars.MONGODB_CA_PATH,
        certPath: envVars.MONGODB_CERT_PATH,
    },
    minIO: {
        s3: {
            accessKey: envVars.MIN_IO_ACCESS_KEY,
            secretKey: envVars.MIN_IO_SECRET_KEY,
            region: envVars.MIN_IO_REGION,
            endpoint: envVars.MIN_IO_ENDPOINT,
            bucket: envVars.MIN_IO_BUCKET,
            cdn: envVars.MIN_IO_CDN,
        },
    },
};
