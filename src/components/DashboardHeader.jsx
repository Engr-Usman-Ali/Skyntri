import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Settings, Bell, Check, Package, Activity, X } from "lucide-react"; 

export default function DashboardHeader({ activeTab, setActiveTab }) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock Notifications Data
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Scan Analysis Ready", desc: "Your skin report for Feb 6 is ready.", icon: <Activity size={16}/>, time: "2m ago", unread: true, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, title: "Order Shipped", desc: "Pure Hydration Cleanser is on the way.", icon: <Package size={16}/>, time: "1h ago", unread: true, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: 3, title: "Security Alert", desc: "New login detected from Mirpur.", icon: <Shield size={16}/>, time: "5h ago", unread: false, color: "text-amber-600", bg: "bg-amber-50" },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-[100] w-full">
      <div>
        <h1 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Skyntri Portal</h1>
        <p className="text-lg font-black text-slate-900">{activeTab}</p>
      </div>

      <div className="flex items-center gap-3 relative z-[110]">
        <button
          onClick={() => window.dispatchEvent(new Event('openSkyntriAI'))}
          className="group flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold transition-all hover:bg-slate-900 active:scale-95 shadow-lg"
        >
          <Sparkles size={18} />
          <span>AI Assistant</span>
        </button>

        {/* Settings Gear */}
        <button
          onClick={() => setActiveTab("Settings")}
          className={`p-2.5 rounded-xl border transition-all ${
            activeTab === 'Settings'
              ? 'bg-blue-50 border-blue-100 text-blue-600'
              : 'bg-white border-slate-100 text-slate-400 hover:text-blue-600'
          }`}
        >
          <Settings size={20} />
        </button>

        {/* Notification Bell + Popup Logic */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl border transition-all relative ${showNotifications ? 'bg-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400 hover:text-blue-600'}`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {/* THE NOTIFICATION POPUP */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-[-1]" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-4 w-[380px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-black text-slate-900">Notifications</h3>
                  <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-1 rounded-lg">{unreadCount} NEW</span>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-5 border-b border-slate-50 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer relative ${n.unread ? 'bg-blue-50/20' : ''}`}
                      onClick={() => {
                        setNotifications(notifications.map(item => item.id === n.id ? {...item, unread: false} : item));
                      }}
                    >
                      <div className={`w-10 h-10 rounded-xl ${n.bg} ${n.color} flex items-center justify-center shrink-0`}>
                        {n.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className={`text-sm font-black ${n.unread ? 'text-slate-900' : 'text-slate-500'}`}>{n.title}</p>
                          <span className="text-[10px] text-slate-400 font-bold">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{n.desc}</p>
                      </div>
                      {n.unread && <div className="absolute right-4 bottom-5 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowNotifications(false)}
                  className="w-full p-4 text-center text-xs font-black text-blue-600 hover:bg-blue-50 transition-all"
                >
                  Mark all as read
                </button>
              </div>
            </>
          )}
        </div>

        {/* User Profile Info */}
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[2px] ml-2 shrink-0">
          <div className="h-full w-full bg-white rounded-[14px] flex items-center justify-center text-blue-600 font-black text-xs uppercase tracking-tighter">HM</div>
        </div>
      </div>
    </header>
  );
}

function Shield({size}) { return <Activity size={size}/> } // Fallback for the example