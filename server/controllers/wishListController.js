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
    const { userID, productID } = req.body;
    await WishList.deleteOne({ userID, productID });
    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Cannot remove item from wishlist" });
  }
};

const viewWishList = async (req, res) => {
  try {
    const { userID } = req.body;
    // const response = await WishList.find({ userID });
    // var wishlist = [];
    // response.forEach((e) => {
    //   wishlist.push(e.productID);
    // });
    // res.status(200).json(wishlist);
    console.log(req.body);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured while fetching the wishlist" });
  }
};

module.exports = { addToWishList, removeFromWishList, viewWishList };
