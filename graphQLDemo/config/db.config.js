import mongoose from "mongoose";

import config from "config";

const connectDB = async () => {
  try {
    const URI = config.get("MONGO_URI");

    console.log("URI :", URI);
    console.log(process.env.MONGO_URI);
    console.log(process.env.NODE_ENV);
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
};
export default connectDB;
