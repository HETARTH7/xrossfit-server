const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const placeOrder = async (req, res) => {
  try {
    const { user, product, effectivePrice, quantity, address } = req.body;
    const newOrder = new Order({
      user,
      product,
      effectivePrice,
      quantity,
      address,
    });
    await newOrder.save();
    await Cart.deleteOne({ user, productID: product });
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { user } = req.params;
    const orders = await Order.find({ user });
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
};
