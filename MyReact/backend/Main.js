import http from "http";
import { Server } from "socket.io";

const port = 7000;

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello man");
});

// Attach socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend port (e.g. Vite or React)
    methods: ["GET", "POST"],
  },
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
