//every endpoint from the assets ==> checking it ?
// we will write it at one place and we will apply it at multiple one .

import { validationResult } from "express-validator";
import AssetsModel from "../models/AssetsModel.js";
import UserModel from "../models/UserModel.js";

export const createAsset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const asset = new AssetsModel(req.body);
    // assignedto email id exists or not.==> Users
    const user = await UserModel.find({ email: req.body.assignedTo });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await asset.save();
      res.status(201).json(asset);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllAsset = async (req, res) => {};
export const getAssetById = async (req, res) => {};
export const updateAsset = async (req, res) => {};
export const deleteAsset = async (req, res) => {};
