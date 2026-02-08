import React, { useState } from "react";
import { Sparkles, Settings, Bell, Package, Activity, Shield, Menu } from "lucide-react"; 

export default function DashboardHeader({ activeTab, setActiveTab, onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock Notifications Data
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Scan Analysis Ready", desc: "Your skin report for Feb 6 is ready.", icon: <Activity size={14}/>, time: "2m ago", unread: true, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, title: "Order Shipped", desc: "Pure Hydration Cleanser is on the way.", icon: <Package size={14}/>, time: "1h ago", unread: true, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: 3, title: "Security Alert", desc: "New login detected from Mirpur.", icon: <Shield size={14}/>, time: "5h ago", unread: false, color: "text-amber-600", bg: "bg-amber-50" },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-[100] w-full">
      
      {/* LEFT SIDE: Hamburger + Title */}
      <div className="flex items-center gap-3">
        {/* MOBILE MENU TRIGGER - Only visible below 'lg' breakpoint */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 active:scale-95 transition-all"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hidden xs:block">Skyntri Portal</h1>
          <p className="text-sm md:text-base font-black text-slate-900 leading-tight">{activeTab}</p>
        </div>
      </div>

      {/* RIGHT SIDE: Actions */}
      <div className="flex items-center gap-2 relative">
        
        {/* AI Assistant Toggle */}
        <button
          onClick={() => window.dispatchEvent(new Event('openSkyntriAI'))}
          className="group flex items-center gap-2 bg-blue-600 text-white px-3 md:px-4 py-2 rounded-xl font-bold text-[10px] md:text-xs transition-all hover:bg-slate-900 active:scale-95 shadow-md shadow-blue-100"
        >
          <Sparkles size={14} />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>

        {/* Settings Gear */}
        <button
          onClick={() => setActiveTab("Settings")}
          className={`p-2 rounded-xl border transition-all ${
            activeTab === 'Settings'
              ? 'bg-blue-50 border-blue-100 text-blue-600'
              : 'bg-white border-slate-100 text-slate-400 hover:text-blue-600'
          }`}
        >
          <Settings size={18} />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-xl border transition-all relative ${showNotifications ? 'bg-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400 hover:text-blue-600'}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {/* NOTIFICATION POPUP */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-[-1]" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-3 w-72 md:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Notifications</h3>
                  {unreadCount > 0 && <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full">{unreadCount} NEW</span>}
                </div>
                
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-4 border-b border-slate-50 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer relative ${n.unread ? 'bg-blue-50/20' : ''}`}
                      onClick={() => {
                        setNotifications(notifications.map(item => item.id === n.id ? {...item, unread: false} : item));
                      }}
                    >
                      <div className={`w-8 h-8 rounded-lg ${n.bg} ${n.color} flex items-center justify-center shrink-0`}>
                        {n.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className={`text-xs font-bold truncate ${n.unread ? 'text-slate-900' : 'text-slate-500'}`}>{n.title}</p>
                          <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap ml-2">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-normal line-clamp-2 mt-0.5">{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowNotifications(false)}
                  className="w-full p-3 text-center text-[10px] font-black text-blue-600 hover:bg-blue-50 transition-all border-t border-slate-50"
                >
                  MARK ALL AS READ
                </button>
              </div>
            </>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[1.5px] ml-1 shrink-0">
          <div className="h-full w-full bg-white rounded-[10px] flex items-center justify-center text-blue-600 font-black text-[10px] tracking-tighter">HM</div>
        </div>
      </div>
    </header>
  );
}