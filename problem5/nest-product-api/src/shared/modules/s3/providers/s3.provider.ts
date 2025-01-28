import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const S3ClientProvider: Provider = {
    provide: 'S3_CLIENT',
    useFactory: async (configService: ConfigService) => {
        const config: S3ClientConfig = {
            credentials: {
                accessKeyId: configService.get('minIO.s3.accessKey'),
                secretAccessKey: configService.get('minIO.s3.secretKey'),
            },
            // Even though MinIO does not inherently require a region, the AWS SDK mandates this field for proper initialization.
            region: configService.get('minIO.s3.region'),
            endpoint: configService.get('minIO.s3.endpoint'),
            forcePathStyle: true,
        };

        const client = new S3Client(config);

        return client;
    },
    inject: [ConfigService],
};
