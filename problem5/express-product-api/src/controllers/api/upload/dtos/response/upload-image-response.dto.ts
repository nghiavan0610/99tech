import { Expose } from 'class-transformer';

@Expose()
export class UploadImageResponseDto {
    success = true;

    data: string;

    constructor(data: string) {
        this.data = data;
    }
}
