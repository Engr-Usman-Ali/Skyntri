import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot } from "lucide-react";

export default function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi Husnain! How can I help with your skin today?" }
  ]);

  const scrollRef = useRef(null);

  // 1. LISTEN FOR SIGNALS (Event Listener + Global Window Function)
  useEffect(() => {
    // Method A: Event Listener (Standard)
    const handleOpen = () => {
      console.log("AI Assistant: Signal received!");
      setIsOpen(true);
    };

    // Method B: Global Function (Backup)
    window.toggleSkyntriAI = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener('openSkyntriAI', handleOpen);

    return () => {
      window.removeEventListener('openSkyntriAI', handleOpen);
      delete window.toggleSkyntriAI;
    };
  }, []);

  // 2. AUTO-SCROLL LOGIC
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "bot", text: "I've analyzed that request. Would you like me to check your product history?" }]);
    }, 1200);
  };

  return (
    // Z-INDEX MUST BE HIGHER THAN EVERYTHING ELSE (99999)
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-4 pointer-events-none">

      {/* CHAT WINDOW CONTAINER */}
      <div className={`w-[350px] md:w-[380px] 
    /* NEW HEIGHT CONSTRAINTS */
    max-h-[70vh] md:max-h-[80vh] 
    flex flex-col 
    bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-slate-200 
    overflow-hidden transition-all duration-500 origin-bottom-right pointer-events-auto 
    ${isOpen
          ? "scale-100 opacity-100 translate-y-0"
          : "scale-0 opacity-0 translate-y-20"
        }`}
      >
        {/* HEADER - This will now stay visible at the top of the chat box */}
        <div className="bg-slate-900 p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Bot size={18} />
            </div>
            <p className="text-white font-black text-sm uppercase tracking-tight">Skyntri AI Assistant</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* MESSAGES AREA */}
        <div className="h-[400px] overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] font-bold leading-relaxed shadow-sm ${m.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-1 p-3 bg-white rounded-full border border-slate-100 shadow-sm">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* INPUT AREA */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message your AI dermatologist..."
              className="w-full bg-slate-100 rounded-2xl py-4 pl-5 pr-12 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all border border-transparent focus:border-blue-500/20"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-2xl shadow-2xl transition-all duration-500 pointer-events-auto group ${isOpen ? "bg-slate-900 rotate-90 scale-90" : "bg-blue-600 hover:scale-110 active:scale-95"
          }`}
      >
        {isOpen ? (
          <X className="text-white" size={28} />
        ) : (
          <div className="relative">
            <MessageSquare className="text-white" size={28} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-blue-600 rounded-full"></span>
          </div>
        )}
      </button>
    </div>
  );
}