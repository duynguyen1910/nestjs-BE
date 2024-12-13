import { BaseResponse } from '../base-response';

export class SuccessResponse<T> extends BaseResponse {
  readonly data: T | T[];

  constructor(statusCode: number, message: string, data: T | T[]) {
    super(statusCode, message);
    this.data = data;
  }
}
