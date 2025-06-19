import express from "express";
import {
  createAsset,
  getAllAsset,
  getAssetById,
} from "../controller/assetsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import assetValidator from "../validators/assetsValidators.js";

const assetsRouter = express.Router();

assetsRouter.post("/create", assetValidator, createAsset);
assetsRouter.get("/all", getAllAsset);
assetsRouter.get("/{id}", getAssetById);
export default assetsRouter;
