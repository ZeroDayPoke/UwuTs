"use strict";
// ./server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_ts_1 = __importDefault(require("./app.ts"));
const database_ts_1 = __importDefault(require("./config/database.ts"));
const index_ts_1 = require("./middleware/index.ts");
const loadEnv_ts_1 = __importDefault(require("./utils/loadEnv.ts"));
const PORT = loadEnv_ts_1.default.PORT;
// Database connection
async function startServer() {
    try {
        await database_ts_1.default.authenticate();
        index_ts_1.logger.info("Database connected...");
        if (loadEnv_ts_1.default.NODE_ENV !== "production") {
            await database_ts_1.default.sync();
            index_ts_1.logger.info("Tables created...");
        }
        const server = app_ts_1.default.listen(PORT, () => {
            index_ts_1.logger.info(`Server started on port ${PORT}`);
        });
        // Graceful shutdown
        const shutdown = async (signal) => {
            index_ts_1.logger.info(`${signal} received. Shutting down gracefully.`);
            server.close(async () => {
                index_ts_1.logger.info("Server closed");
                await database_ts_1.default.close();
                process.exit(0);
            });
        };
        process.on("SIGTERM", shutdown);
        process.on("SIGINT", shutdown);
    }
    catch (err) {
        index_ts_1.logger.error("Unable to connect to the database:", err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map