import { Controller, Get, Inject } from '@nestjs/common';
import { IHealthService } from '../services/health-service.interface';
import { HealthResponseDto } from '../dtos/health-response.dto';

@Controller('health')
export class HealthController {
    constructor(@Inject(IHealthService) private readonly healthService: IHealthService) {}

    @Get()
    async healthCheck(): Promise<HealthResponseDto> {
        const result = await this.healthService.healthCheck();

        return new HealthResponseDto(result);
    }
}
