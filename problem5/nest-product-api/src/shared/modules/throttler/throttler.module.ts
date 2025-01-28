import { Global, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerConfigService } from './throttler-config-service.factory';

@Global()
@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            useClass: ThrottlerConfigService,
        }),
    ],
    providers: [
        ThrottlerConfigService,
        {
            provide: 'THROTTLER_OPTIONS',
            useFactory: (configService: ThrottlerConfigService) => configService.createThrottlerOptions(),
            inject: [ThrottlerConfigService],
        },
    ],
    exports: [ThrottlerModule, 'THROTTLER_OPTIONS'],
})
export class CustomThrottlerModule {}
