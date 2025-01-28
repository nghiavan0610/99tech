import httpStatus from 'http-status';
import { ICustomException } from '../interfaces/custom-exception.interface';

class CustomException {
    message: string | object;
    statusCode: number;

    constructor(data: ICustomException) {
        this.message = data.message || data.error?.message || 'UNKNOWN_ERROR';
        this.statusCode = data.statusCode || data.error?.statusCode || httpStatus.BAD_REQUEST;
    }

    getErrorCode(): string {
        const errorsMap: { [key: string]: string } = {
            400: 'BAD_REQUEST',
            401: 'UNAUTHORIZED',
            403: 'FORBIDDEN',
            404: 'NOT_FOUND',
            405: 'METHOD_NOT_ALLOWED',
            406: 'NOT_ACCEPTABLE',
            408: 'REQUEST_TIMEOUT',
            415: 'UNSUPPORTED_MEDIA_TYPE',
            429: 'TOO_MANY_REQUESTS',
            500: 'INTERNAL_SERVER_ERROR',
            502: 'BAD_GATEWAY',
            503: 'SERVICE_UNAVAILABLE',
            504: 'GATEWAY_TIMEOUT',
        };

        return errorsMap[this.statusCode];
    }
}

export default CustomException;
