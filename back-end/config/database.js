// config/database.js

import Sequelize from "sequelize";
import config from "./config.js";
import ENV from "../utils/loadEnv.js";

const env = ENV.NODE_ENV;
const dbConfig = config[env];

const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: env === "production" ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  }
);

export default db;
