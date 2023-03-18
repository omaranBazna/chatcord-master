const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const path = require("path");
app.use(express.static(path.join(__dirname, "/public")));
io.on("connection", (socket) => {
  console.log("new web socket connection");

  socket.emit("message", "Hi all");
  socket.broadcast.emit("message", "Hi all");

  socket.on("disconnect", () => {
    io.emit("message", "a user has left the chat");
  });
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

server.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
