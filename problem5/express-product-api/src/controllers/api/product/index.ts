import { Router } from 'express';
import { productController } from './product.controller';
import { validateDto } from '@shared/middlewares/validate-dto.middleware';
import { validateObjectId } from '@shared/middlewares/validate-object-id.middleware';
import { CreateProductDto } from './dtos/request/create-product.dto';
import { GetProductListDto } from './dtos/request/get-product-list.dto';
import { UpdateProductDto } from './dtos/request/update-product.dto';

const productRouter: Router = Router();

productRouter.delete('/:id', validateObjectId('params', 'id'), productController.deleteProduct);
productRouter.put(
    '/:id',
    validateObjectId('params', 'id'),
    validateDto('body', UpdateProductDto),
    productController.updateProduct,
);
productRouter.get('/:id', validateObjectId('params', 'id'), productController.getProductDetail);
productRouter.get('/', validateDto('query', GetProductListDto), productController.getProductList);
productRouter.post('/', validateDto('body', CreateProductDto), productController.createProduct);

export default productRouter;
