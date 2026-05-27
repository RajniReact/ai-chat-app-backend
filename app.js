const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const { port } = require("./config/env");
const authRoutes = require("./routes/authRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const ChatSocket = require("./sockets/chatSocket");

class App {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    console.log("Server created", process.env.PORT, process.env.CLIENT_URL);
    this.io = new Server(this.server, {
      cors: {
        origin: [
          "http://localhost:3000",
          process.env.CLIENT_URL,
        ],
        credentials: true,
      },
    });

    this.middleware();
    this.routes();
    this.sockets();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/auth", authRoutes);
    this.app.use(geminiRoutes);
    this.app.use("/payment", paymentRoutes(this.io));
  }

  sockets() {
    new ChatSocket(this.io).init();
  }

  start() {
    this.server.listen(process.env.PORT || port, () => {
  console.log("Server running");
});
  }
}

module.exports = App;
