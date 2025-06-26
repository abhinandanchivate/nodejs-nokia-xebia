// userRegister : is going to be a controller which will handle the user registration process part
// this function is responsible for having a connect with DB to perform the user creation work

import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel.js";
import { fetchAllUser, fetchUserById } from "../services/user.service.js";

export const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
  const user = new UserModel({ username, email, password });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // email and password
  const { email, password } = req.body;
  console.log(email, password);
  // password ==> provided by user in non encrypted
  // provided password by the user is non encrypted and stored one is encrypted
  // user provided one to encrypted ==> comparison or vice a versa.

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }
  console.log("email id is " + user.email, "password" + user.password);
  const isMatch = user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  } else {
    // token generation
    // secret key
    const secret = config.get("JWT_SECRET");
    const token = jwt.sign({ id: user._id, email }, secret, {
      expiresIn: "1hr",
    }); // to generate token
    res.status(200).json({ token, message: "Login Success" });
  }
  // Token would be generated to have further communication with server from the client.
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUser();
    res.status(200).json(users);
  } catch (error) {}
};
// getUserbyId
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await fetchUserById(id);
    console.log("after fetching user by id " + user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
