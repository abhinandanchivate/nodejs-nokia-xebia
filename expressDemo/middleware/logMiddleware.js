// import morgan, { token } from "morgan";

// const getIPv4 = (ip) => {
//   if (ip.startsWith("::ffff:")) return ip.replace("::ffff:", "");
// };

// // custom format function
// const customLogFormat = (token, req, res) => {
//   const rawIp =
//     req.headers["x-forwarded=for"] || req.connection.remoteAddress || req.ip;
//   const clientIp = getIPv4(rawIp);
//   return [
//     clientIp,
//     token.method(req, res),
//     token.url(req, res),
//     token.status(req, res),
//     token.res(req, res, "content-length"),
//     "-",
//     token["response-time"](req, res),
//     "ms",
//   ].join(" ");
// };

// const logMiddleware = morgan(customLogFormat);
// export default logMiddleware;

import morgan from "morgan";
import fs from "fs";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" } // appends.
);

morgan.token("user-id", (req) => req.headers["x-user-id"] || "anonymous");

// Custom log format
const format =
  ":method :url :status :res[content-length] - :response-time ms - User: :user-id";

// Middleware export
const loggerMiddleware = morgan(format, {
  stream: accessLogStream,
});

export default loggerMiddleware;
