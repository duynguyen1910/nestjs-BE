import { BaseResponse } from '../base-response';

export class ErrorResponse extends BaseResponse {
  readonly error: string;
  readonly details?: { field: string; message: string }[];

  constructor(
    statusCode: number,
    message: string,
    error: string,
    details?: { field: string; message: string }[],
  ) {
    super(statusCode, message);
    this.error = error;
    this.details = details;
  }
}
