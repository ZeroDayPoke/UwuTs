// ./config/database.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Use environment variables for database connection parameters
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

export default sequelize;
