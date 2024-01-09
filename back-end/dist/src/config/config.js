"use strict";
// ./config/config.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadEnv_ts_1 = __importDefault(require("../utils/loadEnv.ts"));
const ensureEnvVariables = (vars) => {
    vars.forEach((varName) => {
        if (!loadEnv_ts_1.default[varName]) {
            throw new Error(`Environment variable ${varName} is required for ${loadEnv_ts_1.default.NODE_ENV} environment`);
        }
    });
};
const development = {
    username: loadEnv_ts_1.default.DB_USER || "tulsa_home_user",
    password: loadEnv_ts_1.default.DB_PASS || "tulsa_home_pass",
    database: loadEnv_ts_1.default.DB_NAME + "_dev" || "tulsa_home_db_dev",
    host: loadEnv_ts_1.default.DB_HOST || "localhost",
    dialect: "mysql",
    logging: console.log,
};
const test = {
    username: loadEnv_ts_1.default.DB_USER || "tulsa_home_user",
    password: loadEnv_ts_1.default.DB_PASS || "tulsa_home_pass",
    database: loadEnv_ts_1.default.DB_NAME + "_test" || "tulsa_home_db_test",
    host: loadEnv_ts_1.default.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
};
const production = {
    username: loadEnv_ts_1.default.DB_USER,
    password: loadEnv_ts_1.default.DB_PASS,
    database: loadEnv_ts_1.default.DB_NAME,
    host: loadEnv_ts_1.default.DB_HOST,
    dialect: "mysql",
    logging: false,
};
if (loadEnv_ts_1.default.NODE_ENV === "production") {
    ensureEnvVariables(["DB_USER", "DB_PASS", "DB_NAME", "DB_HOST"]);
}
exports.default = { development, test, production };
//# sourceMappingURL=config.js.map