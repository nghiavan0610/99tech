import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import * as winston from 'winston';
import { DatetimeHelper } from '@/shared/helpers/datetime.helper';

export const LoggerProvider: Provider = {
    provide: 'LOGGER_PROVIDER',
    useFactory: async (configService: ConfigService) => {
        const convertLogLevel = (levels: string[]): winston.config.AbstractConfigSetLevels => {
            return levels.reduce((acc, cur, index) => {
                if (cur === 'log') {
                    cur = 'info';
                }

                acc[cur] = index;
                return acc;
            }, {});
        };
        const { combine, timestamp, simple, align, colorize } = winston.format;

        const logger = winston.createLogger({
            exitOnError: false,
            levels:
                configService.get('app.env') === 'prod'
                    ? convertLogLevel(configService.get('logger.levels'))
                    : {
                          error: 0,
                          warn: 1,
                          debug: 2,
                          info: 3,
                          http: 4,
                          verbose: 5,
                          silly: 6,
                      },
            defaultMeta: { service: configService.get('app.name') },
            format: combine(
                timestamp({
                    format: () => DatetimeHelper.getDateTimeInTz(configService.get('app.timezone'), new Date()),
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
                new winston.transports.File({ filename: `./logs/${moment().format('YYYY-MM-DD')}_exceptions.log` }),
                new winston.transports.Console({
                    stderrLevels: ['error', 'warn', 'debug', 'info'],
                }),
            ],
        });

        return logger;
    },
    inject: [ConfigService],
};
