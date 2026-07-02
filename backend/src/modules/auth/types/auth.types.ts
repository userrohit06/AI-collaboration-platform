import { z } from "zod";
import { registerSchema } from "../validators/auth.validator";

export type RegisterDto = z.infer<typeof registerSchema>;
