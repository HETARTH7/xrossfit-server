const Cart = require("../model/cart");
const Order = require("../model/order");

const getOrder = (req, res) => {
  Order.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
};

const getPendingorders = (req, res) => {
  Order.find({ status: "Pending" })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
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
    });
    res.status(200).json({ message: "Order placed" });
  } catch (err) {
    res.status(500).json({ message: "Cannot place order" });
  }
};

const deliverOrder = (req, res) => {
  const id = req.params.id;
  Order.updateOne({ _id: id }, { $set: { status: "Delivered" } })
    .then(() => res.json("UPDATED"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getOrder,
  getPendingorders,
  getUserorder,
  order,
  deliverOrder,
};
