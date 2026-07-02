import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { HTTP_STATUS } from "../../../shared/constants/http-status";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.register(req.body);

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
