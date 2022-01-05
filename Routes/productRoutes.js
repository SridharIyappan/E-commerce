import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSupplierProducts,
  getUniqueProduct,
  updateProducts,
} from "../Controllers/productController.js";
import authentication from "../Middleware/authentication.js";
import authorization from "../Middleware/authorization.js";

const router = express.Router();

router.post(
  "/supplier/product/create",
  authentication,
  authorization("seller"),
  createProduct
);
router.get(
  "/supplier/products/list",
  authentication,
  authorization("seller"),
  getSupplierProducts
);
router.get("/products/list", getAllProducts);
router.get("/product/:id", getUniqueProduct);
router.put("/product/:id", authentication, updateProducts);
router.delete(
  "/product/:id",
  authentication,
  authorization("seller"),
  deleteProduct
);

export default router;
