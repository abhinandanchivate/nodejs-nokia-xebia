import express from "express";
import rootRouter from "./router/rootRouter.js";
// Importing the root router
const app = express();
app.use(express.json());
// /api
app.use("/api/v1/", rootRouter);
// v2
//app.use("/api/v2/", rootRouter);

export default app;
