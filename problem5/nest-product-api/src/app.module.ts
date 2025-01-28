import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfigMap from './config/config-maps/app.config-map';
import { AppConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './shared/modules/logger/logger.module';
import { CustomThrottlerModule } from './shared/modules/throttler/throttler.module';
import { MongoModule } from './shared/modules/mongo/mongo.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { S3Module } from './shared/modules/s3/s3.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [appConfigMap] }),
        AppConfigModule.load(),
        HealthModule,
        LoggerModule,
        MongoModule.load(),
        CustomThrottlerModule,
        ProductModule,
        S3Module,
        UploadModule,
    ],
    providers: [],
})
export class AppModule {}
