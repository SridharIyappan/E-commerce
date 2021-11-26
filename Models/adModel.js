import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    adType: {
      type: String,
      required: true,
    },
    adImage: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

export const Ad = mongoose.model('ad', adSchema)