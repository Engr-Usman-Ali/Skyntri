import React, { useState } from "react";
import { Upload, Search, History, ArrowRight, Sparkles } from "lucide-react";

// Components
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import AnalysisModal from "../components/AnalysisModal";
import IngredientSafetyTab from "../components/IngredientSafetyTab";
import GlobalAIAssistant from "../components/GlobalAIAssistant";
import Marketplace from "../components/Marketplace";
import Settings from "../components/Settings";
import ProgressTracker from "../components/ProgressTracker";
import HistoryTab from "../components/HistoryTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobileOpen, setIsMobileOpen] = useState(false); // FIXED: Added missing state

  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex font-sans overflow-hidden">

      {/* 1. SIDEBAR - Passed mobile states */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* 2. HEADER - Added onMenuClick to trigger sidebar */}
        <DashboardHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onMenuClick={() => setIsMobileOpen(true)} 
        />

        {/* 3. SCROLLABLE BODY */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 md:p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto w-full pb-16">

            {/* --- OVERVIEW TAB --- */}
            {activeTab === "Overview" && (
              <section className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
                  <div className="relative z-10 max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={16} className="text-blue-200" />
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-100">AI Skin Assistant</span>
                    </div>
                    <h2 className="text-3xl font-black mb-3 tracking-tight">Welcome back, Husnain</h2>
                    <p className="text-blue-100/80 mb-6 text-sm font-medium leading-relaxed">Your last analysis was 2 days ago. Consistency is key to better skin health.</p>
                    <button
                      onClick={() => setActiveTab("Analysis")}
                      className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg active:scale-95"
                    >
                      Analyze Skin Now <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="absolute right-[-10%] top-[-10%] opacity-10 pointer-events-none">
                    <Sparkles size={280} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <QuickAction title="Skin Scan" desc="AI Condition Detection" icon={<Upload />} color="text-blue-600" bg="bg-blue-50" onClick={() => setActiveTab("Analysis")} />
                  <QuickAction title="Safety Check" desc="Scan Ingredients (OCR)" icon={<Search />} color="text-emerald-600" bg="bg-emerald-50" onClick={() => setActiveTab("OCR")} />
                  <QuickAction title="Health History" desc="12 Saved Analysis Reports" icon={<History />} color="text-amber-600" bg="bg-amber-50" onClick={() => setActiveTab("History")} />
                </div>
              </section>
            )}

            {/* --- ANALYSIS TAB --- */}
            {activeTab === "Analysis" && (
              <section className="animate-in fade-in slide-in-from-bottom-2">
                <AnalysisModal isOpen={true} onClose={() => setActiveTab("Overview")} isTabMode={true} />
              </section>
            )}

            {/* --- SETTINGS TAB (CLEANED) --- */}
            {activeTab === "Settings" && (
              <div className="animate-in fade-in">
                <Settings setActiveTab={setActiveTab} />
              </div>
            )}

            {/* --- OTHER TABS --- */}
            {activeTab === "OCR" && <div className="animate-in fade-in"><IngredientSafetyTab /></div>}
            {activeTab === "Products" && <div className="animate-in fade-in"><Marketplace /></div>}
            {activeTab === "Progress" && <div className="animate-in fade-in"><ProgressTracker /></div>}
            {activeTab === "History" && <div className="animate-in fade-in"><HistoryTab /></div>}
            
          </div>
        </main>

        <GlobalAIAssistant activeTab={activeTab} />
      </div>
    </div>
  );
}

function QuickAction({ title, desc, icon, color, bg, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-[1.5rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col items-start"
    >
      <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
        {icon && React.isValidElement(icon) ? React.cloneElement(icon, { size: 24 }) : null}
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-1 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 font-medium leading-normal">{desc}</p>
    </div>
  );
}