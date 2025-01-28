import { BlockchainEnum } from '@/product/enums/blockchain.enum';
import { ProductCategory } from '@/product/enums/product.enum';
import { IResponse } from '@/shared/interfaces/response.interface';
import { Expose, Type } from 'class-transformer';

class ProductMetadata {
    @Expose()
    traitType?: string;

    @Expose()
    value?: any;
}

export class ProductResponseDataDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description?: string;

    @Expose()
    price: number;

    @Expose()
    blockchain: BlockchainEnum;

    @Expose()
    contractAddress?: string;

    @Expose()
    tokenId?: string;

    @Expose()
    category: ProductCategory;

    @Expose()
    supply: number;

    @Expose()
    isNFT: boolean;

    @Expose()
    imageUrl?: string;

    @Expose()
    author?: string;

    @Expose()
    @Type(() => ProductMetadata)
    metadata: ProductMetadata[];

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt?: Date;

    constructor(partial: Partial<ProductResponseDataDto>) {
        Object.assign(this, partial);
    }
}

@Expose()
export class ProductResponseDto implements IResponse<ProductResponseDataDto> {
    success = true;

    @Type(() => ProductResponseDataDto)
    data: ProductResponseDataDto;

    constructor(partial: ProductResponseDataDto) {
        this.data = partial;
    }
}
