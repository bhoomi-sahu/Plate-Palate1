const express =
  require("express");

const router =
  express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} = require(
  "../controllers/cartController"
);

const protect =
  require("../middleware/authMiddleware");

// ADD TO CART
router.post(
  "/add",
  protect,
  addToCart
);

// GET CART
router.get(
  "/",
  protect,
  getCart
);

// REMOVE ITEM
router.delete(
  "/:foodId",
  protect,
  removeFromCart
);

// UPDATE QUANTITY
router.put(
  "/update",
  protect,
  updateQuantity
);

module.exports =
  router;