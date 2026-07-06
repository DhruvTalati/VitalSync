import { body, validationResult } from "express-validator";
import ApiError from "../../utils/ApiError.js";

export const validateRegister = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["patient", "doctor"])
    .withMessage("Invalid role"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const runValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new ApiError(
      400,
      "Validation failed",
      result.array().map((e) => e.msg),
    );
  }
  next();
};
