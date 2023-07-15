const router = require("express").Router();
const Stock = require("../models/stock");

router.route("/").get((req, res) => {
  Stock.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const description = req.body.desc;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const product = new Stock({ name, description, price, quantity });
  product.save();
});

router.route("/delete/:id").post((req, res) => {
  const id = req.params.id;
  Stock.findByIdAndRemove(id)
    .then(() => res.json("PRODUCT DELETED"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update").post((req, res) => {
  const id = req.body.upId;
  const price = req.body.upP;
  const quantity = req.body.upQ;
  Stock.updateOne({ _id: id }, { price: price, quantity: quantity })
    .then(() => res.json("Updated stock"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
