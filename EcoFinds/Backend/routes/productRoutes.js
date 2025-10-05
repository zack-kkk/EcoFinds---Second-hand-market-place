const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middleware/authMiddleware");

// Add product
router.post("/", auth, async (req, res) => {
  const { title, description, category, price } = req.body;

  try {
    const product = new Product({
      title, description, category, price,
      owner: req.user
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all products (with optional search/filter)
router.get("/", async (req, res) => {
  const { category, keyword } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (keyword) filter.title = { $regex: keyword, $options: "i" };

  try {
    const products = await Product.find(filter).populate("owner", "username");
    res.json(products);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("owner", "username");
    res.json(product);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Edit product
router.put("/:id", auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product.owner.toString() !== req.user) return res.status(401).json({ msg: "Unauthorized" });

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete product
router.delete("/:id", auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product.owner.toString() !== req.user) return res.status(401).json({ msg: "Unauthorized" });

    await product.deleteOne();
    res.json({ msg: "Product removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
