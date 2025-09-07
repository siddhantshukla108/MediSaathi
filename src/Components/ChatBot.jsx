// src/components/ChatBot.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { X, Minimize, Send } from "lucide-react";

export default function ChatBot({ isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "👋 Hi! I'm MediBot, your healthcare assistant. How can I help you today?", sender: "bot" },
  ]);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isMinimized, setIsMinimized] = useState(false);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const dragData = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("chatPosition");
    if (saved) setPosition(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatPosition", JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMouseDown = (e) => {
    if (!e.target.closest(".chat-header")) return;
    dragData.current.isDragging = true;
    const rect = chatRef.current.getBoundingClientRect();
    dragData.current.offsetX = e.clientX - rect.left;
    dragData.current.offsetY = e.clientY - rect.top;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    if (!dragData.current.isDragging) return;
    setPosition({
      x: e.clientX - dragData.current.offsetX,
      y: e.clientY - dragData.current.offsetY,
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    dragData.current.isDragging = false;
    document.body.style.userSelect = "auto";
    document.body.style.cursor = "default";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newUserMessage = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");

    setTimeout(() => {
      const responses = [
        "I understand your concern. Please consult a healthcare professional.",
        "I can help you find information about our services. What are you looking for?",
        "Thank you for your message. Our team will get back to you shortly.",
      ];
      const botResponse = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={chatRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: "rgba(25,25,25,0.8)", // dark semi-transparent
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
      className={`fixed z-50 w-80 rounded-xl flex flex-col overflow-hidden transition-all duration-300 ${
        isMinimized ? "h-12" : "h-96"
      }`}
      onMouseDown={handleMouseDown}
      role="dialog"
      aria-labelledby="chatbot-heading"
    >
      {/* Header */}
      <div
        className="chat-header p-3 flex justify-between items-center border-b border-white/10 cursor-grab"
        style={{
          background: "rgba(40,40,40,0.85)",
          backdropFilter: "blur(15px)",
        }}
      >
        <h3 id="chatbot-heading" className="font-semibold text-white">
          MediBot Assistant
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <Minimize size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-3 ${msg.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-600/50 text-white"
                      : "bg-gray-700/50 text-white"
                  } backdrop-blur-sm`}
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-3 border-t border-white/10"
            style={{ background: "rgba(40,40,40,0.85)", backdropFilter: "blur(15px)" }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800/70 text-white placeholder-gray-400"
                aria-label="Type your message"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-blue-600/60 text-white p-2 rounded-lg hover:bg-blue-600/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors backdrop-blur-sm"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
