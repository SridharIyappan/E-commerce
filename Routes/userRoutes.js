import express from "express";
import { check } from "express-validator";
import {
  register,
  login,
  logout,
  getAllUsers,
  updateSeller,
  updateUser,
  deleteUser,
  forgetPassword,
  resetPassword
} from "../Controllers/userController.js";
import authentication from "../Middleware/authentication.js";
import authorization from "../Middleware/authorization.js";

import {
  registrationFieldRequirements,
  loginFieldRequirements,
} from "../Validations/userValidation.js";

const router = express.Router();

// router.route("/user").post(registrationFieldRequirements, createUser);
router.post("/register", registrationFieldRequirements, register);
router.post("/login", loginFieldRequirements, login);
router.post("/logout", logout);
router.post('/forget-password', forgetPassword);
router.put('/reset-password/:token', resetPassword);
router.put(
  "/supplier/update",
  authentication,
  authorization("seller"),
  updateSeller
);
router.put("/user/update", authentication, authorization('user'), updateUser);
router.get("/all-users", authentication, authorization('admin'), getAllUsers);
router.delete("/delete/user", authentication, deleteUser);


export default router;
