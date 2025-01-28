import { Inject, Injectable } from '@nestjs/common';
import {
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';
import { IProductService } from '../services/product-service.interface';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueProductName implements ValidatorConstraintInterface {
    constructor(@Inject(IProductService) private readonly userService: IProductService) {}

    async validate(name: string): Promise<boolean> {
        const user = await this.userService._getProductForValidate({ name });

        return user ? false : true;
    }
}

export function UniqueProductName(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'UniqueProductName',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUniqueProductName,
        });
    };
}
