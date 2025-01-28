import { FilterQuery } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dtos/request/create-product.dto';
import { ProductResponseDataDto } from '../dtos/response/product-response.dto';
import { UpdateProductDto } from '../dtos/request/update-product.dto';
import { GetProductListDto } from '../dtos/request/get-product-list.dto';
import { ProductListResponseDto } from '../dtos/response/product-list-response.dto';

export interface IProductService {
    deleteProduct(id: string): Promise<boolean>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<boolean>;
    getProductDetail(id: string): Promise<ProductResponseDataDto>;
    getProductList(getProductList: GetProductListDto): Promise<ProductListResponseDto>;
    createProduct(createProductDto: CreateProductDto): Promise<boolean>;
    // ============================ START COMMON FUNCTION ============================
    _getProductForValidate(filter: FilterQuery<Product>, exceptId?: string): Promise<Product>;
    // ============================ END COMMON FUNCTION ============================
}

export const IProductService = Symbol('IProductService');
