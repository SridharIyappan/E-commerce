import express from "express";
import {check} from 'express-validator';
import { createUser, getAllUsers, loginUser } from "../Controllers/userController.js";
import { userRegistrationFieldRequirements } from "../Validations/userValidation.js";
const router = express.Router();

// router.route("/user").post(createUser);
router.post(
  "/user/register",
  [
    check("userName", "User Name is required").notEmpty(),
    check("userType", "User Type is required").notEmpty(),
    check("userEmail", "Please include a valid email").notEmpty(),
    check(
      "userPassword",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  createUser
);
router.get("/users/get_all_users", getAllUsers);
router.post("/user/login", loginUser);

export default router;
