import express from "express";
import assetsRouter from "./assetsRouter.js";
import userRouter from "./userRouter.js";

const rootRouter = express.Router();

rootRouter.use("/assets", assetsRouter);
rootRouter.use("/users", userRouter);
export default rootRouter;
