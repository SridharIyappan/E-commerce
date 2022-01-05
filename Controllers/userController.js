// Controller are used for only req and res

import Users from "../Models/userModel.js";
import { fieldValidation, userExist } from "../Validations/userValidation.js";
import ErrorHandler from "../Utils/errorHandler.js";
import defaultProfile from "../Utils/defaultProfile.js";
import { encryptPassword, decryptPassword } from "../Utils/bcryptPassword.js";
import { generateToken } from "../Utils/jwtToken.js";
import Cookie from "../Utils/cookie.js";
import { addMonths } from "date-fns";
import crypto from "crypto";
import sendEmail from "../Utils/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const errors = await fieldValidation(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {
      name,
      type,
      email,
      password,
      avatar,
      address,
      pincode,
      mobileNumber,
    } = req.body;
    const existingUser = await userExist(email);
    if (existingUser) {
      return next(new ErrorHandler("Account already exist", 400));
    }
    if (avatar === undefined) {
      avatar = await defaultProfile(email);
    }
    const user = new Users({
      type,
      name,
      email,
      password,
      avatar,
      mobileNumber,
      address,
      pincode,
    });
    user.password = await encryptPassword(password);
    await user.save();
    const payload = { id: user.id };
    const token = await generateToken(payload);
    return Cookie(user, token, 200, res);
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = await fieldValidation(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json("Email Doesn't Exist");
    }
    const passwordMatch = await decryptPassword(password, user.password);
    if (!passwordMatch) {
      return next(new ErrorHandler("Incorrect Password", 400));
    }
    const payload = { id: user._id };
    const token = await generateToken(payload);
    return Cookie(user, token, 200, res);
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(200).json({ success: true, msg: "Logout Success" });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
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

export const updateSeller = async (req, res, next) => {
  const id = req.user._id;
  const existProductExpiryDate = req.user.ProductExpiryDate;
  const { supplierLevel } = req.body;
  try {
    let maxProductCount = 0;
    let ProductExpiryDate = 0;
    if (supplierLevel == 1) {
      maxProductCount = 1;
      ProductExpiryDate = addMonths(existProductExpiryDate, 1);
    }
    if (supplierLevel == 2) {
      maxProductCount = 2;
      ProductExpiryDate = addMonths(existProductExpiryDate, 2);
    }
    if (supplierLevel == 3) {
      maxProductCount = 3;
      ProductExpiryDate = addMonths(existProductExpiryDate, 3);
    }
    await Users.findByIdAndUpdate(
      { _id: id },
      { $set: { supplierLevel, ProductExpiryDate, maxProductCount } }
    );
    return res
      .status(201)
      .json({ success: true, msg: "Supplier Update Success" });
  } catch (err) {
    return next(new ErrorHandler("Seller Update Error", 401));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await Users.findById(id);
    console.log(user);
    await Users.findByIdAndUpdate({ _id: id }, { $set: req.body });
    return res.status(201).json({ success: true, msg: "Update Success" });
  } catch (err) {
    return next(new ErrorHandler("Update Failed"), 401);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const remove = await Users.findByIdAndDelete(id);
    return res.status(200).json("User Successfully Deleted");
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

//Forget Password
export const forgetPassword = async (req, res, next) => {
  const email = req.body.email;
  const user = await Users.findOne({ email });
  try {
    if (!user) {
      return next(new ErrorHandler("User Not Found With this Email", 404));
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(resetToken, 'forget tok')
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
      console.log(resetPasswordToken, 'forget pass tok')
    const resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    await user.updateOne({ resetPasswordToken, resetPasswordExpire });
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/reset-password/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    return next(new ErrorHandler(err, 500));
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    console.log(req.params.token, 'reset tok')
     const resetPasswordToken = crypto
       .createHash("sha256")
       .update(req.params.token)
       .digest("hex");
      console.log(resetPasswordToken, "reset password token");
    const user = await Users.findOne({
      resetPasswordToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new ErrorHandler(
          "Password reset token is invalid or has been expired",
          400
        )
      );
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("Password and Confirm Password doesn't match")
      );
    }
    user.password = await encryptPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    const payload = { id: user.id };
    const token = await generateToken(payload);
    return Cookie(user, token, 200, res);
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};
