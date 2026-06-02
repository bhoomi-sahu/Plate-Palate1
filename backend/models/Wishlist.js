const mongoose =
  require("mongoose");

const wishlistSchema =
  new mongoose.Schema({

    userId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref:"User",
    },

    foodId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref:"Food",
    },

  });

module.exports =
  mongoose.model(
    "Wishlist",
    wishlistSchema
  );