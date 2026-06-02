const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const http = require("http");

const path = require("path");

const { Server } =
  require("socket.io");

const connectDB =
  require("./config/db");

const cartRoutes =
  require("./routes/cartRoutes");

const Message =
  require("./models/Message");

dotenv.config();

connectDB();

const app = express();

const server =
  http.createServer(app);

const io = new Server(server, {

  cors: {

    origin:
      "http://localhost:3000",

    methods: [
      "GET",
      "POST",
    ],

  },

});

app.use(cors());

app.use(express.json());

/* STATIC UPLOADS */

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

/* ROUTES */

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/foods",
  require("./routes/foodRoutes")
);

app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/chat",
  require("./routes/chatRoutes")
);

app.use(
  "/api/wishlist",
  require(
    "./routes/wishlistRoutes"
  )
);

/* SOCKET */

io.on(
  "connection",
  (socket) => {

    console.log(
      "User Connected"
    );

    // JOIN ROOM
    socket.on(
      "joinRoom",
      (roomId) => {

        socket.join(roomId);

      }
    );

    // SEND MESSAGE
    socket.on(
      "sendMessage",
      async (data) => {

        try {

          // SAVE IN DATABASE
          await Message.create({

            roomId:
              data.roomId,

            sender:
              data.sender,

            text:
              data.text,

          });

          // SEND TO ROOM
          io.to(
            data.roomId
          ).emit(
            "receiveMessage",
            data
          );

        } catch (error) {

          console.log(error);

        }

      }
    );

    // DISCONNECT
    socket.on(
      "disconnect",
      () => {

        console.log(
          "Disconnected"
        );

      }
    );

  }
);

/* HOME */

app.get(
  "/",
  (req, res) => {

    res.send(
      "API Running"
    );

  }
);

const PORT =
  process.env.PORT || 5000;

server.listen(
  PORT,
  () =>
    console.log(
      `Server running on ${PORT}`
    )
);