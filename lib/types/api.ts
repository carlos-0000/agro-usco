export interface ApiSuccessResponse<T> {
  message?: string;
  data: T;
}

export interface ApiErrorResponse<T> {
  error: {
    message: string;
    details?: T;
    executionError?: Error;
  };
}

export type ApiResponse<TSuccessResponse, TErrorDetails = undefined> =
  | ApiSuccessResponse<TSuccessResponse>
  | ApiErrorResponse<TErrorDetails>;
