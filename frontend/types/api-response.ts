export class ApiResponse<
  TData = Record<string, any>,
  TError = Record<string, any>,
> {
  statusCode: number;
  data: TData;
  error: TError;
  message: string;
  isSuccess: boolean;

  constructor(
    statusCode: number = 200,
    data: TData | TError = {} as TData,
    message: string = "Success",
  ) {
    this.isSuccess = statusCode < 400;
    this.statusCode = statusCode;
    this.data = this.isSuccess ? (data as TData) : ({} as TData);
    this.error = this.isSuccess ? ({} as TError) : (data as TError);
    this.message = message;
  }
}
