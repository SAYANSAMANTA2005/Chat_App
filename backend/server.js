const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
require("dotenv").config();

const Message = require("./models/Message");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chatApp";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

let onlineUsers = new Map();

// REST API to get chat history between two users
app.get("/api/messages/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// WebSocket events
io.on("connection", (socket) => {
  console.log("🔗 Connected:", socket.id);

  socket.on("user-online", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("online-users", Array.from(onlineUsers.keys()));
    console.log(`👤 User online: ${userId}`);
  });

  socket.on("send-message", async ({ sender, receiver, text }) => {
    try {
      // Save message to MongoDB
      const msg = await Message.create({ sender, receiver, text });
      console.log(`💬 Message from ${sender} to ${receiver}: ${text}`);

      // Send to receiver if online
      const receiverSocket = onlineUsers.get(receiver);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", msg);
      }

      // Send back to sender (for confirmation and sync)
      socket.emit("receive-message", msg);
    } catch (err) {
      console.log("❌ Error saving message:", err);
      socket.emit("message-error", { error: err.message });
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers) {
      if (socketId === socket.id) {
        console.log(`👋 User offline: ${userId}`);
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
