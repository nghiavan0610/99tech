import { Provider } from '@nestjs/common';
import { IProductService } from '../services/product-service.interface';
import { ProductService } from '../services/product.service';
import { ProductSeeder } from '../seeders/product.seeder';

export const ProductServiceProvider: Provider[] = [
    {
        provide: IProductService,
        useClass: ProductService,
    },
    ProductSeeder,
];
