import config from "config";
import app from "./app.js";

const PORT = config.get("PORT") || 9500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
