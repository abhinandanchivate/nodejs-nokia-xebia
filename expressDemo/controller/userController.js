// userRegister : is going to be a controller which will handle the user registration process part
// this function is responsible for having a connect with DB to perform the user creation work

import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
export const userRegister = async (req, res) => {
  // i/p : user details
  // i/p we will get from 3rd part
  // whatever the data we will get it in req it must be validated .
  // validation : 1. success ==> we will proceed with the data storage in DB.
  // 1. success sharing success info or failure ==> db failure problem
  // 2. failure ==> we will send the error message(failure details for validation) to the user.

  const { username, email, password } = req.body; // destructuring the req.body
  // check username or email exists or not
  const userExist = await UserModel.findOne({ $or: [{ username }, { email }] });
  // find 1st occurance .
  if (userExist) {
    let conflictedField = userExist.email === email ? "Email" : "Username";
    return res
      .status(400)
      .json({ message: `${conflictedField} already exists ` });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new UserModel({ username, email, password: hashed });
  // save the details
  user.save();
  res.status(201).json({ userDetails: user, status: "success" });
  // hash?
};
// async function
// await
// promises : it is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value
// pending: initail state , operation is not completed
// resolve: operation is completed and value is returned ==> success part
// reject : operation is failed ==> failure part ==> error details
// promises only one can be executed either resolve or reject.

//login
export const userLogin = async (req, res) => {
  // async : it is a keyword in js which is used to define a function which is going to be executed asynchronously
  // await : it is a keyword in js which is used to pause the execution of the function until the promise is resolved or rejected
};
