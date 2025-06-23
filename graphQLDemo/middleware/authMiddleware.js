import jwt from "jsonwebtoken";

export function getUserFromToken(req) {
  const token = req.headers["x-auth-token"];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
