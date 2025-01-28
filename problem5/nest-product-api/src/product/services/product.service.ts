import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductService } from './product-service.interface';
import { ILoggerService } from '@/shared/modules/logger/services/logger-service.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateProductDto } from '../dtos/request/create-product.dto';
import { ProductResponseDataDto } from '../dtos/response/product-response.dto';
import { UpdateProductDto } from '../dtos/request/update-product.dto';
import { ProductError } from '../enums/product-error.enum';
import { CustomException } from '@/shared/exceptions/custom.exception';
import { GetProductListDto } from '../dtos/request/get-product-list.dto';
import { OrderByEnum, PgPagination } from '@/shared/types/pagination.type';
import { ProductListResponseDto } from '../dtos/response/product-list-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        private readonly configService: ConfigService,
        @Inject(ILoggerService) private readonly logger: ILoggerService,
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
    ) {}

    // [DELETE] /products/:id
    async deleteProduct(id: string): Promise<boolean> {
        this.logger.info('[DELETE PRODUCT] id', id);

        const product = await this.productModel.findById(id);
        if (!product) {
            throw new CustomException({
                message: ProductError.PRODUCT_NOT_FOUND,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        await this.productModel.deleteOne({ _id: id });

        return true;
    }

    // [PUT] /products/:id
    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<boolean> {
        this.logger.info('[UPDATE PRODUCT] id - updateProductDto', id, updateProductDto);

        const product = await this.productModel.findById(id);
        if (!product) {
            throw new CustomException({
                message: ProductError.PRODUCT_NOT_FOUND,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        const existedProductName = await this._getProductForValidate({ name: updateProductDto.name }, id);
        if (existedProductName) {
            throw new CustomException({
                message: ProductError.PRODUCT_NAME_EXISTED,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        await this.productModel.updateOne({ _id: id }, updateProductDto);

        return true;
    }

    // [GET] /products/:id
    async getProductDetail(id: string): Promise<ProductResponseDataDto> {
        this.logger.info('[GET PRODUCT DETAIL] id', id);

        const product = await this.productModel.findById(id);
        if (!product) {
            throw new CustomException({
                message: ProductError.PRODUCT_NOT_FOUND,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        product.imageUrl = this._presignImageUrl(product.imageUrl);

        return product;
    }

    // [GET] /products?search=&blockchains=&categories=&minPrice=&maxPrice=&isNFT=&page=&limit=&sortBy=&orderBy=
    async getProductList(getProductList: GetProductListDto): Promise<ProductListResponseDto> {
        this.logger.info('[GET PRODUCT LIST] getProductList', getProductList);

        const { blockchains, categories, isNFT, minPrice, maxPrice, search, sortBy, orderBy } = getProductList;

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
        const pagination = new PgPagination(getProductList.page, getProductList.limit);

        const sortOptions: any = {};
        if (sortBy) {
            sortOptions[sortBy] = orderBy === OrderByEnum.ASC ? 1 : -1;
        }

        const [products, totalCount] = await Promise.all([
            this.productModel.find(filter).sort(sortOptions).skip(pagination.offset).limit(pagination.limit),
            this.productModel.countDocuments(filter),
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
        this.logger.info('[CREATE PRODUCT] createProductDto', createProductDto);

        await this.productModel.create(createProductDto);

        return true;
    }

    // ============================ START COMMON FUNCTION ============================
    private _presignImageUrl(url: string): string {
        if (url) {
            const cdnUrl = this.configService.get('minIO.s3.cdn');

            if (cdnUrl) {
                url = `${cdnUrl}/${url}`;
            } else {
                url = [
                    this.configService.get('minIO.s3.endpoint'),
                    this.configService.get('minIO.s3.bucket'),
                    url,
                ].join('/');
            }
        }

        return url;
    }

    async _getProductForValidate(filter: FilterQuery<Product>, exceptId?: string): Promise<Product> {
        const query = exceptId ? { _id: { $ne: exceptId }, ...filter } : { ...filter };

        return this.productModel.findOne(query);
    }
    // ============================ END COMMON FUNCTION ==============================
}
