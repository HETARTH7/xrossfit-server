const Cart = require("../model/cart");
const Order = require("../model/order");
const Product = require("../model/Product");

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Cannot get the orders" });
  }
};

const getPendingorders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Cannot get the orders" });
  }
};

const getUserorder = (req, res) => {
  const user = req.params.user;
  Order.find({ user: user })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
};

const order = async (req, res) => {
  try {
    const { user } = req.params;
    const orders = await Cart.find({ user: user });
    var name, quantity, price, status;
    orders.forEach(async (element) => {
      name = element.name;
      quantity = element.quantity;
      price = element.price;
      status = "Pending";
      var orderItem = new Order({ user, name, quantity, price, status });
      await orderItem.save();
      await Cart.findByIdAndRemove(element._id);
      await Product.updateOne(
        { name: element.name },
        { $inc: { quantity: -element.quantity } }
      );
    });
    res.status(200).json({ message: "Order placed" });
  } catch (err) {
    res.status(500).json({ message: "Cannot place order" });
  }
};

const deliverOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.updateOne({ _id: id }, { $set: { status: "Delivered" } });
    res.status(200).json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Cannot udate the status" });
  }
};

module.exports = {
  getOrder,
  getPendingorders,
  getUserorder,
  order,
  deliverOrder,
};
