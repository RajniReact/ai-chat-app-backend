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
    this.io = new Server(this.server, {
      cors: { origin: "*" },
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
    this.server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

module.exports = App;
