const express =
  require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const {

  toggleWishlist,

  getWishlist,

} = require(
  "../controllers/wishlistController"
);

// TOGGLE
router.post(
  "/toggle",
  protect,
  toggleWishlist
);

// GET
router.get(
  "/",
  protect,
  getWishlist
);

module.exports =
  router;