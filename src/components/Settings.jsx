import React, { useState } from "react";
import { 
  User, Shield, CreditCard, Save, MapPin, 
  CheckCircle2, X, Smartphone, BellRing, PencilLine, 
  ChevronRight, ArrowRight
} from "lucide-react";

export default function Settings() {
  const [activeSubTab, setActiveSubTab] = useState("Profile");
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  
  // State for Easypaisa Number
  const [easypaisaNo, setEasypaisaNo] = useState("0312 3456789");
  const [isEditingNo, setIsEditingNo] = useState(false);

  // State for Toggles
  const [notifications, setNotifications] = useState({
    email: true,
    marketplace: false,
    security: true
  });

  const handleSave = () => {
    setShowSavedMessage(true);
    setIsEditingNo(false);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  const toggleNotify = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-in fade-in duration-500 relative pb-10">
      
      {/* --- SUCCESS TOAST --- */}
      {showSavedMessage && (
        <div className="fixed top-24 right-10 z-[200] animate-in slide-in-from-right-10 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <div className="bg-emerald-500 p-1 rounded-full text-white"><CheckCircle2 size={16} /></div>
            <span className="font-bold text-sm">Settings updated!</span>
            <button onClick={() => setShowSavedMessage(false)} className="ml-4 opacity-50 hover:opacity-100"><X size={14} /></button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* LEFT NAV - CLINICAL STYLE */}
        <div className="w-full lg:w-72 space-y-2">
          <SettingsNavLink label="Profile" icon={<User size={18}/>} active={activeSubTab === "Profile"} onClick={() => setActiveSubTab("Profile")} />
          <SettingsNavLink label="Payments" icon={<CreditCard size={18}/>} active={activeSubTab === "Payments"} onClick={() => setActiveSubTab("Payments")} />
          <SettingsNavLink label="Notifications" icon={<BellRing size={18}/>} active={activeSubTab === "Notifications"} onClick={() => setActiveSubTab("Notifications")} />
          <SettingsNavLink label="Security" icon={<Shield size={18}/>} active={activeSubTab === "Security"} onClick={() => setActiveSubTab("Security")} />
        </div>

        {/* RIGHT CONTENT PANEL */}
        <div className="flex-1 bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-sm min-h-[600px]">
          
          {/* PROFILE */}
          {activeSubTab === "Profile" && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div>
                <h3 className="text-3xl font-black text-slate-900">Personal Info</h3>
                <p className="text-slate-400 font-medium">Manage your contact and shipping details.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Full Name" val="Husnain" />
                <InputGroup label="Email" val="husnain@example.com" />
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={14}/> Shipping Address</label>
                  <textarea className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-500 min-h-[140px] font-medium" defaultValue="House #123, Mirpur, Azad Kashmir" />
                </div>
              </div>
            </div>
          )}

          {/* PAYMENTS - REDESIGNED PREMIUM CARD */}
          {activeSubTab === "Payments" && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div>
                <h3 className="text-3xl font-black text-slate-900">Payment Wallet</h3>
                <p className="text-slate-400 font-medium">Your primary checkout method for marketplace orders.</p>
              </div>

              {/* THE WALLET CARD */}
              <div className="relative group overflow-hidden bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-900/20 transition-all hover:-translate-y-1">
                {/* Background Decor */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col gap-10">
                  <div className="flex justify-between items-start">
                    <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center overflow-hidden border-4 border-slate-800 shadow-xl">
                      <img 
                        src="https://cdn.aptoide.com/imgs/5/a/d/5ad0bd9f9704075be3dd8efdbca6313b_icon.jpg?w=128" 
                        alt="Easypaisa" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">Verified Account</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                      <p className="text-slate-400 text-xs font-black uppercase tracking-tighter">Easypaisa Number</p>
                      {isEditingNo ? (
                        <input 
                          autoFocus
                          value={easypaisaNo}
                          onChange={(e) => setEasypaisaNo(e.target.value)}
                          className="bg-slate-800 border-2 border-emerald-500/50 rounded-2xl p-3 text-2xl font-black text-white outline-none w-full max-w-[280px]"
                        />
                      ) : (
                        <div className="flex items-center gap-4">
                          <Smartphone size={32} className="text-emerald-500" /> {/* LARGER ICON */}
                          <p className="text-3xl font-black tracking-tight">{easypaisaNo}</p>
                        </div>
                      )}
                    </div>

                    {/* CHANGE BUTTON - NOW INSIDE THE CARD */}
                    <button 
                      onClick={() => setIsEditingNo(!isEditingNo)}
                      className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm transition-all ${
                        isEditingNo 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                      }`}
                    >
                      {isEditingNo ? <CheckCircle2 size={18}/> : <PencilLine size={18}/>}
                      {isEditingNo ? "Save Number" : "Change Number"}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <p className="text-xs font-bold text-slate-500 italic">Your wallet is ready for 1-click marketplace checkout.</p>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeSubTab === "Notifications" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <h3 className="text-3xl font-black text-slate-900">Communications</h3>
              <div className="grid grid-cols-1 gap-4">
                <ToggleItem label="Email Updates" desc="Analysis reports & clinical insights" active={notifications.email} onClick={() => toggleNotify('email')} />
                <ToggleItem label="Store Notifications" desc="Flash sales & skincare recommendations" active={notifications.marketplace} onClick={() => toggleNotify('marketplace')} />
                <ToggleItem label="Security Alerts" desc="Keep your skin data secure" active={notifications.security} onClick={() => toggleNotify('security')} />
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeSubTab === "Security" && (
            <div className="space-y-8 animate-in fade-in">
              <h3 className="text-3xl font-black text-slate-900">Security</h3>
              <div className="p-10 border border-slate-100 rounded-[3rem] bg-slate-50 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                <div>
                  <p className="font-black text-slate-900 text-xl">Account Password</p>
                  <p className="text-slate-400 font-medium">Update your password regularly for safety.</p>
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-2" size={24} />
              </div>
            </div>
          )}

          {/* GLOBAL SAVE */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex justify-end">
            <button onClick={handleSave} className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-emerald-500 transition-all shadow-2xl active:scale-95 flex items-center gap-3">
              <Save size={20} /> Update All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTS ---

function SettingsNavLink({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-8 py-5 rounded-[2.5rem] font-black transition-all ${active ? "bg-slate-900 text-white shadow-2xl translate-x-2" : "text-slate-400 hover:text-slate-900 hover:bg-white"}`}>
      {icon} {label}
    </button>
  );
}

function InputGroup({ label, val }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <input className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900" defaultValue={val} />
    </div>
  );
}

function ToggleItem({ label, desc, active, onClick }) {
  return (
    <div onClick={onClick} className="p-8 border border-slate-100 rounded-[2.5rem] flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-all">
      <div>
        <p className="font-black text-slate-900 text-lg">{label}</p>
        <p className="text-sm text-slate-400 font-medium">{desc}</p>
      </div>
      <div className={`w-14 h-7 rounded-full relative transition-all duration-300 ${active ? 'bg-emerald-500 shadow-lg shadow-emerald-100' : 'bg-slate-200'}`}>
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${active ? 'right-1' : 'left-1'}`}></div>
      </div>
    </div>
  );
}