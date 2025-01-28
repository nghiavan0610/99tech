import { OrderByEnum } from '@/shared/types/pagination.type';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min, ValidateIf } from 'class-validator';

export class PaginationDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @ValidateIf((req) => req.orderBy && req.orderBy !== '')
    @IsEnum(OrderByEnum)
    @Transform(({ value }) => (value === undefined || value === '' ? OrderByEnum.DESC : value))
    orderBy?: OrderByEnum = OrderByEnum.DESC;
}
