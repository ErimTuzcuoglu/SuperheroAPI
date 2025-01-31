/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiResponse } from '../../models/ApiResponse';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: ApiResponse<Record<string, unknown>> = {
      data: null,
      errors: exception?.response?.message || [exception.message],
      message: 'Error',
      succeeded: false,
    };

    if (exception.constructor.name !== 'Error') {
      return httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

    responseBody.timestamp = new Date().toISOString();
    responseBody.stackTrace = exception.stack;

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
