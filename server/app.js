const express = require('express');
const {Server} = require('socket.io');
const http = require("http");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const secretKeyJWT = "asdasdsadasdasdasdsa";
const port = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
});

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

app.get('/',(req,res)=>{
    res.send("Hello socket")
})

io.on('connection',(socket)=>{
    console.log("User connected",socket.id);

    socket.on("message", ({ room, message }) => {
        console.log({ room, message });
        socket.to(room).emit("receive-message", message);
    });

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})


server.listen(port, ()=>{
    console.log(`Server start at PORT: ${port}`);
})