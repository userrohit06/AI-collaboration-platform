import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { connectMongoDB } from "./config/mongodb";
import { connectRedis } from "./config/redis";

const startServer = async () => {
  try {
    await connectMongoDB();
    await connectRedis();

    app.listen(env.PORT, () => {
      console.log(`Server running on PORT: ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startServer();
