import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import router from "./router";
import * as dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import { getUser, addUser, removeUser, getUsersInRoom } from "./user";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(router);

interface Message {
  id: string;
  user: string;
  text: string;
  reactions: { user: string; reaction: string }[];
}

const messages: { [room: string]: Message[] } = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback?.(error);

    socket.emit("message", {
      user: "admin",
      text: `${user?.name}, welcome to room ${user?.room}`,
    });

    socket.broadcast.to(user?.room || "").emit("message", {
      user: "admin",
      text: `${user?.name} has joined the room.`,
    });

    socket.join(user?.room || "");
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const messageId = `${Date.now()}`; // Unique ID for the message

    if (!messages[user?.room || ""]) {
      messages[user?.room || ""] = [];
    }

    // Store the message in the in-memory store
    messages[user?.room || ""].push({
      id: messageId,
      user: user?.name || "Unknown",
      text: message,
      reactions: [],
    });

    // Emit the new message to all clients in the room
    io.to(user?.room || "").emit("message", {
      id: messageId,
      user: user?.name,
      text: message,
      reactions: [],
    });

    console.log(`Message from ${user?.name} to room ${user?.room}:`, message);
    callback();
  });

  socket.on("sendReaction", ({ messageId, reaction }, callback) => {
    const user = getUser(socket.id);
    const room = user?.room || "";

    // Find and update the message with the reaction
    const roomMessages = messages[room] || [];
    const message = roomMessages.find((msg) => msg.id === messageId);

    if (message) {
      message.reactions.push({ user: user?.name || "Unknown", reaction });

      io.to(room).emit("reaction", {
        messageId,
        user: user?.name,
        reaction,
      });

      console.log(
        `Reaction from ${user?.name} to message ${messageId}:`,
        reaction
      );
    }

    callback?.();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the room.`,
      });

      io.to(user.room).emit("roomData", {
        users: getUsersInRoom(user.room),
      });
    }

    console.log("user disconnected");
  });
});

// Health check function
function checkServerHealth() {
  axios
    .get(`http://localhost:${PORT}/health`)
    .then((response) => {
      console.log("Server health check:", response.data);
    })
    .catch((error) => {
      console.error("Server health check failed:", error.message);
    });
}
setInterval(checkServerHealth, 50000);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
