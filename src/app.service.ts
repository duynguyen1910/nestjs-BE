import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getConnnected(): { statusCode: number; message: string } {
    return {
      statusCode: 200,
      message: 'Connection successful!',
    };
  }
}
