import { Router } from "express";
import { validate } from "../../../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validator";
import { authController } from "../controllers/auth.controller";
import { asyncHandler } from "../../../shared/utils/async-handler";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register.bind(authController)),
);

export default router;
