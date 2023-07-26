const Cart = require("../models/cart");
const Product = require("../model/Product");

const getCart = (req, res) => {
  const user = req.params.user;
  Cart.find({ user: user })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
};

const addItem = (req, res) => {
  const user = req.body.user;
  const name = req.body.item;
  const price = req.body.price;
  const quantity = 1;
  const newItem = new Cart({ user, name, quantity, price });
  Cart.find({ user: user, name: name }, (err, data) => {
    if (err) console.log(err);
    if (data.length == 0) {
      newItem
        .save()
        .then(() => res.json("Item Added"))
        .catch((err) => res.status(400).json(err));
    } else {
      Cart.updateOne(
        { user: user, name: name },
        { $inc: { quantity: quantity, price: price } }
      )
        .then(() => res.json("Cart Updated"))
        .catch((err) => res.status(400).json(err));
    }
  });
};

const updateCart = (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const n = req.body.n;
  if (n == -1) {
    Cart.find({ user: user, name: name }, "quantity", (err, data) => {
      if (err) console.log(err);
      if (data[0].quantity == 1) {
        Cart.deleteOne({ user: user, name: name })
          .then(() => res.json("Deleted"))
          .catch((err) => res.status(400).json(err));
      } else {
        Product.find({ name: name }, "price", (err, data) => {
          const itemPrice = data[0].price;
          Cart.updateOne(
            { user: user, name: name },
            { $inc: { quantity: n, price: -itemPrice } }
          )
            .then(() => res.json("Cart Updated"))
            .catch((err) => res.status(400).json(err));
        });
      }
    });
  } else {
    Product.find({ name: name }, "price", (err, data) => {
      const itemPrice = data[0].price;
      Cart.updateOne(
        { user: user, name: name },
        { $inc: { quantity: n, price: itemPrice } }
      )
        .then(() => res.json("Cart Updated"))
        .catch((err) => res.status(400).json(err));
    });
  }
};

module.exports = { getCart, addItem, updateCart };
