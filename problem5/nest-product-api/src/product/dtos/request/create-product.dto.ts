import { BlockchainEnum } from '@/product/enums/blockchain.enum';
import { ProductError } from '@/product/enums/product-error.enum';
import { ProductCategory } from '@/product/enums/product.enum';
import { UniqueProductName } from '@/product/validators/product-name.validator';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateIf } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: ProductError.PRODUCT_NAME_EMPTY })
    @IsString({ message: ProductError.PRODUCT_NAME_INVALID })
    @UniqueProductName({ message: ProductError.PRODUCT_NAME_EXISTED })
    name: string;

    @IsOptional()
    @ValidateIf((req) => req.description && req.description !== '')
    @IsNotEmpty({ message: ProductError.PRODUCT_DESCRIPTION_EMPTY })
    @IsString({ message: ProductError.PRODUCT_DESCRIPTION_INVALID })
    description?: string;

    @IsNotEmpty({ message: ProductError.PRODUCT_PRICE_EMPTY })
    @IsNumber({}, { message: ProductError.PRODUCT_PRICE_INVALID })
    price: number;

    @IsNotEmpty({ message: ProductError.PRODUCT_BLOCKCHAIN_EMPTY })
    @IsEnum(BlockchainEnum, { message: ProductError.PRODUCT_BLOCKCHAIN_INVALID })
    blockchain: BlockchainEnum;

    @IsOptional()
    @ValidateIf((req) => req.contractAddress && req.contractAddress !== '')
    @IsNotEmpty({ message: ProductError.PRODUCT_CONTRACT_ADDRESS_EMPTY })
    @IsString({ message: ProductError.PRODUCT_CONTRACT_ADDRESS_INVALID })
    @Matches(/^0x[a-fA-F0-9]{40}$/, { message: ProductError.PRODUCT_CONTRACT_ADDRESS_INVALID })
    contractAddress?: string;

    @IsOptional()
    @ValidateIf((req) => req.tokenId && req.tokenId !== '')
    @IsNotEmpty({ message: ProductError.PRODUCT_TOKEN_ID_EMPTY })
    @IsString({ message: ProductError.PRODUCT_TOKEN_ID_INVALID })
    tokenId?: string;

    @IsNotEmpty({ message: ProductError.PRODUCT_CATEGORY_EMPTY })
    @IsEnum(ProductCategory, { message: ProductError.PRODUCT_CATEGORY_INVALID })
    category: ProductCategory;

    @IsOptional()
    @ValidateIf((req) => req.supply && req.supply !== '')
    @IsNotEmpty({ message: ProductError.PRODUCT_SUPPLY_EMPTY })
    @IsNumber({}, { message: ProductError.PRODUCT_SUPPLY_INVALID })
    supply?: number;

    @IsNotEmpty({ message: ProductError.PRODUCT_IS_NFT_EMPTY })
    @IsBoolean({ message: ProductError.PRODUCT_IS_NFT_INVALID })
    isNFT: boolean;

    @IsOptional()
    @ValidateIf((req) => req.imageUrl && req.imageUrl !== '')
    @IsNotEmpty({ message: ProductError.PRODUCT_IMAGE_URL_EMPTY })
    @IsString({ message: ProductError.PRODUCT_IMAGE_URL_INVALID })
    imageUrl?: string;
}
