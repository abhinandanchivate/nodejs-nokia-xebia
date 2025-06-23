import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../middleware/logger.js";

dotenv.config();

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(" MongoDB connection failed:", error);
    process.exit(1);
  }
}
