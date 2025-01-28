import { Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { CustomException } from '../exceptions/custom.exception';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
    transform(value: string) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new CustomException({
                message: `ID_INVALID`,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        return value;
    }
}
