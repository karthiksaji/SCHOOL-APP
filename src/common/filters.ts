import { Catch, ExceptionFilter, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    response
      .status(exception.status || 500)
      .json({
        statusCode: exception.status || 500,
        message: exception.message || 'Internal Server Error',
        error: exception.name || 'Unknown Error',
        path: request.url,
      });
  }
}
