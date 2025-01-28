import { registerAs } from '@nestjs/config';

export default registerAs('minIO', () => ({
    s3: {
        accessKey: process.env.MIN_IO_ACCESS_KEY,
        secretKey: process.env.MIN_IO_SECRET_KEY,
        region: process.env.MIN_IO_REGION,
        endpoint: process.env.MIN_IO_ENDPOINT,
        bucket: process.env.MIN_IO_BUCKET,
        cdn: process.env.MIN_IO_CDN,
    },
}));
