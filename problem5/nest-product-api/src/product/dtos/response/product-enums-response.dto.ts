import { IResponse } from '@/shared/interfaces/response.interface';
import { Expose, Type } from 'class-transformer';

@Expose()
export class ProductEnumsResponseDataDto {
    constructor(partial: Partial<ProductEnumsResponseDataDto>) {
        Object.assign(this, partial);
    }
}

@Expose()
export class ProductEnumsResponseDto implements IResponse<ProductEnumsResponseDataDto> {
    success = true;

    @Type(() => ProductEnumsResponseDataDto)
    data: ProductEnumsResponseDataDto;

    constructor(partial: Partial<ProductEnumsResponseDataDto>) {
        this.data = partial;
    }
}
