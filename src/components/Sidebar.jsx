import React from "react";
import { LayoutDashboard, Upload, Search, LineChart, History, ShoppingBag, LogOut, ShieldCheck, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) {
  const navigate = useNavigate();

  return (
    <>
      {/* 1. MOBILE OVERLAY (Dark background when sidebar is open on phone) */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 2. SIDEBAR CONTAINER */}
      <aside className={`
        fixed inset-y-0 left-0 z-[101] w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-20 h-screen shrink-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* REFINED LOGO AREA */}
        <div className="p-6 mb-2 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-md shadow-blue-100 group-hover:bg-slate-900 transition-colors">
              <ShieldCheck className="text-white" size={18} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">Skyntri</span>
          </Link>

          {/* CLOSE BUTTON (Only shows on Mobile) */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-3">Main Menu</p>
          
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === "Overview"} onClick={() => { setActiveTab("Overview"); setIsMobileOpen(false); }} />
          <NavItem icon={<Upload size={18} />} label="Skin Analysis" active={activeTab === "Analysis"} onClick={() => { setActiveTab("Analysis"); setIsMobileOpen(false); }} />
          <NavItem icon={<Search size={18} />} label="Ingredient Scan" active={activeTab === "OCR"} onClick={() => { setActiveTab("OCR"); setIsMobileOpen(false); }} />
          <NavItem icon={<LineChart size={18} />} label="Progress" active={activeTab === "Progress"} onClick={() => { setActiveTab("Progress"); setIsMobileOpen(false); }} />
          <NavItem icon={<History size={18} />} label="History" active={activeTab === "History"} onClick={() => { setActiveTab("History"); setIsMobileOpen(false); }} />
          
          <div className="pt-6">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-3">Commerce</p>
            <NavItem icon={<ShoppingBag size={18} />} label="Marketplace" active={activeTab === "Products"} onClick={() => { setActiveTab("Products"); setIsMobileOpen(false); }} color="text-emerald-600" />
          </div>
        </nav>

        {/* LOGOUT FOOTER */}
        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={() => navigate("/login")} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:text-red-500 hover:bg-red-50 transition-all group"
          >
            <LogOut size={16} className="group-hover:rotate-12 transition-transform" /> 
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, active, onClick, color = "text-slate-500" }) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
        active 
          ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
          : `${color} hover:bg-slate-50 hover:text-slate-900`
      }`}
    >
      <span className={active ? "text-blue-400" : ""}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
}