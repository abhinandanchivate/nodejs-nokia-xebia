// routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/Usersmodel.js";
import Role from "../models/Rolemodel.js";
import config from "config";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // 2. Check password
  const isMatch = await (password == user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  // 3. Sign token
  const tokenPayload = {
    _id: user._id,
    email: user.email,
    role: user.role, // just role ID for now
  };

  const token = jwt.sign(tokenPayload, config.get("JWT_SECRET"), {
    expiresIn: "1h",
  });

  res.json({ token });
});

export default router;
