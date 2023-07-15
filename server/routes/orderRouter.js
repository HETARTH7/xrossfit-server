const router = require("express").Router();
const Cart = require("../models/cart");
const Order = require("../models/order");

router.route("/").get((req, res) => {
  Order.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

router.route("/pending").get((req, res) => {
  Order.find({ status: "Pending" })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

router.route("/:user").get((req, res) => {
  const user = req.params.user;
  Order.find({ user: user })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

router.route("/").post((req, res) => {
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
});

router.route("/deliver/:id").post((req, res) => {
  const id = req.params.id;
  Order.updateOne({ _id: id }, { $set: { status: "Delivered" } })
    .then(() => res.json("UPDATED"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
