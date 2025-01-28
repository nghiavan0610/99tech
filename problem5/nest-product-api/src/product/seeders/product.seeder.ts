import { ILoggerService } from '@/shared/modules/logger/services/logger-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { products } from 'db';

@Injectable()
export class ProductSeeder {
    constructor(
        @Inject(ILoggerService) private readonly logger: ILoggerService,
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
    ) {}

    async seedUp(): Promise<void> {
        this.logger.info('[PRODUCT SEEDING UP]');

        const processedProducts = products.map((product: any) => {
            const processField = (key: string, value: any) => {
                if (value?.$oid) {
                    return value.$oid;
                }
                if (Array.isArray(value)) {
                    return value.map((item: any) => processField('', item));
                }
                if (value?.$date) {
                    return new Date(value.$date);
                }
                return value;
            };

            const processedProduct: any = { ...product };
            Object.keys(processedProduct).forEach((key) => {
                processedProduct[key] = processField(key, processedProduct[key]);
            });
            return processedProduct;
        });

        await this.productModel.collection.drop();

        await this.productModel.insertMany(processedProducts);
    }

    async seedDown(): Promise<void> {
        this.logger.info('[PRODUCT SEEDING DOWN]');

        await this.productModel.collection.drop();
    }
}
