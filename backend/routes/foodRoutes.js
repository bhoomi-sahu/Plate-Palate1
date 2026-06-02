const express =
  require("express");

const router =
  express.Router();

const multer =
  require("multer");

const path =
  require("path");

const protect =
  require("../middleware/authMiddleware");

const foodController =
  require("../controllers/foodController");

// MULTER STORAGE
const storage =
  multer.diskStorage({

    destination:
      (req, file, cb) => {

        cb(
          null,
          "uploads/"
        );

      },

    filename:
      (req, file, cb) => {

        cb(
          null,
          Date.now() +
          path.extname(
            file.originalname
          )
        );

      },

  });

const upload =
  multer({ storage });

// GET ALL FOODS
router.get(
  "/",
  foodController.getFoods
);

// GET SINGLE FOOD
router.get(
  "/:id",
  foodController.getSingleFood
);

// SELLER FOODS
router.get(
  "/seller",
  protect,
  foodController.getSellerFoods
);

// ADD FOOD
router.post(
  "/add",
  protect,
  upload.single("image"),
  foodController.addFood
);

// DELETE FOOD
router.delete(
  "/:id",
  protect,
  foodController.deleteFood
);

module.exports =
  router;