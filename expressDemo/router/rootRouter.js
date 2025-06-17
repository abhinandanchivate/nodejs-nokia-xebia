import express from "express";
import assetsRouter from "./assetsRouter.js";

const rootRouter = express.Router();

rootRouter.use("/assets", assetsRouter);
export default rootRouter;
