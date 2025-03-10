import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 8080,
    env: process.env.NODE_ENV || 'dev',
    name: process.env.SERVICE_NAME,
    allowedOrigin: process.env.ALLOWED_ORIGIN === '*' ? '*' : process.env.ALLOWED_ORIGIN.split(','),
    timezone: process.env.SERVER_TIMEZONE,
    version: process.env.APP_VERSION,
}));
