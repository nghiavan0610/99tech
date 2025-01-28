import { Inject, Injectable } from '@nestjs/common';
import { ILoggerService } from '../logger/services/logger-service.interface';
import { ProductSeeder } from '@/product/seeders/product.seeder';

@Injectable()
export class SeederService {
    constructor(
        @Inject(ILoggerService) private readonly logger: ILoggerService,
        private readonly productSeeder: ProductSeeder,
    ) {}

    async up() {
        try {
            this.logger.info('[START SEEDING UP]');

            await this.productSeeder.seedUp();

            this.logger.info('[END SEEDING UP]');
        } catch (err) {
            this.logger.info('[SEEDING UP FAILED] err', err);
        }
    }

    async down() {
        try {
            this.logger.info('[START SEEDING DOWN]');

            await this.productSeeder.seedDown();

            this.logger.info('[END SEEDING DOWN]');
        } catch (err) {
            this.logger.info('[SEEDING DOWN FAILED] err', err);
        }
    }
}
