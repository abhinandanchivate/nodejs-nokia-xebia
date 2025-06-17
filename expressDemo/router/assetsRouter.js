import express from "express";

const assetsRouter = express.Router();

assetsRouter.get("/", (req, res) => {
  res.json({ message: "Assets route" });
});
export default assetsRouter;
