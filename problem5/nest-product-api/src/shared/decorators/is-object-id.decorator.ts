import { ValidationOptions, registerDecorator } from 'class-validator';
import mongoose from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'IsObjectId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: any) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
            },
        });
    };
}
