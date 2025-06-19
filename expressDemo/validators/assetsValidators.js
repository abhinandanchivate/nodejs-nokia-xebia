import { body } from "express-validator";

const assetValidator = [
  body("assetName")
    .trim()
    .notEmpty()
    .withMessage("Asset name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Asset name must be 3-50 characters long"),

  body("assetType")
    .notEmpty()
    .withMessage("Asset type is required")
    .isIn(["Laptop", "Desktop", "Monitor", "Mobile", "Tablet", "Other"])
    .withMessage("Invalid asset type"),

  body("assetLocation")
    .trim()
    .notEmpty()
    .withMessage("Asset location is required"),

  body("assignedTo")
    .trim()
    .notEmpty()
    .withMessage("AssignedTo is required")
    .matches(/^[a-zA-Z0-9._%+-]+@nokia\.com$/) // regex
    .withMessage("AssignedTo must only contain letters and spaces"),

  body("deployedDate")
    .notEmpty()
    .withMessage("Deployed date is required")
    .isISO8601()
    .toDate()
    .withMessage("Deployed date must be a valid ISO8601 date")
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error("Deployed date cannot be in the future");
      }
      return true;
    }),

  body("status")
    .optional()
    .isIn(["available", "assigned", "maintenance", "lost"])
    .withMessage("Invalid status value"),
];

export default assetValidator;
