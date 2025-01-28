import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import CustomException from '@shared/exceptions/custom.exception';

export const validateObjectId = (reqObject: string, value: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const paramValue = req[reqObject][value];

            if (!mongoose.Types.ObjectId.isValid(paramValue)) {
                throw new CustomException({
                    message: 'ID_INVALID',
                    statusCode: httpStatus.BAD_REQUEST,
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
