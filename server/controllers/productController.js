const Product = require("../model/Product");

const getProduct = (req, res) => {
  Product.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const addProduct = (req, res) => {
  const name = req.body.name;
  const description = req.body.desc;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const img = req.body.img;
  const product = new Product({ name, description, price, quantity, img });
  product.save();
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.findByIdAndRemove(id)
    .then(() => res.json("PRODUCT DELETED"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateProduct = (req, res) => {
  const id = req.body.upId;
  const price = req.body.upP;
  const quantity = req.body.upQ;
  Product.updateOne({ _id: id }, { price: price, quantity: quantity })
    .then(() => res.json("Updated Product"))
    .catch((err) => res.status(400).json(err));
};

module.exports = { getProduct, addProduct, deleteProduct, updateProduct };
