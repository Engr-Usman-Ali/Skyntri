import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot } from "lucide-react";

export default function GlobalAIAssistant({ activeTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi Husnain! How can I help with your skin today?" }
  ]);

  const scrollRef = useRef(null);

  // Auto-close chat when switching dashboard tabs
  useEffect(() => {
    setIsOpen(false);
  }, [activeTab]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.toggleSkyntriAI = () => setIsOpen((prev) => !prev);
    window.addEventListener('openSkyntriAI', handleOpen);
    return () => {
      window.removeEventListener('openSkyntriAI', handleOpen);
      delete window.toggleSkyntriAI;
    };
  }, []);

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
    <div className="fixed bottom-6 right-6 z-[10000] flex flex-col items-end pointer-events-none">
      
      {/* CHAT WINDOW */}
      <div className={`w-[320px] md:w-[380px] 
        /* FIX: Laptop screen height protection */
        h-[500px] md:h-[600px] max-h-[calc(100vh-100px)] 
        bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-200 
        flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right pointer-events-auto mb-4
        ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-20"}`}
      >
        
        {/* 1. HEADER - Hard locked with h-16 and shrink-0 */}
        <div className="h-16 min-h-[64px] bg-slate-900 flex items-center justify-between px-6 shrink-0 z-50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Bot size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-[11px] uppercase tracking-wider leading-none">
                Skyntri AI Assistant
              </span>
              <span className="text-[9px] text-emerald-400 font-bold mt-1 uppercase tracking-widest">
                Active Now
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-slate-500 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. MESSAGE BODY - The only part that scrolls */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] font-bold leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl border border-slate-100 flex gap-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
             </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* 3. INPUT - Hard locked with h-20 and shrink-0 */}
        <div className="h-20 min-h-[80px] bg-white border-t border-slate-100 flex items-center px-4 shrink-0">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Skyntri AI..."
              className="w-full bg-slate-100 rounded-xl py-3.5 pl-4 pr-12 text-[11px] font-bold outline-none border-none"
            />
            <button
              onClick={handleSend}
              className="absolute right-1.5 bg-slate-900 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-2xl shadow-2xl transition-all duration-500 pointer-events-auto ${
          isOpen ? "bg-slate-900 rotate-90 scale-90" : "bg-blue-600 hover:scale-110 active:scale-95"
        }`}
      >
        {isOpen ? <X className="text-white" size={24} /> : <MessageSquare className="text-white" size={24} />}
      </button>
    </div>
  );
}