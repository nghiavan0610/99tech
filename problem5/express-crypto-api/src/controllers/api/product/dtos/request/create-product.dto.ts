import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { BlockchainEnum, ProductCategory } from '@models/product.model';
import { ProductError } from '../../enums/product-error.enum';

export class CreateProductDto {
    @IsNotEmpty({ message: ProductError.PRODUCT_NAME_EMPTY })
    @IsString({ message: ProductError.PRODUCT_NAME_INVALID })
    name: string;

    @IsOptional()
    @IsString({ message: ProductError.PRODUCT_DESCRIPTION_INVALID })
    description?: string;

    @IsNotEmpty({ message: ProductError.PRODUCT_PRICE_EMPTY })
    @IsNumber({}, { message: ProductError.PRODUCT_PRICE_INVALID })
    price: number;

    @IsNotEmpty({ message: ProductError.PRODUCT_BLOCKCHAIN_EMPTY })
    @IsEnum(BlockchainEnum, { message: ProductError.PRODUCT_BLOCKCHAIN_INVALID })
    blockchain: BlockchainEnum;

    @IsOptional()
    @IsString({ message: ProductError.PRODUCT_CONTRACT_ADDRESS_INVALID })
    @Matches(/^0x[a-fA-F0-9]{40}$/, { message: ProductError.PRODUCT_CONTRACT_ADDRESS_INVALID })
    contractAddress?: string;

    @IsOptional()
    @IsString({ message: ProductError.PRODUCT_TOKEN_ID_INVALID })
    tokenId?: string;

    @IsNotEmpty({ message: ProductError.PRODUCT_CATEGORY_EMPTY })
    @IsEnum(ProductCategory, { message: ProductError.PRODUCT_CATEGORY_INVALID })
    category: ProductCategory;

    @IsOptional()
    @IsNumber({}, { message: ProductError.PRODUCT_SUPPLY_INVALID })
    supply?: number;

    @IsNotEmpty({ message: ProductError.PRODUCT_IS_NFT_EMPTY })
    @IsBoolean({ message: ProductError.PRODUCT_IS_NFT_INVALID })
    isNFT: boolean;

    @IsOptional()
    @IsString({ message: ProductError.PRODUCT_IMAGE_URL_INVALID })
    imageUrl?: string;
}
