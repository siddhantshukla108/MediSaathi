import { useState, useEffect, useRef, useCallback } from "react";
import { Search, User, MessageCircle, X, Send, Minimize } from "lucide-react";

// Separate ChatBot component for better organization
const ChatBot = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "👋 Hi! I'm MediBot, your healthcare assistant. How can I help you today?", sender: "bot" }
  ]);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isMinimized, setIsMinimized] = useState(false);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const dragData = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });

  // Load position from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatPosition");
    if (saved) {
      setPosition(JSON.parse(saved));
    }
  }, []);

  // Save position to localStorage
  useEffect(() => {
    localStorage.setItem("chatPosition", JSON.stringify(position));
  }, [position]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMouseDown = (e) => {
    // Only drag when clicking on header, not anywhere in the chat
    if (e.target.closest('button') || e.target.tagName === 'INPUT') return;
    
    dragData.current.isDragging = true;
    const rect = chatRef.current.getBoundingClientRect();
    dragData.current.offsetX = e.clientX - rect.left;
    dragData.current.offsetY = e.clientY - rect.top;
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
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newUserMessage = { id: Date.now(), text: message, sender: "user" };
    setMessages(prev => [...prev, newUserMessage]);
    setMessage("");
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const responses = [
        "I understand your concern. For medical advice, please consult with a healthcare professional.",
        "I can help you find information about our services. What specifically are you looking for?",
        "Thank you for your message. Our team will get back to you shortly if you need further assistance.",
        "I'm here to help with general information. For personal medical advice, please contact your doctor."
      ];
      const botResponse = { 
        id: Date.now() + 1, 
        text: responses[Math.floor(Math.random() * responses.length)], 
        sender: "bot" 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
        // Glassomorphic effect
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
      }}
      className="fixed z-50 w-80 h-96 rounded-xl flex flex-col overflow-hidden cursor-move transition-all duration-300"
      onMouseDown={handleMouseDown}
      role="dialog"
      aria-labelledby="chatbot-heading"
    >
      {/* Header with glass effect */}
      <div 
        className="p-3 flex justify-between items-center border-b border-white/20"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h3 id="chatbot-heading" className="font-semibold text-white">MediBot Assistant</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            <Minimize size={16} />
          </button>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages area with subtle glass effect */}
          <div 
            className="flex-1 p-4 overflow-y-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-3 ${msg.sender === "user" ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-500/30 text-white backdrop-blur-sm"
                      : "bg-white/20 text-white backdrop-blur-sm"
                  }`}
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area with glass effect */}
          <div 
            className="p-3 border-t border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border border-white/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder-white/70"
                aria-label="Type your message"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors backdrop-blur-sm"
                aria-label="Send message"
                style={{
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Chat toggle button component with glass effect
const ChatToggleButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-40 backdrop-blur-sm"
      aria-label="Open chat"
      style={{
        background: 'rgba(59, 130, 246, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.3)'
      }}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default function Header() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/img/logou.png"
              alt="MediSaathi Logo"
              className="h-10 rounded-b-full w-10"
            />
            <span className="text-xl font-bold">MediSaathi</span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors, services..."
                className="w-full rounded-full px-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 hover:bg-gray-200 focus:bg-white focus:outline-none focus:ring-2  transition-colors"
              />
              <Search className="absolute right-3 top-2.5 text-gray-500 h-5 w-5" />
            </div>
          </div>

          {/* Profile */}
          <div>
            <button className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="User profile">
              <User className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat components */}
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      {!chatOpen && <ChatToggleButton onClick={() => setChatOpen(true)} />}
    </>
  );
}