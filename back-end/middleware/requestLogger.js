// middleware/requestLogger.js
import logger from "./logger.js";

const requestLogger = (req, res, next) => {
  const now = new Date().toISOString();
  const meta = {
    time: now,
    ip: req.ip,
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query,
  };
  logger.info(`HTTP Request`, meta);
  next();
};

export default requestLogger;
