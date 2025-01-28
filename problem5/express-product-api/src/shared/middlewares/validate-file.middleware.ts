import { Request, Response, NextFunction } from 'express';
import CustomException from '@shared/exceptions/custom.exception';
import httpStatus from 'http-status';
import { UploadError } from '@controllers/api/upload/enums/upload-error.enum';
import { MAX_SIZE_FILE, ACCEPT_FILE_TYPES } from '@controllers/api/upload/constants/upload.constant';

export const validateFile = () => {
    return (req: Request & { file?: Express.Multer.File }, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                throw new CustomException({
                    message: UploadError.MISSING_FILE,
                    statusCode: httpStatus.BAD_REQUEST,
                });
            }

            if (req.file.size > MAX_SIZE_FILE) {
                throw new CustomException({
                    message: UploadError.FILE_TOO_LARGE,
                    statusCode: httpStatus.BAD_REQUEST,
                });
            }

            if (!ACCEPT_FILE_TYPES.includes(req.file.mimetype)) {
                throw new CustomException({
                    message: UploadError.INVALID_FILE_TYPE,
                    statusCode: httpStatus.BAD_REQUEST,
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
