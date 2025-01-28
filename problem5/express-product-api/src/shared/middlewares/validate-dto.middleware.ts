import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import httpStatus from 'http-status';
import * as _ from 'lodash';
import CustomException from '@shared/exceptions/custom.exception';

export const validateDto = (reqObject: string, dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dtoObj = plainToInstance(dtoClass, req[reqObject]);
            const errors = await validate(dtoObj, {
                whitelist: false,
            });

            if (errors.length > 0) {
                const errorObject = {};

                const getExceptions = (validationErrors: ValidationError[], errors: any) => {
                    validationErrors.forEach((validationError: ValidationError) => {
                        const err = _.values(validationError.constraints);
                        errors[validationError.property] = _.first(err);

                        if (!err.length && validationError.children.length) {
                            errors[validationError.property] = {};
                            getExceptions(validationError.children, errors[validationError.property]);
                        }
                    });
                };

                getExceptions(errors, errorObject);

                throw new CustomException({
                    message: errorObject,
                    statusCode: httpStatus.BAD_REQUEST,
                });
            }

            req[reqObject] = dtoObj;
            next();
        } catch (error) {
            next(error);
        }
    };
};
