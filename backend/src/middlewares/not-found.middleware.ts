import { Request, Response, NextFunction } from "express";
import { AppError, ERROR_CODES } from "../shared/errors";
import { HTTP_STATUS } from "../shared/constants/http-status";

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(
    new AppError(
      HTTP_STATUS.NOT_FOUND,
      `Route '${req.originalUrl}' not found.`,
      ERROR_CODES.NOT_FOUND,
    ),
  );
};
