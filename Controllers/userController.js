// Controller are used for only req and res

import { validationResult } from "express-validator";
import normalizeUrl from "normalize-url";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";

import Users from "../Models/userModel.js";

export const createUser = async (req, res) => {

  // Field Error Validation Start
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Field Error Validation End

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
    //Find User Exist or Not
    let user = await Users.findOne({userEmail});

    //If User Already Exist
    if(user) {
      return res.status(400).json("User already exist")
    }

    //Get User Profile Url From User Email And Store to userAvatar
    const userAvatar = normalizeUrl(
      gravatar.url(userEmail, {
        s: '200',
        r: 'pg',
        d: 'mm',
      }), 
      {forceHttps: true}
    )

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
    user.userPassword = await bcrypt.hash(userPassword, salt)

    

    // Store User Details Into DB
    await user.save();

    return res.status(200).json("post success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Errorr");
  }
};
