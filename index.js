const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  setInterval(() => {
    socket.emit("from_server");
  }, 2000);

  socket.on("from_client", () => {
    console.log("event coming from client");
  });
  socket.on("msg_send", (data) => {
    console.log(data);
    socket.broadcast.emit("msg_rcvd", data);
  });
});

app.use("/", express.static(__dirname + "/public"));
server.listen(3000, () => {
  console.log("server started on Port 3000");
});
