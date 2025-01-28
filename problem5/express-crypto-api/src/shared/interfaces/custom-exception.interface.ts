export interface ICustomException {
    message: string | object;
    statusCode?: number;
    error?: any;
}
