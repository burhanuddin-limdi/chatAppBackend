const port = process.env.port || 5200;

const io = require("socket.io")(port,{
    cors:{
        origin:'*'
    }
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
