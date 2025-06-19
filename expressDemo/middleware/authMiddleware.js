// retrieve the token from the request
// validate the token
import config from "config";
const jwtSecret = config.get("JWT_SECRET");

export const authMiddleware = (req, res, next) => {
  // req
  // res
  // next ==> next middleware / handler (controller)
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  next();
};
