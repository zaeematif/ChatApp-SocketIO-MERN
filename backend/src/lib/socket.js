import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

//creating a socket IO server on top of the express app, and server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export const getRecieverSocketId = (userId) => userSocketMap[userId]

//all online users
const userSocketMap = {} //{userId: socketId}


//socket listning| (socket) - the user who connected
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  //get the user id who connected from front-end
  const userId = socket.handshake.query.userId;
  
  //add to user to list
  if(userId) userSocketMap[userId] = socket.id;

  //io.emit - send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    //delete userSocketMap
    delete userSocketMap[userId];

    //update list after disconnect
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
