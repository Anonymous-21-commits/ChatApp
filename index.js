const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require("./config/database");

//listening to an emitted connection
io.on("connection", (socket) => {
  console.log("user connected " + socket.id);

  socket.on("msg_send", (data) => {
    io.emit("msg_rcvd", data);
  });
});
app.use("/", express.static(__dirname + "/public"));
server.listen(3000, async () => {
  console.log("server started on", 3000);
  await connect();
  console.log("mongo-db connected");
});
