import { Expose, Type } from 'class-transformer';
import { ProductResponseDataDto } from './product-response.dto';
import { IResponse } from '@shared/interfaces/response.interface';
import { PaginationResponseDataDto } from '@shared/dtos/response/pagination-response-data.dto';

@Expose()
export class ProductListResponseDto implements IResponse<ProductResponseDataDto[]> {
    success?: boolean = true;

    @Type(() => ProductResponseDataDto)
    data: ProductResponseDataDto[];

    @Type(() => PaginationResponseDataDto)
    pagination: PaginationResponseDataDto;

    constructor(partial: Partial<ProductListResponseDto>) {
        // this.data = partial.data;
        // this.pagination = partial.pagination;
        Object.assign(this, partial);
    }
}
