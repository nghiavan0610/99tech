import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import appConfigMap from './config-maps/app.config-map';
import loggerConfigMap from './config-maps/logger.config-map';
import throttlerConfigMap from './config-maps/throttler.config-map';
import mongodbConfigMap from './config-maps/mongodb.config-map';
import minioConfigMap from './config-maps/minio.config-map';

@Global()
@Module({})
export class AppConfigModule {
    static load(): DynamicModule {
        const envFilePath = [`.env.${process.env.NODE_ENV}`, '.env'];

        return {
            module: AppConfigModule,
            imports: [
                NestConfigModule.forRoot({
                    load: [appConfigMap, loggerConfigMap, mongodbConfigMap, throttlerConfigMap, minioConfigMap],
                    envFilePath,
                }),
            ],
            providers: [ConfigService],
            exports: [ConfigService],
        };
    }
}
