const { reverse } = require("dns");
const Product = require("../models/productModel");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Product added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRatings = async (req, res) => {
  try {
    const { user, content, rating } = req.body;
    const product = await Product.find({ _id: req.params.id });
    averageUserRating = await product[0].averageUserRating;
    n = product[0].reviews.length;
    if (!n) averageUserRating = rating;
    else averageUserRating = (await (averageUserRating / n + rating)) / (n + 1);

    product[0].averageUserRating = await averageUserRating;
    await product[0].reviews.push(req.body);
    await product[0].save();
    res.status(200).json("Review added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProduct, addProduct, updateRatings };
