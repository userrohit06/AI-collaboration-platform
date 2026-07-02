import { Router } from "express";
import healthRouter from "./health.route";
import authRoutes from "../modules/auth/routes/auth.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRoutes);

export default router;
