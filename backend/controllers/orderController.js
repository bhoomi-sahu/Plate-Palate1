const Order = require("../models/Order");
const Cart = require("../models/Cart");


// PLACE ORDER
exports.placeOrder = async (req, res) => {

  try {

    const {
      deliveryType,
      paymentMethod,
      paymentStatus,
      deliveryAddress,
      deliveryLat,
      deliveryLng,
    } = req.body;

    const cart = await Cart.findOne({
      userId: req.user._id,
    }).populate("items.foodId");

    if (!cart || cart.items.length === 0) {

      return res.status(400).json({
        message: "Cart is empty",
      });

    }

    let total = 0;

    cart.items.forEach(item => {

      total +=
        item.foodId.price *
        item.quantity;

    });

    let deliveryCharge = 0;

    if (
      deliveryType === "delivery"
    ) {

      deliveryCharge = 40;

    }

    total += deliveryCharge;

    const order = await Order.create({

      userId: req.user._id,

      sellerId:
        cart.items[0]
        .foodId.sellerId,

      items: cart.items.map(item => ({
        foodId:
          item.foodId._id,

        quantity:
          item.quantity,
      })),

      totalPrice: total,

      deliveryType,

      deliveryCharge,

      paymentMethod,

      paymentStatus,

      deliveryAddress,

      deliveryLat,

      deliveryLng,

    });

    // CLEAR CART
    cart.items = [];

    await cart.save();

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// USER ORDERS
exports.getMyOrders = async (req, res) => {

  try {

    const orders =
      await Order.find({
        userId: req.user._id,
      })
      .populate("items.foodId");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// SELLER ORDERS
exports.getSellerOrders = async (req, res) => {

  try {

    const orders =
      await Order.find({
        sellerId: req.user._id,
      })
      .populate("items.foodId")
      .populate(
        "userId",
        "name email"
      );

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// UPDATE ORDER STATUS
exports.updateOrderStatus =
async (req, res) => {

  try {

    const { status } =
      req.body;

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message:
          "Order not found",
      });

    }

    // SELLER CHECK
    if (
      order.sellerId.toString()
      !==
      req.user._id.toString()
    ) {

      return res.status(401).json({
        message:
          "Not authorized",
      });

    }

    order.orderStatus =
      status;

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

