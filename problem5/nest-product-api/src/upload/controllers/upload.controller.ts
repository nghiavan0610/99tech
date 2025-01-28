import { Controller, HttpCode, HttpStatus, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { IUploadService } from '../services/upload-service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageResponseDto } from '../dtos/response/upload-image-response.dto';
import { FileValidationPipe } from '@/shared/pipes/files-validation.pipe';

@Controller('uploads')
export class UploadController {
    constructor(@Inject(IUploadService) private readonly uploadService: IUploadService) {}

    // [POST] /uploads/image
    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    @HttpCode(HttpStatus.OK)
    async uploadImage(
        @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    ): Promise<UploadImageResponseDto> {
        const result = await this.uploadService.uploadImage(file);

        return new UploadImageResponseDto(result);
    }
}
