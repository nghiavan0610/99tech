import { Global, Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { UploadServiceProvider } from './providers/upload-service.provider';

@Global()
@Module({
    controllers: [UploadController],
    providers: [UploadServiceProvider],
    exports: [UploadServiceProvider],
})
export class UploadModule {}
