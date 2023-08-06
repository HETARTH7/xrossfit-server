const WishList = require("../model/Wishlist");

const addToWishList = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const newItem = new WishList({ userID, productID });
    await newItem.save();
    res.status(200).json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Cannot add to the wishlist" });
  }
};

const removeFromWishList = async (req, res) => {
  try {
    const { id } = req.params;
    await WishList.findByIdAndRemove(id);
    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Cannot remove item from wishlist" });
  }
};

const viewWishList = async (req, res) => {
  try {
    const { userID } = req.params;
    const response = await WishList.find({ userID });
    res.status(200).json(response);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured while fetching the wishlist" });
  }
};

module.exports = { addToWishList, removeFromWishList, viewWishList };
