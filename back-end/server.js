// server.js

import ENV from "./utils/loadEnv.js";
import app from "./app.js";
import db from "./config/database.js";
import { logger } from "./middleware/index.js";

const PORT = ENV.PORT;

// Database connection
async function startServer() {
  try {
    await db.authenticate();
    logger.info("Database connected...");

    if (ENV.NODE_ENV !== "production") {
      await db.sync();
      logger.info("Tables created...");
    }

    const server = app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(`${signal} received. Shutting down gracefully.`);
      server.close(async () => {
        logger.info("Server closed");
        await db.close();
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err) {
    logger.error("Unable to connect to the database:", err);
    process.exit(1);
  }
}

startServer();
