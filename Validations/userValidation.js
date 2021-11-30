import { check, validationResult } from "express-validator";
import Users from "../Models/userModel.js";

//
// const ErrorHandler = require('../Utils/errorHandler.js')
import ErrorHandler from '../Utils/errorHandler.js'
/*   <---------- User Post Validation Start ---------->  */
/* <----- Register Validation Start -----> */
/* <----- Fields Validation Start -----> */
  // Fields Requirements
  export const userRegistrationFieldRequirements = [
    check("userName", "User Name is required").notEmpty(),
    check("userType", "User Type is required").notEmpty(),
    check("userEmail", "Please include a valid email").isEmail(),
    check(
      "userPassword",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ];
  // Fields Validation Have Error Then Throw Error
  export const registrationFieldValidation = (req, res) => {
    // Store Field Validation Results Into errors
    const errors = validationResult(req);
    // If errors Is Not Equal To Empty Then Throw Error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  };
/* <----- Field Validation End -----> */
/* <----- Find User Already Exist & If Exist Throw Error Start -----> */
  export const ifUserAlreadyExist = async (req, res, userEmail) => {
    //Find User Exist or Not
    let user = await Users.findOne({ userEmail });
    console.log(user)
    //If User Already Exist Throw Err
    if (user) {
      // 
      // return res.status(400).json("User already exist");
      return next(new ErrorHandler("User already exist", 400));
      // 
    }
  }
/* <----- Find User Already Exist & If Exist Throw Error End -----> */
/* <----- Register Validation End -----> */

/* <----- Login Validation Start -----> */
/* <----- Find User Exist & If Not Exist Throw Error Start -----> */
  export const ifUserNotExist = async (req, res, userEmail, userPassword) => {
    //Find User Exist or Not
    console.log(userEmail);
    let user = await Users.find({ userEmail });
    //If User Already Exist Throw Err
    if (!user) {
      return res.status(400).json("Account Doesn't Exist");
    }
    //Check User Password
    console.log(userPassword);
    let password = user.userPassword === userPassword;
    //If password Not Correct
    if (!password) {
      return res.status(400).json("Wrong Password");
    }
    return userPassword;
  }
/* <----- Find User Exist & If Not Exist Throw Error End -----> */
/* <----- Field Login Validation End -----> */
/*   <---------- User Post Validation End ---------->  */