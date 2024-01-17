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
    const { user, product, price } = req.body;
    let cart = await Order.findOne({ status: "In Cart", user });

    if (!cart) {
      cart = new Order({
        user,
        products: [{ product, quantity: 1, price: price }],
        totalPrice: price,
      });
    } else {
      const existingProduct = cart.products.find(
        (cartProduct) => cartProduct.product === product
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ product, quantity: 1 });
      }

      cart.totalPrice += price;
    }

    await cart.save();
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
    if (!updatedOrder.products.length) await Order.findByIdAndDelete(orderId);
    res.status(200).json("Item Removed");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const decrementProductQuantity = async (req, res) => {
  try {
    const { user, product, price } = req.body;
    let cart = await Order.findOne({ status: "In Cart", user });
    const existingProduct = cart.products.find(
      (cartProduct) => cartProduct.product === product
    );
    existingProduct.quantity -= 1;
    cart.totalPrice -= price;
    await cart.save();
    res.status(200).json("Cart updated");
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
  decrementProductQuantity,
};
