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
    const product = await Product.findById(req.params.id);
    const currentTotalRating =
      product.averageUserRating * product.reviews.length;
    const newAverageUserRating =
      (currentTotalRating + rating) / (product.reviews.length + 1);
    product.averageUserRating = newAverageUserRating;
    product.reviews.push({ user, content, rating });
    await product.save();
    res.status(200).json("Review added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProduct, addProduct, updateRatings };
