import express from "express";
import { userLogin, userRegister } from "../controller/userController";

const userRouter = express.Router();

// we need to consume userRegistration process
// userRegistration : is it a new entry or update entry ? new entry
// new entries would be handled by post method
// to perform the user Registraion
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/", (req, res) => {
  res.json({ message: "Assets route" });
});
export default userRouter;
