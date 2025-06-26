import express from "express";
import {
  getUserById,
  getUsers,
  userLogin,
  userRegister,
} from "../controller/userController.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/userValidators.js";

const userRouter = express.Router();

// we need to consume userRegistration process
// userRegistration : is it a new entry or update entry ? new entry
// new entries would be handled by post method
// to perform the user Registraion
userRouter.post(
  "/register",
  registerValidator,

  userRegister
);
userRouter.post("/login", loginValidator, userLogin);
userRouter.get("/", (req, res) => {
  res.json({ message: "Assets route" });
});
userRouter.get("/all", getUsers);
userRouter.get("/:id", getUserById);
export default userRouter;
