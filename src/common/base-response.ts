export abstract class BaseResponse {
  protected readonly statusCode!: number;
  protected readonly message!: string;
  protected readonly timestamp!: string;

  constructor(statusCode: number, message: string) {
    this.statusCode! = statusCode;
    this.message! = message;
    this.timestamp! = new Date().toISOString();
  }
}
