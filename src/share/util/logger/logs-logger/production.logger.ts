import { LogsLogger } from "../types";
import { createLogger, format } from "winston";

import * as DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, json } = format;

export function createProductionLogger(level: string = "warn"): LogsLogger {
  const options = {
    filename: "logs/mars-%DATE%.log",
    datePattern: "YYYYMMDD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  };

  return createLogger({
    level,
    exitOnError: false,
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    transports: [new DailyRotateFile(options)],
  });
}
