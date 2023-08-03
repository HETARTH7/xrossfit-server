const Cart = require("../model/cart");
const Product = require("../model/Product");

const getCart = async (req, res) => {
  try {
    const { user } = req.params;
    const cart = await Cart.find({ user: user });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Cannot get the cart" });
  }
};

const addItem = async (req, res) => {
  try {
    const { user, name, price } = req.body;
    const quantity = 1;
    const newItem = new Cart({ user, name, quantity, price });
    const data = await Cart.find({ user: user, name: name });
    if (data.length == 0) {
      await newItem.save();
    } else {
      await Cart.updateOne(
        { user: user, name: name },
        { $inc: { quantity: quantity } }
      );
    }
    res.status(200).json({ message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ message: "Cannot add item to the cart" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndRemove(id);
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Cannot update the cart" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    await Cart.updateOne(
      {
        _id: id,
      },
      { quantity: quantity }
    );
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Cannot update the cart" });
  }
};

module.exports = { getCart, addItem, updateCart, deleteFromCart };
