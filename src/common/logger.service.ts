import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);
  private readonly SUCCESS = 'SUCCESS';
  private readonly ERROR = 'ERROR';
  private readonly INFO = 'INFO';
  private readonly DEBUG = 'DEBUG';

  log(message: string) {
    this.logger.log(`[${this.SUCCESS}] ${message}`);
  }

  warn(message: string) {
    this.logger.warn(`[${this.INFO}] ${message}`);
  }

  error(message: string, trace?: string) {
    this.logger.error(`[${this.ERROR}] ${message}`, trace);
  }

  debug(message: string) {
    this.logger.debug(`[${this.DEBUG}] ${message}`);
  }
}
