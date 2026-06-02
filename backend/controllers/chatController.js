const Message =
  require("../models/Message");

// GET MESSAGES
exports.getMessages =
async (req, res) => {

  try {

    const messages =
      await Message.find({

        roomId:
          req.params.roomId,

      });

    res.json(messages);

  } catch (error) {

    res.status(500).json({
      message:error.message,
    });

  }

};