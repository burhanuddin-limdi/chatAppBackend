const express = require("express");
const app = express();
var http = require('http').createServer(app);
const port = 5200;

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to SabChat</h1>");
});
const users = {};
io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("new user :", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });
});
http.listen(port, function(){
  console.log("Server started on port 5200");
});
