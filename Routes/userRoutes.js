import express from "express";
import { createUser } from "../Controllers/userController.js";
import { userValidation } from "../Validations/userValidation.js";
const router = express.Router();

// router.route("/user").post(createUser);
router.post("/user", userValidation, createUser);

export default router;
