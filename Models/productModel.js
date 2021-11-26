import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  produtCategory: {
    type: String,
    required: true,
  },
  productImage: {
    type: Array,
    required: true,
  },
  productMrpPrice: {
    type: Number,
  },
  productSalePrice: {
    type: Number,
    required: true,
  },
  productSpecification: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productInStock: {
    type: Number,
    require: true,
  },
  productDeliveryOption: {
    type: Boolean,
    required: true,
  },
  productShow: {
    type: Boolean,
    required: true,
  },
});

export const Products = mongoose.model("products", productSchema);
