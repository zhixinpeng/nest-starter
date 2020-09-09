import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/utils/log4js';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const logFormat = `
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          Request original url: ${request.originalUrl}
          Method: ${request.method}
          IP: ${request.ip}
          Status code: ${status}
          Response: ${exception}
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;
    Logger.error(logFormat);
    response.status(status).json({
      statusCode: status,
      msg: `Service Error: ${exception}`,
    });
  }
}
