// ./middleware/logger.ts

import winston from "winston";

const customFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    const stack = new Error().stack;
    const stackLines = stack.split("\n");
    const callerLine = stackLines[2];
    return `${timestamp} [${level}]: ${message} (${callerLine.trim()})`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    customFormat
  ),
  defaultMeta: { service: "aqua" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
