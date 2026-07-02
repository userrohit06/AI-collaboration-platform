import { ErrorCode } from "./error-codes";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: ErrorCode;
  public readonly details?: unknown;

  constructor(
    statusCode: number,
    message: string,
    code?: ErrorCode,
    details?: unknown,
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
