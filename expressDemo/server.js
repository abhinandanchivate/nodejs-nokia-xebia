import config from "config";
import app from "./app.js";
import connectDB from "./appconfig/db.config.js";

const PORT = config.get("PORT") || 9500;
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
