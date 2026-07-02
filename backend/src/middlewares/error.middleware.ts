import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import { AppError, ERROR_CODES } from "../shared/errors";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  /**
   * Custom Application Error
   */
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      details: err.details,
    });
  }

  /**
   * Zod Validation Error
   */
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      code: ERROR_CODES.VALIDATION_ERROR,
      errors: err.flatten(),
    });
  }

  /**
   * Unknown Error
   */
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
  });
};
