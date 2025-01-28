export interface IResponse<TData> {
    success?: boolean;
    data: TData;
}

export interface IPaginationResponse<TData> extends IResponse<TData> {
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
    };
}

export interface IErrorResponse {
    success: boolean;
    statusCode: number;
    errorCode: string;
    errorMessage: string | object;
}
