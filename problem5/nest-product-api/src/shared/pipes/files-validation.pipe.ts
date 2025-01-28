import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ACCEPT_FILE_TYPES, MAX_SIZE_FILE } from '@/upload/constants/upload.constant';
import path from 'path';
import { CustomException } from '../exceptions/custom.exception';
import { UploadError } from '@/upload/enums/upload-error.enum';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    async transform(value: any) {
        if (!value) {
            throw new CustomException({
                message: UploadError.MISSING_FILE,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        if (!ACCEPT_FILE_TYPES.includes(path.extname(value.originalname))) {
            throw new CustomException({
                message: UploadError.INVALID_IMAGE,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        if (value.size > MAX_SIZE_FILE) {
            throw new CustomException({
                message: UploadError.INVALID_IMAGE,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        return value;
    }
}
