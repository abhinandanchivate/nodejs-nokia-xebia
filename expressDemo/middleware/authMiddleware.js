// retrieve the token from the request
// validate the token
import config from "config";
import jwt from "jsonwebtoken";
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
  else {
    // validate the token
    try {
      const decoded = jwt.verify(token, jwtSecret);
      console.log(decoded);
      console.log(Date.now());
      // establish the condition based on expiry of the token
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        console.log("inside exp criteria");
        req.user = decoded; // over the request it will create a new field called
        // user and that one will get decoded value .
      } else {
        return res
          .status(401)
          .json({ message: "Access denied. Token expired." });
      }
    } catch (ex) {
      return res.status(400).json({ message: ex.message });
    }
  }
  next();
};
