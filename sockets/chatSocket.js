class ChatSocket {
  constructor(io) {
    this.io = io;
  }

  init() {
    this.io.on("connection", (socket) => {
      console.log("User Connected");

      socket.on("send_message", (data) => {
        this.io.emit("receive_message", data);
      });
    });
  }
}

module.exports = ChatSocket;
