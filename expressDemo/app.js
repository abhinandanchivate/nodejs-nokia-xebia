import express from "express";
import rootRouter from "./router/rootRouter.js";
import morgan from "morgan";
import logMiddleware from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";
// Importing the root router
const app = express();

console.log("first");
console.log("env value = " + process.env.NODE_ENV);
app.use(express.json());
if (process.env.NODE_ENV == "dev") app.use(logMiddleware);
// app.use(
//   morgan(
//     ":remote-addr :method :url :status :res[content-length] - :response-time ms"
//   )
// );
// ::ffff:127.0.0.1 this is IPV4 address 127.0.0.1 , just wrapped in ipv6 syntax.

// /api
app.use("/api/v1/", rootRouter);
app.use(errorHandler);
// v2
//app.use("/api/v2/", rootRouter);

export default app;
