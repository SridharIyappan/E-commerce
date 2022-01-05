import Order from "../Models/orderModel.js";
import Products from "../Models/productModel.js";
import ErrorHandler from "../Utils/errorHandler.js";

// New Order
export const newOrder = async (req, res, next) => {
  try {
      const {
        orderItems,
        shippingInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
      } = req.body;
      const order = new Order({
        orderItems,
        shippingInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
      });
      await order.save();
      return res.status(200).json({
        success: true,
        order,
      });
  } catch (err) {
      return next(new ErrorHandler(err, 500))
  }
};

// Get Single Order
export const getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        //  .populate(
        //   "user",
        //   "name email"
        // );
        if (!order) {
          return next(new ErrorHandler("No order found wit this ID", 404));
        }
        return res.status(200).json({
            success: true,
            order
        });
    } catch (err) {
        return next(new ErrorHandler(err, 500))
    }
};

// Get Logged in User Order
export const getUserOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({user: req.user.id});
        if (!orders) {
          return next(new ErrorHandler("Empty", 400));
        }
        return res.status(200).json({
          success: true,
          count: order.length,
          orders,
        });
    } catch (err) {
        return next(new ErrorHandler(err, 500))
    }
}; 
