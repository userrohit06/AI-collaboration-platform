import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
};
