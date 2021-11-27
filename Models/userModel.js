import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userMobileNumber: {
    type: Number,
  },
  userAvatar: {
    type: String,
  },
  UserLevel: {
    type: String,
  },
  userAddress: {
    type: String,
  },
  userPincode: {
    type: Number,
  },
});

const Users = mongoose.model("users", userSchema);

export default Users;