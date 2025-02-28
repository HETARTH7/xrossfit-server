const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const { user, productID } = req.body;
    const exisitsInCart = await Cart.findOne({
      user,
      productID,
    });
    if (exisitsInCart) {
      exisitsInCart.quantity++;
      exisitsInCart.save();
    } else {
      const newItem = new Cart({
        user,
        productID,
      });
      await newItem.save();
    }
    res.status(201).json({ message: "Cart updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { _id } = req.params;
    await Cart.findByIdAndDelete({ _id });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const incrementItemQuantityInCart = async (req, res) => {
  try {
    const { _id } = req.params;
    await Cart.findByIdAndUpdate({ _id }, { $inc: { quantity: 1 } });
    res.status(200).json({ message: "Cart Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const decrementItemQuantityInCart = async (req, res) => {
  try {
    const { _id } = req.params;
    await Cart.findByIdAndUpdate({ _id }, { $inc: { quantity: -1 } });
    res.status(200).json({ message: "Cart Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { user } = req.params;
    const cart = await Cart.find({ user }).populate("productID");
    res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  removeItemFromCart,
  incrementItemQuantityInCart,
  decrementItemQuantityInCart,
  getCart,
};
