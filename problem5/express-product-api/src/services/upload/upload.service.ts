import config from '@config/index';
import { logger } from '@shared/modules/logger';
import { s3Service } from '@shared/modules/s3';
import mime from 'mime-types';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export class UploadService {
    // [POST] /uploads/image
    async uploadImage(file: Express.Multer.File): Promise<string> {
        const { buffer, ...restDto } = file;

        logger.info(`[UPLOAD IMAGE]`, restDto);

        const keyObject = `images/${moment().format('yyyy-MM-DD')}/${uuidv4()}${path.extname(file.originalname)}`;
        const bucket = config.minIO.s3.bucket;

        // Determine content type
        const contentType = mime.lookup(file.originalname) || 'application/octet-stream';

        await s3Service.putObject(bucket, keyObject, Buffer.from(buffer), contentType);

        return keyObject;
    }
}

export const uploadService = new UploadService();
