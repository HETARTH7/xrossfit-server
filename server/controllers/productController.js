const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      price,
      discountType,
      discount,
      stock,
      imageURL,
      category,
    } = req.body;
    if (
      !name ||
      !description ||
      !brand ||
      !price ||
      !stock ||
      !imageURL ||
      !category
    ) {
      const fieldValidationError = new Error(
        "All * marked fields must be filled"
      );
      fieldValidationError.name = "FieldValidationError";
      throw fieldValidationError;
    }
    const product = new Product({
      name,
      description,
      brand,
      price,
      discountType,
      discount,
      stock,
      imageURL,
      category,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    if (error.name === "FieldValidationError")
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.find({ _id });
    res.status(200).json({ message: "Product fetched", product: product[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      price,
      discountType,
      discount,
      stock,
      imageURL,
      category,
      reviews,
    } = req.body;
    const { _id } = req.params;
    if (
      !name ||
      !description ||
      !brand ||
      !price ||
      !stock ||
      !imageURL ||
      !category
    ) {
      const fieldValidationError = new Error(
        "Can't update the value to be empty"
      );
      fieldValidationError.name = "FieldValidationError";
      throw fieldValidationError;
    }
    await Product.updateOne(
      { _id },
      {
        name,
        description,
        brand,
        price,
        discountType,
        discount,
        stock,
        imageURL,
        category,
        reviews,
      }
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    if (error.name === "FieldValidationError")
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, getProductById, getProducts, updateProduct };
