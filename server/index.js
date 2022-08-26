const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const messageModel = require("./models/messageModel");
var conn = require("./util/connection");
app.use(cors());
const server = http.createServer(app);


const d = new Date();
let date = d.getDate()+"."+d.getMonth()+"."+d.getFullYear();
let time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connected with thad id -> ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id : ${socket.id} joined room : ${data}`);
  });

  socket.on("chatUpdate",(room)=>{
 
    messageModel.find({ room: room }, (err, data) => {
      if (err) throw err;
      socket.emit("receive_chat", data);
      
    });

    


  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("message from :", socket.id, "\nMessage: ", data);
    var messageDetails = new messageModel({
      username: data.username,
      room: data.room,
      message: data.message,
      date: date,
      time: time,
    });
  
    messageDetails.save((err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected with that id -> ", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server up and running...");
});
