import { LoggerModule } from './../logger/logger.module';
import { ProductModule } from '@/product/product.module';
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import appConfigMap from '@/config/config-maps/app.config-map';
import { AppConfigModule } from '@/config/config.module';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from '../mongo/mongo.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [appConfigMap] }),
        AppConfigModule.load(),
        LoggerModule,
        MongoModule.load(),
        ProductModule,
    ],
    providers: [SeederService],
})
export class SeederModule {}
