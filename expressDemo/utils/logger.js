// // import { createLogger, format, transports } from "winston";
// // import DailyRotateFile from "winston-daily-rotate-file";
// // import path from "path";
// // import fs from "fs";

// // const { combine, timestamp, printf, colorize } = format;

// // // Create logs directory if it doesn't exist
// // const logDir = path.join("logs");
// // if (!fs.existsSync(logDir)) {
// //   fs.mkdirSync(logDir);
// // }

// // const logFormat = printf(({ level, message, timestamp }) => {
// //   return `[${timestamp}] ${level}: ${message}`;
// // });

// // const logger = createLogger({
// //   level: "info",
// //   format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
// //   transports: [
// //     // Console with color
// //     new transports.Console({ format: combine(colorize(), logFormat) }),

// //     // Daily rotated file logs
// //     new DailyRotateFile({
// //       filename: "logs/app-%DATE%.log",
// //       datePattern: "YYYY-MM-DD",
// //       zippedArchive: true,
// //       maxSize: "10m",
// //       maxFiles: "14d", // Keep logs for 14 days
// //     }),

// //     // Separate error log rotation
// //     new DailyRotateFile({
// //       filename: "logs/error-%DATE%.log",
// //       level: "error",
// //       datePattern: "YYYY-MM-DD",
// //       zippedArchive: true,
// //       maxSize: "5m",
// //       maxFiles: "30d",
// //     }),
// //   ],
// // });

// // export default logger;

// import { createLogger, format, transports } from "winston";
// import path from "path";
// import fs from "fs";
// const logDirectory = path.join(process.cwd(), "logs");
// if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectoray);

// const accessLogStream = fs.createWriteStream(
//   path.join(logDirectory, "access.log"),
//   { flags: "a" } // appends.
// );
// const logger = createLogger({
//   level: "info",
//   format: format.combine(format.timestamp(), format.json()),
//   transports: [
//     new transports.File({
//       filename: path.join(logDirectory, "error.log"),
//       level: "error",
//       options: { flags: "a", mode: 0o666 },
//     }),
//   ],
// });
// export default logger;

// utils/logger.js
import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";
console.log("hello from logger ");
const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),
    new transports.Console(), // for dev visibility
  ],
});

// Catch Winston transport errors
logger.on("error", function (err) {
  console.error("Winston logging failed:", err);
});

export default logger;
