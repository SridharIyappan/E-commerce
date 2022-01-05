import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    shippingAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      Quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    type: Number,
    requied: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    requied: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    requied: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    requied: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {
    type: Date,
  },
  craetedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("order", orderSchema);

export default Order;