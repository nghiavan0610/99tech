import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductServiceProvider } from './providers/product-service.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { IsUniqueProductName } from './validators/product-name.validator';

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    controllers: [ProductController],
    providers: [...ProductServiceProvider, IsUniqueProductName],
    exports: [...ProductServiceProvider],
})
export class ProductModule {}
