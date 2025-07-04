//every endpoint from the assets ==> checking it ?
// we will write it at one place and we will apply it at multiple one .

import { validationResult } from "express-validator";
import AssetsModel from "../models/AssetsModel.js";
import UserModel from "../models/UserModel.js";
import redis from "../utils/redisClient.js";

export const createAsset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const asset = new AssetsModel(req.body);
    // assignedto email id exists or not.==> Users
    const user = await UserModel.find({ email: req.body.assignedTo });
    console.log("user value " + user);
    if (!user || user.length === 0) {
      console.log("inside the user criteria");
      // return res.status(404).json({ message: "User not found" });
      throw new Error("user not found");
    } else {
      await asset.save();
      // update all_assets cache
      const cachedAssets = await redis.get("all_assets");
      if (cachedAssets) {
        const allAssets = JSON.parse(cachedAssets);
        allAssets.push(asset);
        await redis.set("all_assets", JSON.stringify(allAssets), "EX", 3600); // Cache for 1 hour
      } // await redis.del("all_assets"); // Invalidate cache for all assets
      res.status(201).json(asset);
    }
  } catch (error) {
    console.log("inside the catch ");
    throw new Error(error.message);
    //res.status(500).json({ error: error.message });
  }
};
export const getAllAsset = async (req, res) => {
  try {
    const cachedKey = "all_assets";
    const startCacheTime = Date.now();
    console.log("before the redis call " + startCacheTime);
    const cachedAssets = await redis.get(cachedKey);
    if (cachedAssets) {
      const endCacheTime = Date.now();
      console.log("after the redis call " + endCacheTime);
      console.log(
        "Time taken to fetch assets from cache: " +
          (endCacheTime - startCacheTime) +
          " ms"
      );

      console.log("Fetching assets from cache");
      return res.status(200).json(JSON.parse(cachedAssets));
    }
    // we need to find the diff with respect to time
    //before and after the find
    // so that we will get to know how much time required
    // how can we save the time using redis

    const startTime = Date.now();
    console.log("before the find call " + startTime);
    const assets = await AssetsModel.find();
    const endTime = Date.now();
    console.log("after the find call " + endTime);
    console.log("Time taken to fetch assets: " + (endTime - startTime) + " ms");
    if (assets.length === 0) {
      return res.status(404).json({ message: "No assets found" });
    }
    // Store the assets in cache
    await redis.set(cachedKey, JSON.stringify(assets), "EX", 3600); // Cache for 1 hour
    res.status(200).json(assets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
export const getAssetById = async (req, res) => {
  // whatever the id is provided 1st print that id
  const id = req.params.id;

  //id = 6853f02676f13fb3aa2d1d75
  const asset = await AssetsModel.findById(id);
  if (!asset) {
    return res.status(404).json({ message: "Asset not found" });
  } else {
    res.status(200).json(asset);
  }
};
export const updateAsset = async (req, res) => {};
export const deleteAsset = async (req, res) => {};
