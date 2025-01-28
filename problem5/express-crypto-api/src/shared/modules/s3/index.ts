import { S3Client, S3ClientConfig, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import httpStatus from 'http-status';
import { PRESIGN_URL_EXPIRE_TIME } from './constants';
import { logger } from '@shared/modules/logger';
import config from '@config/index';
import CustomException from '@shared/exceptions/custom.exception';

class S3Service {
    private s3Client: S3Client;

    constructor() {
        const s3Config: S3ClientConfig = {
            credentials: {
                accessKeyId: config.minIO.s3.accessKey,
                secretAccessKey: config.minIO.s3.secretKey,
            },
            region: config.minIO.s3.region,
            endpoint: config.minIO.s3.endpoint,
            forcePathStyle: true,
        };

        this.s3Client = new S3Client(s3Config);
    }

    async createPresignedUrl(bucket: string, key: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        return getSignedUrl(this.s3Client, command, { expiresIn: PRESIGN_URL_EXPIRE_TIME });
    }

    async putObject(bucket: string, key: string, data: Buffer, contentType: string): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: data,
            ACL: 'public-read',
            ContentDisposition: 'inline',
            ContentType: contentType,
        });

        try {
            await this.s3Client.send(command);
        } catch (err) {
            logger.error('Upload failed:', err);
            throw new CustomException({
                message: 'Failed to upload file',
                statusCode: httpStatus.BAD_REQUEST,
            });
        }
    }

    async delObject(bucket: string, s3LocationUrl: string): Promise<void> {
        const url = new URL(s3LocationUrl).pathname.substring(1);

        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: url,
        });

        try {
            await this.s3Client.send(command);
        } catch (err) {
            logger.error('Delete object failed:', err);
            throw new CustomException({
                message: 'Failed to delete file',
                statusCode: httpStatus.BAD_REQUEST,
            });
        }
    }
}

export const s3Service = new S3Service();
