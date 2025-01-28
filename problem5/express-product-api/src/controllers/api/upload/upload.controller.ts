import { uploadService } from '@services/upload/upload.service';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { UploadImageResponseDto } from './dtos/response/upload-image-response.dto';

class UploadController {
    // [POST] /uploads
    async uploadImage(req: Request & { file?: Express.Multer.File }, res: Response, next: NextFunction) {
        try {
            console.log('test');
            const file: Express.Multer.File = req.file;
            const data = await uploadService.uploadImage(file);

            const result = new UploadImageResponseDto(data);

            res.status(httpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export const uploadController = new UploadController();
