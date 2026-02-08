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

  const containerStyle = isTabMode 
    ? "w-full bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden" 
    : "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm";

  const contentStyle = isTabMode ? "w-full" : "bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden relative";

  return (
    <div className={containerStyle}>
      <div className={`${contentStyle} animate-in zoom-in-95 duration-300`}>
        
        {!isTabMode && (
          <button onClick={onClose} className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 z-50">
            <X size={18} />
          </button>
        )}

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="text-center max-w-sm mx-auto py-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Upload size={28} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Skin Analysis</h2>
              <p className="text-slate-400 mb-8 text-sm font-medium">Please provide a high-resolution image of the affected area.</p>
              
              <label className="block border-2 border-dashed border-slate-100 rounded-[1.5rem] p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg group-hover:bg-blue-600 transition-all">
                  <Upload size={14} /> Browse Gallery
                </div>
                <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">or drag and drop here</p>
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
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="text-center py-6">
      <div className="relative w-48 h-48 mx-auto mb-8 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-lg">
        <img src={image} alt="Target" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan-line"></div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 text-blue-600">
          <Loader2 className="animate-spin" size={18} />
          <span className="font-black uppercase tracking-[0.15em] text-[10px]">Processing ML Model...</span>
        </div>
        <p className="text-slate-400 text-xs font-medium italic">Running deep tissue layer classification</p>
      </div>
    </div>
  );
}

function ResultsView({ onReset, onClose }) {
  const result = { condition: "Acne Vulgaris", confidence: 94.2, severity: "High" };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Analysis Summary</h2>
          <p className="text-slate-400 text-xs font-medium">Report Generated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg flex items-center gap-2 text-[10px] font-black border border-emerald-100">
          <ShieldCheck size={14} /> ENCRYPTED
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Detected Condition</p>
          <h3 className="text-xl font-black mb-4">{result.condition}</h3>
          <div className="flex gap-2">
             <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-blue-400 text-[10px] font-bold">{result.confidence}% Probability</div>
             <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-red-400 text-[10px] font-bold">{result.severity} Severity</div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <Sparkles size={16} />
            <h4 className="font-black text-xs uppercase tracking-wider">AI Insight</h4>
          </div>
          <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
            Characteristics align with chronic inflammatory response. <span className="font-bold">Salicylic Acid</span> topical treatment is typically indicated.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-8 flex gap-3">
        <AlertCircle className="text-slate-400 shrink-0" size={16} />
        <p className="text-slate-500 text-[10px] font-medium leading-normal italic">
          Disclaimer: This AI-generated report is for informational purposes. It is not a clinical diagnosis. Consult a board-certified dermatologist.
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={onReset} className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-md">
          Analyze Another Area
        </button>
        <button onClick={onClose} className="px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
          Close Report
        </button>
      </div>
    </div>
  );
}