import React, { useState, useEffect } from "react";
import { X, Upload, CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react";

export default function AnalysisModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Upload, 2: Scanning, 3: Result
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setStep(2);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
          <X size={20} />
        </button>

        <div className="p-10">
          {/* STEP 1: UPLOAD */}
          {step === 1 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload size={32} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Upload Skin Photo</h2>
              <p className="text-slate-500 mb-8">For best results, ensure the area is well-lit and the image is clear.</p>
              
              <label className="block border-2 border-dashed border-slate-200 rounded-[2rem] p-12 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                    Select Image
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or drag and drop</span>
                </div>
              </label>
            </div>
          )}

          {/* STEP 2: SCANNING ANIMATION */}
          {step === 2 && <ScanningView onComplete={() => setStep(3)} image={image} />}

          {/* STEP 3: RESULTS */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                  <CheckCircle2 size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Analysis Complete</h2>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Detected Condition</p>
                  <p className="text-lg font-bold text-slate-900">Mild Acne Vulgaris</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-400 uppercase mb-1">AI Recommendation</p>
                  <p className="text-sm text-blue-900 font-medium leading-relaxed">
                    Based on your scan, we recommend using a Salicylic Acid cleanser. Check the marketplace for suitable products.
                  </p>
                </div>
              </div>

              <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                Done <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Internal Scanning Component
function ScanningView({ onComplete, image }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto mb-8 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
        {/* The User's Image */}
        <img src={image} alt="Target" className="w-full h-full object-cover" />
        
        {/* The Animated Laser Line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10 animate-scan-line"></div>
        
        {/* Blue Tint Overlay */}
        <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-3 text-blue-600 font-bold">
          <Loader2 className="animate-spin" size={20} />
          <span className="animate-pulse tracking-wide uppercase text-xs">Analyzing Dermal Layers...</span>
        </div>
        <p className="text-slate-400 text-[10px] font-medium">Skyntri AI Model v2.4 Active</p>
      </div>
    </div>
  );
}