import { ILoggerService } from '@/shared/modules/logger/services/logger-service.interface';
import { IS3Service } from '@/shared/modules/s3/services/s3-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUploadService } from './upload-service.interface';
import moment from 'moment';
import path from 'path';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService implements IUploadService {
    constructor(
        private readonly configService: ConfigService,
        @Inject(ILoggerService) private readonly logger: ILoggerService,
        @Inject(IS3Service) private readonly s3Service: IS3Service,
    ) {}

    // [POST] /uploads/image
    async uploadImage(file: Express.Multer.File): Promise<string> {
        const { buffer, ...restDto } = file;

        this.logger.info(`[UPLOAD IMAGE]`, restDto);

        const keyObject = `images/${moment().format('yyyy-MM-DD')}/${uuidv4()}${path.extname(file.originalname)}`;
        const bucket = this.configService.get('minIO.s3.bucket');

        // Determine content type
        const contentType = mime.lookup(file.originalname) || 'application/octet-stream';

        await this.s3Service.putObject(bucket, keyObject, Buffer.from(buffer), contentType);

        return keyObject;
    }
}
