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

  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex font-sans overflow-hidden">

      {/* 1. SIDEBAR */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* 2. HEADER */}
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 3. SCROLLABLE BODY */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full pb-20">

            {/* --- OVERVIEW TAB --- */}
            {activeTab === "Overview" && (
              <section className="space-y-10 animate-in fade-in duration-500">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-black mb-4 tracking-tight">Good Morning, Husnain</h2>
                    <p className="text-blue-100 mb-8 font-medium">Ready to check your skin progress today?</p>
                    <button
                      onClick={() => setActiveTab("Analysis")}
                      className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Start New Analysis <ArrowRight size={18} />
                    </button>
                  </div>
                  <Sparkles className="absolute right-[-20px] top-[-20px] text-white/10 w-80 h-80 rotate-12 pointer-events-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <QuickAction title="Skin Scan" desc="Detect conditions" icon={<Upload />} color="text-blue-600" bg="bg-blue-50" onClick={() => setActiveTab("Analysis")} />
                  <QuickAction title="Safety Check" desc="Verify ingredients" icon={<Search />} color="text-emerald-600" bg="bg-emerald-50" onClick={() => setActiveTab("OCR")} />
                  <QuickAction title="Reports" desc="12 saved results" icon={<History />} color="text-amber-600" bg="bg-amber-50" onClick={() => setActiveTab("History")} />
                </div>
              </section>
            )}

            {/* --- ANALYSIS TAB --- */}
            {activeTab === "Analysis" && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <AnalysisModal isOpen={true} onClose={() => setActiveTab("Overview")} isTabMode={true} />
              </section>
            )}

            {/* --- INGREDIENT SAFETY TAB (OCR) --- */}
            {activeTab === "OCR" && (
              <div className="animate-in fade-in duration-500">
                <IngredientSafetyTab />
              </div>
            )}

            {/* --- MARKETPLACE TAB --- */}
            {activeTab === "Products" && (
              <div className="animate-in fade-in duration-500">
                <Marketplace />
              </div>
            )}

            {/* --- SETTINGS TAB --- */}
            {activeTab === "Settings" && (
              <div className="animate-in fade-in duration-500">
                <Settings />
              </div>
            )}

            {/* --- PROGRESS TAB --- */}
            {activeTab === "Progress" && (
              <div className="animate-in fade-in duration-500">
                <ProgressTracker />
              </div>
            )}

            {/* --- HISTORY TAB --- */}
            {activeTab === "History" && (
              <div className="animate-in fade-in duration-500">
                <HistoryTab />
              </div>
            )}
          </div>
        </main>

        {/* 4. AI ASSISTANT */}
        <div className="absolute bottom-0 right-0 z-[999]">
          <GlobalAIAssistant />
        </div>
      </div>
    </div>
  );
}

function QuickAction({ title, desc, icon, color, bg, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 transition-all cursor-pointer group"
    >
      <div className={`w-16 h-16 ${bg} ${color} rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-sm`}>
        {icon && React.isValidElement(icon) ? React.cloneElement(icon, { size: 32 }) : null}
      </div>
      <h3 className="font-black text-slate-900 text-xl mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}