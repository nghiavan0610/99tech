import { Router } from 'express';
import { uploadController } from './upload.controller';
import multer from 'multer';
import { validateFile } from '@shared/middlewares/validate-file.middleware';

const upload = multer({
    storage: multer.memoryStorage(),
});

const uploadRouter: Router = Router();

uploadRouter.post('/image', upload.single('image'), validateFile(), uploadController.uploadImage);

export default uploadRouter;
