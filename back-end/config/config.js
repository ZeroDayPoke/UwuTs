// ./config/config.js

import ENV from "../utils/loadEnv.js";

const ensureEnvVariables = (vars) => {
  vars.forEach((varName) => {
    if (!ENV[varName]) {
      throw new Error(`Environment variable ${varName} is required for ${ENV.NODE_ENV} environment`);
    }
  });
};

const development = {
  username: ENV.DB_USER || 'tulsa_home_user',
  password: ENV.DB_PASS || 'tulsa_home_pass',
  database: ENV.DB_NAME + '_dev' || 'tulsa_home_db_dev',
  host: ENV.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: console.log,
};

const test = {
  username: ENV.DB_USER || 'tulsa_home_user',
  password: ENV.DB_PASS || 'tulsa_home_pass',
  database: ENV.DB_NAME + '_test' || 'tulsa_home_db_test',
  host: ENV.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
};

const production = {
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  host: ENV.DB_HOST,
  dialect: 'mysql',
  logging: false,
};

if (ENV.NODE_ENV === 'production') {
  ensureEnvVariables(['DB_USER', 'DB_PASS', 'DB_NAME', 'DB_HOST']);
}

export default { development, test, production };
