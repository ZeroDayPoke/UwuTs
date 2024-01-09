// ./utils/loadEnv.js

import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === 'test' ? '.test.env' : '.env';
dotenv.config({ path: envFile });

const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_USER: process.env.DB_USER || 'tulsa_home_user',
  DB_PASS: process.env.DB_PASS || 'tulsa_home_pass',
  DB_NAME: process.env.DB_NAME || 'tulsa_home_db',
  DB_HOST: process.env.DB_HOST || 'localhost',
  SESSION_SECRET: process.env.SESSION_SECRET || "default_session_secret",
  PORT: process.env.PORT || 3100,
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME || "default_email_username",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "default_email_password",
  JWT_SECRET: process.env.JWT_SECRET || "default_jwt_secret",
};

export default ENV;
