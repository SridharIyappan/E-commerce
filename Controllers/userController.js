// Controller are used for only req and res

import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import normalizeUrl from "normalize-url";
import jwt from "jsonwebtoken";

import Users from "../Models/userModel.js";
import {
  registrationFieldValidation,
  ifUserAlreadyExist,
  ifUserNotExist,
} from "../Validations/userValidation.js";
import ErrorHandler from "../Utils/errorHandler.js";

export const createUser = async (req, res, next) => {
  // Field Requirements Error
  // registrationFieldValidation(req, res);
  // Store Field Validation Results Into errors
  const errors = validationResult(req);
  // If errors Is Not Equal To Empty Then Throw Error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //

  //Destructure Fields
  const {
    userName,
    userType,
    userEmail,
    userPassword,
    userAddress,
    userPincode,
    userMobileNumber,
  } = req.body;

  try {
    // Find User Already Exist & If Exist Throw Error
    //
    // ifUserAlreadyExist(req, res, userEmail);
    let user = await Users.findOne({ userEmail });
    // console.log(user);
    //If User Already Exist Throw Err
    if (user) {
      //
      return res.status(400).json("User already exist");
      // return next(new ErrorHandler("User already exist", 400));
      //
    }
    //

    //Get User Profile Url From User Email And Store to userAvatar
    const userAvatar = normalizeUrl(
      gravatar.url(userEmail, {
        s: "200",
        r: "pg",
        d: "mm",
      }),
      { forceHttps: true }
    );

    user = new Users({
      userType,
      userName,
      userEmail,
      userPassword,
      userAvatar,
      userMobileNumber,
      userAddress,
      userPincode,
    });

    //bcrypt Password
    const salt = await bcrypt.genSalt(12);
    user.userPassword = await bcrypt.hash(userPassword, salt);

    // Store User Details Into DB
    await user.save();

    // Create JWT Token For User
    /* GET User Object Id From DB */
    const payload = {
      user: {
        id: user.id,
      },
    };
    /* Create Token Using Payload */
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2 days" },
      (err, token) => {
        if (err) return res.json("jwt token generate fail");
        return res.json({ token });
      }
    );

    // return res.status(200).json("Register Success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Errorr");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    console.log(userEmail);
    console.log(userPassword);
    // ifUserNotExist(req, res, userEmail, userPassword);
    const user = await Users.findOne({ userEmail });
    console.log(user, 'user');
    if (!user) {
      return res.status(404).json("Email Doesn't Exist");
    }
    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
    console.log(passwordMatch, 'passwordMatch');
    if (!passwordMatch) {
      return res.status(400).json("Incorrect Password");
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2 days" },
      (err, token) => {
        if (err) return res.json("jwt token generate fail");
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Errorr");
  }
  
};
