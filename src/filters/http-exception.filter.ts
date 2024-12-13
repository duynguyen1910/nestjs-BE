import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from '../common/dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest();
    const status = exception.getStatus();
    const message = exception.message || 'Internal Server Error';

    const errorResponse = new ErrorResponse(
      status,
      message,
      message,
      exception.getResponse() as any,
    );

    response.status(status).json(errorResponse);
  }
}
