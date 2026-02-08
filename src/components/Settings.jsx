import React, { useState } from "react";
import { 
  User, Shield, CreditCard, Save, MapPin, 
  CheckCircle2, X, BellRing, PencilLine, RotateCcw, AlertCircle
} from "lucide-react";

export default function Settings({ setActiveTab }) {
  // 1. Initial Data (The "Original" state)
  const originalData = {
    fullName: "Husnain",
    email: "husnain@example.com",
    address: "House #123, Mirpur, Azad Kashmir",
    easypaisa: "0312 3456789"
  };

  const [formData, setFormData] = useState(originalData);
  const [activeSubTab, setActiveSubTab] = useState("Profile");
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [isEditingNo, setIsEditingNo] = useState(false);

  // Check if user has changed anything
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Close Logic
  const handleExitRequest = () => {
    if (hasChanges) {
      setShowConfirmExit(true); // Warning if changes exist
    } else {
      setActiveTab("Overview"); // Exit immediately if no changes
    }
  };

  const handleSave = () => {
    setShowSavedMessage(true);
    setTimeout(() => {
      setShowSavedMessage(false);
      setActiveTab("Overview"); // Close settings after saving
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 relative pb-20 max-w-6xl mx-auto px-2">
      
      {/* --- TOP HEADER BAR --- */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Management</h2>
          <p className="text-xl font-black text-slate-900">Account Settings</p>
        </div>
        
        {/* ENHANCED EXIT BUTTON (Red on hover) */}
        <button 
          onClick={handleExitRequest}
          className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
        >
          <span className="text-[10px] font-black text-slate-400 group-hover:text-red-500 uppercase tracking-widest">Close</span>
          <X size={18} className="text-slate-400 group-hover:text-red-500" />
        </button>
      </div>

      {/* --- CONFIRM EXIT MODAL --- */}
      {showConfirmExit && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Unsaved Changes</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">You have edited your profile. Are you sure you want to exit without saving?</p>
            <div className="flex flex-col gap-2">
              <button onClick={() => setActiveTab("Overview")} className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-red-500 hover:bg-red-600 transition-all shadow-lg shadow-red-100">
                Discard & Exit
              </button>
              <button onClick={() => setShowConfirmExit(false)} className="w-full py-3.5 rounded-xl font-bold text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all">
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-60 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 custom-scrollbar">
          <SettingsNavLink label="Profile" icon={<User size={16}/>} active={activeSubTab === "Profile"} onClick={() => setActiveSubTab("Profile")} />
          <SettingsNavLink label="Payments" icon={<CreditCard size={16}/>} active={activeSubTab === "Payments"} onClick={() => setActiveSubTab("Payments")} />
          <SettingsNavLink label="Security" icon={<Shield size={16}/>} active={activeSubTab === "Security"} onClick={() => setActiveSubTab("Security")} />
        </div>

        <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 p-8 md:p-10 shadow-sm min-h-[500px] flex flex-col relative">
          <div className="flex-1">
            {activeSubTab === "Profile" && (
              <div className="space-y-8 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Full Name" name="fullName" val={formData.fullName} onChange={handleChange} />
                  <InputGroup label="Email" name="email" val={formData.email} onChange={handleChange} />
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:bg-white min-h-[100px]" />
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENTS */}
            {activeSubTab === "Payments" && (
              <div className="space-y-8 animate-in fade-in">
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl max-w-md relative overflow-hidden group">
                  <div className="relative z-10 space-y-8">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5">
                      <img src="https://cdn.aptoide.com/imgs/5/a/d/5ad0bd9f9704075be3dd8efdbca6313b_icon.jpg?w=128" alt="Easypaisa" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Account Number</p>
                      {isEditingNo ? (
                        <input autoFocus name="easypaisa" value={formData.easypaisa} onChange={handleChange} className="bg-slate-800 border-b-2 border-emerald-500 p-1 text-xl font-black text-white outline-none w-full" />
                      ) : (
                        <p className="text-2xl font-black tracking-tight">{formData.easypaisa}</p>
                      )}
                    </div>
                    <button onClick={() => setIsEditingNo(!isEditingNo)} className="text-xs font-black text-slate-400 hover:text-white transition-all underline underline-offset-4">
                      {isEditingNo ? "Save Number" : "Edit Account"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- FOOTER ACTION BUTTONS --- */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-end gap-3">
            <button 
              onClick={handleExitRequest}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-xs transition-all ${
                hasChanges 
                ? "bg-red-50 text-red-500 hover:bg-red-100" 
                : "bg-slate-50 text-slate-400 hover:text-slate-900"
              }`}
            >
              <RotateCcw size={16} /> Discard & Exit
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-xs hover:bg-emerald-500 transition-all shadow-lg active:scale-95"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>

          {/* SUCCESS OVERLAY */}
          {showSavedMessage && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center z-50 animate-in fade-in">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h4 className="text-2xl font-black text-slate-900">Success!</h4>
              <p className="text-slate-400 font-medium">Your settings have been updated.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- HELPERS ---
function SettingsNavLink({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${active ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "text-slate-400 hover:text-slate-900 hover:bg-white"}`}>
      {icon} {label}
    </button>
  );
}

function InputGroup({ label, name, val, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input name={name} value={val} onChange={onChange} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all" />
    </div>
  );
}