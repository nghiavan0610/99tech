import { FilterQuery } from 'mongoose';
import httpStatus from 'http-status';
import { logger } from '@shared/modules/logger';
import { IProduct, ProductModel } from '@models/product.model';
import CustomException from '@shared/exceptions/custom.exception';
import { CreateProductDto } from '@controllers/api/product/dtos/request/create-product.dto';
import { ProductResponseDataDto } from '@controllers/api/product/dtos/response/product-response.dto';
import { GetProductListDto } from '@controllers/api/product/dtos/request/get-product-list.dto';
import { ProductListResponseDto } from '@controllers/api/product/dtos/response/product-list-response.dto';
import { OrderByEnum, PgPagination } from '@shared/types/pagination.type';
import { ProductError } from '@controllers/api/product/enums/product-error.enum';
import config from '@config/index';

export class ProductService {
    // [DELETE] /products/:id
    async deleteProduct(id: string): Promise<boolean> {
        logger.info('[DELETE PRODUCT] id', id);

        const product = await ProductModel.findById(id);
        if (!product) {
            throw new CustomException({
                message: ProductError.PRODUCT_NOT_FOUND,
                statusCode: httpStatus.BAD_REQUEST,
            });
        }

        await ProductModel.deleteOne({ _id: id });

        return true;
    }

    // [PUT] /products/:id
    async updateProduct(id: string, updateProductDto: Partial<IProduct>): Promise<boolean> {
        logger.info('[UPDATE PRODUCT] id - updateProductDto', id, updateProductDto);

        const product = await ProductModel.findById(id);
        if (!product) {
            throw new CustomException({
                message: ProductError.PRODUCT_NOT_FOUND,
                statusCode: httpStatus.BAD_REQUEST,
            });
        }

        const existedProductName = await this._getProductForValidate({ name: updateProductDto.name }, id);
        if (existedProductName) {
            throw new CustomException({
                message: ProductError.PRODUCT_NAME_EXISTED,
                statusCode: httpStatus.BAD_REQUEST,
            });
        }

        await ProductModel.updateOne({ _id: id }, updateProductDto);

        return true;
    }

    // [GET] /products/:id
    async getProductDetail(id: string): Promise<ProductResponseDataDto> {
        logger.info('[GET PRODUCT DETAIL] id', id);

        const product = await ProductModel.findById(id);
        if (!product) {
            throw new CustomException({
                message: 'Product not found',
                statusCode: httpStatus.NOT_FOUND,
            });
        }

        product.imageUrl = this._presignImageUrl(product.imageUrl);

        return product;
    }

    // [GET] /products?search=&blockchains=&categories=&minPrice=&maxPrice=&isNFT=&page=&limit=&sortBy=&orderBy=
    async getProductList(getProductList: GetProductListDto): Promise<ProductListResponseDto> {
        logger.info('[GET PRODUCT LIST] getProductList', getProductList);

        const { blockchains, categories, isNFT, minPrice, maxPrice, search, sortBy, orderBy, page, limit } =
            getProductList;

        // Filter setup
        const filter: any = {};

        if (blockchains.length) {
            filter.blockchain = { $in: blockchains };
        }
        if (categories.length) {
            filter.category = { $in: categories };
        }
        if (typeof isNFT === 'boolean') {
            filter.isNFT = isNFT;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = minPrice;
            if (maxPrice) filter.price.$lte = maxPrice;
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Pagination setup
        const pagination = new PgPagination(page, limit);

        const sortOptions: any = {};
        if (sortBy) {
            sortOptions[sortBy] = orderBy === OrderByEnum.ASC ? 1 : -1;
        }

        const [products, totalCount] = await Promise.all([
            ProductModel.find(filter).sort(sortOptions).skip(pagination.offset).limit(pagination.limit),
            ProductModel.countDocuments(filter),
        ]);

        // Presign image url
        await Promise.all(
            products.map(async (product) => {
                product.imageUrl = this._presignImageUrl(product.imageUrl);
            }),
        );

        return {
            data: products,
            pagination: { ...pagination, totalItems: totalCount },
        };
    }

    // [POST] /products
    async createProduct(createProductDto: CreateProductDto): Promise<boolean> {
        logger.info('[CREATE PRODUCT] createProductDto', createProductDto);

        const product = new ProductModel(createProductDto);
        await product.save();

        return true;
    }

    // ============================ START COMMON FUNCTION ============================
    private _presignImageUrl(url: string): string {
        if (url) {
            const cdnUrl = config.minIO.s3.cdn;

            if (cdnUrl) {
                url = `${cdnUrl}/${url}`;
            } else {
                url = [config.minIO.s3.endpoint, config.minIO.s3.bucket, url].join('/');
            }
        }

        return url;
    }

    async _getProductForValidate(filter: FilterQuery<IProduct>, exceptId?: string): Promise<IProduct> {
        const query = exceptId ? { _id: { $ne: exceptId }, ...filter } : { ...filter };

        return ProductModel.findOne(query);
    }
    // ============================ END COMMON FUNCTION ==============================
}

export const productService = new ProductService();
