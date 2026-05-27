import winston from "winston";
import { env } from "../config/env";

const isDev = env.nodeEnv !== "production";

const logger = winston.createLogger({
  level: isDev ? "debug" : "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      silent: !isDev, // 👈 disables logs in production
    }),
  ],
});

export default logger;
