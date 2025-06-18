// express validator package.
// registration : username, password, email
// login : username, password

import { body } from "express-validator";

const emailValidator = body("email")
  .normalizeEmail()
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Enter a valid Email address");
const passwordValidator = body("password")
  .trim()
  .notEmpty()
  .withMessage("Password is required ")
  .isLength({ min: 6, max: 10 })
  .withMessage("Password must be between 6 and 10 characters");
export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must have atleast 3 characters"),
  emailValidator,
  passwordValidator,
];
export const loginValidator = [emailValidator, passwordValidator];
export const loginCustomValidator = [
  body().custom((body) => {
    if (!body.email && !body.username) {
      throw new Error("Either email or username must be provided");
    }
    return true;
  }),
  body("email")
    .optional()
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  passwordValidator,
];
