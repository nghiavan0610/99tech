import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
    levels: process.env.LOGGER_LEVELS.split(',') as LogLevel[],
}));
