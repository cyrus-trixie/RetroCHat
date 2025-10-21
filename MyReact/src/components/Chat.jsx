import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://retrochat-t0lx.onrender.com");

export default function Chat() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => socket.off("message");
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendInput() {
    if (!chatInput.trim()) return;
    socket.emit("message", chatInput);
    setChatInput("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") sendInput();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-700 to-purple-500 px-2 py-4">
      <div className="bg-white/10 backdrop-blur-sm w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-[600px] rounded-xl shadow-lg flex flex-col p-3 sm:p-4">
        
        {/* Header */}
        <div className="bg-white text-purple-700 font-bold text-lg text-center py-3 rounded-md shadow-sm">
          RETRO CHAT
        </div>

        {/* Chat Area */}
        <div
          className="bg-purple-300 mt-3 p-3 sm:p-4 rounded-md overflow-y-auto flex flex-col-reverse"
          style={{ height: "65vh" }} // constant height, bottom alignment
        >
          <div className="flex flex-col mt-auto">
            {messages.length === 0 ? (
              <p className="text-center text-purple-800 opacity-70 text-sm italic mt-auto mb-auto">
                No messages yet...
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="self-end bg-gray-50 px-4 py-2 rounded-2xl shadow text-sm max-w-[80%] sm:max-w-[70%] break-words mt-2"
                >
                  {msg}
                </div>
              ))
            )}
            <div ref={messagesEndRef} /> {/* 👈 keeps scroll at bottom */}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex flex-col sm:flex-row bg-white mt-3 rounded-md p-2 gap-2 shadow-sm">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-md bg-gray-100 border-none outline-none text-sm sm:text-base"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-400 transition text-sm sm:text-base"
            onClick={sendInput}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
