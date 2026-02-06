import React, { useState, useEffect } from "react";
import { X, Upload, CheckCircle2, Loader2, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function AnalysisModal({ isOpen, onClose, isTabMode = false }) {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setStep(2);
    }
  };

  const reset = () => {
    setStep(1);
    setImage(null);
  };

  // If used as a Tab, we don't want the fixed overlay background
  const containerStyle = isTabMode 
    ? "w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-sm" 
    : "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm";

  const contentStyle = isTabMode ? "w-full" : "bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative";

  return (
    <div className={containerStyle}>
      <div className={`${contentStyle} animate-in zoom-in-95 duration-300`}>
        
        {!isTabMode && (
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 z-50">
            <X size={20} />
          </button>
        )}

        <div className="p-12">
          {step === 1 && (
            <div className="text-center max-w-md mx-auto py-10">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Upload size={36} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Start Analysis</h2>
              <p className="text-slate-500 mb-10 text-lg">Upload a clear photo of the skin area for the AI to analyze.</p>
              <label className="block border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                <div className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl group-hover:scale-105 transition-transform">
                  Select Image
                </div>
              </label>
            </div>
          )}

          {step === 2 && <ScanningView onComplete={() => setStep(3)} image={image} />}

          {step === 3 && <ResultsView onReset={reset} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}

function ScanningView({ onComplete, image }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="text-center py-10">
      <div className="relative w-64 h-64 mx-auto mb-10 rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-2xl">
        <img src={image} alt="Target" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] animate-scan-line"></div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader2 className="animate-spin" size={24} />
          <span className="font-black uppercase tracking-widest text-sm">Analyzing Dermal Layers...</span>
        </div>
      </div>
    </div>
  );
}

function ResultsView({ onReset, onClose }) {
  const result = { condition: "Acne Vulgaris", confidence: 94.2, severity: "High" };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 text-left">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">Diagnostic Summary</h2>
        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black">
          <ShieldCheck size={16} /> SECURE REPORT
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
          <p className="text-slate-400 text-xs font-bold uppercase mb-2">Detection</p>
          <h3 className="text-2xl font-black mb-6">{result.condition}</h3>
          <div className="flex gap-4">
             <div className="bg-white/10 px-4 py-2 rounded-xl text-blue-400 font-bold">{result.confidence}% Match</div>
             <div className="bg-white/10 px-4 py-2 rounded-xl text-red-400 font-bold">{result.severity} Severity</div>
          </div>
        </div>
        <div className="bg-blue-600 rounded-[2rem] p-8 text-white">
          <h4 className="font-black text-lg mb-2">Recommendation</h4>
          <p className="text-blue-100 text-sm leading-relaxed">System suggests Salicylic Acid treatment. Consult a specialist for confirmation.</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] mb-10 flex gap-4">
        <AlertCircle className="text-amber-600 shrink-0" />
        <p className="text-amber-800 text-[11px] font-medium leading-relaxed italic uppercase">
          Medical Disclaimer: Skyntri AI is an informational tool. Always consult a professional dermatologist for medical diagnosis.
        </p>
      </div>

      <div className="flex gap-4">
        <button onClick={onReset} className="flex-1 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-blue-600 transition-all">
          New Analysis
        </button>
        <button onClick={onClose} className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-[1.5rem] font-black">
          Done
        </button>
      </div>
    </div>
  );
}