import jwt from "jsonwebtoken";
import config from "config";

export function getUserFromToken(req) {
  const token = req.headers["x-auth-token"];
  console.log(token + "token");
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    return decoded;
  } catch (err) {
    return null;
  }
}
