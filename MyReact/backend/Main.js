import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 7000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket server running");
});

const io = new Server(server, {
  cors: {
    origin: [
      "https://tuchat.onrender.com", // ✅ your frontend on Render
      "http://localhost:5173",       // ✅ for local testing
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (msg) => {
    console.log("Received:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
