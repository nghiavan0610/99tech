import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { IProductService } from '../services/product-service.interface';
import { CreateProductDto } from '../dtos/request/create-product.dto';
import { BooleanResponseDto } from '@/shared/dtos/response/boolean-response.dto';
import { ProductListResponseDto } from '../dtos/response/product-list-response.dto';
import { ProductResponseDto } from '../dtos/response/product-response.dto';
import { UpdateProductDto } from '../dtos/request/update-product.dto';
import { GetProductListDto } from '../dtos/request/get-product-list.dto';
import { ParseObjectIdPipe } from '@/shared/pipes/parse-object-id.pipe';
import { BlockchainEnum } from '../enums/blockchain.enum';
import { ProductCategory } from '../enums/product.enum';
import { IProductEnums } from '../interfaces/product-enums.interface';
import { ProductEnumsResponseDto } from '../dtos/response/product-enums-response.dto';
import * as _ from 'lodash';

@Controller('products')
export class ProductController {
    constructor(@Inject(IProductService) private readonly productService: IProductService) {}

    // [GET] /products/enums
    @Get('enums')
    @HttpCode(HttpStatus.OK)
    async getProductEnums(): Promise<ProductEnumsResponseDto> {
        const enums = {
            blockchain: _.flatMap([BlockchainEnum], _.values),
            category: _.flatMap([ProductCategory], _.values),
        } as IProductEnums;

        return new ProductEnumsResponseDto(enums);
    }

    // [DELETE] /products/:id
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id', ParseObjectIdPipe) id: string): Promise<BooleanResponseDto> {
        const result = await this.productService.deleteProduct(id);

        return new BooleanResponseDto(result);
    }

    // [PUT] /products/:id
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateProduct(
        @Param('id', ParseObjectIdPipe) id: string,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<BooleanResponseDto> {
        const result = await this.productService.updateProduct(id, updateProductDto);

        return new BooleanResponseDto(result);
    }

    // [GET] /products/:id
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getProductDetail(@Param('id', ParseObjectIdPipe) id: string): Promise<ProductResponseDto> {
        const result = await this.productService.getProductDetail(id);

        return new ProductResponseDto(result);
    }

    // [GET] /products?search=&blockchains=&categories=&minPrice=&maxPrice=&isNFT=&page=&limit=&sortBy=&orderBy=
    @Get()
    @HttpCode(HttpStatus.OK)
    async getProductList(@Query() getProductList: GetProductListDto): Promise<ProductListResponseDto> {
        const result = await this.productService.getProductList(getProductList);

        return new ProductListResponseDto(result);
    }

    // [POST] /products
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<BooleanResponseDto> {
        const result = await this.productService.createProduct(createProductDto);

        return new BooleanResponseDto(result);
    }
}
