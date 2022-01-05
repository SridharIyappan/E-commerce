import Products from "../Models/productModel.js";
import ErrorHandler from "../Utils/errorHandler.js";
import ApiFeatures from "../Utils/apiFeatures.js";

export const createProduct = async (req, res, next) => {
  const supplier = req.user;
  const supplierId = supplier._id;
  const { ProductExpiryDate } = supplier;

  try {
    // console.log(req.params, 'params')
    // console.log(req.cookies);
    const productsCount = await Products.find({ supplierId });
    if (supplier.supplierLevel === null) {
      return next(
        new ErrorHandler("Please Buy a Package for Create Product", 402)
      );
    }
    if (supplier.supplierLevel === 3) {
      if (productsCount.length >= 3) {
        return next(
          new ErrorHandler("You are unable to create more then 3 products", 401)
        );
      }
    }
    if (supplier.supplierLevel === 2) {
      if (productsCount.length >= 2) {
        return next(
          new ErrorHandler("You are unable to create more then 2 products", 401)
        );
      }
    }
    if (supplier.supplierLevel === 1) {
      if (productsCount.length >= 1) {
        return next(
          new ErrorHandler("You are unable to create more then 1 products", 401)
        );
      }
    }
    const productHideDate = ProductExpiryDate;
    console.log(productHideDate);
    const show = true;
    const {
      name,
      category,
      image,
      mrpPrice,
      salePrice,
      specification,
      description,
      stock,
      deliveryOption,
    } = req.body;
    const product = new Products({
      supplierId,
      name,
      category,
      image,
      mrpPrice,
      salePrice,
      specification,
      description,
      stock,
      deliveryOption,
      productHideDate,
      show,
    });
    await product.save();
    return res.status(200).json("Product Created Successfully, 1");
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};
export const getAllProducts = async (req, res, next) => {
  try {
    const productsPerPage = 1;
    const productCount = await Products.countDocuments();
    const apiFeatures = new ApiFeatures(Products.find(), req.query, req)
      .search()
      .filter()
      .pagination(productsPerPage);
    const products = await apiFeatures.query;
    res
      .status(200)
      .json({ success: true, count: products.length, productCount, products });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};
export const getUniqueProduct = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found"));
    }
    res.status(201).json(product);
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};
export const getSupplierProducts = async (req, res, next) => {
  const supplier = req.user;
  const supplierId = supplier._id;
  try {
    const supplierProducts = await Products.find({ supplierId });
    console.log(supplierProducts);
    if (!supplierProducts) {
      return next(new ErrorHandler("You Doesn't Have Any Products", 400));
    }
    return res.status(200).json(supplierProducts);
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};
export const updateProducts = async (req, res, next) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};
export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Products.findByIdAndDelete(id);
    return res.status(200).json({ success: true, msg: "Successfully Deleted" });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};
