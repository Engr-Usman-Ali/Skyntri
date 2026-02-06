import React from "react";
import { LayoutDashboard, Upload, Search, LineChart, History, ShoppingBag, LogOut, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // CRITICAL: Must have useNavigate here

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate(); 

  return (
    <aside className="w-72 bg-white border-r border-slate-100 hidden lg:flex flex-col sticky top-0 h-screen shadow-sm shrink-0 z-20 relative">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-blue-600 p-2 rounded-xl shadow-blue-200 shadow-lg group-hover:rotate-12 transition-transform">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">Skyntri</span>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Main Menu</p>
        
        <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")} />
        <NavItem icon={<Upload size={20} />} label="Skin Analysis" active={activeTab === "Analysis"} onClick={() => setActiveTab("Analysis")} />
        <NavItem icon={<Search size={20} />} label="Ingredient Scan" active={activeTab === "OCR"} onClick={() => setActiveTab("OCR")} />
        <NavItem icon={<LineChart size={20} />} label="Progress Tracking" active={activeTab === "Progress"} onClick={() => setActiveTab("Progress")} />
        <NavItem icon={<History size={20} />} label="History" active={activeTab === "History"} onClick={() => setActiveTab("History")} />
        
        <div className="pt-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Shop</p>
          <NavItem icon={<ShoppingBag size={20} />} label="Marketplace" active={activeTab === "Products"} onClick={() => setActiveTab("Products")} color="text-emerald-600" />
        </div>
      </nav>

      <div className="p-6 border-t border-slate-50">
        <button onClick={() => navigate("/login")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick, color = "text-slate-500" }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-[1.02]" : `${color} hover:bg-slate-50 hover:text-slate-900`}`}>
      {icon}
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
}