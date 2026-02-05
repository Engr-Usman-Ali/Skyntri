import React from "react";
import { Sparkles, Settings, Bell } from "lucide-react";

export default function DashboardHeader({ activeTab, setActiveTab }) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30">
      <div>
        <h1 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Skyntri Portal</h1>
        <p className="text-lg font-black text-slate-900">{activeTab}</p>
      </div>
      
      <div className="flex items-center gap-3">
        {/* AI Assistant - Top Right */}
        <button 
          onClick={() => setActiveTab("Assistant")}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:shadow-lg hover:shadow-violet-200 transition-all active:scale-95"
        >
          <Sparkles size={14} /> AI Assistant
        </button>

        {/* Settings - Top Right */}
        <button 
          onClick={() => setActiveTab("Settings")}
          className={`p-2.5 rounded-xl border transition-all ${activeTab === 'Settings' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-white border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100'}`}
        >
          <Settings size={20} />
        </button>

        <button className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[2px] ml-2">
          <div className="h-full w-full bg-white rounded-[14px] flex items-center justify-center text-blue-600 font-black text-xs">HM</div>
        </div>
      </div>
    </header>
  );
}