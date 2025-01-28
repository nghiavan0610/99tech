import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import httpStatus from 'http-status';
import CustomException from '@shared/exceptions/custom.exception';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Handle Unauthorized Errors
    if (err.name === 'UnauthorizedError') {
        return res.status(httpStatus.UNAUTHORIZED).send({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            errorCode: 'UNAUTHORIZED',
            errorMessage: 'UNAUTHORIZED',
        });
    }

    // Handle BadRequest Errors
    if (err.name === 'BadRequestError') {
        return res.status(httpStatus.BAD_REQUEST).send({
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            errorCode: 'BAD_REQUEST',
            errorMessage: err?.message,
        });
    }

    // Handle NotFound Errors
    if (err.name === 'NotFoundError') {
        return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            errorCode: 'NOT_FOUND',
            errorMessage: err?.message,
        });
    }

    // Handle CustomException
    if (err instanceof CustomException) {
        return res.status(err.statusCode).send({
            success: false,
            statusCode: err.statusCode,
            errorCode: err.getErrorCode(),
            errorMessage: err.message,
        });
    }

    // Handle other Mongoose errors
    if (err instanceof MongooseError) {
        return res.status(httpStatus.BAD_REQUEST).send({
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            errorCode: 'MONGOOSE_ERROR',
            errorMessage: err.message,
        });
    }

    // Handle all other errors
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        errorCode: 'INTERNAL_SERVER_ERROR',
        errorMessage: 'Something went wrong',
    });
};
