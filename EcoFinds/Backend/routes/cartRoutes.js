const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const auth = require("../middleware/authMiddleware");

// View Cart
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user }).populate("products");
  res.json(cart);
});

// Add to Cart
router.post("/add", auth, async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ userId: req.user });
  if (!cart) {
    cart = new Cart({ userId: req.user, products: [productId] });
  } else {
    cart.products.push(productId);
  }
  await cart.save();
  res.json(cart);
});

module.exports = router;
