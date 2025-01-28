import { CreateProductDto } from '@controllers/api/product/dtos/request/create-product.dto';
import { GetProductListDto } from '@controllers/api/product/dtos/request/get-product-list.dto';
import { UpdateProductDto } from '@controllers/api/product/dtos/request/update-product.dto';
import { productService } from '@services/product/product.service';
import { BooleanResponseDto } from '@shared/dtos/response/boolean-response.dto';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ProductResponseDto } from './dtos/response/product-response.dto';
import { ProductListResponseDto } from './dtos/response/product-list-response.dto';

class ProductController {
    // [DELETE] /products/:id
    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await productService.deleteProduct(id);

            const result = new BooleanResponseDto(data);

            res.status(httpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /products/:id
    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const productData: UpdateProductDto = req.body;
            const data = await productService.updateProduct(id, productData);

            const result = new BooleanResponseDto(data);

            res.status(httpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    // [GET] /products/:id
    async getProductDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await productService.getProductDetail(id);

            const result = new ProductResponseDto(data);

            res.status(httpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    // [GET] /products?search=&blockchains=&categories=&minPrice=&maxPrice=&isNFT=&page=&limit=&sortBy=&orderBy=
    async getProductList(req: Request, res: Response, next: NextFunction) {
        try {
            const getProductListDto: GetProductListDto = req.query;
            const data = await productService.getProductList(getProductListDto);

            const result = new ProductListResponseDto(data);

            res.status(httpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    // [POST] /products
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const createProductDto: CreateProductDto = req.body;
            const data = await productService.createProduct(createProductDto);

            const result = new BooleanResponseDto(data);

            res.status(httpStatus.CREATED).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController();
