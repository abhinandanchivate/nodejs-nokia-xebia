import express from "express";
import assetsRouter from "./assetsRouter.js";
import userRouter from "./userRouter.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const rootRouter = express.Router();

rootRouter.use("/assets", authMiddleware, assetsRouter);
rootRouter.use("/users", userRouter);
export default rootRouter;
