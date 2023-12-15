const Order = require("../models/orderModel");

const getCart = async (req, res) => {
  try {
    const { user } = req.params;
    cart = await Order.find({ status: "In Cart", user });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { user } = req.params;
    if (user) {
      order = await Order.find({ status: "Active", user });
    } else {
      order = await Order.find({ status: "Active" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    newItem = new Order(req.body);
    await newItem.save();
    res.status(200).json("Cart updated");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $pull: { products: { _id: productId } } },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: error.message });
    }
    res.status(200).json("Item Removed");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: "Active" } },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json("Order Placed");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: "Complete" } },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json("Order completed");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  getOrders,
  addToCart,
  removeProductFromCart,
  placeOrder,
  completeOrder,
};
