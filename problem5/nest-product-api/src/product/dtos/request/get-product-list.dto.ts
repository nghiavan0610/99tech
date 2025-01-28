import { BlockchainEnum } from '@/product/enums/blockchain.enum';
import { ProductError } from '@/product/enums/product-error.enum';
import { ProductCategory } from '@/product/enums/product.enum';
import { PaginationDto } from '@/shared/dtos/request/pagination.dto';
import { SortByEnum } from '@/shared/types/pagination.type';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, Min, ValidateIf } from 'class-validator';

enum ProductOrderByEnum {
    PRICE = 'price',
}

export class GetProductListDto extends PaginationDto {
    @IsOptional()
    @ValidateIf((req) => req.blockchains && req.blockchains.length)
    @IsArray({ message: ProductError.PRODUCT_BLOCKCHAIN_INVALID })
    @IsEnum(BlockchainEnum, { each: true, message: ProductError.PRODUCT_BLOCKCHAIN_INVALID })
    @Transform(({ value }) => (value !== '' ? value.split(',').map((v) => v.trim()) : value))
    blockchains?: BlockchainEnum[];

    @IsOptional()
    @ValidateIf((req) => req.categories && req.categories.length)
    @IsArray({ message: ProductError.PRODUCT_CATEGORY_INVALID })
    @IsEnum(ProductCategory, { each: true, message: ProductError.PRODUCT_CATEGORY_INVALID })
    @Transform(({ value }) => (value !== '' ? value.split(',').map((v) => v.trim()) : value))
    categories?: ProductCategory[];

    @IsOptional()
    @ValidateIf((req) => req.isNFT && req.isNFT !== '')
    @IsNotEmpty({ message: ProductError.PRODUCT_IS_NFT_EMPTY })
    @IsBoolean({ message: ProductError.PRODUCT_IS_NFT_INVALID })
    @Transform(({ value }) => (value !== '' ? value.toLowerCase() === 'true' : value))
    isNFT?: boolean;

    @IsOptional()
    @ValidateIf((req) => req.minPrice !== undefined && req.minPrice !== '')
    @Transform(({ value }) => {
        if (!value || value === '') return undefined;
        const num = Number(value);
        return isNaN(num) ? value : num;
    })
    @IsNumber({}, { message: ProductError.PRODUCT_PRICE_INVALID })
    @Min(0, { message: ProductError.PRODUCT_PRICE_INVALID })
    minPrice?: number;

    @IsOptional()
    @ValidateIf((req) => req.maxPrice !== undefined && req.maxPrice !== '')
    @Transform(({ value }) => {
        if (!value || value === '') return undefined;
        const num = Number(value);
        return isNaN(num) ? value : num;
    })
    @IsNumber({}, { message: ProductError.PRODUCT_PRICE_INVALID })
    @Min(0, { message: ProductError.PRODUCT_PRICE_INVALID })
    maxPrice?: number;

    @IsOptional()
    search?: string;

    @IsOptional()
    @ValidateIf((req) => req.sortBy && req.sortBy !== '')
    @IsEnum({ ...SortByEnum, ...ProductOrderByEnum })
    @Transform(({ value }) => (value === undefined || value === '' ? SortByEnum.CREATED_AT : value))
    sortBy?: SortByEnum | ProductOrderByEnum = SortByEnum.CREATED_AT;
}
