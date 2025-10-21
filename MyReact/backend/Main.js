import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 7000; // ✅ use Render's port

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("RetroChat server running");
});

// Attach socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "https://tuchat.onrender.com", // your frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
