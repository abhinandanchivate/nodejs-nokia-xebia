// appconfig/db.config.js
import mongoose from "mongoose";
import config from "config";

const connectDB = async (
  { connect = mongoose.connect } = {},
  customConfig = config
) => {
  try {
    const URI = customConfig.get("MONGO_URI");
    await connect(URI, { useNewUrlParser: true });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
};

export default connectDB;
