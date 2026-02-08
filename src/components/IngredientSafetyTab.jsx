import React, { useState, useRef } from "react";
import {
  Search, Upload, AlertCircle, CheckCircle2,
  ShieldAlert, Info, BookOpen, RefreshCw,
  Camera, Type, ArrowLeft, Sparkles
} from "lucide-react";

export default function IngredientSafetyTab() {
  const [step, setStep] = useState("choice"); // choice, upload, manual, results
  const [isScanning, setIsScanning] = useState(false);
  const [manualText, setManualText] = useState("");
  const fileInputRef = useRef(null);

  const productRating = 2;

  const mockAnalysis = [
    { name: "Aqua", function: "Solvent", status: "safe", risk: "None", citation: "CosIng" },
    { name: "Fragrance (Parfum)", function: "Scenting", status: "irritant", risk: "Common allergen for sensitive skin", citation: "IFRA Standards" },
    { name: "Methylparaben", function: "Preservative", status: "toxic", risk: "Potential endocrine disruptor", citation: "EWG Skin Deep" },
    { name: "Glycerin", function: "Humectant", status: "safe", risk: "None", citation: "CIR" }
  ];

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) startAnalysis();
  };

  const startAnalysis = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep("results");
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-16">
      
      {/* HEADER SECTION */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ingredient Safety</h2>
          <p className="text-slate-400 text-xs font-medium">AI Label Decoding & Safety Analysis</p>
        </div>
        {step !== "choice" && (
          <button
            onClick={() => setStep("choice")}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs transition-colors"
          >
            <ArrowLeft size={14} /> Back to Choice
          </button>
        )}
      </div>

      {/* STEP 1: INITIAL CHOICE */}
      {step === "choice" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ChoiceCard 
            icon={<Camera size={24} />} 
            title="Scan Label" 
            desc="Auto-extract with Vision AI" 
            color="blue" 
            onClick={() => setStep("upload")} 
          />
          <ChoiceCard 
            icon={<Type size={24} />} 
            title="Manual Entry" 
            desc="Paste ingredient list text" 
            color="emerald" 
            onClick={() => setStep("manual")} 
          />
        </div>
      )}

      {/* STEP 2A: UPLOAD / SCANNING */}
      {step === "upload" && (
        <div className="bg-white rounded-[2rem] p-10 border border-slate-100 text-center shadow-sm">
          {isScanning ? (
            <ScanningProgress color="blue" label="Skyntri OCR Engine v1.0" />
          ) : (
            <div className="max-w-xs mx-auto">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload size={24} />
              </div>
              <h3 className="text-lg font-black mb-1 text-slate-900">Upload Photo</h3>
              <p className="text-slate-400 mb-6 text-xs">Ensure label text is clear and readable.</p>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <button onClick={handleUploadClick} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-xs shadow-lg hover:bg-blue-700 transition-all active:scale-95">
                Browse Files
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 2B: MANUAL INPUT */}
      {step === "manual" && (
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          {isScanning ? (
            <ScanningProgress color="emerald" label="Cross-Referencing Databases" />
          ) : (
            <>
              <h3 className="text-lg font-black mb-1 text-slate-900">Input Ingredients</h3>
              <p className="text-slate-400 mb-4 text-xs">Paste comma-separated ingredients here.</p>
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                className="w-full h-40 p-5 bg-slate-50 border border-slate-100 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-slate-700"
                placeholder="Water, Niacinamide, Glycerin..."
              />
              <button
                disabled={!manualText.trim()}
                onClick={startAnalysis}
                className="mt-4 w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-xs hover:bg-emerald-600 disabled:opacity-30 transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert size={14} /> Run Safety Check
              </button>
            </>
          )}
        </div>
      )}

      {/* STEP 3: RESULTS */}
      {step === "results" && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
          {/* Summary Score */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col sm:flex-row items-center gap-8 shadow-xl">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="56" cy="56" r="50" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                <circle cx="56" cy="56" r="50" stroke={productRating <= 2 ? "#ef4444" : "#10b981"} strokeWidth="8" fill="transparent"
                  strokeDasharray={314} strokeDashoffset={314 - (314 * productRating) / 5} strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black">{productRating}/5</span>
                <span className="text-[8px] uppercase font-bold text-slate-500 tracking-tighter">Safety</span>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                <h3 className="text-xl font-black">Analysis Report</h3>
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[9px] font-bold border border-red-500/20 uppercase">Action Required</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-4 max-w-md">
                Found <span className="text-red-400 font-bold">1 toxic</span> ingredient. Recommended for avoidance for your skin profile.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/10 p-3 rounded-xl inline-flex items-center gap-3 text-[10px] font-bold text-blue-300">
                <RefreshCw size={14} className="text-blue-500" />
                <span>Local Alternative: <span className="text-white underline cursor-pointer">Jenpharm Dermive</span></span>
              </div>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-3">
            {mockAnalysis.map((ing, i) => (
              <IngredientItem key={i} {...ing} />
            ))}
          </div>

          <button onClick={() => setStep("choice")} className="w-full py-4 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all uppercase tracking-widest">
            Scan Another Product
          </button>
        </div>
      )}
    </div>
  );
}

// SUB-COMPONENTS
function ChoiceCard({ icon, title, desc, color, onClick }) {
  const themes = {
    blue: "hover:border-blue-500 hover:shadow-blue-50 bg-blue-50 text-blue-600",
    emerald: "hover:border-emerald-500 hover:shadow-emerald-50 bg-emerald-50 text-emerald-600"
  };
  return (
    <div onClick={onClick} className="bg-white p-8 rounded-[1.5rem] border border-slate-100 transition-all cursor-pointer group shadow-sm hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${themes[color]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-black mb-1 text-slate-900">{title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function IngredientItem({ name, function: func, status, risk, citation }) {
  const statusStyles = {
    safe: "bg-emerald-50 text-emerald-600 border-emerald-100",
    toxic: "bg-red-50 text-red-600 border-red-100",
    irritant: "bg-amber-50 text-amber-600 border-amber-100"
  };
  return (
    <div className="bg-white border border-slate-100 p-5 rounded-2xl flex items-start justify-between gap-4 hover:shadow-md transition-all">
      <div className="flex gap-4 min-w-0">
        <div className={`mt-1 p-2 rounded-lg shrink-0 ${statusStyles[status]}`}>
          {status === 'safe' ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-slate-900 text-sm truncate">{name}</h4>
            <span className="text-[8px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-black uppercase">{func}</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-normal"><span className="font-bold">Risk:</span> {risk}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${statusStyles[status]}`}>{status}</span>
        <div className="flex items-center gap-1 text-slate-300 text-[8px] font-bold">
          <BookOpen size={10} /> {citation}
        </div>
      </div>
    </div>
  );
}

function ScanningProgress({ color, label }) {
  const colors = { blue: "bg-blue-500", emerald: "bg-emerald-500" };
  return (
    <div className="py-10 text-center animate-in fade-in">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${colors[color]}`}></div>
        <div className={`absolute inset-0 flex items-center justify-center ${color === 'blue' ? 'text-blue-600' : 'text-emerald-600'}`}>
          <RefreshCw size={32} className="animate-spin duration-[3000ms]" />
        </div>
      </div>
      <h3 className="text-sm font-black text-slate-900 mb-1">{label}</h3>
      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] animate-pulse">Running Cloud Inference...</p>
    </div>
  );
}