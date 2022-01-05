import { check, validationResult } from "express-validator";

import Users from "../Models/userModel.js";

export const registrationFieldRequirements = [
  check("name", "Name is required").notEmpty(),
  check("type", "Type is required").notEmpty(),
  check("email", "Emai is required").notEmpty(),
  check(
    "password",
    "Please enter a password with 8 or more characters"
  ).notEmpty().isLength({ min: 8 }),
];

export const loginFieldRequirements = [
    check("email", "Please Enter Your Email").notEmpty(),
    check("password", "Please Enter Your Password ").notEmpty(),
  ];

export const fieldValidation = (req) => {
  let errors = validationResult(req);
  return errors;
};

export const userExist = async (email) => {
  let user = await Users.findOne({ email });
  return user;
}

