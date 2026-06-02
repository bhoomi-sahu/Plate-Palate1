const Wishlist =
  require("../models/Wishlist");

// TOGGLE WISHLIST
exports.toggleWishlist =
async (req, res) => {

  try {

    const {
      foodId,
    } = req.body;

    const existing =
      await Wishlist.findOne({

        userId:
          req.user._id,

        foodId,

      });

    // REMOVE
    if (existing) {

      await existing.deleteOne();

      return res.json({
        liked:false,
      });

    }

    // ADD
    await Wishlist.create({

      userId:
        req.user._id,

      foodId,

    });

    res.json({
      liked:true,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

// GET USER WISHLIST
exports.getWishlist =
async (req, res) => {

  try {

    const wishlist =
      await Wishlist.find({

        userId:
          req.user._id,

      }).populate(
        "foodId"
      );

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};