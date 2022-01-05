import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  mobileNumber: {
    type: Number,
  },
  avatar: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  // For Suppliers
  supplierLevel: {
    type: Number,
    default: null,
  },
  maxProductCount: {
    type: Number,
    default: 0,
  },
  ProductExpiryDate: {
    type: Date,
    default: Date.now,
  },
  // For All Kind of Users
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const Users = mongoose.model("users", userSchema);

export default Users;