export interface IUploadService {
    uploadImage(file: Express.Multer.File): Promise<string>;
}

export const IUploadService = Symbol('IUploadService');
