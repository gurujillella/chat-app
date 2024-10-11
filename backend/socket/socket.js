const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

// Initialize socket.io with CORS settings
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST"]
  }
});

// Socket map to store user connections
const userSocketMap = {};

// Function to get the receiver's socket ID by user ID
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Handle socket connections
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  
  console.log('User connected:', socket.id);

  // Emit online users list to all connected clients
  io.emit("users:getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (userId) {
      delete userSocketMap[userId];
      // Broadcast updated online users list
      io.emit("users:getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

// Export the necessary components
module.exports = { app, server, io, getReceiverSocketId };
