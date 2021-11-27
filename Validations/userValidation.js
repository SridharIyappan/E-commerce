import { check } from "express-validator"

export const userValidation = [
  check("userName", "User Name required").notEmpty(),
  check("userType", "Name is required").notEmpty(),
  check("userEmail", "Email not valid").isEmail(),
  check(
    "userPassword",
    "Please enter a password with 8 or more characters"
  ).isLength({ min: 8 }),
];