import { useState, useEffect, useRef, useCallback } from "react";
import { Search, User, MessageCircle, X, Send, Minimize } from "lucide-react";
import ChatBot from "./ChatBot.jsx"; // Make sure ChatBot.jsx is in the same folder

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

      {/* ChatBot component */}
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Chat Toggle Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
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
      )}
    </>
  );
}
