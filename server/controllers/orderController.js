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

const order = (req, res) => {
  const user = req.body.user;
  Cart.find({ user: user }, (err, data) => {
    var name, quantity, price, status;
    data.forEach((element) => {
      name = element.name;
      quantity = element.quantity;
      price = element.price;
      status = "Pending";
      var orderItem = new Order({ user, name, quantity, price, status });
      orderItem.save();
      Cart.deleteOne({ user: user, name: name })
        .then()
        .catch((err) => res.status(400).json(err));
    });
  });
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
