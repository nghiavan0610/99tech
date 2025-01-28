import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerOptionsFactory } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    async createThrottlerOptions() {
        return [
            {
                name: 'sec',
                ttl: this.configService.get('throttler.second.ttl'),
                limit: this.configService.get('throttler.second.limit'),
            },
            {
                name: 'min',
                ttl: this.configService.get('throttler.minute.ttl'),
                limit: this.configService.get('throttler.minute.limit'),
            },
        ];
    }
}
