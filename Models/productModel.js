import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: [
        "Electronics",
        "Camera",
        "Accessories",
        "Headphones",
        "Books",
        "Laptops",
        "Food",
        "Clothes",
        "Shoes",
        "Beauty",
        "Health",
        "Sports",
        "Fitness",
      ],
    },
  },
  image: {
    type: Array,
    required: true,
  },
  mrpPrice: {
    type: Number,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  specification: {
    type: String,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  deliveryOption: {
    type: Boolean,
    required: true,
  },
  buyersCount: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  productHideDate: {
    type: Date,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model("products", productSchema);

export default Products;