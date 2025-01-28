import { Expose } from 'class-transformer';

export class PaginationResponseDataDto {
    @Expose()
    page: number;

    @Expose()
    limit: number;

    @Expose()
    totalItems: number;

    constructor(partial: PaginationResponseDataDto) {
        Object.assign(this, partial);
    }
}
