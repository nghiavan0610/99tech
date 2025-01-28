import config from '@config/index';
import winston from 'winston';
import moment from 'moment-timezone';
import { getDateTimeInTz } from '@shared/helpers/datetime.helper';

const getLogLevel = (levels: string): winston.config.AbstractConfigSetLevels => {
    const levelArray = levels.split(',');
    return levelArray.reduce((acc, cur, index) => {
        if (cur === 'log') {
            cur = 'info';
        }
        acc[cur] = index;
        return acc;
    }, {} as winston.config.AbstractConfigSetLevels);
};

const { combine, timestamp, simple, align, colorize } = winston.format;

const logger = winston.createLogger({
    exitOnError: false,
    levels:
        config.app.env === 'prod'
            ? getLogLevel(config.logger.levels)
            : {
                  error: 0,
                  warn: 1,
                  debug: 2,
                  info: 3,
                  http: 4,
                  verbose: 5,
                  silly: 6,
              },
    defaultMeta: { service: config.app.name },
    format: combine(
        timestamp({
            format: () => getDateTimeInTz(config.app.timezone, new Date()),
        }),
        align(),
        colorize(),
        simple(),
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error', 'warn', 'debug', 'info'],
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: `./logs/${moment().format('YYYY-MM-DD')}_exceptions.log`,
        }),
        new winston.transports.Console({
            stderrLevels: ['error', 'warn', 'debug', 'info'],
        }),
    ],
});

export { logger };
